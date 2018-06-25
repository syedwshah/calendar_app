import React, { Component } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';
import Events from './components/calendar/Events';
import { base } from './base';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: null,
      showFormOnce: false,
      events: {}
    };
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

  handleStoreChange = (date) => {
    this.setState({
      selectedDate: date
    });
  }

  handleFormClickOnce = () => {
    this.setState({
      showFormOnce: true
    });
  }

  handleFormClick = () => {
    this.setState({
      showFormOnce: false
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
            details: details,
            datapoint: {
              index: index,
              eventId: eventId
            }
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
          details: details,
          datapoint: {
            index: 0,
            eventId: eventId
          }
        }
      }
    }
    this.setState({events});
  }

  ViewEvents = () => {
    let events = {...this.state.events};
    let appointments = Object.keys(this.state.events).map((date, index) => {
      let details = (events[date]);
      return (
        <div key={`appoinement${index}`}>
          <b>{date}</b>
          {details.map((currentValue, index) => {
              return (
                <div key={`detail${index}`}>
                  <div>
                    {details[index].start_time} - {details[index].end_time} {details[index].details}
                    {"   "}
                    <button className="delete w3-red"
                      onClick={(e) => {
                        this.deleteEvent(e, details[index].datapoint)}
                      }>x</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      );
    });
    return (
      <section className="all-events">
        <div>APPOINTMENTS</div>
        {appointments}
      </section>
    );
  }

  deleteEvent = (e, datapoint) => {
    e.preventDefault();
    let events = {...this.state.events};
    let objContext = events[datapoint.eventId];
    let propertyContext = datapoint.index;
    delete objContext[propertyContext];
    this.setState({events});
  }

  render() {
    return (
      <div className="App">
        CALENDAR APP
        <section className="content">
          <Calendar
            handleFormClickOnce={this.handleFormClickOnce}
            handleStoreChange={this.handleStoreChange} />
            <hr />
          <Events
            selectedDate={this.state.selectedDate}
            showForm={this.state.showFormOnce}
            handleFormClick={this.handleFormClick}
            addEvent={this.addEvent} />
        </section>
        <this.ViewEvents />
      </div>
    );
  }
}

export default App;
