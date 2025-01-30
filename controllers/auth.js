import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_KEY

const prisma = new PrismaClient()

export const login = async (req, res)=> {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if(user && user.password == password) {
            const token = jwt.sign(user, SECRET_KEY, {expiresIn: '24h'})
            res.json({message: 'Has iniciado sesion', token})
        } else {
            res.status(404).json({message: 'Usuario o password incorrecto'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}
export const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body
        const user = await prisma.user.create({
            data: {
                nombre, 
                email,
                password
            }
        })
        const token = jwt.sign(user, SECRET_KEY, {expiresIn: '24h'})
        res.json({message: 'Created successfully', token, user: {nombre: user.nombre, email: user.email}})
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error})
    }
}