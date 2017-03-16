import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import {Row, Col, ScreenClassRender,Container, Visible} from 'react-grid-system';
const appStyle={
	position: 'fixed',
	top: 0,
	backgroundColor:'#222222'
}

export default class BillManager extends React.Component{
	constructor(props) {
		super(props);
		
	}
	render() {
		return(
			<div>
			<AppBar
			title={
				<img 
				src='http://17776-presscdn-0-6.pagely.netdna-cdn.com/wp-content/themes/wiprodigital/images/wdlogo.png' 
				width='140' alt='wiproDigital' style={{marginTop:7}}/>
			}
			style={appStyle}
			/>
			<div style={{marginTop: 44}}>
			<Container >
			<Row>
			<Col xl={6} lg={6} md={6} >
			<h1 style={{textAlign:"center"}}>hai</h1>
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