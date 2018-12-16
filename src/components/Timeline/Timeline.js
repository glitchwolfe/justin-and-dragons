import React, { Component } from 'react';
import './Timeline.css';
import timelineData from './Timeline.json'

class Timeline extends Component {

  createTimeline = () => {
    let events = [];
    for(let event of timelineData){
      events.push(
        <li className="timelineEvent">
          <p className="pointDate">{event.date}</p>
          <span className="point"></span>
        </li>
      );
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
