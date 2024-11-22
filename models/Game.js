import { model, Schema } from 'mongoose';
const memoryGameSchema = new Schema({
  title: String,
  content: String,
  words: Array
});
//Se crea el modelo del contenido del juego


memoryGameSchema.set('toJSON', {
  //se modifica el esquema para eliminar __v y el _id convertirlo a id
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
const MemoryGame = model('MemoryGame', memoryGameSchema);//crea el modelo

export async function postMemoryGame (req, res)  {
  const { title, content, words } = req.body;
  try {
    const game = new MemoryGame({
      title: title,
      content: content,
      words: words,
    });
    // Usa el modelo y le pasa los datos del esquema con los datos dela request body
    await game.save(); //segurada
    //status code 201 Created si es que si se creo bien
    res.status(201).json({ message: 'Game created successfully!', game });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'An error occurred', error: e.message });
  }
}

export async function getAllMemoryGames (request, response) {
  try {
    const games = await MemoryGame.find({}); //devuelve todos los games
    response.json(games);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    response.status(500).send('Error al obtener los datos');
    //catch por si hay un error en el servidor
  }
}
