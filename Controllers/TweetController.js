import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function createTweet(req, res){
    if(req.session.user) {
        const contenido = req.query.contenido
        const userId = req.session.user.id
        const idconvertido = parseInt(userId)
        const tweet = await prisma.tweet.create({
            data : {
                contenido,
                userId : idconvertido
            }
        })
        return res.json(tweet) 
    } else {
        res.json({message: 'Primero debes iniciar sesión'})
    }
}

export  async function getTweets(req, res){
    const tweet = await prisma.tweet.findMany()
    res.json(tweets)
}

export async function likeTweet(req, res){
    if(req.session.user){
        const id = req.params.id
        const idconvertido = parseInt(id)
        const tweet = await prisma.tweet.update({
            where: {
                id: idconvertido
            },
            data: {
                likes: {
                    increment: 1
                }
            }
        })
        res.json(tweet)
    } else {
        res.json({message: 'No has iniciado sesión'})
    }
}