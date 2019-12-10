import React, { Component , Fragment } from 'react';
import { getCityWeather, getGeoCityWeather} from "../actions/getWeatherAction";
import { connect } from "react-redux";
import PropTypes from  "prop-types";
import { Sun, MapPin , Cloud, CloudRain, CloudSnow } from 'react-feather';
import Error from './Error';
import OfflinePage from './OfflinePage';
import Axios from 'axios';

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'Hyderabad',
        };
    }
    
    componentDidMount() {
        Axios.get("http://www.geoplugin.net/json.gp")
        .then(json => {
          this.setState({
            inputValue: json.data.geoplugin_city
          },()=> {
            this.props.getCityWeather(this.state.inputValue)
          })
        })
        this.handleConnectionChange();
        window.addEventListener('online', this.handleConnectionChange);
        window.addEventListener('offline', this.handleConnectionChange);
      }
  
      componentWillUnmount() {
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
      }
  
  
      handleConnectionChange = () => {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
          const webPing = setInterval(
            () => {
              fetch('//google.com', {
                mode: 'no-cors',
                })
              .then(() => {
                this.setState({ isDisconnected: false }, () => {
                  return clearInterval(webPing)
                });
              }).catch(() => this.setState({ isDisconnected: true }) )
            }, 2000);
          return;
        }
  
        return this.setState({ isDisconnected: true });
      }
  
    getCoords() {
        if (window.navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(this.success, this.geoError)
        }
       }
    success = (position) => {
        this.props.getGeoCityWeather(position.coords.latitude, position.coords.longitude)
        this.setState({
            inputValue: ""
        })
    }
    geoError = (err) => {
        this.setState({
            error: err
        })
        setTimeout(() => {
            this.props.getCityWeather(this.state.inputValue)
        }, 2000);
    }
    onInputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.getCityWeather(this.state.inputValue)
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }

    renderSwitch = (param) => {
        switch(param) {
          case 'Mon':
            return 'Monday';
          case 'Tue':
            return 'Tuesday';
          case 'Wed':
            return 'Wednesday';
          case 'Thu':
            return 'Thursday';
          case 'Fri':
            return 'Friday';
          case 'Sat':
            return 'Saturday';
          case 'Sun':
            return 'Sunday';
          default:
            return 'ERROR';
        }
      }

    render() {
        
    const { isDisconnected } = this.state;
    const {city , date , temperature, pressure, humidity, wind, description , main } = this.props.weather;

        return (
            <Fragment>
                { !isDisconnected ? (
                    <>
                    {wind ? (
                    <div className="container">
                    <div className="weather-side">
                        <div className="weather-gradient"></div>
                        <div className="date-container">
                        <h2 className="date-dayname">
                            {this.renderSwitch(date[0].split(' ')[0])}
                        </h2>
                        <span className="date-day">{date[0].split(' ')[2] + " " + date[0].split(' ')[1] + " " + date[0].split(' ')[3]}</span>
                        <div className="tooltip"><i className="location-icon"><MapPin onClick={()=>{this.getCoords()}} size="15"/></i>
                          <span className="tooltiptext">Get Geo location</span>
                        </div>
                        <span className="location">{city[0]}</span>
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
                            <input type="text" placeholder="Enter city name" value={this.state.inputValue} onChange={this.onInputChange}></input>
                            <button className="location-button" onClick={this.onFormSubmit}> <MapPin size="12" /> <span>Change location</span></button>
                        </form>
                    </div>
                    </div>
                ) : (
                    <>
                    {!this.state.error ? (
                        <div style={{ fontSize: '24px' ,color: "white", fontWeight: '900px' }}> Loading.... </div>
                    ) : (
                        <div className="alert">
                        <p> <strong>Error occured while getting your location</strong> </p>
                        {this.state.error.message}
                      </div>
                    )}
                    </>
                ) } 
                    </>
                ) : (
                    <OfflinePage />
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
    getGeoCityWeather: PropTypes.func.isRequired,
  });

export default connect(
    mapStateToProps,
    { getCityWeather, getGeoCityWeather })(Main);