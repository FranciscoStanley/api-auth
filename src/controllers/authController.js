import { registerUser, loginUser } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao processar a solicitação" });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: "Erro ao processar a solicitação" });
  }
};
