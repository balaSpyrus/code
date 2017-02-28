import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import {Container,Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
const paperStyle = {
	height: 505,
	width: 600,
	textAlign: 'center',
	display: 'inline-block',
};
const layout={
	marginTop:"10%",
	width: 600,
	marginLeft:"auto",
	marginRight:"auto",
}
const spaceStyle={
	backgroundColor:"#e8e9ea",
	height:420
}
const iconStyle = {
	sizeIcon: {
		color:"#58d29c",
		width: 46,
		height: 46,
	},
	size: {

		width: 46,
		height: 46,
		padding: 5,
	}
};
const userChip={
	
	float:"right",
	margin:"8px 40px 5px 0px"
}

export default class displayPane extends React.Component{
	constructor(props) {
		super(props);
		this.captureCon=this.captureCon.bind(this);
		this.readCon=this.readCon.bind(this);
		this.state={
			conv:"",
			convArr:[]
		}
		
	}
	captureCon(e){
		console.log("im clicked ",this.state.conv);
		let arr=this.state.convArr
		let stringarr=['hai','hello','hi']
		let x=""
		if(this.state.conv==='hi')
		{
			x=stringarr[Math.floor(Math.random() * (stringarr.length - 1))]
		}
		console.log(x);
		arr.push(
			<div key={Date()}>
			<Chip backgroundColor="#3fda96"
			labelColor="white"
			style={userChip} >
			{this.state.conv}
			</Chip>
			<br/><br/>
			</div>
			)
		this.setState({
			convArr:arr,
			conv:""
		})
		console.log("done");
		
	}
	readCon(e){
		this.setState({
			conv:e.target.value
		})
	}

	render() {
		
		return (
			<div style={layout}>
			<Paper style={paperStyle} zDepth={2}>
			<Container>
			<Row style={{paddingBottom:15}}>
			<div style={spaceStyle}>
			{this.state.convArr}
			</div>
			</Row>
			<Row>
			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
			<TextField
			hintText="say hi..!!"
			underlineShow = {false} 
			hintStyle={{paddingLeft:10,paddingRight:-10}}
			fullWidth={true}
			value={this.state.conv}
			onChange={this.readCon}
			inputStyle={{border:"3px solid #4ace96", borderRadius:5,paddingLeft:10,paddingRight:-10,color:"#005e35"}}
			/>
			</Col>
			<Col xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingLeft:0}}>
			<IconButton
			onClick={this.captureCon}
			iconStyle={iconStyle.sizeIcon}
			style={iconStyle.size}>
			<ContentSend style={{color:"#4ace96"}}/>
			</IconButton>			
			</Col>
			</Row>
			</Container>
			</Paper>
			</div>
			);
	}
}