import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllVideoGamer, getSearchName } from "../../redux/actions";
import Style from "../../css/modules/Search.module.css";

export default function Search() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handelOnChange = (e) => {
    setName(e.target.value);
  };

  const handelOnClick = () => {
    if (!name) {
      dispatch(getAllVideoGamer());
    } else {
      console.log(name);
      dispatch(getSearchName(name));
      setName("");
    }
  };

  return (
    <div className={Style.containerSearch}>
      <input
        onChange={handelOnChange}
        placeholder="Buscar video Juegos"
        type="text"
        name="searchVideoGamer"
        value={name}
      />
      <button onClick={handelOnClick}>Buscar</button>
    </div>
  );
}
