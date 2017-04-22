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
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

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
    this.handleChange=this.handleChange.bind(this);
    this.logout=this.logout.bind(this);

  }
  logout()
  {
    this.props.router.push('/')
  }
  handleChange = (event, index, value) => {
    console.log(event,index,value)
    this.setState({value:value});
    if(value==1)
     this.props.router.push('/loginSuccess/Dashboard');
   else
     this.props.router.push('/loginSuccess/RegisterAlgorithm');

 }

 render() {
  return (
    <div >
    <AppBar
    style={{position:'fixed'}}
    showMenuIconButton={false}
    title={

      <img 
      src='http://17776-presscdn-0-6.pagely.netdna-cdn.com/wp-content/themes/wiprodigital/images/wdlogo.png' 
      width='140' alt='wiproDigital' style={{marginTop:13}} />

    }
    iconElementRight={
      <div style={{width:390,float:'right'}}>
      <DropDownMenu value={this.state.value} style={{float:'left',width:200}}
      onChange={this.handleChange} underlineStyle={{borderColor:"#42a5f5"}} labelStyle={{color:'white'}}>
      <MenuItem value={1} primaryText="Dashboard" />
      <MenuItem value={2} primaryText="Register Algorithm" />
      </DropDownMenu>  
      <div style={{float:'right'}}>
      <h4 style={{display:"inline-block",margin:0,float:'left',marginTop:18}}>     
      {"Welcome " +localStorage['userName']}
      </h4>

      <IconButton  
      onTouchTap={this.logout}
      tooltip="Logout" 
      tooltipPosition="bottom-center"
      style={{padding:0}}
      
      >
      <ActionExitToApp color="white"/>
      </IconButton>
      </div>
      </div>
    }
    iconStyleRight={{color:'white'}} />
    <main style={{paddingTop:50}}>
    {this.props.children}      
    </main>
    </div>
    );
}
}