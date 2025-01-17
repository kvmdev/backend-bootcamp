import express from "express";
import { PrismaClient } from "@prisma/client";
import session from "express-session";

const prisma = new PrismaClient();

const app = express();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a 'false' para desarrollo local
  })
);

app.get("/usuarios", async function (req, res) {
  const usuarios = await prisma.user.findMany();
  res.json(usuarios);
});

app.get("/usuario", async function (req, res) {
  try {
    const nombre = req.query.nombre;
    const email = req.query.email;
    const password = req.query.password;

    const usuario = await prisma.user.create({
      data: {
        nombre,
        email,
        password,
      },
    });
    res.json(usuario);
  } catch (error) {
    res.json({ message: "Email en uso" });
  }
});

app.get("/login", async function (req, res) {
  try {
    const email = req.query.email;
    const password = req.query.password;

    if (!email && !password) {
      return res.json({ message: "Ingrese email y contraseña" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (user) {
      req.session.user = user; // Guardar en la sesión antes de enviar la respuesta
      return res.json({ message: "Has iniciado sesion", user });
    } else {
      res.json({ message: "email o password incorrectos" });
    }
  } catch (error) {
    res.json({ message: "Hubo un error en el servidor" });
  }
});

app.get("/tweet", async function (req, res) {
  if (req.session.user) {
    const contenido = req.query.contenido;
    const userId = req.session.user.id;
    const idConvertido = parseInt(userId);

    const tweet = await prisma.tweet.create({
      data: {
        contenido,
        userId: idConvertido,
      },
    });
    return res.json(tweet);
  } else {
    res.json({ message: "Primero inicia sesion" });
  }
});

app.get("/tweets", async function (req, res) {
  const tweet = await prisma.tweet.findMany();
  res.json(tweet);
});

app.get("/tweet/:id/like", async function (req, res) {
  const id = req.params.id;
  const idConvertido = parseInt(id);
  const tweet = await prisma.tweet.update({
    where: {
      id: idConvertido,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
  res.json(tweet);
});

app.listen(3000);
