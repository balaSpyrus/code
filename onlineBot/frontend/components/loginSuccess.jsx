import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import $ from 'jquery'; 
import Request from "superagent";
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import {Container,Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'; 
import AppBar from 'material-ui/AppBar';
import FileProcess from './fileProcess';
import RegisterAlgorithm from './registerAlgorithm';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  paper:{
    height: 270,
    width: 500,
    marginLeft: "auto",
    marginRight:"auto",
    marginTop:"15%"

  },
  slide: {
    padding: 10,
  },
  gap:{
    paddingBottom:10
  }
};


export default class LoginSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state={     
      value:1
    }
  }

  handleChange = (event, index, value) => {
    this.setState({value});

  }

  render() {
    return (
      <div >
      <AppBar
      showMenuIconButton={false}
      title={
        <span>
        <div>
        <img 
        src='http://17776-presscdn-0-6.pagely.netdna-cdn.com/wp-content/themes/wiprodigital/images/wdlogo.png' 
        width='140' alt='wiproDigital' style={{marginTop:13,position:'fixed'}} 
        />
        </div>

        </span>
      }
      iconElementRight={
        <div>
        <DropDownMenu value={this.state.value} style={{float:"left",width:200}}
        onChange={this.handleChange} underlineStyle={{borderColor:"#42a5f5"}} labelStyle={{color:'white'}}>
        <MenuItem value={1} primaryText="Dashboard" />
        <MenuItem value={2} primaryText="Register Algorithm" />
        </DropDownMenu>  
        <p style={{float:"right"}}>     
        {"Welcome " +localStorage['userName']}
        </p>
        </div>
      }
      iconStyleRight={{color:'white'}} />

      {
       this.state.value==1?
       <FileProcess/>:<RegisterAlgorithm/>
     }

     </div>
     );
  }
}