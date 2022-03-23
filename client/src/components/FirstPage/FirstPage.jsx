import React from "react";
import { Link } from "react-router-dom";
import Style from "../../css/modules/FirstPage.module.css";
export default function FirstPage() {
  return (
    <div className={Style.containerFirstPage}>
      <h1>Bienvenidos a la pagina de videojuegos</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
