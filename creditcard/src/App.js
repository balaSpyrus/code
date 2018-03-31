import React, { Component } from 'react';
import logo from './logo.svg';
import SavedCards from "./components/savedCards"
import FlatButton from 'material-ui/FlatButton';
import NewCard from "./components/newCard"
import './App.css';


class App extends Component {

  state={
    toggle:false
  }
  showSaved=(e)=>{

    this.setState({
      toggle:false
    })
  }

 getNew=(e)=>{

    this.setState({
      toggle:true
    })
  }
  render() {
    return (
      <div className="App">
      <FlatButton label = "New Card" onClick={this.getNew} />
      <FlatButton label="Show Saved Cards" primary={true} onClick={this.showSaved} />
      <div style={{marginTop:10}}>
      {
        this.state.toggle?
        <NewCard/>:
        <SavedCards />
      }
</div>
      </div>
      );
  }
}

export default App;
