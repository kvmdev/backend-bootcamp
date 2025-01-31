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
            console.log(tweet)
            throw new Error('Internal server error')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
export const getAllTweets = async (req, res)=> {
    try {
        const tweets = await prisma.tweet.findMany({
            include: {
                usuario: {
                    select: {
                        nombre: true,
                        email: true
                    }
                } 
            }
        })
        res.json(tweets)
        console.log(tweets)
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error})
    }
}
export const getTweet = async (req, res) => {
    try {
        const tweet = await prisma.tweet.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!tweet) {
            return res.status(404).json({ message: 'Tweet not found' });
        }
        res.status(200).json(tweet);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

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
export const commentTweet = async (req, res) => {
    try {
        const { tweetId, contenido } = req.body;

        // Asegúrate de que req.user.id tenga un valor válido.
        const userId = parseInt(req.user?.id);

        if (!userId) {
            return res.status(400).json({ error: 'Usuario no autenticado' });
        }

        const comentario = await prisma.comentario.create({
            data: {
                contenido,
                tweetId:parseInt(tweetId),  // ID del tweet al que se le quiere agregar el comentario
                userId,   // ID del usuario que está comentando
            },
        });

        res.status(201).json(comentario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un problema al crear el comentario.' });
    }
};



export const getComment = async (req, res)=> {
    try {
        const { tweetId } = req.params
        const comments = await prisma.comentario.findMany({
            where: {
                tweetId: parseInt(tweetId)
            }
        })
        res.json(comments)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}

