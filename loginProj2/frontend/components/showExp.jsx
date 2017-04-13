 import React from 'react';
 import ReactDOM from 'react-dom';
 import FlatButton from 'material-ui/FlatButton';
 import {Row, Col} from 'react-grid-system';
 import FormsyText from 'formsy-material-ui/lib/FormsyText';
 import Formsy from 'formsy-react';

 Formsy.addValidationRule('checkExp', function (values, value) {
 	return value>=0 && value<=25;
 })

 const gap={
 	paddingBottom:10
 }

 export default class ShowExp extends React.Component{
 	constructor(props) {
 		super(props);
 		this.state={
 			expData:props.expData
 		}
 		this.companyName=this.companyName.bind(this)
 		this.yrOfExp=this.yrOfExp.bind(this)
 		
 	}
 	yrOfExp(event , value)
 	{
 		let data=this.state.expData
 		data.yrOfExp=value
 		this.setState({
 			expData:data
 		})
 		this.props.modExpData(data,this.props.index)
 	}
 	companyName(event , value)
 	{
 		let data=this.state.expData
 		data.companyName=value
 		this.setState({
 			expData:data
 		})
 		this.props.modExpData(data,this.props.index)
 	}
 	render(){
 		return(<div >
 			<Col xl={6} lg={6} md={6}>
 			<FormsyText
 			required
 			fullWidth={true}
 			onChange={this.companyName}
 			name="companyName"
 			floatingLabelText="company name"
 			disabled={!this.props.workDetails}
 			value={this.state.expData.companyName}
 			/>
 			</Col>
 			<Col xl={6} lg={6} md={6}>
 			<FormsyText
 			required
 			fullWidth={true}
 			onChange={this.yrOfExp}
 			name="yrOfExp"
 			floatingLabelText="Experience in year(s)"
 			type="number"
 			validations="isNumeric,checkExp"
 			validationError="Type valid Experience"
 			disabled={!this.props.workDetails}
 			value={this.state.expData.yrOfExp}
 			/>
 			</Col>
 			</div>)
 	}
 }