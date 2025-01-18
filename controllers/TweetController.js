import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function createTweet(req, res) {
  if (req.session.user) {
    const contenido = req.query.contenido;
    const userId = req.session.user.id;
    const idConvertido = parseInt(userId);

    const tweet = await prisma.tweet.create({
      data: {
        contenido,
        userId: idConvertido,
      },
    });
    return res.json(tweet);
  } else {
    res.json({ message: "Primero inicia sesion" });
  }
}

export async function getTweets(req, res) {
    const tweet = await prisma.tweet.findMany();
    res.json(tweet);
}

export async function likeTweet(req, res) {
    if(req.session.user) {
      const id = req.params.id;
      const idConvertido = parseInt(id);
      const tweet = await prisma.tweet.update({
        where: {
          id: idConvertido,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
      res.json(tweet);
    } else {
      res.json({message: 'Inicia sesion primero'})
    }
}