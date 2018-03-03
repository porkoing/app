import React, { Component } from 'react';

export default class JamonFinder extends Component {
  state = {
    value: ''
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Enter jamon brand" onChange={this.onChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}