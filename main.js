<<<<<<< HEAD
import express from "express"
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()
const app = express()
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
/*
app.get ("/saludar", function (req,res){
    const nombre= req.query.nombre
    const edad = req.query.edad
    res.send("hola "+nombre+" tu edad es "+ edad)
}) 
    */
app.get ("/tweets", async function (req,res){
        const tweets = await prisma.tweet.findMany()
        res.json(tweets)
    })

app.listen(3000)
=======
import express from "express";
import { PrismaClient } from "@prisma/client";
import session from "express-session"
import { createTweet, getTweets, likeTweet } from "./controllers/TweetController.js";
import { getUsuarios, login, registrar } from "./controllers/UserController.js";

const app = express();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 } // Cambiar a 'false' para desarrollo local
  })
);

app.get("/usuarios", getUsuarios);

app.get("/registrar", registrar);

app.get("/login", login);

app.get("/tweet", createTweet);

app.get("/tweets", getTweets);

app.get("/tweet/:id/like", likeTweet);

app.listen(3000);
>>>>>>> kevin
