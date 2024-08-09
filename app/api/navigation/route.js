import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  const { hrProfileId } = req.query;

  if (!hrProfileId) {
    return res.status(400).json({ error: "hrProfileId is required" });
  }

  const navigations = await prisma.navigation.findMany({
    where: { hrProfileId },
  });

  res.status(200).json(navigations);
}

export async function POST(req, res) {
  const { id, hrProfileId, page, pageUrl } = req.body;

  if (!hrProfileId) {
    return res.status(400).json({ error: "hrProfileId is required" });
  }

  const updatedNavigation = await prisma.navigation.upsert({
    where: { id },
    update: {
      page,
      pageUrl,
      updatedAt: new Date(),
    },
    create: {
      id,
      hrProfileId,
      page,
      pageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  res.status(200).json(updatedNavigation);
}
