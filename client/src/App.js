import React, { Component } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';
import Events from './components/calendar/Events';
import { base } from './base';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDateId: null,
      selectedDate: null,
      events: {}
    };
  }

  handleStoreChange = (id, date) => {
    this.setState({
      selectedDateId: id,
      selectedDate: date
    });
  }

  addEvent = (eventId, start, end, details) => {
    const events = {...this.state.events};
    if (events[eventId]) {
      //append to eventId
      events[eventId].map((currentValue, index) => {
        if (events[eventId][`${++index}`]) {/*do nothing*/}
        else {
          events[eventId][`${index}`] = {
            id: Date.now(),
            start_time: start,
            end_time: end,
            details: details
          }
        }
      });
    }
    else {
      events[eventId] = {
        0: {
          id: Date.now(),
          start_time: start,
          end_time: end,
          details: details
        }
      }
    }

    this.setState({events});
  }

  componentWillMount() {
    this.eventsRef = base.syncState('events', {
      context: this,
      state: 'events'
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.eventsRef);
  }

  render() {
    return (
      <div className="App">
        CALENDAR APP
        <section className="content">
          <Calendar
            handleStoreChange={this.handleStoreChange} />
            <hr />
          <Events selectedDate={this.state.selectedDate}
            selectedDateId={this.state.selectedDateId}
            addEvent={this.addEvent} />
        </section>

        <section className="all-events">List of all events go here</section>
          <li>1</li>
          <li>1</li>
          <li>1</li>
      </div>
    );
  }
}

export default App;
