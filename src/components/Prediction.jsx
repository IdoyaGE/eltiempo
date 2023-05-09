import { useState, useEffect } from "react";
//para que nos de los parámetros de la url
import { useParams } from "react-router-dom";
const Prediction = () => {
  //Si no tiene municipio, ponemos uno por defecto
  let { id } = useParams();
  if (id === undefined) {
    id = 48004;
  }
  const [predictions, setPredictions] = useState([]);
  const [location, setLocation] = useState([]);
  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZ2VhcmthYmFpYUBnbWFpbC5jb20iLCJqdGkiOiJhY2YyOTUzMy04MmVkLTQ4NWUtYWZjYi1jZDgzMGRmY2EwZDIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY4MzUzNTcwOCwidXNlcklkIjoiYWNmMjk1MzMtODJlZC00ODVlLWFmY2ItY2Q4MzBkZmNhMGQyIiwicm9sZSI6IiJ9.pYFtWr2xt7uw9x0f22RoP1cPiK9W-JGK7a2xyVw4WF8";
  useEffect(() => {
    //primer fecth nos da la ruta y la metemos en el siguiente fetch que nos da los datos
    fetch(
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${id}?api_key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data); para conseguir la URL
        fetch(data.datos)
          .then((response) => response.json())
          .then((data) => getPredictions(data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  const getPredictions = (data) => {
    const newPredictions = data[0].prediccion.dia;
    setPredictions(newPredictions);
    //para el municipio
    setLocation(data[0].nombre);
    console.log(newPredictions);
  };
  //Buscamos en predicciones para cada periodo, si existe el elemento lo añadimos al array y si no no se añade
  const getHourPredictions = (prediction) => {
    let result = [];
    for (let i = 0; i < 24; i++) {
      const estadoCielo = prediction.estadoCielo.find(
        (element) => element.periodo == i
      );
      const temperatura = prediction.temperatura.find(
        (element) => element.periodo == i
      );
      const hourPrediction = {
        hora: i,
        estadoCielo: estadoCielo ? estadoCielo.descripcion : "no hay datos",
        temperatura: temperatura ? temperatura.value : "no hay datos",
      };
      if (estadoCielo || temperatura) result.push(hourPrediction);
    }
    return result;
  };
  return (
    <div className='prediction'>
      <h1>Predicciones {location}</h1>
      {predictions.map((prediction, index) => (
        <article key={index}>
          <h1>{location}</h1>
          <h2>fecha: {prediction.fecha.split("T")[0]}</h2>
          <h2>orto: {prediction.orto}</h2>
          <h2>ocaso: {prediction.ocaso}</h2>
          <ul>
            {getHourPredictions(prediction).map((hourPrediction) => (
              <li key={hourPrediction.hora}>
                <h3>hora: {hourPrediction.hora}</h3>
                <h3>estadoCielo:{hourPrediction.estadoCielo}</h3>
                <h3>temperatura:{hourPrediction.temperatura}</h3>
              </li>
            ))}
          </ul>
        </article>
      ))}
      ;
    </div>
  );
};

export default Prediction;
