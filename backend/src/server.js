import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import logger from "./config/logger.js";

import authRoutes from "./routes/auth.js";
import searchRoutes from "./routes/search.js";
import insertRoutes from "./routes/insert.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(mongoSanitize());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/insert", insertRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Rota não encontrada" });
});

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  console.log(`Backend: http://localhost:${PORT}`);
});
