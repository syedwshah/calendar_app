import React, { Component } from 'react';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import './calendar.css';


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: false
    }
  }
  //Obtaining basic names for days of the week and months
  weekdays = moment.weekdaysShort();
  months = moment.months();

  //Obtaining misc calendar info
  year = () => (this.state.dateContext.format("Y"));
  month = () => (this.state.dateContext.format("MMMM"));
  daysInMonth = () => (this.state.dateContext.daysInMonth());
  currentDate = () => (this.state.dateContext.get("date"));
  currentDay = () => (this.state.dateContext.format("D"));
  firstDayOfMonth = () => (
    moment(this.state.dateContext).startOf('month').format('d')
  ); //Day of the week, (0-6) where 0 is Sun 6 is Sat

  //Printing the days of the week as table data
  weekdaysPrint = this.weekdays.map((day, index) => (
    <td key={day} className="week-day">{day}</td>)
  );

  render() {
    //figuring out how many "blanks" before the calendar starts
    let blanks = new Array();
    for (let i = 0; i <  this.firstDayOfMonth(); i++) {
      blanks.push(<td key={`empty${i}`} className="emptySlots">{""}</td>);
    }

    //Fill the tiles of the calendar with content of the day
    let daysInMonth = new Array();
    for (let day = 1; day <= this.daysInMonth(); day++) {
      let className = (day == this.currentDay() ? "day current-day" : "day");
      daysInMonth.push(
        <td key={day} className={className}>
          <span>{day}</span>
        </td>
      );
    }

    let totalTiles = [...blanks, ...daysInMonth];
    let rows = new Array();
    let cells = new Array();

    totalTiles.map((currentValue, index) => {
      if ((index % 7) !== 0) {
        cells.push(currentValue);
      }
      else {
        let insertRow = cells.slice(); //.slice() necessary?
        rows.push(insertRow);
        cells = [];
        cells.push(currentValue);
      }
      if (index == totalTiles.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let trElems = rows.map((data, index) => (
      <tr key={`row${index}`} className="elem">{data}</tr>
    ));

    return (
      <section className="calendar-container">
        <FontAwesome
          className='rocket'
          name='rocket'
          size='1x'
          spin
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        /> Calendar
        <table className="calendar">
          <thead>
            <tr className="calendar-header"></tr>
          </thead>

          <tbody>
            <tr>{this.weekdaysPrint}</tr>
            {trElems}
          </tbody>
        </table>

      </section>
    );
  }
}
