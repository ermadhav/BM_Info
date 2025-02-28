import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const requests = await prisma.request.findMany();
    res.json(requests);
  } else if (req.method === 'POST') {
    const { method, url, body } = req.body;
    const request = await prisma.request.create({
      data: { method, url, body },
    });
    res.json(request);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}