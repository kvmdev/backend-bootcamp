import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const createTweet = async (req, res)=> {
    try {
        const { contenido, userId } = req.body
        const tweet = await prisma.tweet.create({
            data: {
                contenido,
                userId: 1
            }
        })
        if(tweet) {
            res.status(201).json({message: 'Created successfully'})
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
export const getAllTweets = async (req, res)=> {
    try {
        const tweets = await prisma.tweet.findMany()
        res.json(tweets)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}