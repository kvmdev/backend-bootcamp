import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { userSchema } from "../models/UserModel.js"
const prisma = new PrismaClient()

export async function login(req, res) {
  try {
    const email = req.query.email;
    const password = req.query.password;

    if (!email && !password) {
      return res.json({ message: "Ingrese email y contraseña" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      bcrypt.compare(password, user.password).then((value) => {
        if (value) {
          req.session.user = user;
          return res.json({ message: "Has iniciado sesion", user });
        } else {
          res.json({ message: "email o password incorrectos" });
        }
      });
    } else {
      res.json({ message: "email o password incorrectos" });
    }
  } catch (error) {
    res.json({ message: "Hubo un error en el servidor" });
  }
}

export async function registrar(req, res) {
  try {
    const nombre = req.query.nombre;
    const email = req.query.email;
    const password = req.query.password;

    if (userSchema.parse(req.query)) {
      let encryptedPassword = "";
      bcrypt.hash(password, 3, async (err, data) => {
        if (err) {
          return res.json({ message: "Hubo un error" });
        }
        encryptedPassword = data;
        const usuario = await prisma.user.create({
          data: {
            nombre,
            email,
            password: encryptedPassword,
          },
        });
        res.json(usuario);
      });
    } else {
        res.json({message: 'nombre un string e email tiene que ser email'})
    }
  } catch (error) {
    const err = JSON.parse(error)
    if(err.err[0].validation == 'email') {
        res.json({message: 'El email no cumple con los requisitos'})
    } else {
        res.json({message: 'Hubo un error en el servidor'})
    }
  }
}

export async function getUsuarios(req, res) {
  const usuarios = await prisma.user.findMany();
  res.json(usuarios);
}
