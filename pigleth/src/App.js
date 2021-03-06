// ################################### \\
// #                                 # \\
// #           ETHLondon 2020        # \\
// #            - dumango -          # \\
// #         Valerie    Kurt         # \\
// #             /       \           # \\
// #                                 # \\
// #         Project: pigleth        # \\
// #                                 # \\
// ################################### \\

import React, {Component} from 'react';
import Web3 from 'web3';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Torus from "@toruslabs/torus-embed";

import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import Setup from './components/Setup';
import Manager from './components/Manager';

class App extends Component {

  constructor() {
    super();
      this.state = {
        isHeader: true,
        isLogin: true,
        isProfile: false,
        isSetup: false,
        isManager: false,

        web3: 'undefined',
        account: 'undefined',

        fundData: 'undefined'

      }
  }

//
// toggle components
//

isHeader = () => {
  this.setState({isHeader: true});
}
isLogin = () => {
  this.setState({isLogin: true});
}
isProfile = () => {
  this.setState({isProfile: true});
}
isSetup = () => {
  this.setState({isSetup: true});
}
isManager = () => {
  this.setState({isManager: true});
}
isNotHeader = () => {
  this.setState({isHeader: false});
}
isNotLogin = () => {
  this.setState({isLogin: false});
}
isNotProfile = () => {
  this.setState({isProfile: false});
}
isNotSetup = () => {
  this.setState({isSetup: false});
}
isNotManager = () => {
  this.setState({isManager: false});
}

//
// Login methods
//
metamaskButton = async () => {
    if (typeof web3 !== 'undefined') {
      console.log("web3 !== undefined");
      window.web3 = new Web3(window.web3.currentProvider)

  // Metamask connection
  if (window.web3.currentProvider.isMetaMask === true) {
    await window.ethereum.enable();
    this.setState({web3: window.web3});
    window.web3.eth.getAccounts((error, accounts) => {
      if (accounts.length === 0) {
        console.log("no active accounts");
        // there is no active accounts in MetaMask
        this.setState({account: accounts[0]})
      } else {
        // it's ok
        console.log("ok");
        this.setState({account: accounts[0], loggedIn: true});
        console.log(this.props.account);
      }
    });

    // for other providers
  } else {
    console.log("other web3 provider");
    // Another web3 provider
  }
  } else {
  alert("Please install browser wallet. e.g. metamask")
  console.log("no web3 provider");
  // No web 3 provider
  }
  this.afterLogin();
}

torusButton = async () => {
  const torus = new Torus({
    buttonPosition: "bottom-left" // default: bottom-left
  });
  await torus.init({
    buildEnv: "production", // default: production
    enableLogging: true, // default: false
    network: {
      host: "ropsten", // default: mainnet
      chainId: 3, // default: 1
      networkName: "Ropsten Test Network" // default: Main Ethereum Network
    },
    showTorusButton: false // default: true
  });
  await torus.login(); // await torus.ethereum.enable()
  const web3 = new Web3(torus.provider);
  this.setState({web3: web3, account: web3.eth.getAccounts()[0]})
  this.afterLogin();
}
afterLogin = () => {
  this.isNotLogin();
  this.isProfile();
}


//
// Profile methods
//
setupButton = () => {
  this.isNotProfile();
  this.isSetup();
}
managerButton = () => {
  this.isNotProfile();
  this.isManager();
}

//
// Setup Button
//
setupSaveButton = async (fundState) => {
  await this.setState({fundData: fundState})
  this.isNotSetup();
  this.isProfile();
}

  render() {
    return (
      <div className="App">
        <div class="header">

          {this.state.isHeader && <Header />}

          </div>
          <div class="body">
          <br /> <br />
            {this.state.isLogin && <Login metamaskButton={this.metamaskButton} torusButton={this.torusButton} />}
            {this.state.isProfile && <Profile fundData={this.state.fundData} setupButton={this.setupButton} managerButton={this.managerButton} Profile />}
            {this.state.isSetup && <Setup setupSaveButton={this.setupSaveButton}/>}
            {this.state.isManager && <Manager />}
          </div>
        </div>
    );
  }
}
export default App;
