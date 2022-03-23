import React from "react";
import Style from "../../css/modules/Paginado.module.css";

export default function Paginado({ allGame, Gamespage, pages }) {
  const pg = [];

  for (let i = 1; i <= Math.ceil(allGame / Gamespage); i++) {
    pg.push(i);
  }

  return (
    <nav className={Style.navPag}>
      <ul className={Style.ulPag}>
        {pg &&
          pg.map((elm) => {
            return (
              <ol key={elm} className={Style.olPag} onClick={() => pages(elm)}>
                {elm}
              </ol>
            );
          })}
      </ul>
    </nav>
  );
}
