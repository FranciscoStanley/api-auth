import { isTokenRevoked } from "../repositories/tokenRepository.js";
import { isIpWhitelisted } from "../repositories/whitelistRepository.js";
import { logger } from "../utils/logger/loggerService.js";

export const blacklistMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    logger.warn("Tentativa de acesso sem token de autorização.");
    return res.status(401).json({ error: "Acesso negado" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    logger.warn("Formato de token inválido.");
    return res.status(400).json({ error: "Formato de token inválido" });
  }

  const token = tokenParts[1];
  if (await isTokenRevoked(token)) {
    logger.warn("Tentativa de uso de token revogado.");
    return res.status(403).json({ error: "Token revogado" });
  }

  next();
};

export const whitelistMiddleware = async (req, res, next) => {
  const clientIp = req.ip;
  if (!(await isIpWhitelisted(clientIp))) {
    logger.warn(`Acesso negado para IP não permitido: ${clientIp}`);
    return res.status(403).json({ error: "Acesso negado para este IP" });
  }

  next();
};