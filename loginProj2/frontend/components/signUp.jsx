	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import Request from "superagent";
	  import RaisedButton from 'material-ui/RaisedButton';	
	  import FontIcon from 'material-ui/FontIcon';
	  import SignUpCompOne from './signPageCompOne';
	  import SignUpCompTwo from './signPageCompTwo';	  
	  import SignUpCompThree from './signPageCompThree';
	  import SignUpCompFour from './signPageCompFour';
	  import VerifyCompFive from './signPageCompFive';
	  import {Link} from 'react-router';
	  import {Container} from 'react-grid-system';
	  import Paper from 'material-ui/Paper';

	  const style = {
	  //	height: 310,
	  //	width: 370,
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
				email:"",
				fatherName:"",
				motherName:"",
				dob:null,
				perAdd:{},
				currAdd:{},
				eduDetails:[],
				expDetails:[],
				counter:1,
				btnControl:true,
				show:""
			}
			console.log(this.state)
			this.compUpdate=this.compUpdate.bind(this);
			this.enableButton = this.enableButton.bind(this);
			this.disableButton = this.disableButton.bind(this);
			this.name=this.name.bind(this);
			this.fatherName=this.fatherName.bind(this);
			this.education=this.education.bind(this);
			this.experience=this.experience.bind(this);
			this.motherName=this.motherName.bind(this);
			this.currAdd=this.currAdd.bind(this);
			this.perAdd=this.perAdd.bind(this);
			this.dob=this.dob.bind(this);
			this.email=this.email.bind(this);
			this.password=this.password.bind(this);
			this.showMsg=this.showMsg.bind(this);
		}

		name(event,value) { this.setState({ name:value }) }
		fatherName(event,value) { this.setState({ fatherName:value }) }
		motherName(event,value) { this.setState({ motherName:value }) }
		dob(event,value) { this.setState({ dob:value }) }
		perAdd(value) { console.log("from preadd",value) 
		this.setState({ perAdd:value }) 
		console.log(this.state)}
		currAdd(value) { this.setState({ currAdd:value }) }
		email(event,value) { this.setState({ email:value }) }
		password(event,value) { this.setState({ password:value }) }
		education(value) { this.setState({ eduDetails:value }) }
		experience(value) { this.setState({ expDetails:value }) }
		showMsg(value) { this.setState({ show:value }) }

		compUpdate(data)
		{
			
			
			let cnt=this.state.counter
			cnt++;
			this.setState({
				counter:cnt,
				btnControl:true,
				show:""
			})
			if(cnt===6)
			{
				let url =`http://localhost:8081/register`;
				let user=data
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
						console.log(data.msg)	
					}

				});
				
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
				{
					this.state.counter===1?
					<SignUpCompOne
					addUser={this.compUpdate}
					enableButton={this.enableButton}
					disableButton={this.disableButton}
					name={this.name}
					email={this.email}
					password={this.password}
					btnControl={this.state.btnControl}
					/>
					:
					this.state.counter===2?
					<SignUpCompTwo
					addUser={this.compUpdate}
					enableButton={this.enableButton}
					disableButton={this.disableButton}
					fatherName={this.fatherName}
					motherName={this.motherName}
					dob={this.dob}
					perAdd={this.perAdd}
					currAdd={this.currAdd}
					btnControl={this.state.btnControl}
					/>
					:
					this.state.counter===3?
					<SignUpCompThree
					addUser={this.compUpdate}
					enableButton={this.enableButton}
					disableButton={this.disableButton}
					eduDetails={this.state.eduDetails}
					education={this.education}
					showMsg={this.showMsg}
					btnControl={this.state.btnControl}
					/>
					:
					this.state.counter===4?
					<SignUpCompFour
					addUser={this.compUpdate}
					enableButton={this.enableButton}
					disableButton={this.disableButton}
					expDetails={this.state.expDetails}
					experience={this.experience}
					showMsg={this.showMsg}
					btnControl={this.state.btnControl}
					/>
					:
					<VerifyCompFive
					userDetails={this.state}
					enableButton={this.enableButton}
					disableButton={this.disableButton}
					btnControl={this.state.btnControl}
					addUser={this.compUpdate}
					/>


				}

				</Container>
				</Paper>
				{
					this.state.show!==""?
					<h1 style={{textAlign:"center",fontFamily: "sans-serif",
					fontSize: 18,color: "#4b70ff"}}>{this.state.show}</h1>

					:null
				}
				<div style={{ paddingTop:25,marginLeft: "auto", marginRight: "auto", width: 100}}>	
				<Link to= '/'>
				<RaisedButton label="HOME" primary={true}  />
				</Link>
				</div>
				</div>
				)
		}
	}
