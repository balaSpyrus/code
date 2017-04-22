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

		  const style = {
		  	height: 200,
		  	width: 370,
		  	marginLeft: "auto",
		  	marginRight:"auto",
		  	marginTop:"15%"

		  };
		  const gap={
		  	paddingBottom:10
		  };
		  const dataStyle={
		  	textAlign:"center",
		  	fontFamily: "sans-serif",
		  	color: "#4b70ff"
		  }
		  export default class Login extends React.Component {
		  	constructor(props){
		  		super(props)
		  		this.state={
		  			email:"",
		  			password:"",
		  			btnControl:true,
		  			swap:"",
		  			show:""
		  		}
		  		this.enableButton = this.enableButton.bind(this);
		  		this.disableButton = this.disableButton.bind(this);
		  		this.email=this.email.bind(this);
		  		this.password=this.password.bind(this);
		  		this.login=this.login.bind(this);
		  		this.jsonString=this.jsonString.bind(this);
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
		  		let url =`http://localhost:8081/login`;
		  		let login={

		  			email:this.state.email.toLowerCase(),
		  			password:this.state.password
		  		}

		  		let that = this;
		  		Request
		  		.post(url)
		  		.send({'data':login})
		  		.end(function(err, res){
		  			if(err){
		  				that.setState({
		  					show:""+err
		  				})
		  			}
		  			let data=JSON.parse(res.text).msg
		  			console.log(data)
		  			if(data==="INCORRECT USERNAME/PASSWORD" || data==="USER NOT FOUND")
		  			{

		  				that.setState({
		  					show:data.toUpperCase()
		  				})

		  			}
		  			else
		  			{
		  				let keys=Object.keys(data)
		  				let values=Object.values(data)
		  				let stringData=''
		  				keys.map(function(key,i){
		  					if(typeof values[i]!== 'string')
		  					{
		  						stringData+=that.jsonString(values[i])
		  					}
		  					else
		  					{
		  						stringData+=key+" : "+values[i]+","	
		  					}
		  				})
		  				console.log(stringData)
		  				that.setState({
		  					swap:stringData
		  				})

		  			}

		  		});

		  	}
		  	jsonString(data)
		  	{
		  		let that=this
		  		let keys=Object.keys(data)
		  		let values=Object.values(data)
		  		let stringData=''
		  		if(typeof data!=='string')
		  		{
		  			if(data.length === undefined)
		  			{
		  				keys.map(function(key,i){
		  					stringData+=key+" : "+values[i]+","	
		  				})
		  			}
		  			else
		  			{
		  				
		  				data.map(function(arrData){
		  					stringData+=that.jsonString(arrData)
		  				})
		  			}
		  		}
		  		return stringData
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
		  			{
		  				this.state.swap!==""?
		  				<div style={{marginTop:"20%"}}>
		  				<h1 style={dataStyle}>Welcome...!!</h1>
		  				{
		  					this.state.swap.split(',').map(function(eachDetail,index){
		  						return <h1 style={dataStyle} key={index} >{eachDetail}</h1>
		  					})
		  				}
		  				<div style={{ marginLeft: "auto", marginRight: "auto", width: 100}}>
		  				<Link to= '/' >
		  				<RaisedButton label="Go Back" primary={true}  />
		  				</Link>
		  				</div>
		  				</div>
		  				:
		  				<div style={style}>
		  				<Paper style={style} zDepth={2}>
		  				<Container style={{paddingTop:40}}>

		  				<Formsy.Form
		  				ref="form"
		  				onValid={this.enableButton}
		  				onInvalid={this.disableButton}
		  				onValidSubmit={this.login}
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


		  			}
		  			</div>
		  			)

		  	}
		  }
