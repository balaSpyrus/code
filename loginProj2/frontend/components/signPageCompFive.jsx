	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';
	  import FormsyText from 'formsy-material-ui/lib/FormsyText';
	  import ActionAccountBox from 'material-ui/svg-icons/action/account-box';	  
	  import CommunicationEmail from 'material-ui/svg-icons/communication/email';
	  import ActionLock from 'material-ui/svg-icons/action/lock';
	  import Avatar from 'material-ui/Avatar';
	  import {Row, Col} from 'react-grid-system';

	  
	  const gap={
	  	paddingBottom:10
	  }
	  export default class VerifyCompFive extends React.Component {
	  	constructor(props){
	  		super(props)	  		
	  		console.log(props.userDetails)

	  	}

	  	render(){
	  		return(

	  			<h1>ALL FILLED UP</h1>
	  			)
	  	}
	  }
