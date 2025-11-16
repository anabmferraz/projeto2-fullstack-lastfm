import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import logger from "../config/logger.js";

const router = express.Router();

router.post(
  "/login",
  [body("username").trim().notEmpty(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("Login - validação falhou", { username: req.body.username });
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos",
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        logger.warn("Login falhou - usuário não encontrado", { username });
        return res.status(401).json({
          success: false,
          message: "Credenciais inválidas",
        });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        logger.warn("Login falhou - senha incorreta", { username });
        return res.status(401).json({
          success: false,
          message: "Credenciais inválidas",
        });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      logger.info("Login bem-sucedido", { username });

      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          username: user.username,
          realname: user.realname,
          playcount: user.playcount,
          image: user.image,
        },
      });
    } catch (error) {
      logger.error("Erro no login:", error);
      res.status(500).json({
        success: false,
        message: "Erro no servidor",
      });
    }
  }
);

export default router;
