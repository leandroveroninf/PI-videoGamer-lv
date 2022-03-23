//validar formulario
export const validateFromVideoGamer = (obj) => {
  const msj = (msj) => `${msj}, es un campo requerido.`;

  let error = {};
  if (!obj.name) error.name = msj("El 'Nombre'");
  if (!obj.description) error.description = msj("La 'Descripcion'");
  if (obj.description && obj.description.length < 10) {
    error.description = "La descripcion tiene que ser minimo de 10 caracteres.";
  }
  if (!obj.released) error.released = msj("La 'Fecha de lanzamiento'");
  if (obj.genres.length === 0) error.geners = msj("El/Los 'Generos'");
  if (obj.platforms.length === 0) error.platforms = msj("La/s 'Plataformas'");
  return error;
};

//filtrar los nombres de los generos, segun la opcion
export const fillGenders = (gendres, opc) => {
  const dt = gendres.filter(
    ({ name }) => name.toLowerCase() === opc.toLowerCase()
  );
  return dt.length ? true : false;
};

//oredenar de menor a mayor por ranquing
export const orederMinMaxRanting = (a, b) => {
  if (a.rating > b.rating) return 1;
  if (b.rating > a.rating) return -1;
  return 0;
};

//ordenar de mayor a menor por ranquing
export const orederMaxMinRanting = (a, b) => {
  if (a.rating > b.rating) return -1;
  if (b.rating > a.rating) return 1;
  return 0;
};

//ordenar asendentes por nombre
export const orderAscName = (a, b) => {
  if (a.name > b.name) return 1;
  if (b.name > a.name) return -1;
  return 0;
};

//ordernar desendentes por nombre
export const orderDesName = (a, b) => {
  if (a.name > b.name) return -1;
  if (b.name > a.name) return 1;
  return 0;
};
