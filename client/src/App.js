import React, { Component } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';

class App extends Component {
  store = {};
  render() {
    return (
      <div className="App">
        CALENDAR APP
        <section className="content">
          <Calendar
            onDayClick={(e, day) => {this.onDayClick(e, day)}}
            store={this.store} />
          <div className="events">Scheduled events</div>
        </section>
      </div>
    );
  }
}

export default App;
