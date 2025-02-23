import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./src/routes/index.js";
import { connectWithRetry } from "./src/config/database/db.js";
import { blacklistMiddleware } from "./src/middlewares/securityMiddleware.js";
import { logger } from "./src/utils/logger/loggerService.js";
import rateLimitMiddleware from "./src/middlewares/rateLimit.js";

if (!process.env.JWT_SECRET) {
  throw new Error("A variável de ambiente JWT_SECRET não está definida.");
}

const app = express();
const PORT = process.env.PORT || 5000;

// Definir domínios permitidos
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:3000"];

// Middlewares globais
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origem não permitida pelo CORS"));
      }
    },
  })
);
app.use(helmet());
app.use(express.json());
app.use(blacklistMiddleware);
app.use(rateLimitMiddleware);

// Conectar ao MongoDB
connectWithRetry();

// Rotas
app.use("/api", routes);

app.listen(PORT, () => logger.info(`Servidor rodando na porta ${PORT}`));
