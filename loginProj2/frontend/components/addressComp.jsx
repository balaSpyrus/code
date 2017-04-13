 import React from 'react';
 import ReactDOM from 'react-dom';
 import FormsyText from 'formsy-material-ui/lib/FormsyText';
 import MapsPlace from 'material-ui/svg-icons/maps/place';	
 import Avatar from 'material-ui/Avatar';
 import {Row, Col} from 'react-grid-system';

 const gap={
 	paddingBottom:10
 }

 export default class AddressComp extends React.Component
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
 			zip:""
 		}

 	}
 	streetOne(event,value)
 	{ 
 		this.setState({ street1:value });
 		this.props.Add(this.state)
 	}
 	streetTwo(event,value)
 	{ 
 		this.setState({ street2:value });
 		this.props.Add(this.state)
 	}
 	city(event,value)
 	{ 
 		this.setState({ city:value });
 		this.props.Add(this.state)
 	}
 	states(event,value)
 	{ 
 		this.setState({ states:value });
 		this.props.Add(this.state)
 	}
 	zip(event,value)
 	{ 
 		
 		this.setState({ zip:value });
 		let data={
 			street1:this.state.street1,
 			street2:this.state.street2,
 			states:this.state.states,
 			city:this.state.city,
 			zip:value

 		}
 		
 		this.props.Add(data)
 	} 
 	
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
 			value={this.state.street1}
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
 			value={this.state.street2}
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
 			value={this.state.city}
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
 			value={this.state.states}
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
 			type="number"
 			required
 			value={this.state.zip}
 			validations="isNumeric,minLength:6,maxLength:6"
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