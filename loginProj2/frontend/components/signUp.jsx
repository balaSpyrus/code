	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import Request from "superagent";
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';
	  import SignUpCompOne from './signPageCompOne';
	  import SignUpCompTwo from './signPageCompTwo';
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
	  			fatherName:"",
	  			motherName:"",
	  			dob:null,
	  			perAdd:"",
	  			currAdd:"",
	  			counter:1,
	  			btnControl:true,
	  			show:""
	  		}
	  		console.log(this.state)
	  		this.comp1=this.comp1.bind(this);
	  		this.comp2=this.comp2.bind(this);
	  		this.enableButton = this.enableButton.bind(this);
	  		this.disableButton = this.disableButton.bind(this);
	  		this.name=this.name.bind(this);
	  		this.fatherName=this.fatherName.bind(this);
	  		this.motherName=this.motherName.bind(this);
	  		this.currAdd=this.currAdd.bind(this);
	  		this.perAdd=this.perAdd.bind(this);
	  		this.dob=this.dob.bind(this);
	  		this.email=this.email.bind(this);
	  		this.password=this.password.bind(this);
	  		this.rePassword=this.rePassword.bind(this);
	  	}

	  	name(event,value) { this.setState({ name:value }) }
	  	fatherName(event,value) { this.setState({ fatherName:value }) }
	  	motherName(event,value) { this.setState({ motherName:value }) }
	  	dob(event,value) { this.setState({ dob:value }) }
	  	perAdd(event,value) { this.setState({ perAdd:value }) }
	  	currAdd(event,value) { this.setState({ currAdd:value }) }
	  	email(event,value) { this.setState({ email:value }) }
	  	password(event,value) { this.setState({ password:value }) }
	  	rePassword(event,value) { this.setState({ repassword:value }) }

	  	comp1()
	  	{
	  		console.log(this.state);
	  		if(this.state.password===this.state.repassword)
	  		{
	  			let cnt=this.state.counter
	  			cnt++;
	  			this.setState({
	  				counter:cnt,
	  				btnControl:true
	  			})
	  			
	  			// let url =`http://localhost:8081/register`;
	  			// let user={
	  			// 	name:this.state.name,
	  			// 	email:this.state.email.toLowerCase(),
	  			// 	password:this.state.password
	  			// }
	  			// console.log(user)
	  			// let that = this;
	  			// Request
	  			// .post(url)
	  			// .send({'data':user})
	  			// .end(function(err, res){
	  			// 	if(err){
	  			// 		that.setState({
	  			// 			show:""+err
	  			// 		})
	  			// 	}
	  			// 	else
	  			// 	{
	  			// 		let data=JSON.parse(res.text)
	  			// 		that.setState({
	  			// 			show:data.msg
	  			// 		})
	  			// 		that.refs.form.reset()
	  			// 		console.log(data.msg)	
	  			// 	}

	  			// });
	  		}
	  		else
	  		{
	  			this.setState({
	  				show:"PASSWORDS NOT MATCHING"
	  			})
	  		}
	  	}
	  	comp2()
	  	{
	  		console.log(this.state)
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
	  			{
	  				this.state.counter===1?
	  				<SignUpCompOne
	  				addUser={this.comp1}
	  				enableButton={this.enableButton}
	  				disableButton={this.disableButton}
	  				name={this.name}
	  				email={this.email}
	  				password={this.password}
	  				rePassword={this.rePassword}
	  				btnControl={this.state.btnControl}
	  				/>
	  				:
	  				<SignUpCompTwo
	  				addUser={this.comp2}
	  				enableButton={this.enableButton}
	  				disableButton={this.disableButton}
	  				fatherName={this.fatherName}
	  				motherName={this.motherName}
	  				dob={this.dob}
	  				perAdd={this.perAdd}
	  				currAdd={this.currAdd}
	  				btnControl={this.state.btnControl}
	  				/>
	  			}
	  			
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
