	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';
	  import FormsyText from 'formsy-material-ui/lib/FormsyText';
	  import ActionAccountBox from 'material-ui/svg-icons/action/account-box';	  
	  import CommunicationEmail from 'material-ui/svg-icons/communication/email';
	  import ActionLock from 'material-ui/svg-icons/action/lock';
	  import Avatar from 'material-ui/Avatar';
	  import Formsy from 'formsy-react';
	  import Details from './details';
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

	  Formsy.addValidationRule('checkMin', function (values, value) {
	  	return value<=100;
	  })

	  export default class SignUpCompThree extends React.Component {
	  	constructor(props){
	  		super(props)	  		
	  		console.log(props)
	  		
	  		this.state={
	  			examType:'10th grade',
	  			eduBoard:'',
	  			percent:'',
	  			details:[]
	  		}
	  		this.onChangeSelect=this.onChangeSelect.bind(this);
	  		this.eBoard=this.eBoard.bind(this);
	  		this.percentObt=this.percentObt.bind(this);
	  		this.addDetails=this.addDetails.bind(this);
	  		this.deleteDetails=this.deleteDetails.bind(this);
	  	}


	  	
	  	eBoard(event,value) { this.setState({ eduBoard:value }) }
	  	percentObt(event,value) { this.setState({ percent:value+"%" }) }
	  	onChangeSelect(event, index){ this.setState({examType: index}) 	}

	  	addDetails()
	  	{
	  		
	  		let data={
	  			examType:this.state.examType,
	  			eduBoard:this.state.eduBoard,
	  			percent:this.state.percent,
	  			id:this.props.eduDetails.length
	  		}
	  		let tempDetails=this.props.eduDetails;
	  		let flag=false;
	  		tempDetails.map(function(tempData,index){
	  			if(tempData.examType === data.examType)
	  				flag=true
	  		})
	  		if(flag === false)
	  		{
	  			tempDetails.push(data);
	  			this.props.showMsg('')
	  		}
	  		else
	  		{
	  			this.props.showMsg('Duplicate details for '+data.examType)
	  		}
	  		this.setState({
	  			examType:'10th grade',
	  			eduBoard:'',
	  			percent:'',
	  			details:tempDetails

	  		})
	  		this.props.education(tempDetails)
	  		this.refs.form.reset()
	  		
	  	}
	  	deleteDetails(id)
	  	{
	  		let tempDetails=[]
	  		this.props.eduDetails.map(function(data,index){
	  			if(index!==id)
	  				tempDetails.push(data)
	  		})
	  		this.props.education(tempDetails)
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
	  			name="eboard"
	  			type="text"
	  			required
	  			hintText="education board"
	  			validations="isAlpha"
	  			validationError="type only letters"
	  			onChange={this.eBoard}
	  			/>
	  			</Col>	
	  			</Row>
	  			<Row style={gap}>
	  			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
	  			<Avatar icon={<ActionLock/>} />
	  			</Col>
	  			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
	  			<FormsyText
	  			name="percentage"
	  			required
	  			hintText="Percentage Obtained"
	  			type="number"
	  			validations="checkMin"
	  			validationError="not more than 100"
	  			onChange={this.percentObt}
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
	  				this.props.eduDetails.length!==0?	
	  				<div style={{fontSize:'13px'}}>  
	  				<Row style={gap}>	
	  				<Col xl={3} lg={3} md={3} sm={6} xs={6}>Exam Type</Col>
	  				<Col xl={3} lg={3} md={3} sm={6} xs={6}>Education Board</Col>
	  				<Col xl={3} lg={3} md={3} sm={6} xs={6}>Percentage</Col>
	  				<Col xl={3} lg={3} md={3} sm={6} xs={6}>Action</Col>
	  				</Row>				
	  				{	  					
	  					this.props.eduDetails.map(
	  						(eachDetail,index)=><Details key={index} index={index}	
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
