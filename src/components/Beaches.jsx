import { useState, useEffect } from "react";
//para que nos de los parámetros de la url
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import playas from "../data/playas.json";

const Beaches = () => {
  const [predictions, setPredictions] = useState([]);
  const [name, setName] = useState("");
  const [beachCode, setBeachCode] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      setBeachCode(id);
      const newName = playas.find((beach) => beach.ID_PLAYA == id).NOMBRE_PLAYA;
      setName(newName);
    }
  }, [id]);
  //id = 2007901; //Laida 4804801

  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZ2VhcmthYmFpYUBnbWFpbC5jb20iLCJqdGkiOiJhY2YyOTUzMy04MmVkLTQ4NWUtYWZjYi1jZDgzMGRmY2EwZDIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY4MzUzNTcwOCwidXNlcklkIjoiYWNmMjk1MzMtODJlZC00ODVlLWFmY2ItY2Q4MzBkZmNhMGQyIiwicm9sZSI6IiJ9.pYFtWr2xt7uw9x0f22RoP1cPiK9W-JGK7a2xyVw4WF8";

  useEffect(() => {
    if (!beachCode) return;
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
  }, [beachCode]);

  const getPredictions = (data) => {
    console.log(data);
    const newPredictions = data[0].prediccion.dia;
    setPredictions(newPredictions);
  };
  const goTo = (location) => {
    navigate(`/beach/${location}`);
  };
  return (
    <div className='prediction'>
      <h1>Predicciones de playas {name}</h1>
      <select
        onChange={(e) => goTo(e.target.value)}
        value={beachCode ? beachCode : ""}
      >
        {!beachCode && <option value=''>Selecciona una playa</option>}
        {playas
          .filter((beach) => beach.ID_PROVINCIA === 48)
          .map((beach) => (
            <option key={beach.ID_PLAYA} value={beach.ID_PLAYA.toString()}>
              {beach.NOMBRE_PLAYA}
            </option>
          ))}
      </select>
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
