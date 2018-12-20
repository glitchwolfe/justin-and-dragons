import React, { Component } from 'react';
import './Party.css';

import partyMembers from './PartyMembers.json';

// Specific Character Sprites
import broxigar from '../../images/sprites/Broxigar.png';
import hada     from '../../images/sprites/Hada.png';

// Generic Sprites
import alchemist  from '../../images/sprites/alchemist.png';
import archer     from '../../images/sprites/archer.png';
import barbarian  from '../../images/sprites/barbarian.png';
import bard       from '../../images/sprites/bard.png';
import cleric     from '../../images/sprites/cleric.png';
import druid      from '../../images/sprites/druid.png';
import fighter    from '../../images/sprites/fighter.gif';
import goku       from '../../images/sprites/goku.png';
import gunslinger from '../../images/sprites/gunslinger.png';
import mage       from '../../images/sprites/mage.png';
import mechanic   from '../../images/sprites/mechanic.png';
import monk       from '../../images/sprites/monk.png';
import pirate     from '../../images/sprites/pirate.png';
import rock       from '../../images/sprites/rock.png';
import rogue      from '../../images/sprites/rogue.png';
import samurai    from '../../images/sprites/samurai.gif';
import valkyre    from '../../images/sprites/valkyre.png';

class Party extends Component {

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

  triggerWalkingAnimation(walkingLeft){
    let partyList = document.getElementById("partyList");
    
    if(walkingLeft) partyList.classList.add("left")
    else            partyList.classList.remove("left")
  
    partyList.classList.add("walking");
    this.scrollStop(() => { partyList.classList.remove("walking"); });
  }

  // Remove "in-party" class to trigger animation, wait, then remove from DOM
  leaveParty = (member) => {
    member.classList.remove("in-party");
    setTimeout(() => {
      member.style.display = "none";
    }, 100);
  }

  // Add to DOM, wait, then add "in-party" class to trigger animation
  joinParty = (member) => {
    member.style.display = "block";
    setTimeout(() => {
      member.classList.add("in-party");
    }, 100);
  }

  // Change which party members are visible
  // @input - members:Array<String> - An array of party member names
  updateActiveMembers = (members) => {
    let availableElements = document.getElementById("partyList").childNodes;
    for(let element of availableElements){
      if(members.indexOf(element.id) !== -1) this.joinParty(element);
      else this.leaveParty(element);
    }
  }

  // Build the HTML for the party and determine which image represents each character
  createParty = () => {
    let partyElements = [];
    let i = 0;
    for(let member of partyMembers){
      let img;
      switch(member.image){
        case "alchemist":
          img = alchemist;
          break;
        case "archer":
          img = archer;
          break;
        case "barbarian":
          img = barbarian;
          break;
        case "bard":
          img = bard;
          break;
        case "Broxigar":
          img = broxigar;
          break;
        case "cleric":
          img = cleric;
          break;
        case "druid":
          img = druid;
          break;
        case "fighter":
          img = fighter;
          break;
        case "goku":
          img = goku;
          break;
        case "gunslinger":
          img = gunslinger;
          break;
        case "Hada":
          img = hada;
          break;
        case "mage":
          img = mage;
          break;
        case "mechanic":
          img = mechanic;
          break;
        case "monk":
          img = monk;
          break;
        case "pirate":
        default:
          img = pirate;
          break;
        case "rock":
          img = rock;
          break;
        case "rogue":
          img = rogue;
          break;
        case "samurai":
          img = samurai;
          break;
        case "valkyre":
          img = valkyre;
          break;
      }
      partyElements.push(
        <li id={member.name} key={i}>
          <div className="sprite">
            <img src={img} alt={member.name} />
          </div>
          <p>{member.name}</p>
        </li>
      );
      i++;
    }
    return partyElements;
  }

  render() {
    return (
      <div className="Party">
        <ul id="partyList">
          {this.createParty()}
        </ul>
      </div>
    );
  }
}

export default Party;
