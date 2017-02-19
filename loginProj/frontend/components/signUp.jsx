	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import Request from "superagent";
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';
	  import FormsyText from 'formsy-material-ui/lib/FormsyText';
	  import ActionAccountBox from 'material-ui/svg-icons/action/account-box';	  
	  import CommunicationEmail from 'material-ui/svg-icons/communication/email';
	  import ActionLock from 'material-ui/svg-icons/action/lock';
	  import TextField from 'material-ui/TextField';
	  import Avatar from 'material-ui/Avatar';
	  import {Link} from 'react-router';
	  import {Container,Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
	  import Paper from 'material-ui/Paper';

	  const style = {
	  	height: 310,
	  	width: 370,
	  	marginLeft: "auto",
	  	marginRight:"auto",
	  	marginTop:"5%"
	  	
	  };
	  const gap={
	  	paddingBottom:10
	  }
	  export default class Login extends React.Component {
	  	constructor(props){
	  		super(props)
	  		this.state={
	  			name:"",
	  			password:"",
	  			repassword:"",
	  			email:"",
	  			btnControl:true,
	  			show:""
	  		}
	  		console.log(this.state)
	      //this.addUser=this.addUser.bind(this);

	      this.enableButton = this.enableButton.bind(this);
	      this.disableButton = this.disableButton.bind(this);
	      this.name=this.name.bind(this);
	      this.email=this.email.bind(this);
	      this.password=this.password.bind(this);
	      this.rePassword=this.rePassword.bind(this);
	  }

	  name(event,value)
	  {
	  	
	  	this.setState({
	  		name:value
	  	})

	  }
	  email(event,value)
	  {
	  	
	  	this.setState({
	  		email:value
	  	})

	  }
	  password(event,value)
	  {
	  	
	  	this.setState({
	  		password:value
	  	})
	  }
	  rePassword(event,value)
	  {
	  	
	  	this.setState({
	  		repassword:value
	  	})
	  	console.log(this.state.password,this.state.repassword)
	  }

	  addUser()
	  {
	  	if(this.state.password===this.state.repassword)
	  	{
	  		let url =`http://localhost:8081/register`;
	  		let user={
	  			name:this.state.name,
	  			email:this.state.email.toLowerCase(),
	  			password:this.state.password
	  		}
	  		console.log(user)
	  		let that = this;
	  		Request
	  		.post(url)
	  		.send({'data':user})
	  		.end(function(err, res){
	  			if(err){
	  				that.setState({
	  					show:""+err
	  				})
	  			}
	  			else
	  			{
	  				let data=JSON.parse(res.text)
	  				that.setState({
	  					show:data.msg
	  				})
	  				that.refs.form.reset()
	  				console.log(data.msg)	
	  			}
	  			
	  		});
	  	}
	  	else
	  	{
	  		this.setState({
	  			show:"PASSWORDS NOT MATCHING"
	  		})
	  	}
	  }
	  
	  enableButton() {
	  	this.setState(()=>({
	  		btnControl: true
	  	}));
	  }
	  disableButton() {
	  	this.setState(()=>({
	  		btnControl: false
	  	}));
	  }

	  render(){
	  	return(
	  		<div style={style}>
	  		<Paper style={style} zDepth={2}>
	  		<Container style={{paddingTop:20}}>
	  		<Formsy.Form
	  		ref="form"
	  		onValid={this.enableButton}
	  		onInvalid={this.disableButton}
	  		onValidSubmit={this.addUser.bind(this)}
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
	  		onChange={this.name}
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
	  		onChange={this.email}
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
	  		onChange={this.password}
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
	  		onChange={this.rePassword}
	  		/>
	  		</Col>	
	  		</Row>
	  		<Row style={gap}>
	  		<Col >
	  		<RaisedButton label="SignUp" type="submit" secondary={true} fullWidth={true} disabled={!this.state.btnControl}/>

	  		</Col>
	  		
	  		</Row>
	  		</Formsy.Form>
	  		</Container>
	  		</Paper>
	  		{
	  			this.state.show!==""?
	  			<div>
	  			<h1 style={{textAlign:"center",fontFamily: "sans-serif",fontSize: 18,color: "#4b70ff"}}>{this.state.show}</h1>
	  			<div style={{ marginLeft: "auto", marginRight: "auto", width: 100}}>
	  			<Link to= '/' >
	  			<RaisedButton label="Go Back" primary={true}  />
	  			</Link>
	  			</div>
	  			</div>
	  			:<div style={{ paddingTop:25,marginLeft: "auto", marginRight: "auto", width: 100}}>	
	  			<Link to= '/'>
	  			<RaisedButton label="Go Back" primary={true}  />
	  			</Link>
	  			</div>
	  		}
	  		</div>
	  		)
	  }
	}
	