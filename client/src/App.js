import React, { Component } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';
import Events from './components/calendar/Events';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDateId: null,
      selectedDate: null
    };
  }

  handleStoreChange = (id, date) => {
    this.setState({
      selectedDateId: id,
      selectedDate: date
    });
  }

  render() {
    return (
      <div className="App">
        CALENDAR APP
        <section className="content">
          <Calendar
            handleStoreChange={this.handleStoreChange} />
            <hr />
          <Events selectedDate={this.state.selectedDate}/>
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
