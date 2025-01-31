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
export const  getUserById = async (req, res)=> {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}