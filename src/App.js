import React from 'react';
import Titles from './Components/Titles.js';
import Form from './Components/Form.js';
import Weather from './Components/Weather.js';

const API_KEY = 'aa4f800705f2b4e2a9018a34207451d4';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: 'Please Enter the Values'
  }
  getWeather = async (e) =>{
    //prevent auto-refresh of component event
    e.preventDefault(); 
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && country) {
      console.log(data);
      this.setState({
      //Checked console to get the following
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ''
    })
    }
  };
  render(){
    return(
        <div>
          <Titles />
          <Form getWeather={this.getWeather}/>
          <Weather 
            temperature = {this.state.temperature}
            city = {this.state.city}
            country = {this.state.country}
            humidity = {this.state.humidity}  
            description = {this.state.description}
            error = {this.state.error}
          />
        </div>
    );
  }
};

export default App;
