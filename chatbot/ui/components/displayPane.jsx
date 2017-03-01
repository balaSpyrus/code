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
	marginTop:"6%",
	width: 600,
	marginLeft:"auto",
	marginRight:"auto",
}
const spaceStyle={
	backgroundColor:"#e8e9ea",
	height:420,
	overflowY: "scroll"
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
	textAlign:"right",
	margin:"8px 35px 8px 0px"
}
const botChip={
	
	float:"left",
	textAlign:"left",
	margin:"8px 0px 8px 35px"
}
export default class displayPane extends React.Component{
	constructor(props) {
		super(props);
		this.captureCon=this.captureCon.bind(this);
		this.captureConByKey=this.captureConByKey.bind(this);
		this.readCon=this.readCon.bind(this);
		this.state={
			conv:"",
			convArr:[]
		}
		
	}
	captureCon(e){
		if (this.state.conv!=="") {
			let greetArr=["hi..!!","hello :)","hai.."]
			let errArr=["sorry i can't get you","i can't understand","what do you mean??"]
			let botReply=""
			if(this.state.conv==="hi")
			{
				let num=this.getNum(0,greetArr.length-1)
				botReply=greetArr[num];

			}
			else
			{
				let num=this.getNum(0,errArr.length-1)
				botReply=errArr[num];

			}
			
			let arr=this.state.convArr;
			arr.push(this.state.conv)
			arr.push(botReply)
			this.setState({
				convArr:arr,
				conv:""
			})
			

		}
		
	}

	getNum(min,max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	captureConByKey(e){
		if (e.key === 'Enter' && this.state.conv!=="") {
			let greetArr=["hi..!!","hello :)","hai.."]
			let errArr=["sorry i can't get you","i can't understand","what do you mean??"]
			let botReply=""
			if(this.state.conv==="hi")
			{
				let num=this.getNum(0,greetArr.length-1)
				botReply=greetArr[num];

			}
			else
			{
				let num=this.getNum(0,errArr.length-1)
				botReply=errArr[num];

			}
			
			let arr=this.state.convArr;
			arr.push(this.state.conv)
			arr.push(botReply)
			this.setState({
				convArr:arr,
				conv:""
			})
			

		}		
		
	}
	componentDidUpdate() {		
		let len = this.state.convArr.length-1;
		const node = ReactDOM.findDOMNode(this[''+len]);
		if (node) {
			node.scrollIntoView();
		}
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
			{
				this.state.convArr.map((eachConv,key)=>{

					let displayText=[];
					if(eachConv.length<60)
					{
						displayText.push(eachConv)
					}					
					else
					{							
						let start=0,end=60,len=eachConv.length;
						while(end!=len)
						{
							displayText.push(eachConv.slice(start,end))
							start=end;
							if(len-end>0 && (len-end)>=60)
								{end+=60;}
							else
								{end=len;}
						}
						displayText.push(eachConv.slice(start,end))
						console.log(displayText);
					}

					if(key%2==0)
					{
						
						return (
							<Col key={key} ref={(ref) => this[''+key] = ref} >							
							{
								displayText.map(function (data,i) {
									return(
										<Chip backgroundColor="#3fda96"
										labelColor="#ffffff"
										key={i}
										style={userChip} >
										{data}
										</Chip>
										)
								})}							
								</Col>
								)
					}

					else
					{
						return (
							<Col key={key} ref={(ref) => this[''+key] = ref} >
							{
								displayText.map(function (data,i) {
									return(
										<Chip backgroundColor="#ffffff"
										labelColor="#3fda96"
										key={i}
										style={botChip} >
										{data}
										</Chip>
										)
								})}		
								</Col>)
					}
				})

			}
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
			onKeyPress={this.captureConByKey}
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