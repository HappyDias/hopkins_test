import React from 'react';
import WeatherIcon from 'react-icons-weather';

import beaufortVals from "../beaufort.json";

function RightNow(props){
  const {listItem, location} = props;
  const icon = listItem ? listItem.weather[0].id : null;
  const url = icon ? `http://openweathermap.org/img/w/${icon}.png` : null;
  const temp = listItem ? Math.round((listItem.main.temp -273.15)*100)/100 : null;
  const windStr =listItem ?  Object.keys(beaufortVals).filter(key => {
    return listItem.wind.speed >= beaufortVals[key][0] && listItem.wind.speed < beaufortVals[key][1];
  })[0] : null;
  const windVal = listItem ? listItem.wind.speed : null;

  return !url ? null:  (
  	<div>
  		<div> Current Weather </div>
  		<WeatherIcon name="owm" iconId={icon.toString()} style={{fontSize: "150px", padding: "50px"}} />
  		<div> Temperature: {`${temp} C`} </div>
  		<div> Wind: {`${windStr} (${windVal}m/s)`} </div>
  		<div> Location: {location} </div>
  	</div>
  );
}

export default RightNow