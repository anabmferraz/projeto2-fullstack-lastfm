import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    const options = {
      maxPoolSize: 10,
      minPoolSize: 5,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    logger.info("MongoDB conectado com sucesso");
  } catch (error) {
    logger.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
