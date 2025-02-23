const whitelistedIps = new Set([
  "127.0.0.1", // Exemplo de IPs permitidos
  "192.168.1.100",
]);

export const isIpWhitelisted = async (ip) => {
  return whitelistedIps.has(ip);
};

export const addIpToWhitelist = async (ip) => {
  whitelistedIps.add(ip);
};

export const removeIpFromWhitelist = async (ip) => {
  whitelistedIps.delete(ip);
};
