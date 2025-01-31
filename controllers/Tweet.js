import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createTweet = async (req, res)=> {
    try {
        const { contenido } = req.body
        const tweet = await prisma.tweet.create({
            data: {
                contenido,
                userId: req.user.id
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
        const tweets = await prisma.tweet.findMany({
            select: {
                createdAt: true,
                updatedAt: true
            },
            include: {
                usuario: {
                    select: {
                        nombre: true,
                        email: true,
                    }
                }
            }
        })
        res.json(tweets)
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error})
    }
}
export const likeTweet = async (req, res)=> {
    try {
        const { tweetId } = req.params
        await prisma.tweet.update({
            where: {
                tweetId: parseInt(tweetId)
            }, 
            data: {
                likes: {
                    increment: 1
                }
            }
        })
        res.json({message: 'Liked successfully'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}
export const commentTweet = async (req, res)=> {
    try {
        const { userId, tweetId } = req.params
        const { contenido } = req.body
        const comment = await prisma.comentario.create({
            where: {
                tweetId: parseInt(tweetId)
            },
            data: {
                contenido,
                userId: parseInt(userId)
            }
        })
        res.json(comment)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}