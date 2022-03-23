const { Videogame, Genres } = require("../../db");
const {
  axiosDataSeacrhName,
  axiosDataSeacrhGenres,
  axiosDataSeacrhId,
  axiosData,
  videogameFindAll,
  addVideoGame,
  BDDataSeacrhId,
} = require("./model/index");

exports.getvideogames = async (req, res) => {
  try {
    const { name } = req.query;

    const dataBD = await videogameFindAll({
      include: [
        {
          model: Genres,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!name) {
      const dataApi = [];

      const key = process.env.APIKEY;
      let url = `https://api.rawg.io/api/games?key=${key}`;

      for (let i = 0; i <= 4; i++) {
        const dataAPI = await axiosData(url);
        url = dataAPI.shift();
        dataApi.push(...dataAPI);
      }

      //const newDataApi = dataApi.slice(0, 100);

      res.send([dataBD, dataApi]);
    } else {
      const dataApi = await axiosDataSeacrhName(name);

      if (!dataApi && !dataBD.length) {
        return res.status(400).send("No se encontro el videojuego: " + name);
      }

      const dataBDFilter = dataBD.filter((elm) =>
        elm.name.toLowerCase().includes(name.toLowerCase())
      );
      dataBDFilter ? dataBDFilter : [];

      const data = [dataBDFilter, dataApi];
      res.send(data);
    }
  } catch (error) {
    console.log("error al pedir los videojuegos", error);
    res.sendStatus(400);
  }
};

//obtengo los datos por id de la api
exports.getvideogameId = async (req, res) => {
  const { idGamer } = req.params;
  const data = await axiosDataSeacrhId(idGamer);

  if (Object.keys(data).length) {
    res.send(data);
  } else {
    const dataBD = await BDDataSeacrhId(idGamer);
    res.send(dataBD);
  }
};

//obtenemos todos lo generos de la api
// guardamos todos lo generos de la api a la db
exports.getGeneros = async (_req, res) => {
  const results = await axiosDataSeacrhGenres();

  results.map(async ({ name }) => {
    const saveName = name.toLowerCase();
    const n = saveName.replace(/\b\w/g, (l) => l.toUpperCase());

    await Genres.findOrCreate({
      where: { name: n },
      defaults: {
        name: n,
      },
    });
  });

  const date = await Genres.findAll();
  res.send(date);
};

//agregamos un nuevo videojuego
exports.postVideogames = async (req, res) => {
  try {
    const bool = await addVideoGame(req.body);

    if (typeof bool === "string") {
      res.status(500).send(bool);
    }

    res.send("Se a agregado a: " + req.body.name);
  } catch (error) {
    console.log("Ocurio un error", error);
    res.status(400).send(error);
  }
};
