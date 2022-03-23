import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "../../css/modules/Home.module.css";
import {
  getAllFilterAPI_CREATE,
  getAllGenders,
  getFilterGenders,
  getResetVideogamer,
} from "../../redux/actions";

export default function Nav() {
  const dispatch = useDispatch();
  const dataGendres = useSelector((state) => state.dataAllGenders);

  useEffect(() => {
    dispatch(getAllGenders());
  }, [dispatch]);

  const handelOnClick = (e) => {
    const value = e.target.value;
    dispatch(getAllFilterAPI_CREATE(value));
  };
  function handleChange(e) {
    const value = e.target.value;
    console.log("handleChange-generos: ", value);

    dispatch(getFilterGenders(value));
  }

  function heandleClick(_e) {
    dispatch(getResetVideogamer());
  }

  return (
    <Fragment>
      <div className={Style.containerSelec}>
        <label>Ordenar por genero</label>

        <select className={Style.selcetOpt} onChange={(e) => handleChange(e)}>
          <option value="All"> Todos </option>
          {dataGendres &&
            dataGendres.map((elm) => {
              return (
                <option key={elm.id} value={elm.name}>
                  {elm.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className={Style.containerSelec}>
        <label>Mostrar Credos - API</label>
        {
          <select onChange={(e) => handelOnClick(e)}>
            <option value="All"> Todos </option>
            <option key={1} value="creados">
              Creados
            </option>
            <option key={2} value="api">
              API
            </option>
          </select>
        }
      </div>
      <div>
        <button className={Style.buttonReset} onClick={heandleClick}>
          Reset
        </button>
      </div>
    </Fragment>
  );
}
