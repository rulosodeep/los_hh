// /api/episodes/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Actualizar episodio
  if (req.method === "PUT") {
    const { title, description, imageUrl, videoUrl } = req.body;

    try {
      const updatedEpisode = await prisma.episode.update({
        where: { id: Number(id) },
        data: { title, description, imageUrl, videoUrl },
      });

      res.status(200).json(updatedEpisode);
    } catch (error) {
      console.error("Error al actualizar el episodio:", error);
      res.status(500).json({ message: "Error al actualizar el episodio" });
    }

  // Eliminar episodio
  } else if (req.method === "DELETE") {
    try {
      await prisma.episode.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: "Episodio eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar el episodio:", error);
      res.status(500).json({ message: "Error al eliminar el episodio" });
    }

  // Método no permitido
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).json({ message: `Método ${req.method} no permitido` });
  }
}
