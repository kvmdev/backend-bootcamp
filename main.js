import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.get('/usuarios', async function (req, res){
    const usuarios = await prisma.user.findMany()
    res.json(usuarios)
})

app.get('/usuario', async function(req, res){
    const nombre = req.query.nombre
    const email = req.query.email
    const password = req.query.password

    const usuario = await prisma.user.create({
        data: {
            nombre, 
            email,
            password
        }
    })
    res.json(usuario)
})

app.get('/tweet', async function (req, res){
    const contenido = req.query.contenido
    const userId = req.query.userId
    const idConvertido = parseInt(userId)

    const tweet = await prisma.tweet.create({
        data: {
            contenido,
            userId: idConvertido
        }
    })
    res.json(tweet)
})

app.listen(3000)