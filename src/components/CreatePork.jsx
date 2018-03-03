import React from 'react';

export default class CreatePork extends React.Component {

  state = {
    farmerId: null,
    porkId: null,
    birthDate: '',
    breed: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.handleCreate(this.state);
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input id="farmerId" type="text" placeholder="Enter farmer id" onChange={this.onChange} />
        <input id="porkId" type="text" placeholder="Enter pork id" onChange={this.onChange} />
        <input id="birthDate" type="text" placeholder="Enter birth date" onChange={this.onChange} />
        <input id="breed" type="text" placeholder="Enter pork breed" onChange={this.onChange} />
        <button type="submit">Create</button>
      </form>
    )
  }
}