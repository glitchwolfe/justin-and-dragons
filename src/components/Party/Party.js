import React, { Component } from 'react';
import './Party.css';

import partyMembers from './PartyMembers.json';
// import broxigar from '../../images/sprites/Broxigar.png';
import hada     from '../../images/sprites/Hada.png';

class Party extends Component {

  activeMembers = [];

  leaveParty = (member) => {
    member.classList.remove("in-party");
    setTimeout(() => {
      member.style.display = "none";
    }, 66);
  }

  joinParty = (member) => {
    member.style.display = "block";
    setTimeout(() => {
      member.classList.add("in-party");
    }, 66);
  }

  updateActiveMembers = (members) => {
    let availableElements = document.getElementById("partyList").childNodes;

    for(let element of availableElements){
      if(members.indexOf(element.id) !== -1){
        this.joinParty(element);
      }
      else {
        this.leaveParty(element);
      }
    }

    // Store a reference of active members to compare
    // the next time this function is called
    this.activeMembers = members;
  }

  createParty = () => {
    let partyElements = [];
    for(let member of partyMembers){
      partyElements.push(<li id={member}>
        <img src={hada} alt="Hada" />
        <p>{member}</p>
      </li>);
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
