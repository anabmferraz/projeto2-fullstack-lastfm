import express from "express";
import jwt from "jsonwebtoken";
import Track from "../models/track.js";
import Artist from "../models/artist.js";
import User from "../models/user.js";
import cache from "../config/cache.js";
import logger from "../config/logger.js";

const router = express.Router();

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

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const cacheKey = `search_${userId}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      logger.info("Busca (cache)", { userId });
      return res.json(cached);
    }

    const user = await User.findById(userId);
    const recentTrack = await Track.findOne({ userId }).sort({ playedAt: -1 });
    const topArtists = await Artist.find({ userId })
      .sort({ playcount: -1 })
      .limit(5);

    const result = {
      success: true,
      user: {
        name: user.username,
        realname: user.realname,
        playcount: user.playcount,
        image: user.image,
      },
      recentTrack,
      topArtists,
    };

    cache.set(cacheKey, result);

    logger.info("Busca realizada", { userId });

    res.json(result);
  } catch (error) {
    logger.error("Erro na busca:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar dados",
    });
  }
});

export default router;
