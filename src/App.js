import React, { Component } from 'react'
import PorkoingJson from '../build/contracts/Porkoing.json'
import getWeb3 from './utils/getWeb3'
import TruffleContract from 'truffle-contract'

// Components
import JamonFinder from "./components/JamonFinder";
import JamonCard from "./components/JamonCard";
import CreatePork from "./components/CreatePork";

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newPork: null,
      web3: null,
      Porkoing: null,
      porks: []
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const Porkoing = TruffleContract(PorkoingJson)
    Porkoing.setProvider(this.state.web3.currentProvider)

    this.setState({
      Porkoing: Porkoing
    });
  }

  handleSearch(value) {
    this.state.Porkoing.deployed()
      .then((instance) => {
        return instance.findPork.call(value)
      })
      .then(result => {
        console.log(result);
        return result;
      })
  }

  handleCreate(value) {
    this.setState({
      newPork: value
    })


    this.state.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      this.state.Porkoing.deployed()
        .then((instance) => {
          const { farmerId,
            porkId,
            birthDate,
            breed } = this.state.newPork
          return instance.create(farmerId, porkId, birthDate, breed, { from: account })
        })
        .then((result) => {
          console.log('Created', result)
          // TODO paint
          alert("Created Pork with Id: " + this.state.newPork.porkId);
          this.setState({
            porks: [...this.state.porks, result]
          })
        })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Jamon forever!</h1>
              <h2>Search</h2>
              <JamonFinder handleSearch={this.handleSearch.bind(this)} />
              <JamonCard porks={this.state.porks} />
              <hr />
              <CreatePork handleCreate={this.handleCreate.bind(this)} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
