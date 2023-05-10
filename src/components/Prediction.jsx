import { useState, useEffect } from "react";
//para que nos de los parámetros de la url
import { useParams, useNavigate } from "react-router-dom";
import codes from "../data/bizkaia.json";
import "./Prediction.css";

const Prediction = () => {
  //Si no tiene municipio, ponemos uno por defecto
  let { id } = useParams();
  const navigate = useNavigate();

  const [predictions, setPredictions] = useState([]);
  const [location, setLocation] = useState("");
  const [locationCode, setLocationCode] = useState(null);

  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZ2VhcmthYmFpYUBnbWFpbC5jb20iLCJqdGkiOiJhY2YyOTUzMy04MmVkLTQ4NWUtYWZjYi1jZDgzMGRmY2EwZDIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY4MzUzNTcwOCwidXNlcklkIjoiYWNmMjk1MzMtODJlZC00ODVlLWFmY2ItY2Q4MzBkZmNhMGQyIiwicm9sZSI6IiJ9.pYFtWr2xt7uw9x0f22RoP1cPiK9W-JGK7a2xyVw4WF8";

  useEffect(() => {
    if (id !== undefined) {
      setLocationCode(id);
      const name = codes.find(
        (code) => getCode(code.CPRO, code.CMUN) === id
      ).NOMBRE;
      setLocation(name);
    }
  }, [id]);

  useEffect(() => {
    if (!setLocationCode) return;
    console.log(codes);
    //primer fecth nos da la ruta y la metemos en el siguiente fetch que nos da los datos
    fetch(
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${locationCode}?api_key=${api_key}`
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
  }, [locationCode]);

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
  const getCode = (CPRO, CMUN) => {
    let result = CMUN.toString();
    while (result.length < 3) {
      result = "0" + result;
    }
    result = CPRO.toString() + result;
    return result;
  };
  const goTo = (location) => {
    navigate(`/prediction/${location}`);
  };
  return (
    <div className='prediction'>
      <h1>Predicciones{location}</h1>
      <select
        name='location'
        id='location'
        onChange={(e) => goTo(e.target.value)}
        value={locationCode ? locationCode : ""}
      >
        {!locationCode && <option value=''>Selecciona un municipio</option>}
        {codes.map((code, index) => (
          <option key={index} value={getCode(code.CPRO, code.CMUN)}>
            {code.NOMBRE}
          </option>
        ))}
      </select>
      {predictions.map((prediction, index) => (
        <article key={index}>
          <h1 className='location'>{location}</h1>
          <h2 className='fecha'>Fecha: {prediction.fecha.split("T")[0]}</h2>
          <h2 className='orto'>Orto: {prediction.orto}</h2>
          <h2 className='ocaso'>Ocaso: {prediction.ocaso}</h2>
          <ul>
            {getHourPredictions(prediction).map((hourPrediction) => (
              <li key={hourPrediction.hora}>
                <h3 className='hora'>Hora: {hourPrediction.hora}</h3>
                <h3 clasName='estadocielo'>
                  Estado del cielo:{hourPrediction.estadoCielo}
                </h3>
                <h3 className='temperatura'>
                  Temperatura:{hourPrediction.temperatura}
                </h3>
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
