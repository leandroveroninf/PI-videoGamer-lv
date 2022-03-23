const axios = require("axios");
const { Videogame, Genres } = require("../../../db");

const key = process.env.APIKEY;

exports.axiosData = async (url) => {
  const dataApi = await axios.get(url);

  const { results, next } = dataApi.data;

  const arr = [next];
  results.forEach(
    ({ id, name, background_image, platforms, genres, rating, released }) => {
      const plats = platforms.map(({ platform }) => platform.name);

      //console.log(plats);
      arr.push({
        id,
        name,
        background_image,
        platforms: plats,
        genres,
        rating,
        released,
      });
    }
  );
  return arr;
};

exports.axiosDataSeacrhGenres = async () => {
  const dataApi = await axios.get(`https://api.rawg.io/api/genres?key=${key}`);
  const { results } = dataApi.data;
  const arr = [];
  results.forEach(({ name }) => {
    arr.push({
      name,
    });
  });
  return arr;
};

//consulta id de la api
exports.axiosDataSeacrhId = async (idGamer) => {
  try {
    const dataApi = await axios.get(
      `https://api.rawg.io/api/games/${idGamer}?key=${key}`
    );
    const {
      id,
      name,
      background_image,
      platforms,
      genres,
      rating,
      released,
      description_raw: description,
    } = dataApi.data;
    const plats = platforms.map(({ platform }) => platform.name);
    return {
      id,
      name,
      background_image,
      platforms: plats,
      genres,
      rating,
      released,
      description,
    };
  } catch (error) {
    if (error.request) {
      return {};
    }
  }
};

//consulta name de la api
exports.axiosDataSeacrhName = async (name) => {
  try {
    const dataApi = await axios.get(
      `https://api.rawg.io/api/games?key=${key}&search=${name}`
    );
    const { results } = dataApi.data;
    const arr = [];
    results.forEach(
      ({ id, name, background_image, platforms, genres, rating, released }) => {
        const plats = platforms.map(({ platform }) => platform.name);
        arr.push({
          id,
          name,
          background_image,
          platforms: plats,
          genres,
          rating,
          released,
        });
      }
    );

    if (!arr.length) return false;

    if (arr.length > 15) return arr.slice(0, 15);

    //const newArray = arr.slice(long, arr.length - 1);

    return arr;
  } catch (error) {
    if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
      // http.ClientRequest en node.js

      return [];
    }
  }
};

//consulta por id de la base de datos
exports.BDDataSeacrhId = async (idGamer) => {
  const dataBD = await Videogame.findByPk(idGamer, {
    include: [
      {
        model: Genres,
        attributes: ["id", "name"],
      },
    ],
  });
  return dataBD;
};

exports.videogameFindAll = async (obj) => {
  return Videogame.findAll(obj);
};

exports.addVideoGame = async (obj) => {
  const {
    name,
    description,
    platforms,
    genres,
    released,
    rating,
    background_image,
  } = obj;

  if (!name || !description || !platforms || !genres.length) {
    return "Debe de llenar todos los campos requeridos";
  }
  const s = [];
  await genres.forEach(async (name) => {
    const saveName = name.toLowerCase();
    const n = saveName.replace(/\b\w/g, (l) => l.toUpperCase());

    const d = await Genres.findOne({ where: { name: n } });

    if (!d) return false;

    s.push(d);
  });

  if (s) {
    const dateGame = await Videogame.create({
      name,
      background_image,
      description,
      platforms,
      released,
      rating,
    });

    await dateGame.addGenres(s);

    return true;
  } else {
    return "No se encontro el genero para asociar el videojuego";
  }
};
