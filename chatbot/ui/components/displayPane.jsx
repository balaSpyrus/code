import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import {Container} from 'react-grid-system';
import MsgPane from './messagingPane'
import ConvPane from './conversationPane'

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
			<ConvPane convArr={this.state.convArr}/>
			<MsgPane conv={this.state.conv} captureCon={this.captureCon}
			captureConByKey={this.captureConByKey}
			readCon={this.readCon} />
			</Container>
			</Paper>
			</div>
			);
	}
}