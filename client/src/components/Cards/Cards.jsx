import React from "react";
import { Link } from "react-router-dom";
import Style from "../../css/modules/Cards.module.css";

export default function Cards({
  id,
  name,
  rating,
  released,
  background_image,
  genres,
  plat,
}) {
  const colorRating = (num) => {
    if (num >= 4) return Style.green;
    if (num < 4 && num > 2) return Style.yelow;
    return Style.red;
  };

  return (
    <Link to={`/home/${id}`}>
      <div kei={id} className={Style.card}>
        <div className={Style.cardimg}>
          <img src={background_image} alt={`img-${name}`} />
        </div>
        <div className={Style.data}>
          <p className={Style.dataName}>{name}</p>

          <div className={Style.dataDet}>
            <span>Rating</span>
            <p className={colorRating(rating)}>{rating}</p>
          </div>
          <div className={Style.dataDet}>
            <span>Fecha lanz.</span>
            <p>{released}</p>
          </div>
        </div>
        <div className={Style.dataVideGamer}>
          <p>Generos</p>
          <div className={Style.data_genres}>
            {genres ? (
              genres.map((elm) => {
                return <span key={elm.id}>{elm.name}</span>;
              })
            ) : (
              <p>no tiene generos</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
