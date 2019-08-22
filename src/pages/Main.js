import React, { Component , Fragment } from 'react';
import { getCityWeather} from "../actions/getWeatherAction";
import { connect } from "react-redux";
import PropTypes from  "prop-types";
import { Sun, MapPin , Cloud, CloudRain, CloudSnow } from 'react-feather';

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'Bangalore',
        };
    }

    componentDidMount(){
        this.props.getCityWeather(this.state.inputValue);
    }

    onInputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
        this.props.getCityWeather(this.state.inputValue)
    }

    render() {
        
    const {city , date , temperature, pressure, humidity, wind, description , main } = this.props.weather;
    
    if(date){
        console.log("day : "+ JSON.stringify(date[0].split(' ')[0]) + "Date : " + date[0].split(' ')[2] + " " + date[0].split(' ')[1] + " " + date[0].split(' ')[3] )
    }
    if( city ) {
        console.log("city "+ JSON.stringify(city[0]))
    }
        
        return (
            <Fragment>
                {wind ? (
                    <div className="container">
                        {/* <div dangerouslySetInnerHTML={{__html:window.feather.icons.sun.toSvg()}} /> */}
                    <div className="weather-side">
                        <div className="weather-gradient"></div>
                        <div className="date-container">
                        <h2 className="date-dayname">{date[0].split(' ')[0]}</h2><span className="date-day">{date[0].split(' ')[2] + " " + date[0].split(' ')[1] + " " + date[0].split(' ')[3]}</span><i className="location-icon"><MapPin size="15"/></i><span className="location">{city[0]}</span>
                        </div>
                        <div className="weather-container">
                            {
                                main[0]==="Rain" ? (
                                    <CloudRain size='50'/>
                                ) : (
                                    <Fragment>
                                                {
                                                    main[0]==="Snow" ? (
                                                        <CloudSnow size='50'/>
                                                    ) : (
                                                        <Cloud size='50'/>
                                                    )
                                                }
                                    </Fragment>
                                )
                            }
                        <h1 className="weather-temp">{Math.round(temperature[0])}°C</h1>
                        <h3 className="weather-desc">{description[0]}</h3>
                        </div>
                    </div>
                    <div className="info-side">
                        <div className="today-info-container">
                        <div className="today-info">
                            <div className="precipitation"> <span className="title">PRESSURE</span><span className="value">{Math.round(pressure[0])} hpa</span>
                            <div className="clear"></div>
                            </div>
                            <div className="humidity"> <span className="title">HUMIDITY</span><span className="value">{humidity[0]} %</span>
                            <div className="clear"></div>
                            </div>
                            <div className="wind"> <span className="title">WIND</span><span className="value">{wind[0]} m/s</span>
                            <div className="clear"></div>
                            </div>
                        </div>
                        </div>
                        <div className="week-container">
                        <ul className="week-list">
                            {temperature.map((a, idx) => {
                                return(
                                <li key={idx}>
                                    {
                                        main[0]==="Rain" ? (
                                            <CloudRain/>
                                        ) : (
                                            <Fragment>
                                                {
                                                    main[0]==="Snow" ? (
                                                        <CloudSnow/>
                                                    ) : (
                                                        <Cloud/>
                                                    )
                                                }
                                            </Fragment>
                                        )
                                    }
                                    <span className="day-name">{date[idx].split(' ')[0]}</span><span className="day-temp">{Math.round(temperature[idx])}°C</span></li>
                                );
                            })}
                           <div className="clear"></div>
                        </ul>
                        </div>
                        <form className="location-container">
                            <input type="text" placeholder="Enter city name..." value={this.state.inputValue} onChange={this.onInputChange}></input>
                            <button className="location-button" onClick={this.onFormSubmit}> <MapPin size="12" /> <span>Change location</span></button>
                        </form>
                    </div>
                    </div>
                ) : (
                    <div> Loading </div>
                ) } 
            
            </Fragment>
        )
  }
}


Main.propTypes = {
    getCityWeather: PropTypes.func.isRequired,
    weather: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    weather: state.weather,  
    getCityWeather: PropTypes.func.isRequired,
  });

export default connect(
    mapStateToProps,
    { getCityWeather })(Main);