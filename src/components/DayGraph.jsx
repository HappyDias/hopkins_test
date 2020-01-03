import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import HourWeather from "./HourWeather.jsx"

function DayGraph(props){
  const {list, type} = props;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = list.length > 0 ? new Date(list[0].dt * 1000) : new Date();
  const nowDay = now.getDate();
  const nowMonth = months[now.getMonth()];
  const todayKey = `${nowMonth} ${nowDay}`;

  const byDay = {};

  list.forEach(item => {
  	const date = new Date(item.dt * 1000);
  	const day = date.getDate();
  	const month = months[date.getMonth()];
  	const key = `${month} ${day}` === todayKey ? "Today" : `${month} ${day}`;
  	let toPush = null
  	
  	if(!(key in byDay)){
  		byDay[key] = [];
  	}
	byDay[key].push(item);

  });

  return !list ? null : (
  	<div style={{width:"100%"}}>
  		Hourly forecast
  		{Object.keys(byDay).map(key => {

  			const hourweathers = byDay[key].map(obj => {
  				const hourweatherProps = {
  					type,
  					value: obj,
  					key: obj.dt
  				};

  				return <HourWeather {...hourweatherProps}/>
  			});

  			return (
  				<ExpansionPanel key={key}>
			        <ExpansionPanelSummary
			          aria-controls="panel1a-content"
			          id="panel1a-header"
			        >
			          {key}
			        </ExpansionPanelSummary>
			        <ExpansionPanelDetails style={{"maxWidth":"100%", overflow:"auto"}}>
			          {hourweathers}
			        </ExpansionPanelDetails>
		      </ExpansionPanel>
  			);
  		})}
  	</div>
  );
}

export default DayGraph;

