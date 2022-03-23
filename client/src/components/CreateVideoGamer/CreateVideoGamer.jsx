import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validateFromVideoGamer } from "../../controllers";
import {
  getAllFilterPlatforms,
  postCreateVideoGamer,
} from "../../redux/actions";
import Option from "../Nav/Option";
import Style from "../../css/modules/CreateVideoGamer.module.css";

export default function Form() {
  const dispatch = useDispatch();
  const url = "https://images4.alphacoders.com/937/thumb-350-937844.png";
  let bool = false;
  const Genres = useSelector((state) => state.dataAllGenders);
  const Platforms = useSelector((state) => state.dataAllPlatforms);
  const [errors, setErrors] = useState();
  const [data, setData] = useState({
    name: "",
    description: "",
    rating: "0",
    released: "",
    background_image: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getAllFilterPlatforms());
  }, [dispatch]);

  const handleSelect = (e) => {
    setData(() => {
      const newData = {
        ...data,
        [e.target.name]: [...new Set([...data[e.target.name], e.target.value])],
      };
      setErrors(validateFromVideoGamer(newData));
      return newData;
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const filterGen = data[e.target.name].filter((t) => t !== e.target.value);
    setData({
      ...data,
      [e.target.name]: filterGen,
    });
  };

  const handleChange = (e) => {
    setData((prev) => {
      const newData = { ...prev, [e.target.name]: e.target.value };
      setErrors(validateFromVideoGamer(newData));
      return newData;
    });
  };

  const handelOnClickData = (e) => {
    e.preventDefault();
    //setErrors(validateFromVideoGamer(data));
    if (!errors) {
      bool = true;
    } else {
      if (!errors || Object.keys(errors).length) {
        bool = true;
      } else {
        bool = false;
        postData();
      }
    }
  };

  const postData = () => {
    const background_imageDef = data.background_image || url;
    const dt = {
      ...data,
      background_image: background_imageDef,
      rating: parseInt(data.rating),
    };
    setData({
      name: "",
      description: "",
      rating: "0",
      released: "",
      background_image: "",
      genres: [],
      platforms: [],
    });
    alert("Videojuego agregado con exito");
    dispatch(postCreateVideoGamer(dt));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={Style.container}>
      <div className={Style.volver}>
        <Link to="/home/">
          <button>Volver</button>
        </Link>
      </div>

      <form className={Style.formulario} onSubmit={handleSubmit}>
        <div className={Style.formularioData}>
          <div>
            <label> Nombre*</label>
            <input
              className={Style.txtInp}
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>Imagen</label>
            <input
              className={Style.txtInp}
              type="text"
              name="background_image"
              value={data.background_image}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={Style.formularioDataFecha}>
            <label>Fecha de lanzamiento*</label>
            <input
              type="date"
              value={data.released}
              name="released"
              required={true}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={Style.formularioDataRan}>
            <label>rating*</label>
            <input
              type="number"
              value={data.rating}
              name="rating"
              min="0"
              max="5"
              required={true}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={Style.formularioDataSel}>
            <label>Genero/s*</label>
            <Option data={Genres} handleChange={handleSelect} name="genres" />

            <label>Plataforma/s*</label>
            <select onChange={handleSelect} name="platforms">
              <option value="All"> Todos </option>
              {Platforms &&
                Platforms.map((elm) => {
                  return <option value={elm}>{elm}</option>;
                })}
            </select>
          </div>

          <div>
            <label>Descripcion*</label>
            <textarea
              name="description"
              value={data.description}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <input
            className={Style.save}
            type="submit"
            onClick={handelOnClickData}
            value="Guardar videojuego"
          />
        </div>
        <div className={Style.selecion}>
          <div>
            <img
              alt="img-default"
              className={Style.imgSelec}
              src={data.background_image || url}
            />
          </div>
          <div>
            <p>Genero/s selecionado/s</p>
            <div className={Style.selecionDiv}>
              {[...new Set(data.genres)].map((t) => (
                <input
                  type="button"
                  key={t}
                  name="genres"
                  value={t}
                  onClick={handleDelete}
                />
              ))}
            </div>
          </div>

          <div>
            <p>Plataforma/s selecionada/s</p>
            <div className={Style.selecionDiv}>
              {[...new Set(data.platforms)].map((t) => (
                <input
                  type="button"
                  key={t}
                  name="platforms"
                  value={t}
                  onClick={handleDelete}
                />
              ))}
            </div>
          </div>
          <div className={Style.error}>
            {!errors && bool === false ? (
              <div></div>
            ) : (
              <Fragment>
                <span>Requisitos</span>
                <p>{errors.name}</p>
                <p>{errors.released}</p>
                <p>{errors.geners}</p>
                <p>{errors.platforms}</p>
                <p>{errors.description}</p>
              </Fragment>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
