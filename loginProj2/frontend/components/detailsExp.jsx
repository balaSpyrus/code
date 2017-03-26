 import React from 'react';
 import ReactDOM from 'react-dom';
 import FlatButton from 'material-ui/FlatButton';
 import {Row, Col} from 'react-grid-system';

 const gap={
 	paddingBottom:10
 }

 export default class DetailsEdu extends React.Component{
 	constructor(props) {
 		super(props);
 		this.sendId=this.sendId.bind(this)
 	}
 	sendId()
 	{
 		this.props.deleteDetails(this.props.index)
 	}
 	render(){
 		return(<Row style={gap}>
 			<Col xl={4} lg={4} md={4} sm={6} xs={6} style={{paddingTop:5}}>{this.props.eachDetail.companyName}</Col>
 			<Col xl={4} lg={4} md={4} sm={6} xs={6} style={{paddingTop:5}}>{this.props.eachDetail.yrOfExp+" year(s)"}</Col>
 			<Col xl={4} lg={4} md={4} sm={6} xs={6}>
 			<FlatButton label="Delete" secondary={true} style={{marginLeft:-25}} labelStyle={{fontSize:'11px'}} onClick={this.sendId} />
 			</Col>
 			</Row>)
 	}
 }