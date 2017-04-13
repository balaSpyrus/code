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

	  const layStyle = {
	  	height: 310,
	  	width: 370,
	  	marginLeft: "auto",
	  	marginRight:"auto",
	  	
	  }

	  const desStyle={
	  	fontSize: 25,
	  	textAlign: 'left',
	  	color: 'grey',
	  	paddingBottom: 20,
	  	margin: 0,
	  }
	  
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
	  			<div style={layStyle}>
	  			<Formsy.Form
	  			ref="form"
	  			onValid={this.props.enableButton}
	  			onInvalid={this.props.disableButton}
	  			onValidSubmit={this.props.addUser}
	  			>
	  			<h1 style={desStyle}>General details</h1>
	  			<Row style={gap}>
	  			<Col style={{width:70}} xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar  icon={<ActionAccountBox/>} />
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
	  			<Col style={{width:70}} xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar  icon={<CommunicationEmail/>} />
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
	  			<Col style={{width:70}} xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar  icon={<ActionLock/>} />
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
	  			<Col style={{width:70}} xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar  icon={<ActionLock/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="repassword"
	  			required
	  			validations="equalsField:password"
	  			validationError="passwords are not matching"
	  			hintText="re-enter password"
	  			type="password"
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col style={{paddingBottom: 20}}>
	  			<RaisedButton label="Next" type="submit" secondary={true} style={{float:'right'}} fullWidth={false} disabled={!this.props.btnControl}/>
	  			</Col>
	  			</Row>
	  			</Formsy.Form>
	  			</div>
	  			)
	  	}
	  }
