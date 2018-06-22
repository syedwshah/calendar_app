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
      showYearEditor: false,
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


  //Creating functionality to view another month
  setMonth = (e, month) => {
    let monthNo = this.months.indexOf(month);
    this.setState({
      dateContext: moment().set("month", monthNo),
      currentMonth: moment().set("month", monthNo).format("MMMM")
    });
    this.props.monthPopup && this.props.monthPopup();
  }
  MonthList = (props) => {
    let popup = props.data.map((month) => {
      return (
        <div key={month}>
          <a href='#' onClick={(e) => {this.setMonth(e, month)}}>{month}</a>
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

  onYearChange = (e) => {
    this.setYear(e.target.value);
    this.props.onYearChange && this.props.onYearChange(e, e.target.value);
  }

  //Creating functionality to view another month
  YearNav = () => {
    return (
      this.state.showYearEditor ?
      <input
        defaultValue = {this.year()}
        className = "editor-year"
        ref = {(yearInput) => {this.yearInput = yearInput}}
        //onKeyUp = {(e) => {onKeyUpYear(e)}}
        onChange = {(e) => this.onYearChange(e)}
        type = "number"
        placeholder = "year" />
      :
      <span className="label-year"
      onDoubleClick={(e) => {this.showYearEditor()}}>{this.year()}</span>
    );
  }

  render() {
    //Quick tests:
    console.log(moment().format('MMM D Y')); //current day in common US format
    console.log(this.state.currentMonth, this.state.currentYear);

    //figuring out how many "blanks" before the calendar starts
    let blanks = new Array(0);
    for (let i = 0; i <  this.firstDayOfMonth(); i++) {
      blanks.push(<td key={`empty${i}`} className="emptySlots">{""}</td>);
    }

    //Fill the tiles of the calendar with content of the day
    let daysInMonth = new Array(0);
    for (let day = 1; day <= this.daysInMonth(); day++) {
      let className = (day == this.currentDay() ? "day current-day" : "day"); //must be '==' and not '===' despite warning1
      daysInMonth.push(
        <td key={day} className={className}>
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
      <section className="calendar-container">
        <FontAwesome
          className='star'
          name='star'
          size='sm'
          spin
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#F0CA4D' }}
        /> Calendar

        <table className="calendar">
          <thead>
            <tr className="calendar-header"></tr>
              <td colSpan="5">
                <this.MonthNav />
                {" "}
                <this.YearNav />
              </td>
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
