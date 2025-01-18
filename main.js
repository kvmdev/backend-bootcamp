

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
    cookie:{secure:false, maxAge: 60000}
    
}))
app.get("/usuarios", getUsuarios);
app.get("/registrar", registrar);
app.get("/login", login);
app.get("/tweet", createTweet);
app.get("/tweets", getTweets);
app.get("/tweet/:id/like", likeTweet);
app.listen(3000)    



