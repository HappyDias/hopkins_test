import React from 'react';
import './App.css';

import Chooser from './components/Chooser.jsx';
import Forecast from './components/Forecast.jsx';

function App() {
  
  function reducer(oldState, newState){
    return {...oldState, ...newState};
  }
  
  const startState = {
    forecastType: 0,
    forecast : null,
    loading: false,
    lastRequest: null
  };
  
  const [state, setState] = React.useReducer(reducer, startState);
  const setForecast = (ev) => {
    setState({forecastType: ev.target.value});
  };
  const chooserProps = {forecastType: state.forecastType, setForecast: setForecast};
  const forecastProps = {forecastType: state.forecastType,forecast: state.forecast, loading: state.loading};
  
  React.useEffect(
    () => {
      const currentTime = new Date();
      const {lastRequest} = state;
      const difference = lastRequest ? currentTime.getMinutes() !== lastRequest.getMinutes() : true;
      const url = "data/2.5/forecast/hourly?q=Berlin,de&appid=b6907d289e10d714a6e88b30761fae22"
      
      async function request(url) {
        let request = null;
        let response = null;
        
        setState({loading: true});
        try{
          request = await fetch(url);
        
          if(request.status !== 200){
            response = null;
            console.log("DONT GOT IT", request.status);
          }
          else{
            response = await request.json();
            console.log("GOT IT", request.status);
          }
        }
        catch(e){
          console.log("GOT ERROR", e);
        }
        setState({forecast: response, loading: false, lastRequest: new Date()});
      }
      
      if(difference){
        request(url);
      }
    },
    [state.forecastType]
  );
  
  return (
    <div className="app">
      <Chooser {...chooserProps}/>
      <Forecast {...forecastProps}/>
    </div>
  );
}

export default App;
