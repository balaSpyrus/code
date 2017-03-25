	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';	
	  import Checkbox from 'material-ui/Checkbox';
	  import DatePicker from 'material-ui/DatePicker';
	  import FormsyText from 'formsy-material-ui/lib/FormsyText';
	  import ActionAccountBox from 'material-ui/svg-icons/action/account-box';	
	  import ActionToday from 'material-ui/svg-icons/action/today';	  
	  import CommunicationEmail from 'material-ui/svg-icons/communication/email';
	  import ActionLock from 'material-ui/svg-icons/action/lock';
	  import Avatar from 'material-ui/Avatar';
	  import AddressComp from './addressComp';
	  import {Row, Col} from 'react-grid-system';
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
	  export default class SignUpCompTwo extends React.Component {
	  	constructor(props){
	  		super(props)	  		
	  		console.log(props)
	  		let tmpDate=new Date();
	  		let minDate = new Date(1900,tmpDate.getMonth(),tmpDate.getDate() );
	  		let maxDate = new Date(1999,tmpDate.getMonth(),tmpDate.getDate() );
	  		this.copyAdd=this.copyAdd.bind(this)
	  		this.currAdd=this.currAdd.bind(this)
	  		this.state = {
	  			minDate: minDate,
	  			maxDate: maxDate,
	  			addCopy:false,
	  			colSize:4,
	  			add:{}
	  		}

	  	}
	  	currAdd(value)
	  	{
	  		this.setState({
	  			add:value
	  		})
	  		this.props.currAdd(value)
	  	}
	  	copyAdd(event,checked)
	  	{
	  		if(checked ===true)
	  		{
	  			this.props.perAdd(this.state.add);
	  		}
	  		this.setState({
	  			addCopy:checked
	  		})
	  		if(this.state.colSize==4)
	  		{
	  			this.setState({	colSize:6 })
	  		}
	  		else
	  		{
	  			this.setState({	colSize:4 })
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
	  			<Col lg={this.state.colSize} xl={this.state.colSize} md={this.state.colSize}>
	  			<h1 style={desStyle}>Personal details</h1>
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
	  			</Col>
	  			<Col lg={this.state.colSize} xl={this.state.colSize} md={this.state.colSize}>
	  			<h1 style={desStyle}>{this.state.addCopy===false?'Current ':''}Address</h1>
	  			<AddressComp Add={this.currAdd}/>
	  			</Col>
	  			{
	  				this.state.addCopy===false?
	  				<Col lg={4} xl={4} md={4}>
	  				<h1 style={desStyle}>Permanent Address</h1>
	  				<AddressComp Add={this.props.perAdd}/>	  				
	  				</Col>
	  				:null
	  			}
	  			<Row style={gap}>
	  			<Col style={{float:'right'}}>
	  			<Col xl={11} lg={11} md={11} sm={11} xs={11}>
	  			<Checkbox
	  			style={{width:400,paddingTop:5,float:'right'}}
	  			label="is permanent address same as current ??"
	  			onCheck={this.copyAdd}
	  			/>
	  			</Col>
	  			<Col xl={1} lg={1} md={1} sm={1} xs={1}>
	  			<RaisedButton label="Next" type="submit" style={{float:'right'}} secondary={true} fullWidth={false} disabled={!this.props.btnControl}/>
	  			</Col>
	  			</Col>
	  			</Row>
	  			</Formsy.Form>
	  			)
	  	}
	  }
