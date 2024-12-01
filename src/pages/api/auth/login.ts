import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }

  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Usuario y contraseña requeridos" });
    }

    // Buscar el usuario en la base de datos
    const user = await prisma.admin.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Comparar contraseñas con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Si las credenciales son correctas
    return res.status(200).json({ message: "Autenticación exitosa" });
  } catch (err) {
    console.error("Error al autenticar:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
