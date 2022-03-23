import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideoGamerID, resetId } from "../../redux/actions";
import Style from "../../css/modules/Detalles.module.css";

export default function Detalles() {
  const dataID = useSelector((state) => state.dataID);
  const errorCon = useSelector((state) => state.errorCon);
  const [visible, setVisible] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoGamerID(id));
  }, [dispatch, id]);

  const data = () => {
    if (!errorCon) {
      return !dataID ? (
        <div>
          <img
            alt="img-loading"
            className={Style.loading}
            src="https://i.pinimg.com/originals/3d/e0/b1/3de0b1c2cd036a5112ac231af2c5b7c6.gif"
          />
        </div>
      ) : (
        <React.Fragment>
          <div className={Style.volver}>
            <Link to="/home/">
              <button onClick={() => dispatch(resetId())}>Volver</button>
            </Link>
          </div>
          <div className={Style.container}>
            <h1>{dataID.name}</h1>
            <div className={Style.containerData}>
              <div className={Style.containerImg}>
                <img alt={`img-${dataID.name}`} src={dataID.background_image} />
              </div>

              <div className={Style.data}>
                <p>
                  <span>Fecha lanzamiento: </span> {dataID.released}
                </p>

                <p>
                  <span>Ranquing: </span> {dataID.rating}
                </p>
                <p>
                  <span>Genero/s: </span>
                  {dataID.genres
                    ? dataID.genres.map((elm) => ` ${elm.name},`)
                    : "no tiene genero/s"}
                </p>

                <p>
                  <span>Plataforma/s: </span>
                  {dataID.platforms
                    ? dataID.platforms.map((elm) => ` ${elm},`)
                    : "no tiene plataforma/s"}
                </p>
              </div>
            </div>
            <span>Descripcion:</span>
            <p className={Style.description}>{dataID.description}</p>
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

  return <div className={Style.fondo}>{data()}</div>;
}
