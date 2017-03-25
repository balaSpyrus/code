import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Dropzone from 'react-dropzone';
import {Row, Col, ScreenClassRender,Container, Visible} from 'react-grid-system';
const appStyle={
	position: 'fixed',
	top: 0,
	backgroundColor:'#222222'
}

export default class BillManager extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			uploadedFile:''
		}
		this.onImageDrop=this.onImageDrop.bind(this)
		
	}
	onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
		});

		
	}

	render() {
		return(
			<div>
			<AppBar
			style={appStyle}
			title={
				<img 
				src='http://17776-presscdn-0-6.pagely.netdna-cdn.com/wp-content/themes/wiprodigital/images/wdlogo.png' 
				width='140' alt='wiproDigital' style={{marginTop:7}}/>
			}/>
			<div style={{marginTop: 44}}>
			<Container >
			<Row>
			<Col xl={6} lg={6} md={6} >
			<Row>
			<div style={{height:650,backgroundColor:"red"}}>
			<Dropzone
			multiple={false}
			accept="image/jpg,image/png,image/jpeg"
			onDrop={this.onImageDrop}>
			<p>Drop an image or click to select a file to upload.</p>
			</Dropzone>
			<img src={this.state.uploadedFile.preview}/>
			</div>
			</Row>
			<Row>

			</Row>
			</Col>
			<Col xl={6} lg={6} md={6}>
			<h1 style={{textAlign:"center"}}>hai</h1>
			</Col>
			</Row>
			</Container>
			</div>
			</div>

			)
	}
}