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

	  const layStyle = {
	  	height: 276,
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
	  			details:[]
	  		}
	  		
	  		this.expYr=this.expYr.bind(this);
	  		this.comName=this.comName.bind(this);
	  		this.addDetails=this.addDetails.bind(this);
	  		this.deleteDetails=this.deleteDetails.bind(this);
	  	}


	  	
	  	comName(event,value) { this.setState({ companyName:value.toUpperCase() }) }
	  	expYr(event,value) { this.setState({ yrOfExp:value+" year(s)" }) }
	  	
	  	addDetails()
	  	{
	  		
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
	  	deleteDetails(id)
	  	{
	  		let tempDetails=[]
	  		this.props.expDetails.map(function(data,index){
	  			if(index!==id)
	  				tempDetails.push(data)
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
	  			onValidSubmit={this.props.addUser}
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
	  			required
	  			hintText="company name"
	  			validations="isAlpha"
	  			validationError="type only letters"
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
	  			required
	  			hintText="Experience in years"
	  			type="number"
	  			validations="isNumeric"
	  			validationError="type only numbers"
	  			onChange={this.expYr}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col style={{paddingBottom: 20}}>
	  			<RaisedButton label="Next" type="submit" secondary={true} fullWidth={false} style={{float:'right',height:34,marginLeft:10}} disabled={!this.props.btnControl}/>

	  			<RaisedButton label="Add" onClick={this.addDetails} secondary={true} style={{float:'right',height:34,marginLeft:10}} fullWidth={false} disabled={!this.props.btnControl}/>
	  			</Col>
	  			</Row>
	  			
	  			</Formsy.Form>
	  			</div>

	  			{
	  				this.props.expDetails.length!==0?	
	  				<div style={{fontSize:'13px'}}>  
	  				<Row style={gap}>	
	  				<Col xl={3} lg={3} md={3} sm={6} xs={6}>Company</Col>
	  				<Col xl={3} lg={3} md={3} sm={6} xs={6}>Experience</Col>
	  				<Col xl={3} lg={3} md={3} sm={6} xs={6}>Action</Col>
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