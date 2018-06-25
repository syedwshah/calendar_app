import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
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

  handleChange = (e, stateVal) => {
    let change = {};
    change[stateVal] = e.target.value;
    this.setState(change);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addEvent(
      this.props.selectedDate,
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
      <ToggleDisplay show={this.props.showForm} className="events">
        <div>
          <div className="close" style={{color: "black", textAlign: "left"}}>
            <button style={{borderRadius: "50%"}} onClick={() => {
              this.props.handleFormClick();
              this.setState({start: '', end: '', details: ''})}
            }>X</button>
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
            <button type="submit" value="Submit" className="w3-button w3-round-xxlarge w3-teal"
              onClick={() => {this.props.handleFormClick()}}>
              submit
            </button>
          </form>
        </div>
      </ToggleDisplay>
    );
  }
}
