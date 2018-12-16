import React, { Component } from 'react';
import './Timeline.css';
import timelineData from './Timeline.json'

class Timeline extends Component {

  createTimeline = () => {
    let events = [];
    let i = 0;
    for(let event of timelineData){
      events.push(
        <li className="timelineEvent" key={i}>
          <p className="pointDate">{event.date}</p>
          <span className="point"></span>
        </li>
      );
      i++;
    }
    return events;
  }

  getEvent = (i) => {
    if(timelineData[i])
      return timelineData[i];
    return false;
  }

  render() {
    return (
      <div className="Timeline">
        <ol id="timelineList">
          {this.createTimeline()}
          <li className="timelineSpacer"></li>
          <li className="timelineSpacer"></li>
        </ol>
      </div>
    );
  }
}

export default Timeline;
