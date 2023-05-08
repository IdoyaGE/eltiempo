import { useState, useEffect } from "react";

const Prediction = () => {
  const [predictions, setPredictions] = useState([]);
  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZ2VhcmthYmFpYUBnbWFpbC5jb20iLCJqdGkiOiJhY2YyOTUzMy04MmVkLTQ4NWUtYWZjYi1jZDgzMGRmY2EwZDIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY4MzUzNTcwOCwidXNlcklkIjoiYWNmMjk1MzMtODJlZC00ODVlLWFmY2ItY2Q4MzBkZmNhMGQyIiwicm9sZSI6IiJ9.pYFtWr2xt7uw9x0f22RoP1cPiK9W-JGK7a2xyVw4WF8";
  useEffect(() => {
    //primer fecth nos da la ruta y la metemos en el siguiente fetch que nos da los datos
    fetch(
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/48004?api_key=${api_key}`
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
    console.log(newPredictions);
  };
  return (
    <div className='prediction'>
      <h1>Predicciones</h1>
      {predictions.map((prediction, index) => (
        <article key={index}>
          <h2>{prediction.fecha}</h2>
          <h2>{prediction.orto}</h2>
          <h2>{prediction.ocaso}</h2>
        </article>
      ))}
      ;
    </div>
  );
};

export default Prediction;
