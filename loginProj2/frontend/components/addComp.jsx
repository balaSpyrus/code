 import React from 'react';
 import ReactDOM from 'react-dom';
 import FormsyText from 'formsy-material-ui/lib/FormsyText';
 import MapsPlace from 'material-ui/svg-icons/maps/place';	
 import Avatar from 'material-ui/Avatar';
 import {Row, Col} from 'react-grid-system';

 const gap={
 	paddingBottom:10
 }

 export default class AddComp extends React.Component
 {
 	constructor(props) {
 		super(props);
 		this.streetOne=this.streetOne.bind(this);
 		this.streetTwo=this.streetTwo.bind(this);
 		this.states=this.states.bind(this);
 		this.city=this.city.bind(this);
 		this.zip=this.zip.bind(this);
 		this.state={
 			street1:"",
 			street2:"",
 			states:"",
 			city:"",
 			zip:0
 		}

 	}
 	streetOne(event,value) { 
 		this.setState({ street1:value });
 	 this.props.currAdd(this.state) 	 }
 	streetTwo(event,value) { 
 		this.setState({ street2:value });
 	 this.props.currAdd(this.state) 	}
 	city(event,value) { 
 		this.setState({ city:value });
 	 this.props.currAdd(this.state) 	}
 	states(event,value) { 
 		this.setState({ states:value });
 	 this.props.currAdd(this.state) 	}
 	zip(event,value) { 
 		this.setState({ zip:value });
 	 this.props.currAdd(this.state) 	}
	

 	render() {
 		return(
 			<div>
 			<Row style={gap}>
 			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
 			<Avatar icon={<MapsPlace/>} />
 			</Col>
 			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
 			<FormsyText
 			name="street1"
 			type="text"
 			required
 			hintText="Street 1"
 			onChange={this.streetOne}
 			/>
 			</Col>	
 			</Row>
 			<Row style={gap}>
 			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
 			<Avatar icon={<MapsPlace/>} />
 			</Col>
 			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
 			<FormsyText
 			name="street2"
 			type="text"
 			required
 			hintText="Street 2"
 			onChange={this.streetTwo}
 			/>
 			</Col>	
 			</Row>
 			<Row style={gap}>
 			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
 			<Avatar icon={<MapsPlace/>} />
 			</Col>
 			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
 			<FormsyText
 			name="City"
 			type="text"
 			required
 			hintText="city"
 			onChange={this.city}
 			/>
 			</Col>	
 			</Row>
 			<Row style={gap}>
 			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
 			<Avatar icon={<MapsPlace/>} />
 			</Col>
 			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
 			<FormsyText
 			name="state"
 			type="text"
 			required
 			hintText="State"
 			onChange={this.states}
 			/>
 			</Col>	
 			</Row>
 			<Row style={gap}>
 			<Col xl={2} lg={2} md={2} sm={2} xs={2} >
 			<Avatar icon={<MapsPlace/>} />
 			</Col>
 			<Col xl={10} lg={10} md={10} sm={10} xs={10}>
 			<FormsyText
 			name="ZIP"
 			type="text"
 			required
 			validations="isNumeric,minLength:6"
 			validationError="give a valid ZIP code "
 			hintText="ZIP"
 			onChange={this.zip}
 			/>
 			</Col>	
 			</Row>
 			</div>

 			)
 	}

 }