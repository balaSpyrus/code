import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import {Row, Col} from 'react-grid-system';

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

export default class MsgPane extends React.Component{
	constructor(props) {
		super(props);
		console.log(props);
		
	}
	
	render() {

		return (
			<Row>
			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
			<TextField
			hintText="say hi..!!"
			underlineShow = {false} 
			hintStyle={{paddingLeft:10,paddingRight:-10}}
			fullWidth={true}
			value={this.props.conv}
			onChange={this.props.readCon}
			onKeyPress={this.props.captureConByKey}
			inputStyle={{border:"3px solid #4ace96", borderRadius:5,paddingLeft:10,paddingRight:-10,color:"#005e35"}}
			/>
			</Col>
			<Col xl={2} lg={2} md={2} sm={2} xs={2} style={{paddingLeft:0}}>
			<IconButton
			onClick={this.props.captureCon}
			iconStyle={iconStyle.sizeIcon}
			style={iconStyle.size}>
			<ContentSend style={{color:"#4ace96"}}/>
			</IconButton>			
			</Col>
			</Row>
			);
	}
}