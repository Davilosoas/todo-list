import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) return res.status(401).json({ message: "Usuário inválido" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};

export default authMiddleware;
