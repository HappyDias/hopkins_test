import React from 'react';
import RightNow from "./Now.jsx"
import DayGraph from "./DayGraph.jsx"

function Forecast(props){
  const { forecastType, forecast, loading } = props;
  const goodStr = forecast ? "FORECAST" : "THERE WAS AN ERROR";
  const string = loading ? "LOADING" : goodStr;
  const rightnowProps = {
  	location: forecast ? `${forecast.city.name}, ${forecast.city.country}` : null, 
  	listItem: forecast ? forecast.list[0] : null
  };
  const daygraphProps = {
  	list: forecast ? forecast.list : [],
  	type: forecastType
  };

  return loading ? <div>Loading</div> : (
    <div className="forecast">
      <RightNow {...rightnowProps}/>
      <DayGraph {...daygraphProps}/>
    </div>
  )
}

export default Forecast;