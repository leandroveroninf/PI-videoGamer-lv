import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideoGamer,
  getFilterASC_DES,
  getFilterMAX_MIN,
} from "../../redux/actions";
import Cards from "../Cards/Cards";
import Paginado from "./Paginado";
import Style from "../../css/modules/Home.module.css";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";

export default function Home() {
  const dataAll = useSelector((state) => state.dataAll);
  const errorCon = useSelector((state) => state.errorCon);

  const dispatch = useDispatch();
  const [_order, setOrder] = useState("");
  const [_max_min, setMax_min] = useState("");
  const [paginas, setPaginas] = useState(1);
  const [NumeroDeGames, _setNumeroDeGames] = useState(15);
  const indexOfLasGames = paginas * NumeroDeGames;
  const indexOfFristGames = indexOfLasGames - NumeroDeGames;
  const currentGame = dataAll.slice(indexOfFristGames, indexOfLasGames);

  const pages = (pageNumber) => {
    setPaginas(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllVideoGamer());
  }, [dispatch]);

  function handleChangeASC(e) {
    const value = e.target.value;

    dispatch(getFilterASC_DES(value));
    setPaginas(1);
    setOrder(value);
  }

  function handleChangeMAX_MIN(e) {
    const value = e.target.value;

    dispatch(getFilterMAX_MIN(value));
    setPaginas(1);
    setMax_min(value);
  }

  const selec = () => {
    return (
      <React.Fragment>
        <div className={Style.containerNav}>
          <div className={Style.containerSelec}>
            <label>Ordenar ASD-DES</label>
            {
              <select onChange={(e) => handleChangeASC(e)}>
                <option key={1} value="asc">
                  {" "}
                  Acendente{" "}
                </option>
                <option key={2} value="des">
                  {" "}
                  Desendente{" "}
                </option>
              </select>
            }
          </div>
          <div className={Style.containerSelec}>
            <label>Ordenar por Calificacion</label>
            {
              <select onChange={(e) => handleChangeMAX_MIN(e)}>
                <option value="All"> Todos </option>
                <option key={1} value="max-min">
                  {" "}
                  MAX-MIN{" "}
                </option>
                <option key={2} value="min-max">
                  {" "}
                  MIN-MAX{" "}
                </option>
              </select>
            }
          </div>
          <Nav />
          <Link to="/home/addVideoGame">
            <button>Agregar video juego</button>
          </Link>
          <div className={Style.containerCreate}></div>
        </div>

        <Search />
      </React.Fragment>
    );
  };

  const data = () => {
    if (!errorCon) {
      return !dataAll.length ? (
        <React.Fragment>
          <img
            alt="img-loading"
            className={Style.loading}
            src="https://i.pinimg.com/originals/3d/e0/b1/3de0b1c2cd036a5112ac231af2c5b7c6.gif"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {selec()}
          <div className={Style.page}>
            <p> {paginas} </p>
          </div>
          <Paginado
            pages={pages}
            allGame={dataAll.length}
            Gamespage={NumeroDeGames}
          />
          <div className={Style.cards}>
            {dataAll[0] === 1 ? (
              <div className={Style.noEncontrado}>
                <p>No se encontraron los videojuegos</p>
              </div>
            ) : (
              currentGame &&
              currentGame.map(
                ({ id, name, rating, released, background_image, genres, platforms }) => {
                  return (
                    <Cards
                      key={id}
                      id={id}
                      name={name}
                      rating={rating}
                      released={released}
                      background_image={background_image}
                      genres={genres}
                      plat = {platforms}
                    />
                  );
                }
              )
            )}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className={Style.containerError}>
          <div className={Style.errorCon}>
            <h1>Error de conexion</h1>
          </div>
        </div>
      );
    }
  };

  return <React.Fragment>{data()}</React.Fragment>;
}
