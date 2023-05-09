import { useState, useEffect } from "react";
//para que nos de los parámetros de la url
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Beaches = () => {
  const [predictions, setPredictions] = useState([]);
  const [name, setName] = useState("");

  let { id } = useParams();
  if (id === undefined) {
    id = 2007901; //Laida 4804801
  }
  console.log(id);

  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZ2VhcmthYmFpYUBnbWFpbC5jb20iLCJqdGkiOiJhY2YyOTUzMy04MmVkLTQ4NWUtYWZjYi1jZDgzMGRmY2EwZDIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY4MzUzNTcwOCwidXNlcklkIjoiYWNmMjk1MzMtODJlZC00ODVlLWFmY2ItY2Q4MzBkZmNhMGQyIiwicm9sZSI6IiJ9.pYFtWr2xt7uw9x0f22RoP1cPiK9W-JGK7a2xyVw4WF8";

  useEffect(() => {
    //primer fecth nos da la ruta y la metemos en el siguiente fetch que nos da los datos
    fetch(
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/${id}?api_key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        fetch(data.datos)
          .then((response) => response.json())
          .then((data) => getPredictions(data));
      })
      .catch((error) => console.log(error));
  }, [id]);

  const getPredictions = (data) => {
    console.log(data);
    const newPredictions = data[0].prediccion.dia;
    setPredictions(newPredictions);
    setName(data[0].nombre);
  };
  return (
    <div className='prediction'>
      <h1>Predicciones de playas {name}</h1>
      <Link to='/'>Home</Link>
      {predictions.map((prediction, index) => (
        <article key={index}>
          <h2>Fecha: {prediction.fecha}</h2>
          <p>Temperatura del agua: {prediction.tAgua.valor1}</p>
          <p>Sensación térmica: {prediction.sTermica.descripcion}</p>
          <p>
            Oleaje:
            <span> Mañana: {prediction.oleaje.descripcion1}</span>
            <span>Tarde: {prediction.oleaje.descripcion2}</span>
          </p>
          <p>
            Viento:
            <span>Mañana:{prediction.viento.descripcion1}</span>
            <span>Tarde:{prediction.viento.descripcion2}</span>
          </p>
          <p>
            Estado del cielo:
            <span>Mañana:{prediction.estadoCielo.descripcion1}</span>
            <span>Tarde:{prediction.estadoCielo.descripcion2}</span>
          </p>
        </article>
      ))}
      ;
    </div>
  );
};
export default Beaches;
