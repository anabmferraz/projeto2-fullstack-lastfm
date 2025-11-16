import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Track from "../models/track.js";
import Artist from "../models/artist.js";
import cache from "../config/cache.js";
import logger from "../config/logger.js";

const router = express.Router();

// Middleware de autenticação (REQUISITO)
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: "Acesso negado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn("Token inválido");
    res.status(401).json({ success: false, message: "Token inválido" });
  }
};

router.post(
  "/track",
  authMiddleware,
  [
    body("name").trim().notEmpty().escape(),
    body("artist").trim().notEmpty().escape(),
    body("image").optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Inserção track - validação falhou", {
        userId: req.user.userId,
      });
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        errors: errors.array(),
      });
    }

    try {
      const track = new Track({
        name: req.body.name,
        artist: req.body.artist,
        image: req.body.image || "",
        userId: req.user.userId,
      });

      await track.save();

      cache.del(`search_${req.user.userId}`);

      logger.info("Track inserida", {
        userId: req.user.userId,
        trackName: req.body.name,
      });

      res.status(201).json({
        success: true,
        message: "Música adicionada com sucesso",
        track,
      });
    } catch (error) {
      logger.error("Erro ao inserir track:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao adicionar música",
      });
    }
  }
);

router.post(
  "/artist",
  authMiddleware,
  [
    body("name").trim().notEmpty().escape(),
    body("playcount").optional().isInt({ min: 0 }).toInt(),
    body("image").optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Inserção artist - validação falhou", {
        userId: req.user.userId,
      });
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        errors: errors.array(),
      });
    }

    try {
      const artist = new Artist({
        name: req.body.name,
        playcount: req.body.playcount || 0,
        image: req.body.image || "",
        userId: req.user.userId,
      });

      await artist.save();

      cache.del(`search_${req.user.userId}`);

      logger.info("Artist inserido", {
        userId: req.user.userId,
        artistName: req.body.name,
      });

      res.status(201).json({
        success: true,
        message: "Artista adicionado com sucesso",
        artist,
      });
    } catch (error) {
      logger.error("Erro ao inserir artist:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao adicionar artista",
      });
    }
  }
);

export default router;
