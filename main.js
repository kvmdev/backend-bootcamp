import express from "express"

const app = express()


app.get("/saludar" , function(req, res){
    const nombre = req.query.nombre
    const edad = req.query.edad
    res.send('Hola ' + nombre + ' tu edad es: ' + edad)
})
app.post("/enviar" , function(req, res){
})

app.listen(3000)