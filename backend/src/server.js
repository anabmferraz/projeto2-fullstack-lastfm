import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import logger from "./config/logger.js";
import fs from "fs";
import https from "https";

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/search.js";
import resourceRoutes from "./routes/insert.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", resourceRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Rota não encontrada" });
});

try {
  const httpsOptions = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  };

  https.createServer(httpsOptions, app).listen(PORT, () => {
    logger.info(`Servidor HTTPS rodando na porta ${PORT}`);
    console.log(`Backend (HTTPS): https://localhost:${PORT}`);
  });
} catch (error) {
  logger.error(
    "Erro ao iniciar HTTPS (certificados não encontrados), iniciando HTTP fallback",
    error
  );
  app.listen(PORT, () => {
    logger.info(`Servidor HTTP rodando na porta ${PORT}`);
    console.log(`Backend (HTTP): http://localhost:${PORT}`);
  });
}
