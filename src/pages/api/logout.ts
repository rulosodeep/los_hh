import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Aquí podrías realizar acciones como invalidar un token
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Método ${req.method} no permitido` });
  }
}
//hola