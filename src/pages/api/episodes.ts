import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
//hh
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const episodes = await prisma.episode.findMany();
    res.status(200).json(episodes);
  } else if (req.method === "POST") {
    const { title, description, imageUrl, videoUrl } = req.body;
    const episode = await prisma.episode.create({
      data: { title, description, imageUrl, videoUrl },
    });
    res.status(201).json(episode);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.episode.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Episodio eliminado" });
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
