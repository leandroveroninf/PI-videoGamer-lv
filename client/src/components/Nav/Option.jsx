import React, { Fragment } from "react";
import Style from "../../css/modules/Nav.module.css";

export default function Option({ data, handleChange, name }) {
  return (
    <Fragment>
      <select
        className={Style.selcetOpt}
        onChange={(e) => handleChange(e)}
        name={name}
      >
        <option value="All"> Todos </option>
        {data &&
          data.map((elm) => {
            return (
              <option key={elm.id} value={elm.name}>
                {elm.name}
              </option>
            );
          })}
      </select>
    </Fragment>
  );
}
