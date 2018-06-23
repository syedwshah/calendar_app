import React, { Component } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Calendar
          onDayClick={(e, day) => {this.onDayClick(e, day)}}/>
      </div>
    );
  }
}

export default App;
