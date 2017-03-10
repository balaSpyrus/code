	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';	  
	  import DatePicker from 'material-ui/DatePicker';
	  import FormsyText from 'formsy-material-ui/lib/FormsyText';
	  import ActionAccountBox from 'material-ui/svg-icons/action/account-box';	
	  import ActionToday from 'material-ui/svg-icons/action/today';	  
	  import CommunicationEmail from 'material-ui/svg-icons/communication/email';
	  import ActionLock from 'material-ui/svg-icons/action/lock';
	  import Avatar from 'material-ui/Avatar';
	  import {Row, Col} from 'react-grid-system';

	  
	  const gap={
	  	paddingBottom:10
	  }
	  export default class SignUpCompTwo extends React.Component {
	  	constructor(props){
	  		super(props)	  		
	  		console.log(props)
	  		let tmpDate=new Date();
	  		let minDate = new Date(1900,tmpDate.getMonth(),tmpDate.getDate() );
	  		let maxDate = new Date(1999,tmpDate.getMonth(),tmpDate.getDate() );

	  		this.state = {
	  			minDate: minDate,
	  			maxDate: maxDate,
	  		}

	  	}
	  	componentWillMount() {
	  		this.props.dob(null,this.state.maxDate)
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
	  			name="fathername"
	  			type="text"
	  			required

	  			hintText="Father Name"
	  			onChange={this.props.fatherName}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<ActionAccountBox/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="mothername"
	  			type="text"
	  			required

	  			hintText="Mother Name"
	  			onChange={this.props.motherName}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<ActionToday/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<DatePicker
	  			name="dob"
	  			autoOk={true}
	  			minDate={this.state.minDate}
	  			maxDate={this.state.maxDate}
	  			defaultDate={this.state.maxDate}
	  			onChange={this.props.dob}
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
