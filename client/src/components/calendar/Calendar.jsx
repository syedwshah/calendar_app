import React, { Component } from 'react';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import './calendar.css';


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateContext: moment(),
      showMonthPopup: false,
      showYearEditor: false,
      currentDay: null,
      currentMonth: moment().format("MMMM"),
      currentYear: moment().format("Y")
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

  //Traversing adjacent months
  nextMonth = () => {
    let dateContext = moment(this.state.dateContext).add(1, 'month');
    this.setState({
      dateContext: dateContext,
      currentMonth: dateContext.format('MMMM')
    });
  }

  prevMonth = () => {
    let dateContext = moment(this.state.dateContext).subtract(1, 'month');
    this.setState({
      dateContext: dateContext,
      currentMonth: dateContext.format('MMMM')
    });
  }

  //Creating functionality to view another month
  setMonth = (e, month) => {
    let monthNo = this.months.indexOf(month);
    let dateContext = moment(this.state.dateContext).set("month", monthNo)
    this.setState({
      dateContext: dateContext,
      currentMonth: dateContext.format("MMMM")
    });
  }
  MonthList = (props) => {
    let popup = props.data.map((month) => {
      return (
        <div key={month}>
          <button className="month-button" onClick={(e) => {this.setMonth(e, month)}}>{month}</button>
        </div>
      )
    });
    return (
        <div className="month-popup">{popup}</div>
    );
  }

  monthPopup = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    });
  }

  MonthNav = () => {
    return (
      <span className="label-month" onClick={(e) => {this.monthPopup(e, this.month())}}>
        <FontAwesome
          className='arrow'
          name={this.state.showMonthPopup ? 'caret-up' : 'caret-down'}
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        /> {this.month()}
        {this.state.showMonthPopup ? <this.MonthList data={this.months} /> : ""}
      </span>
    );
  }

  showYearEditor = () => {
    this.setState({
      showYearEditor: true
    });
  }

  setYear = (year) => {
    let dateContext = moment(this.state.dateContext).set("year", year);
    this.setState({
      dateContext: dateContext,
      currentYear: dateContext.format("Y")
    })
  }

  onYearChange = (e) => {
    this.setYear(e.target.value);
  }

  //Select year on 'Enter' or 'Escape' key
  onKeyUpYear = (e) => {
    if (e.which === 13 || e.which === 27) {
      this.setYear(e.target.value);
      this.setState({
        showYearEditor: false
      });
    }
  }

  //Creating functionality to view another month
  YearNav = () => {
    return (
      this.state.showYearEditor ?
      <input
        defaultValue = {this.year()}
        className = "year-editor"
        ref = {(yearInput) => {this.yearInput = yearInput}}
        onKeyUp = {(e) => {this.onKeyUpYear(e)}}
        onChange = {(e) => this.onYearChange(e)}
        type = "number"
        placeholder = "year" />
      :
      <span className="label-year"
      onClick={(e) => {this.showYearEditor()}}>{this.year()}</span>
    );
  }

  //Maybe this can create values in the DB when a day is clicked.
  onDayClick = (e, day) => {
    this.setState({
      currentDay: day
    });
    let selectedDate = `${this.state.currentMonth} ${day} ${this.state.currentYear}`;
    this.props.handleStoreChange(selectedDate);
    this.props.handleFormClickOnce();
  }

  render() {
    //figuring out how many "blanks" before the calendar starts
    let blanks = new Array(0);
    for (let i = 0; i <  this.firstDayOfMonth(); i++) {
      blanks.push(<td key={`empty${i}`} className="emptySlots">{""}</td>);
    }

    //Fill the tiles of the calendar with content of the day
    let daysInMonth = new Array(0);
    for (let day = 1; day <= this.daysInMonth(); day++) {
      let className = (day == this.currentDay() ? "day current-day" : "day"); //must be '==' and not '===' despite warning
      daysInMonth.push(
        <td key={day} className={className} onClick={(e) => {this.onDayClick(e, day)}}>
          <span>{day}</span>
        </td>
      );
    }

    let totalTiles = [...blanks, ...daysInMonth];
    let rows = new Array(0);
    let cells = new Array(0);

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
      if (index === totalTiles.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
      return 0; //no warnings
    });

    let trElems = rows.map((data, index) => (
      <tr key={`row${index}`} className="elem">{data}</tr>
    ));

    return (
      <section className="calendar-container w3-responsive w3-striped w3-border">
        <table className="calendar w3-table w3-large">
          <thead>
            <tr className="calendar-header">
              <td colSpan="5">
                <this.MonthNav />
                {" "}
                <this.YearNav />
              </td>
              <td colSpan="2" className="nav-month">
                <FontAwesome name='chevron-left' style={{ color: 'black' }}
                  onClick={(e) => {this.prevMonth()}} />
                  {" "}
                <FontAwesome name='chevron-right' style={{ color: 'black' }}
                  onClick={(e) => {this.nextMonth()}} />
              </td>
            </tr>
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
