const tokenBlacklist = new Set();

export const addTokenToBlacklist = async (token) => {
  tokenBlacklist.add(token);
};

export const isTokenRevoked = async (token) => {
  return tokenBlacklist.has(token);
};
