import { useEffect, useReducer, useState } from "react";
import axios from "axios";

// data from onecall api
export const mapCurrent = (data) => {
  return {
    description: data.current.weather[0]
      ? data.current.weather[0].description
      : null,
    icon: data.current.weather[0].icon,
    temperature: {
      current: data.current.temp.toFixed(0),
      min: undefined, // openweather doesnt provide min/max on current weather
      max: undefined,
    },
    wind: data.current.wind_speed.toFixed(0),
    humidity: data.current.humidity,
    place: data.timezone,
  };
};

// data from weather api
// export const mapCurrent = (data) => {
//     return {
//       description: data.weather[0] ? data.weather[0].description : null,
//       icon: data.weather[0].icon,
//       temperature: {
//         current: data.main.temp.toFixed(0),
//         min: data.main.temp_min, // openweather doesnt provide min/max on current weather
//         max: data.main.temp_max,
//       },
//       wind: data.wind.speed.toFixed(0),
//       humidity: data.main.humidity,
//       place:data.name
//     };
//   };

export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

const initialState = {
  data: null,
  errorMessage: null,
};

export const fetchReducer = (state, { type, payload }) => {
  switch (type) {
    case SUCCESS:
      return {
        data: payload,
        errorMessage: null,
      };
    case FAILURE:
      return { data: null, errorMessage: payload };
    default:
      return state;
  }
};

const useOpenWeather = (options) => {
  //const endpoint = '//api.openweathermap.org/data/2.5/weather';
  const endpoint = "//api.openweathermap.org/data/2.5/onecall";
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { data, errorMessage } = state;
  const [isLoading, setIsLoading] = useState(false);
  const { unit, lang, key, lon, lat } = options;
  const params = {
    appid: key,
    lang,
    units: unit,
    lat: lat,
    lon: lon,
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const axiosResponse = await axios.get(endpoint, { params });
      const payload = mapCurrent(axiosResponse.data, lang);

      dispatch({
        type: SUCCESS,
        payload,
      });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: FAILURE, payload: error.message || error });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [lon, lat]);
  return { data, isLoading, errorMessage, fetchData };
};

export default useOpenWeather;
