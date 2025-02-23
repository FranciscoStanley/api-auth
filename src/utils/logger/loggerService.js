import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
const logFilePath = path.join(logDir, "app.log");

// Garantir que a pasta de logs exista
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const log = (level, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

  fs.appendFileSync(logFilePath, logMessage);
  console.log(logMessage);
};

export const logger = {
  info: (message) => log("info", message),
  warn: (message) => log("warn", message),
  error: (message) => log("error", message),
};
