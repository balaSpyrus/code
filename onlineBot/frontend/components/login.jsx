		  import React from 'react';
		  import ReactDOM from 'react-dom';
		  import RaisedButton from 'material-ui/RaisedButton';	
		  import FontIcon from 'material-ui/FontIcon';	  	  
		  import Request from "superagent"
		  import FormsyText from 'formsy-material-ui/lib/FormsyText';
		  import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
		  import ActionLock from 'material-ui/svg-icons/action/lock';
		  import TextField from 'material-ui/TextField';
		  import Avatar from 'material-ui/Avatar';
		  import {Link} from 'react-router';
		  import {Container,Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
		  import Paper from 'material-ui/Paper';
		  import AppBar from 'material-ui/AppBar';


		  const style = {
		  	height: 200,
		  	width: 370,
		  	marginLeft: "auto",
		  	marginRight:"auto",
		  	marginTop:"15%"

		  };
		  const gap={
		  	paddingBottom:10
		  }
		  export default class Login extends React.Component {
		  	constructor(props){
		  		super(props)
		  		this.state={
		  			email:"",
		  			password:"",
		  			btnControl:true,
		  			swap:"",
		  			show:"",
		  			message:""
		  		}
		  		this.enableButton = this.enableButton.bind(this);
		  		this.disableButton = this.disableButton.bind(this);
		  		this.email=this.email.bind(this);
		  		this.password=this.password.bind(this);
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
		  	login(){
		  		let that=this;
		  		Request
		  		.post('http://127.0.0.1:5000/login')
		  		.send({userName:this.state.email,password:this.state.password})
		  		.set('Content-Type','application/json;charset=utf-8')
		  		.end(function(err, res){
		  			if(err){
		  				that.setState({
		  					show:""+err
		  				})
		  			}
		  			else
		  			{
		  				console.log(res.text)
		  				if(res.text=='Login Success')
		  				{
		  					that.setState({ message:"login success"})
		  					var user=that.state.email.split('@');
		  					localStorage['userName']=user[0]
		  					that.props.router.push('/loginSuccess');
		  				}
		  				else
		  					alert('Login Fail')
		  			}
		  		})
		  		
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
		  			<div>
		  			<AppBar
		  			showMenuIconButton={false}
		  			title={
		  				<img 
		  				src='http://17776-presscdn-0-6.pagely.netdna-cdn.com/wp-content/themes/wiprodigital/images/wdlogo.png' 
		  				width='140' alt='wiproDigital' style={{marginTop:7,position:'fixed'}} />
		  			}/>
		  			{
		  				<div style={style}>
		  				<Paper style={style} zDepth={2}>
		  				<Container style={{paddingTop:40}}>

		  				<Formsy.Form
		  				ref="form"
		  				onValid={this.enableButton}
		  				onInvalid={this.disableButton}
		  				onValidSubmit={this.login.bind(this)}
		  				>

		  				<Row style={gap}>
		  				<Col xl={2} lg={2} md={2} sm={2} xs={2} >
		  				<Avatar icon={<ActionAccountBox/>} />
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
		  				<Col >
		  				
		  				<RaisedButton label="Log In" type="submit" primary={true} fullWidth={true} disabled={!this.state.btnControl}/>

		  				</Col>

		  				</Row>
		  				</Formsy.Form>
		  				</Container>
		  				</Paper>
		  				
		  				{
		  					this.state.message=='Login failed'?
		  					<div>
		  					<h3>{this.state.message}</h3>
		  					</div>:''
		  				}
		  				</div>


		  			}
		  			</div>
		  			)

		  	}
		  }
