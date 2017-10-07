import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';

export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }
  render() {
    return (
      <DateRangePicker
        startDate={this.state.startDate}
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
      />
    );
  }
}
