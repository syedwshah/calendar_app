import React, { Component } from 'react';
import './events.css';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="events">
        <div>Events {this.props.selectedDate}</div>
        <br />
        <div>events on this day</div><button>edit</button><button>delete</button>
        <div>events on this day</div><button>edit</button><button>delete</button>
        <div>events on this day</div><button>edit</button><button>delete</button>

        <br />
        <div>some form goes here</div>
      </div>
    );
  }
}
