	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';
	  import IconButton from 'material-ui/IconButton';
	  import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';	
	  import ActionLock from 'material-ui/svg-icons/action/lock';
	  import Avatar from 'material-ui/Avatar';
	  import {Row, Col,Container} from 'react-grid-system';
	  import TextField from 'material-ui/TextField';
	  import FormsyText from 'formsy-material-ui/lib/FormsyText';
	  import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
	  import MenuItem from 'material-ui/MenuItem';
	  import DatePicker from 'material-ui/DatePicker';
	  import ShowEdu from './showEdu'
	  import ShowExp from './showExp'

	  import Formsy from 'formsy-react';

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

	  Formsy.addValidationRule('checkMin', function (values, value) {
	  	return value>=0 && value<=100;
	  })

	  export default class VerifyCompFive extends React.Component {
	  	constructor(props){
	  		super(props)	  		
	  		console.log("from the props",props.userDetails)
	  		let tmpDate=new Date();
	  		let minDate = new Date(1900,tmpDate.getMonth(),tmpDate.getDate() );
	  		let maxDate = new Date(1999,tmpDate.getMonth(),tmpDate.getDate() );
	  		this.state={
	  			minDate: minDate,
	  			maxDate: maxDate,
	  			name:this.props.userDetails.name,	  		
	  			email:this.props.userDetails.email,
	  			password:this.props.userDetails.password,
	  			fatherName:this.props.userDetails.fatherName,
	  			motherName:this.props.userDetails.motherName,
	  			dob:this.props.userDetails.dob,
	  			perAdd:this.props.userDetails.perAdd,
	  			currAdd:this.props.userDetails.currAdd,
	  			eduDetails:this.props.userDetails.eduDetails,
	  			expDetails:this.props.userDetails.expDetails,
	  			// name:"name",	  		
	  			// email:"email@email.com",
	  			// fatherName:"fatherName",
	  			// motherName:"motherName",
	  			// dob:maxDate,
	  			// perAdd:{
	  			// 	street1:"dummy",
	  			// 	street2:"dummy",
	  			// 	states:"dummy",
	  			// 	city:"dummy",
	  			// 	zip:"dummy"
	  			// },
	  			// currAdd:{
	  			// 	street1:"dummy",
	  			// 	street2:"dummy",
	  			// 	states:"dummy",
	  			// 	city:"dummy",
	  			// 	zip:"dummy"
	  			// },
	  			// eduDetails:[{
	  			// 	examType:'10th grade',
	  			// 	eduBoard:'NONE',
	  			// 	percent:22,
	  			// 	id:0
	  			// },
	  			// {
	  			// 	examType:'10th grade',
	  			// 	eduBoard:'NONE',
	  			// 	percent:0,
	  			// 	id:1
	  			// }
	  			// ],
	  			// expDetails:[
	  			// {
	  			// 	companyName:"WIPRO",
	  			// 	yrOfExp:2,
	  			// 	id:0
	  			// },
	  			// {
	  			// 	companyName:"ZOHO",
	  			// 	yrOfExp:1,
	  			// 	id:1
	  			// }
	  			// ],
	  			generalDetails:false,
	  			addressDetails:false,
	  			studyDetails:false,
	  			workDetails:false

	  		}

	  		console.log("from the states",this.state)
	  		this.name=this.name.bind(this);
	  		this.fatherName=this.fatherName.bind(this);
	  		this.education=this.education.bind(this);
	  		this.experience=this.experience.bind(this);
	  		this.motherName=this.motherName.bind(this);
	  		this.currAdd=this.currAdd.bind(this);
	  		this.perAdd=this.perAdd.bind(this);
	  		this.dob=this.dob.bind(this);
	  		this.email=this.email.bind(this);
	  		this.changeGeneral=this.changeGeneral.bind(this);
	  		this.changeAddress=this.changeAddress.bind(this);
	  		this.changeEducation=this.changeEducation.bind(this);
	  		this.changeExperience=this.changeExperience.bind(this);
	  		this.currStreet1=this.currStreet1.bind(this)
	  		this.currStreet2=this.currStreet2.bind(this)
	  		this.currStates=this.currStates.bind(this)
	  		this.currCity=this.currCity.bind(this)
	  		this.currZip=this.currZip.bind(this)
	  		this.perStreet1=this.perStreet1.bind(this)
	  		this.perStreet2=this.perStreet2.bind(this)
	  		this.perStates=this.perStates.bind(this)
	  		this.perCity=this.perCity.bind(this)
	  		this.perZip=this.perZip.bind(this)
	  		this.modEduData=this.modEduData.bind(this)
	  		this.modExpData=this.modExpData.bind(this)
	  		this.submitForm=this.submitForm.bind(this)

	  	}
	  	name(event,value) { this.setState({ name:value }) }
	  	fatherName(event,value) { this.setState({ fatherName:value }) }
	  	motherName(event,value) { this.setState({ motherName:value }) }
	  	dob(event,value) { this.setState({ dob:value }) }
	  	perAdd(value) { this.setState({ perAdd:value }) }
	  	currAdd(value) { this.setState({ currAdd:value }) }
	  	email(event,value) { this.setState({ email:value }) }
	  	education(value) { this.setState({ eduDetails:value }) }
	  	experience(value) { this.setState({ expDetails:value }) }
	  	currStreet1(event,value) { 
	  		let tempAdd=this.state.currAdd
	  		tempAdd.street1=value
	  		this.setState({ 
	  			currAdd:tempAdd
	  		})
	  	}
	  	currStreet2(event,value) { 
	  		let tempAdd=this.state.currAdd
	  		tempAdd.street2=value
	  		this.setState({ 
	  			currAdd:tempAdd
	  		})
	  	}
	  	currStates(event,value) { 
	  		let tempAdd=this.state.currAdd
	  		tempAdd.states=value
	  		this.setState({ 
	  			currAdd:tempAdd
	  		})
	  	}
	  	currCity(event,value) { 
	  		let tempAdd=this.state.currAdd
	  		tempAdd.city=value
	  		this.setState({ 
	  			currAdd:tempAdd
	  		})
	  	}
	  	currZip(event,value) { 
	  		let tempAdd=this.state.currAdd
	  		tempAdd.zip=value
	  		this.setState({ 
	  			currAdd:tempAdd
	  		})
	  	}
	  	perStreet1(event,value) {
	  		let tempAdd=this.state.perAdd
	  		tempAdd.street1=value
	  		this.setState({ 
	  			perAdd:tempAdd
	  		})
	  	}
	  	perStreet2(event,value) {
	  		let tempAdd=this.state.perAdd
	  		tempAdd.street2=value
	  		this.setState({ 
	  			perAdd:tempAdd
	  		})
	  	}
	  	perStates(event,value) {
	  		let tempAdd=this.state.perAdd
	  		tempAdd.states=value
	  		this.setState({ 
	  			perAdd:tempAdd
	  		})
	  	}
	  	perCity(event,value) {
	  		let tempAdd=this.state.perAdd
	  		tempAdd.city=value
	  		this.setState({ 
	  			perAdd:tempAdd
	  		})
	  	}
	  	perZip(event,value) {
	  		let tempAdd=this.state.perAdd
	  		tempAdd.zip=value
	  		this.setState({ 
	  			perAdd:tempAdd
	  		})
	  	}

	  	changeGeneral()
	  	{
	  		let toggle=this.state.generalDetails
	  		this.setState({generalDetails:!toggle})
	  		console.log(this.state.generalDetails)

	  	}

	  	changeAddress()
	  	{
	  		let toggle=this.state.addressDetails
	  		this.setState({addressDetails:!toggle})
	  		console.log(this.state.addressDetails)

	  	}
	  	changeEducation()
	  	{
	  		let toggle=this.state.studyDetails
	  		this.setState({studyDetails:!toggle})
	  		console.log(this.state.studyDetails)

	  	}
	  	changeExperience()
	  	{
	  		let toggle=this.state.workDetails
	  		this.setState({workDetails:!toggle})
	  		console.log(this.state.workDetails)

	  	}
	  	modEduData(data,index)
	  	{
	  		let eduData=this.state.eduDetails
	  		eduData[index]=data
	  		this.setState({
	  			eduDetails:eduData
	  		})
	  		console.log(this.state)
	  	}
	  	modExpData(data,index)
	  	{
	  		let expData=this.state.expDetails
	  		expData[index]=data
	  		this.setState({
	  			expDetails:expData
	  		})
	  		console.log(this.state)
	  	}
	  	submitForm()
	  	{
	  		this.props.addUser(this.state)
	  	}
	  	render(){
	  		const that=this
	  		return(
	  			<Formsy.Form
	  			ref="form"
	  			onValid={this.props.enableButton}
	  			onInvalid={this.props.disableButton}
	  			onValidSubmit={this.submitForm}
	  			>
	  			<Container>
	  			<Row >
	  			<Col xl={6} lg={6} md={6}>
	  			<h1 style={desStyle}>General Details</h1>
	  			</Col>
	  			<Col xl={6} lg={6} md={6} style={{float:'right'}}>
	  			<IconButton style={{float:'right'}} tooltip="edit" tooltipPosition='top-center' onClick={this.changeGeneral}>
	  			<EditorModeEdit/>
	  			</IconButton>
	  			</Col>
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={4} lg={4} md={4}>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="name"
	  			floatingLabelText="Name"
	  			disabled={!this.state.generalDetails}
	  			onChange={this.name}
	  			id="name"
	  			value={this.state.name}
	  			/>
	  			</Col>
	  			<Col xl={4} lg={4} md={4}>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="email"
	  			floatingLabelText="e-mail"
	  			disabled={!this.state.generalDetails}
	  			onChange={this.email}
	  			id="email"
	  			validations="isEmail"
	  			validationError="give a valid one"
	  			value={this.state.email}
	  			/>
	  			</Col>
	  			<Col xl={4} lg={4} md={4}>
	  			<DatePicker
	  			required
	  			value={this.state.dob}
	  			fullWidth={true}
	  			name="dob"
	  			disabled={!this.state.generalDetails}
	  			floatingLabelText="Date of Birth"
	  			id="dob"
	  			autoOk={true}
	  			minDate={this.state.minDate}
	  			maxDate={this.state.maxDate}
	  			defaultDate={this.state.maxDate}
	  			onChange={this.dob}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={6} lg={6} md={6}>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="fname"
	  			floatingLabelText="Father Name"
	  			disabled={!this.state.generalDetails}
	  			onChange={this.fatherName}
	  			id="fName"
	  			value={this.state.fatherName}
	  			/>
	  			</Col>
	  			<Col xl={6} lg={6} md={6}>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="mname"
	  			floatingLabelText="Mother Name"
	  			disabled={!this.state.generalDetails}
	  			onChange={this.motherName}
	  			id="mName"
	  			value={this.state.motherName}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row >
	  			<Col xl={6} lg={6} md={6}>
	  			<h1 style={desStyle}>Address Details</h1>
	  			</Col>
	  			<Col xl={6} lg={6} md={6} style={{float:'right'}}>
	  			<IconButton style={{float:'right'}} tooltip="edit" tooltipPosition='top-center' onClick={this.changeAddress}>
	  			<EditorModeEdit/>
	  			</IconButton>
	  			</Col>
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={6} lg={6} md={6}>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="currstreet1"
	  			floatingLabelText="Street 1"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.currStreet1}
	  			value={this.state.currAdd.street1}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="currStreet2"
	  			floatingLabelText="Street 2"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.currStreet2}
	  			value={this.state.currAdd.street2}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="currstate"
	  			floatingLabelText="State"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.currStates}
	  			value={this.state.currAdd.states}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="currcity"
	  			floatingLabelText="City"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.currCity}
	  			value={this.state.currAdd.city}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="currzip"
	  			type="number"
	  			floatingLabelText="Zip"
	  			validations="isNumeric,minLength:6,maxLength:6"
	  			validationError="give a valid ZIP code "

	  			disabled={!this.state.addressDetails}
	  			onChange={this.currZip}
	  			value={this.state.currAdd.zip}
	  			/>
	  			</Col>
	  			</Row>
	  			</Col>

	  			<Col xl={6} lg={6} md={6}>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="perStreet1"
	  			floatingLabelText="Street 1"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.perStreet1}
	  			value={this.state.perAdd.street1}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="perstreet2"
	  			floatingLabelText="Street 2"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.perStreet2}
	  			value={this.state.perAdd.street2}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="perstate"
	  			floatingLabelText="State"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.perStates}
	  			value={this.state.perAdd.states}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="percity"
	  			floatingLabelText="City"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.perCity}
	  			value={this.state.perAdd.city}
	  			/>
	  			</Col>
	  			</Row>
	  			<Row>
	  			<Col>
	  			<FormsyText
	  			required
	  			fullWidth={true}
	  			name="perzip"
	  			floatingLabelText="Zip"
	  			validations="isNumeric,minLength:6,maxLength:6"
	  			validationError="give a valid ZIP code "
	  			type="number"
	  			disabled={!this.state.addressDetails}
	  			onChange={this.perZip}
	  			value={this.state.perAdd.zip}
	  			/>
	  			</Col>
	  			</Row>
	  			</Col>
	  			</Row>
	  			<Row >
	  			<Col xl={6} lg={6} md={6}>
	  			<h1 style={desStyle}>Education Details</h1>
	  			</Col>
	  			<Col xl={6} lg={6} md={6} style={{float:'right'}}>
	  			<IconButton style={{float:'right'}} tooltip="edit" tooltipPosition='top-center' onClick={this.changeEducation}>
	  			<EditorModeEdit/>
	  			</IconButton>
	  			</Col>
	  			</Row>
	  			<Row style={gap}>
	  			{
	  				this.state.eduDetails.map((eachDetail,index)=>{

	  					return <ShowEdu key={index}
	  					index={index} 
	  					modEduData={this.modEduData}
	  					eduData={eachDetail} 
	  					studyDetails={this.state.studyDetails}/>
	  				})
	  			}
	  			</Row>
	  			{
	  				this.state.expDetails.length!==0?
	  				<div>
	  				<Row >
	  				<Col xl={6} lg={6} md={6}>
	  				<h1 style={desStyle}>Experience Details</h1>
	  				</Col>
	  				<Col xl={6} lg={6} md={6} style={{float:'right'}}>
	  				<IconButton style={{float:'right'}} tooltip="edit" tooltipPosition='top-center' onClick={this.changeExperience}>
	  				<EditorModeEdit/>
	  				</IconButton>
	  				</Col>
	  				</Row>
	  				<Row style={gap}>
	  				{
	  					this.state.expDetails.map((eachDetail,index)=>{

	  						return <ShowExp key={index}
	  						index={index} 
	  						modExpData={this.modExpData}
	  						expData={eachDetail} 
	  						workDetails={this.state.workDetails}/>
	  					})
	  				}
	  				</Row>
	  				</div>
	  				:null
	  			}
	  			<Row>
	  			<Col>
	  			<RaisedButton label="Submit" type="submit" secondary={true} fullWidth={false} style={{float:'right',height:34,marginLeft:10,marginBottom:20}} disabled={!this.props.btnControl}/>

	  			</Col>
	  			</Row>
	  			</Container>
	  			</Formsy.Form>
	  			)
	}
}
