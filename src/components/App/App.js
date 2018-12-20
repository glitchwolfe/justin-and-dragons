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
      let eventSize     = element.clientWidth / 2;

      console.log(eventSize)

      if(element && eventPosition >= -eventSize && eventPosition <= eventSize){ // Max range is equal to the width of every event element
        let currentEvent = this.refs.timeline.getEvent(i);
            currentEvent.index = i;
            
        element.classList.add("active");

        this.renderEvent(currentEvent);
      }
      else if(element){
        element.classList.remove("active");
      }
      i++;
    }
  }

  setBackground = (currentEvent) => {
    if(currentEvent && (this.currentBackground === '' || this.currentBackground !== currentEvent.location)){

        let parallaxContainer = document.getElementById('parallax');
      
        switch(currentEvent.location){
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

      this.currentBackground = currentEvent.location;
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
        left:     this.timelineEvents[i].offsetLeft + 100, 
        behavior: "smooth"
      }); 
    }
  }

  renderEvent = (currentEvent) => {
    if(currentEvent.index !== this.currentEventIndex){
      let eventDescription = document.getElementById("eventDescription");
      
      // Show preview only on mobile
      if(window.innerWidth <= 700)
        eventDescription.classList.add("preview");
      else
        eventDescription.classList.remove("preview");

      eventDescription.classList.add("preAnimation");
      
      // Add Event to DOM - wait 300ms so CSS fade can trigger
      setTimeout(()=>{
        eventDescription.innerHTML = `
          <div class="eventContainer">  
            <p class="event">${currentEvent.event}</p>
            <p class="date">${currentEvent.date}</p>
            <button class="readMore">Read More...</button>
            <button class="readLess">Read Less...</button>
            <p class="description">${currentEvent.description}</p>
          </div>
        `;
      
        eventDescription.getElementsByClassName('readMore')[0].addEventListener("click", () => {
          eventDescription.classList.remove("preview"); 
        });
        eventDescription.getElementsByClassName('readLess')[0].addEventListener("click", () => {
          eventDescription.classList.add("preview"); 
        });

        eventDescription.classList.remove("preAnimation");
      }, 300)
          
      // Update visible party members
      this.refs.party.updateActiveMembers(currentEvent.partyMembers);
  
      // Change background
      this.setBackground(currentEvent);

      this.currentEventIndex = currentEvent.index;
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
