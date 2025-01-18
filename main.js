

import express from 'express'
import {PrismaClient} from '@prisma/client'
import session from 'express-session'
import bcrypt from 'bcrypt'
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
app.use(session({
    secret:"password123",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
    
}))
async function encriptar(password) {

    
}

app.get('/usuario', async function (req, res){
    const usuario = await prisma.user.findMany()
    res.json(usuario)
})


app.get('/usuarios', async function (req, res){
    try {
        const nombre = req.query.nombre
        const email = req.query.email
        const password = req.query.password
        let encryptedPassword = " "
        bcrypt.hash(password, 3,async (err, data)=>{
            if(err){
                return res.json({message: "hubo un error"})
            }
            encryptedPassword = data
            const usuarios = await prisma.user.create({
                data: {
                    nombre,
                    email, 
                    password: encryptedPassword,
                }
            })
            res.json(usuarios)
        })
        
    }catch (error){
        res.json({message: "El email ya exixte, pon otro"})
    } 
})
app.get('/tweet', async function (req, res){
    if(req.session.user){    
        const contenido = req.query.contenido
        const userId = req.query.userId
        const idconvertido = parseInt(userId)
        const tweet = await prisma.tweet.create({
            data : {
                contenido,
                userId : idconvertido
            }
        })
        return res.json(tweet)
    }else{
        res.json({message: "Primero inicia sesion"})
    }
})

app.get('/tweets', async function (req, res){
    const tweets = await prisma.tweet.findMany()
    res.json(tweets)
})

app.get('/tweet/:id/like', async function (req, res){
    if(req.session.user){ 
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
}
else{
    res.json({message: "Primero inicia sesion"})
}
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
                email

            }
        })
        if(user){
            const esCorrecto=bcrypt.compare(password,user.password)
            if(esCorrecto){
                
            req.session.user = user
            res.json({message: "Has iniciado sesion",user})
        } else {
                res.json({message: "emeil o password incorrecto"})
            }
            
        }else {
            res.json({message: "emeil o password incorrecto"})
        }
    }catch (error){
        res.json({message: "Hubo un error en el servidor"})
    }
})
app.listen(3000)    



