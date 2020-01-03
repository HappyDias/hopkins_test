import React from 'react';
import WeatherIcon from 'react-icons-weather';

import beaufortVals from "../beaufort.json";

function HourWeather(props){
	const {type, value} = props;

	const displayVal = type === 0 ? Math.round((value.main.temp - 273.15)*100)/100 : Object.keys(beaufortVals).filter(key => {
		return value.wind.speed >= beaufortVals[key][0] && value.wind.speed < beaufortVals[key][1];
	})[0];
	const display = type === 0 ? `${displayVal} C` : `${displayVal} ${value.wind.speed}m/s`
	const date = new Date(value.dt * 1000);
	const hour = `${date.getHours()} h`

	return (
		<div style={{margin:"25px"}}>
			<div>
				{hour}
			</div>
			<div>
				{type === 0 ? <WeatherIcon name="owm" iconId={value.weather[0].id.toString()} style={{fontSize: "50px", padding: "10px"}}/> : null}
			</div>
			<div>
				{display}
			</div>
		</div>
	);
}

export default HourWeather