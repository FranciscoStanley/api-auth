import mongoose from "mongoose";
import { logger } from "../../utils/logger/loggerService.js";

const MAX_RETRIES = 5;
let retryCount = 0;

export const connectWithRetry = () => {
  if (retryCount >= MAX_RETRIES) {
    logger.error(
      "Número máximo de tentativas de conexão atingido. Retentativas encerradas."
    );
    throw new Error(
      "Falha ao conectar ao banco de dados após múltiplas tentativas"
    );
  }
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("MongoDB conectado.");
      retryCount = 0;
    })
    .catch((err) => {
      retryCount++;
      const randomFactor = Math.random() * 1000;
      const delay = Math.min(5000 * 2 ** retryCount + randomFactor, 60000); // Backoff exponencial com fator aleatório
      logger.error(`Erro ao conectar ao MongoDB: ${err.message}`);
      logger.info(
        `Tentando reconectar em ${(delay / 1000).toFixed(
          2
        )} segundos... (Tentativa ${retryCount}/${MAX_RETRIES})`
      );
      setTimeout(connectWithRetry, delay);
    });
};
