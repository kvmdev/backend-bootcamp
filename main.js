

import express from 'express'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

/*
susuarios
tweets
comentarios
likes
*/
/*app.get('/saludar', function (req,res){
    res.send("hola mundo")
}) 
app.post("/enviar", function (req,res){
    
})*/
/*app.get ("/saludar", function (req,res){
    const nombre= req.query.nombre
    const edad = req.query.edad
    res.send("hola "+nombre+" tu edad es: "+ edad)
}) */
const app = express()

app.get('/usuario', async function (req, res){
    const usuario = await prisma.user.findMany()
    res.json(usuario)
})


app.get('/user', async function (req, res){
  
    
    try {
        const nombre = req.query.nombre
        const email = req.query.email
        const password = req.query.password

        const user = await prisma.user.create({
            data: {
                nombre,
                email, 
                password
            }
        })
        res.json(user)
    }catch (error){
        res.json({message: "El email ya exixte, pon otro"})
    }
    
})

app.get('/tweet', async function (req, res){
    const contenido = req.query.contenido
    const userId = req.query.userId
    const idconvertido = parseInt(userId)
    const tweet = await prisma.tweet.create({
        data : {
            contenido,
            userId : idconvertido
        }
    })
    res.json(tweet)
})

app.get('/tweets', async function (req, res){
    const tweets = await prisma.tweet.findMany()
    res.json(tweets)
})

app.get('/tweet/:id/like', async function (req, res){
    const id = req.params.id
    const idConvertido = parseInt(id)
    const tweet = await prisma.tweet.update({
        where: {
            id: idConvertido
        },
        data: {
            likes: {
                increment: 1
            }
        }
    })
    res.json(tweet)
})

app.get('/login', async function (req, res){
    try {
        const email = req.query.email
        const password = req.query.password


        if(!email && !password){
            return res.json({message: "Ingrese el email y la contraseña"})
        }
        const user = await prisma.user.findFirst({
            where: {
                email,
                password
            }
        })
        if(user){
            res.json({message: "Has iniciado sesion"})
        }else {
            res.json({message: "emeil o password incorrecto"})
        }
    }catch (error){
        res.json({message: "Hubo un error en el servidor"})
    }
})
app.listen(3000)    



