import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Chooser(props){
  const {forecastType, setForecast} = props;
    
  return (
    <Select
	  value={forecastType}
	  onChange={setForecast}
	>
		<MenuItem value={0}>Temperature</MenuItem>
		<MenuItem value={1}>Wind</MenuItem>
	</Select>
  )
}

export default Chooser