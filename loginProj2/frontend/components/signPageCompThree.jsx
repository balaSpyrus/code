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
	  import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
	  import MenuItem from 'material-ui/MenuItem';

	  const layStyle = {
	  	height: 310,
	  	width: 370,
	  	marginLeft: "auto",
	  	marginRight:"auto",
	  	paddingBottom: 20,
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
	  export default class SignUpCompThree extends React.Component {
	  	constructor(props){
	  		super(props)	  		
	  		console.log(props)
	  		this.onChangeSelect=this.onChangeSelect.bind(this)
	  		this.state={
	  			examType:'10th grade',
	  			eduBoard:'',
	  			percent:''
	  		}

	  	}
	  	onChangeSelect(event, index){
	  		this.setState({examType: index})
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
	  			<h1 style={desStyle}>Education Details</h1>
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<ActionAccountBox/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsySelect
	  			name="type of exam"	  			
	  			value={this.state.examType}
	  			style={{height:44,display:'block'}}
	  			required
	  			fullWidth={false}
	  			onChange={this.onChangeSelect}
	  			>
	  			<MenuItem value="10th grade" 
	  			primaryText="10th" />
	  			<MenuItem value="12th grade" 
	  			primaryText="12th" />
	  			<MenuItem value="diploma"
	  			primaryText="Diploma" />
	  			<MenuItem value="under graduate"
	  			primaryText="UG" />
	  			<MenuItem value="post graduate"
	  			primaryText="PG" />
	  			</FormsySelect>
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
	  			<RaisedButton label="Next" type="submit" secondary={true} fullWidth={false} style={{float:'right'}} disabled={!this.props.btnControl}/>
	  			</Col>
	  			</Row>
	  			</Formsy.Form>
	  			</div>
	  			)
	  	}
	  }
