import React, { Component } from 'react';
import './events.css';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      details: ''
    };
  }

  // handleChange = (e, stateVal) => {
  //   this.setState({stateVal: e.target.value});
  // }

  handleChange = (e, stateVal) => {
    let change = {};
    change[stateVal] = e.target.value;
    this.setState(change);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addEvent(
      this.props.selectedDateId,
      this.state.start,
      this.state.end,
      this.state.details
    );
    this.setState({
      start: '',
      end: '',
      details: ''
    });
  }

  render() {
    return(
      <div className="events">
        <div className="close" style={{color: "black", textAlign: "left"}}>
          <button style={{borderRadius: "50%"}}>X</button>
        </div>
        <div>{this.props.selectedDate}</div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Start <input type="text" placeholder="hr:mm am/pm" value={this.state.start} onChange={(e) => (this.handleChange(e, "start"))} />
          </label>
          <br />
          <label>
            End <input type="text" placeholder="hr:mm am/pm" value={this.state.end} onChange={(e) => (this.handleChange(e, "end"))} />
          </label>
          <label>
            <textarea placeholder="Details for this event" value={this.state.details} onChange={(e) => (this.handleChange(e, "details"))} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>


      </div>
    );
  }
}
