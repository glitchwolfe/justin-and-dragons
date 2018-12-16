import React, { Component } from 'react';
import './App.css';

import logo from '../../images/justin-and-dragons-logo.png';

import Party    from '../Party/Party';
import Timeline from '../Timeline/Timeline';

class App extends Component {

  timelineEvents  = [];
  lastScrollX     = 0;
  ticking         = false;
  activeElement;
  currentEventIndex;

  handleScroll = () => {
    this.lastScrollX = window.scrollX;
    window.requestAnimationFrame(() => {
      // Update timeline information
      this.checkIfActive();
      
      // Toggle Walking Animation 
      document.getElementById("partyList").classList.add("walking");
      this.scrollStop(() => { document.getElementById("partyList").classList.remove("walking") });
    });
  };

  // Calls back once scrolling has stopped.
  // We use this to determine when to stop the Party's walking animation
  scrollStop = (callback) => {
    if (!callback || typeof callback !== 'function') return;
    var isScrolling;
    document.getElementById('parallax').addEventListener('scroll', (event) => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => { callback() }, 66);
    }, false);
  };

  getTimelineEvents = () => {
    this.timelineEvents = document.getElementsByClassName("timelineEvent");
  }

  // Check the scroll position of all timeline elements
  // Mark element as active if it is within 500px of the edge of the screen
  checkIfActive = () => {
    let i = 0;
    for (let element of this.timelineEvents){

      let eventPosition = element.getBoundingClientRect().left;

      if(element && eventPosition >= -250 && eventPosition <= 250){ // Max range is equal to the width of every event element
        let currentEvent = this.refs.timeline.getEvent(i);
        
        // Update party
        let partyMembers = this.refs.timeline.getEvent(i).partyMembers;
        this.refs.party.updateActiveMembers(partyMembers);
        
        // Mark timeline node as active
        element.classList.add("active");
        this.currentEventIndex = i;

        // Display event details 
        document.getElementById("eventDescription").innerHTML = `
          <p class="event">${currentEvent.event}</p>
          <p class="date">${currentEvent.date}</p>
          <p>${currentEvent.description}</p>
        `;
      }
      else if(element){
        element.classList.remove("active");
      }
      i++;
    }
  }

  nextItem = () => {
    this.scrollToEvent(this.currentEventIndex + 1);
  }

  previousItem = () => {
    this.scrollToEvent(this.currentEventIndex - 1);
  }

  scrollToEvent = (i) => {
    if(i >= 0 && this.timelineEvents[i]){
      document.getElementById('parallax').scrollTo({
        left:     this.timelineEvents[i].offsetLeft, 
        behavior: "smooth"
      }); 
    }
  }

  componentDidMount() {
    // Create scroll listener
    document.getElementById('parallax').addEventListener('scroll', this.handleScroll);

    // This line prevents the characters from walking indefinitely on page refresh
    setTimeout(() => { document.getElementById("partyList").classList.remove("walking") }, 0);

    // Retrieve the list of timeline events, then check which one is active
    this.getTimelineEvents();
    this.checkIfActive();

    // Set parallax background to width of the timeline
    let timelineWidth  = document.getElementById('timelineList').clientWidth;
    let parallaxLayers = document.getElementsByClassName('layer');
    for(let layer of parallaxLayers){
      layer.style.width = `${timelineWidth}px`;
    }
  }

  componentWillUnmount() {
    document.getElementById('parallax').removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Justin and Dragons Logo" />
          <div className="timelineButtons">
            <button onClick={this.previousItem}>&#8249;</button>
            <button onClick={this.nextItem}>&#8250;</button>
          </div>
        </header>
        <main>
          <div id="eventDescription"></div>
          <div id="parallax" className="parallax">
            <Timeline ref="timeline" />
            <div id="layer_1" className="layer">
              <div className="background"></div>
            </div>
            <div id="layer_2" className="layer">
              <div className="background"></div>
            </div>
            <div id="layer_3" className="layer">
              <div className="background"></div>
            </div>
            <div id="layer_4" className="layer">
              <div className="background"></div>
            </div>
          </div>
          <Party ref="party" />
        </main>
      </div>
    );
  }
}

export default App;
