const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getvideogames,
  getGeneros,
  getvideogameId,
  postVideogames,
} = require("./controllers/videojuegos");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", getvideogames);

router.get("/videogames/:idGamer", getvideogameId);

router.get("/genres", getGeneros);

router.post("/videogame", postVideogames);

module.exports = router;
