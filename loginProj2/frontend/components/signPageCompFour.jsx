	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';
	  import FormsyText from 'formsy-material-ui/lib/FormsyText';
	  import ActionAccountBox from 'material-ui/svg-icons/action/account-box';	  
	  import CommunicationEmail from 'material-ui/svg-icons/communication/email';
	  import ActionLock from 'material-ui/svg-icons/action/lock';
	  import Avatar from 'material-ui/Avatar';
	  import DetailsExp from './detailsExp';
	  import {Row, Col} from 'react-grid-system';
	  import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
	  import MenuItem from 'material-ui/MenuItem';
	  import Formsy from 'formsy-react';
	  import Checkbox from 'material-ui/Checkbox';

	  Formsy.addValidationRule('checkExp', function (values, value) {
	  	return value<=25;
	  })

	  const layStyle = {
	  	height: 220,
	  	width: 370,
	  	marginLeft: "auto",
	  	marginRight:"auto",
	  	
	  }
	  const outerStyle = {
	  	width:"50%",
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

	  export default class SignUpCompFour extends React.Component {
	  	constructor(props){
	  		super(props)	  		
	  		console.log(props)
	  		
	  		this.state={
	  			companyName:'',
	  			yrOfExp:'',
	  			details:[],
	  			checked:false
	  		}
	  		
	  		this.expYr=this.expYr.bind(this);
	  		this.comName=this.comName.bind(this);
	  		this.addDetails=this.addDetails.bind(this);
	  		this.deleteDetails=this.deleteDetails.bind(this);
	  		this.submitForm=this.submitForm.bind(this);
	  		this.noWork=this.noWork.bind(this)
	  	}


	  	
	  	comName(event,value) { this.setState({ companyName:value.toUpperCase() }) }
	  	expYr(event,value) { this.setState({ yrOfExp:value }) }

	  	noWork(event,checkedStatus)
	  	{
	  		
	  		if(checkedStatus === true)
	  		{
	  			this.setState({
	  				checked:checkedStatus,
	  				yrOfExp:0,
	  				companyName:'NONE'
	  			})
	  			this.props.experience([])
	  		}
	  		else
	  		{
	  			this.setState({
	  				checked:checkedStatus,
	  				yrOfExp:'',
	  				companyName:''
	  			})
	  			this.props.experience(this.state.details)
	  		}
	  		

	  	}
	  	submitForm()
	  	{
	  		console.log('im in the submit form function')
	  		if(this.state.details.length===0 && this.state.checked===false)
	  		{
	  			this.props.showMsg('Please add atleast one experience')
	  		}
	  		else
	  		{
	  			this.props.showMsg('')
	  			this.props.addUser()
	  		}
	  	}
	  	
	  	addDetails()
	  	{
	  		
	  		if(this.state.companyName==='' || this.state.yrOfExp==='')
	  		{
	  			this.props.showMsg('Cannot add empty values')

	  		}
	  		else
	  		{
	  			this.props.showMsg('')

	  			let data={

	  				companyName:this.state.companyName,
	  				yrOfExp:this.state.yrOfExp,
	  				id:this.props.expDetails.length

	  			}
	  			let tempDetails=this.props.expDetails;
	  			let flag=false;
	  			tempDetails.map(function(tempData,index){
	  				if(tempData.companyName === data.companyName)
	  					flag=true
	  			})
	  			if(flag === false)
	  			{
	  				tempDetails.push(data);
	  				this.props.showMsg('')
	  			}
	  			else
	  			{
	  				this.props.showMsg('Duplicate details for '+data.companyName)
	  			}
	  			this.setState({

	  				companyName:'',
	  				yrOfExp:'',
	  				details:tempDetails

	  			})
	  			this.props.experience(tempDetails)
	  			this.refs.form.reset()
	  		}
	  		
	  	}
	  	deleteDetails(id)
	  	{
	  		let tempDetails=[]
	  		this.props.expDetails.map(function(data,index){
	  			if(index!==id)
	  				tempDetails.push(data)
	  		})
	  		this.setState({
	  			details:tempDetails
	  		})
	  		this.props.experience(tempDetails)
	  	}
	  	

	  	render(){
	  		const that=this;
	  		return(
	  			<div style={outerStyle}>
	  			<div style={layStyle}>
	  			<Formsy.Form
	  			ref="form"
	  			onValid={this.props.enableButton}
	  			onInvalid={this.props.disableButton}
	  			onValidSubmit={this.submitForm}
	  			>
	  			<h1 style={desStyle}>Experience Details</h1>
	  			
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<CommunicationEmail/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="comName"
	  			type="text"
	  			
	  			disabled={this.state.checked}
	  			value={this.state.companyName}
	  			hintText="company name"
	  			onChange={this.comName}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<ActionLock/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="experience"
	  			
	  			disabled={this.state.checked}
	  			value={this.state.yrOfExp}
	  			hintText="Experience in years"
	  			type="number"
	  			validations="isNumeric,checkExp"
	  			validationError="Type valid Experience"
	  			onChange={this.expYr}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={5} lg={5} md={5} sm={5} xs={5} style={{paddingRight:0}}>
	  			<Checkbox
	  			style={{width:150,fontSize:15,paddingTop:5,float:'right'}}
	  			label="Not working!!"
	  			onCheck={this.noWork}
	  			/>
	  			</Col>
	  			<Col xl={7} lg={7} md={7} sm={7} xs={7} style={{paddingBottom: 20}}>
	  			<RaisedButton label="Next" type="submit" secondary={true} fullWidth={false} style={{float:'right',height:34,marginLeft:10}} disabled={!this.props.btnControl}/>

	  			<RaisedButton label="Add" onClick={this.addDetails} secondary={true} style={{float:'right',height:34,marginLeft:10}} fullWidth={false} disabled={this.state.checked===true?true:!this.props.btnControl}/>
	  			</Col>
	  			</Row>
	  			
	  			</Formsy.Form>
	  			</div>

	  			{
	  				this.props.expDetails.length!==0?	
	  				<div style={{fontSize:'15px',width:'70%',marginLeft:'auto',marginRight:'auto',paddingLeft:50}}>  
	  				<Row style={gap}>	
	  				<Col xl={4} lg={4} md={4} sm={6} xs={6}>Company</Col>
	  				<Col xl={4} lg={4} md={4} sm={6} xs={6}>Experience</Col>
	  				<Col xl={4} lg={4} md={4} sm={6} xs={6}>Action</Col>
	  				</Row>				
	  				{	  					
	  					this.props.expDetails.map(
	  						(eachDetail,index)=><DetailsExp key={index} index={index}	
	  						eachDetail={eachDetail} deleteDetails={that.deleteDetails}/>
	  						)
	  				}  	
	  				</div>
	  				:null
	  			}
	  			
	  			</div>
	  			)
	  	}
	  }
