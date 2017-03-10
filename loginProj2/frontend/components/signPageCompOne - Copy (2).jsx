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
	  export default class SignUpCompOne extends React.Component {
	  	constructor(props){
	  		super(props)	  		
	  		console.log(props)

	  	}

	  	render(){
	  		return(

	  			<Formsy.Form
	  			ref="form"
	  			onValid={this.props.enableButton}
	  			onInvalid={this.props.disableButton}
	  			onValidSubmit={this.props.addUser}
	  			>

	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<ActionAccountBox/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="name"
	  			type="text"
	  			required

	  			hintText="Name"
	  			onChange={this.props.name}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<CommunicationEmail/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="mail"
	  			type="text"
	  			required
	  			validations="isEmail"
	  			validationError="give a valid one"
	  			hintText="email"
	  			onChange={this.props.email}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<ActionLock/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="password"
	  			required

	  			hintText="password"
	  			type="password"
	  			onChange={this.props.password}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<ActionLock/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="repassword"
	  			required

	  			hintText="re-enter password"
	  			type="password"
	  			onChange={this.props.rePassword}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col >
	  			<RaisedButton label="SignUp" type="submit" secondary={true} fullWidth={true} disabled={!this.props.btnControl}/>
	  			</Col>
	  			</Row>
	  			</Formsy.Form>
	  			)
	  	}
	  }
