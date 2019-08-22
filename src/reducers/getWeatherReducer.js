import {GET_CITY_WEATHER} from "../actions/types";
import {RESET} from "../actions/types";

const filterResponse = (response) => {
    let dataArray = [{
        city: [],
        date: [],
        temperature: [],
        pressure:[],
        humidity: [],
        wind:[],
        description: [],
        main: [],

    }];
    let responseArray = [response];

    const getDate = (timestamp) => {
        // console.log("get date : "+ new Date(timestamp * 1000).toString().split(' ')[0])
        // return new Date(timestamp * 1000).toLocaleString().split(',')[0];
        return new Date(timestamp * 1000).toString();
    };
    
    responseArray.map((inputArrayItem) => {
        inputArrayItem.list.map((item) => {
            dataArray[0].city.push(inputArrayItem.city.name+', '+inputArrayItem.city.country);
            dataArray[0].date.push(getDate(item.dt));
            dataArray[0].temperature.push(item.temp.day);

            // console.log("in loop "+ JSON.stringify(item.weather[0].description));
            dataArray[0].pressure.push(item.pressure); //percentage
            dataArray[0].humidity.push(item.humidity); //percentage
            dataArray[0].wind.push(item.speed); //kmph
            dataArray[0].description.push(item.weather[0].description);
            dataArray[0].main.push(item.weather[0].main);
        });
    });
    console.log("dataarray : "+ JSON.stringify(dataArray))
    return dataArray;
};

const getWeatherReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CITY_WEATHER:
            state = Object.assign({}, ...filterResponse(action.payload));
            break;
        case RESET:
            state = [];
            break;
    }

    return state;
};


export default getWeatherReducer;