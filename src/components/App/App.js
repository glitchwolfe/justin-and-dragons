import React, { Component } from 'react';
import './App.css';
import '../Background/Background.css';

import logo from '../../images/justin-and-dragons-logo.png';

import Party    from '../Party/Party';
import Timeline from '../Timeline/Timeline';

class App extends Component {

  timelineEvents  = [];
  lastScrollX     = 0;
  ticking         = false;
  activeElement;
  currentEventIndex;
  currentBackground = '';

  // When scrolling, update the active event and trigger the party walking animation
  handleScroll = () => {
    this.lastScrollX = window.scrollX;
    window.requestAnimationFrame(() => {
      this.determineActiveEvent();
      this.refs.party.triggerWalkingAnimation();
    });
  };

  // Use left/right keys for prev/next item
  handleKeyPress = (e) => {
    if(e.keyCode === 37)
      this.previousItem()
    if(e.keyCode === 39)
      this.nextItem()
  };

  getTimelineEvents = () => {
    this.timelineEvents = document.getElementsByClassName("timelineEvent");
  }

  // Check the scroll position of all timeline elements
  // Mark element as active if it is within 500px of the edge of the screen
  determineActiveEvent = () => {
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

        // Change background, if necessary
        if(this.currentBackground === '' || this.currentBackground !== currentEvent.location){
          this.setBackground(currentEvent.location);
        }

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

  setBackground = (index) => {
    console.log('setting background...',index)

    let parallaxContainer = document.getElementById('parallax');
  
    switch(index){
      default:
      case "1":
        parallaxContainer.classList.add('forest');

        parallaxContainer.classList.remove('forest2');
        parallaxContainer.classList.remove('crystals');
        parallaxContainer.classList.remove('desert');
        break;
      case "2":
        parallaxContainer.classList.add('desert');

        parallaxContainer.classList.remove('forest');
        parallaxContainer.classList.remove('forest2');
        parallaxContainer.classList.remove('crystals');
        break;
      case "3":
        parallaxContainer.classList.add('forest2');

        parallaxContainer.classList.remove('crystals');
        parallaxContainer.classList.remove('forest');
        parallaxContainer.classList.remove('desert');
        break;
      case "4":
        parallaxContainer.classList.add('crystals');

        parallaxContainer.classList.remove('desert');
        parallaxContainer.classList.remove('forest');
        parallaxContainer.classList.remove('forest2');
        break;
    }

    this.currentBackground = index;
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

    // Create keypress listener
    window.addEventListener("keyup", this.handleKeyPress);

    // This line prevents the characters from walking indefinitely on page refresh
    setTimeout(() => { document.getElementById("partyList").classList.remove("walking") }, 0);

    // Retrieve the list of timeline events, then check which one is active
    this.getTimelineEvents();
    this.determineActiveEvent();

    // Set parallax background to width of the timeline
    let timelineWidth  = document.getElementById('timelineList').clientWidth;
    let parallaxLayers = document.getElementsByClassName('layer');
    for(let layer of parallaxLayers){
      layer.style.width = `${timelineWidth}px`;
    }
  }

  componentWillUnmount() {
    document.getElementById('parallax').removeEventListener('scroll', this.handleScroll);
    window.removeEventListener("keyup", this.handleKeyPress);    
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