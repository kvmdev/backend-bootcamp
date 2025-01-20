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