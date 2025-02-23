import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../repositories/userRepositroy.js";
import { addTokenToBlacklist } from "../repositories/tokenRepository.js";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Erro ao processar a solicitação");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({ name, email, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Erro ao processar a solicitação");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  await addTokenToBlacklist(token); // Permite revogação do token
  return token;
};
