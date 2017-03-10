	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import Request from "superagent";
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';
	  import SignUpComp from './signPageComp';
	  import {Link} from 'react-router';
	  import {Container} from 'react-grid-system';
	  import Paper from 'material-ui/Paper';

	  const style = {
	  	height: 310,
	  	width: 370,
	  	marginLeft: "auto",
	  	marginRight:"auto",
	  	marginTop:"5%"
	  	
	  };
	  
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
	  		this.addUser=this.addUser.bind(this);
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
	  		console.log(this.state);
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
	  			<SignUpComp
	  			addUser={this.addUser}
	  			enableButton={this.enableButton}
	  			disableButton={this.disableButton}
	  			name={this.name}
	  			email={this.email}
	  			password={this.password}
	  			rePassword={this.rePassword}
	  			btnControl={this.state.btnControl}
	  			/>
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
