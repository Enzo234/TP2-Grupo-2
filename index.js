import express from "express";

const app = express();

app.use('/', express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo en localhost:3000')
});