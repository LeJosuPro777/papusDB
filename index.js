import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getAllMemoryGames, postMemoryGame } from './models/Game.js';

dotenv.config();
const app = express();
app.use(cors());// permite hacer la solicitud de datos
app.use(json()); // los datos los convierte a json

const connectionString = process.env.MONGO_BD_URI || "mongodb+srv://database:EkZ9946YppnOoq1s@cluster0.nvrhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//la url que necesita para hacer la coneccion con la db

mongoose.connect(connectionString) //conexion a mongo db
  .then(() => {
    //si todo va bien hace la conexion 
    console.log('Connected to MongoDB');
  })
  .catch(err => { 
    //si intercepta el error y lo escribe en la consola
    console.error('Error connecting to MongoDB:', err)
  })
app.get('/api/memoryContent', (req, res) => getAllMemoryGames(req, res));
app.post('/create-memory-game', (req, res) => postMemoryGame(req, res));

const PORT = process.env.MONGO_BD_URI || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//se abre el servidor en el puerto 3001
