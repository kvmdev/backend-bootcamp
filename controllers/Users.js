import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getAllUsers = async function (req, res){
    try {
        const users = await prisma.tweet.findMany()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}