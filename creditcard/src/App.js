import FlatButton from 'material-ui/FlatButton';
import React, { Component } from 'react';
import './App.css';
import NewCard from "./components/newCard";
import SavedCards from "./components/savedCards";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const classes = useStyles();

class App extends Component {

  state={
    toggle:true
  }
  

 toggle=(bool)=>this.setState({ toggle:bool })
 render() {
  
    return (
      <div className="App">
      <Button  className={classes.button} onClick={()=>this.toggle(true)}>New Card</Button>
      <Button  className={classes.button}color="primary"  onClick={()=>this.toggle(false)}>Show Saved Cards</Button>
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
