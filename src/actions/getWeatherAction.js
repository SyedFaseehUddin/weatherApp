import axios from 'axios';
import {
    GET_CITY_WEATHER,
    GET_GEO_CITY_WEATHER,
    RESET
} from "./types";

const API_KEY = 'db778a0e5b529c3ed01d9da447eb0fb8';

export const getCityWeather = (city) => {
    const SITE_API = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${API_KEY}&units=metric`;

    return (dispatch) => {
        axios.get(SITE_API)
            .then(response => {
                dispatch({
                    type: GET_CITY_WEATHER,
                    payload: response.data
                });
            })
            .catch((error) => {
                // console.log(error);
            })
    }
};
export const getGeoCityWeather = (lat, lon) => {
    const SITE_API = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    return (dispatch) => {
        axios.get(SITE_API)
            .then(response => {
                dispatch({
                    type: GET_GEO_CITY_WEATHER,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
};

export const resetStore = () => {
    return (dispatch) => {
        dispatch({
            type: RESET
        });
    }
};

