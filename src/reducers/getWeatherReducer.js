import {GET_CITY_WEATHER} from "../actions/types";
import {RESET} from "../actions/types";

const filterResponse = (response) => {
    let dataArray = [{
        city: [],
        date: [],
        temperature: [],
    }];
    let responseArray = [response];

    const getDate = (timestamp) => {
        console.log("get date : "+ new Date(timestamp * 1000).toString().split(' ')[0])
        return new Date(timestamp * 1000).toLocaleString().split(',')[0];
    };
    
    responseArray.map((inputArrayItem) => {
        inputArrayItem.list.map((item) => {
            dataArray[0].city.push(inputArrayItem.city.name);
            dataArray[0].date.push(getDate(item.dt));
            dataArray[0].temperature.push(item.temp.day);
        });
    });
    // console.log("dataarray : "+ JSON.stringify(dataArray))
    return dataArray;
};

export default getWeatherReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CITY_WEATHER:
            state = [ Object.assign({}, ...filterResponse(action.payload))];
            break;
        case RESET:
            state = [];
            break;
    }

    return state;
};