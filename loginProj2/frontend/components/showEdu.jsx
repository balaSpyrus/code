 import React from 'react';
 import ReactDOM from 'react-dom';
 import FlatButton from 'material-ui/FlatButton';
 import {Row, Col} from 'react-grid-system';
 import FormsyText from 'formsy-material-ui/lib/FormsyText';
 import Formsy from 'formsy-react';

 Formsy.addValidationRule('checkMin', function (values, value) {
 	return value>=0 && value<=100;
 })

 const gap={
 	paddingBottom:10
 }

 export default class ShowEdu extends React.Component{
 	constructor(props) {
 		super(props);
 		this.state={
 			eduData:props.eduData
 		}
 		this.examType=this.examType.bind(this)
 		this.eduBoard=this.eduBoard.bind(this)
 		this.percent=this.percent.bind(this)
 	}
 	examType(event , value)
 	{
 		let data=this.state.eduData
 		data.examType=value
 		this.setState({
 			eduData:data
 		})
 		this.props.modEduData(data,this.props.index)
 	}
 	eduBoard(event , value)
 	{
 		let data=this.state.eduData
 		data.eduBoard=value
 		this.setState({
 			eduData:data
 		})
 		this.props.modEduData(data,this.props.index)
 	}
 	percent(event , value)
 	{
 		let data=this.state.eduData
 		data.percent=parseInt(value)
 		this.setState({
 			eduData:data
 		})
 		this.props.modEduData(data,this.props.index)
 	}
 	render(){
 		return(<div >
 			<Col xl={4} lg={4} md={4}>
 			<FormsyText
 			required
 			fullWidth={true}
 			onChange={this.examType}
 			name="examtype"
 			floatingLabelText="Exam Type"
 			disabled={!this.props.studyDetails}
 			value={this.state.eduData.examType}
 			/>
 			</Col>
 			<Col xl={4} lg={4} md={4}>
 			<FormsyText
 			required
 			fullWidth={true}
 			onChange={this.eduBoard}
 			name="eduboard"
 			floatingLabelText="Education Board"
 			disabled={!this.props.studyDetails}
 			value={this.state.eduData.eduBoard}
 			/>
 			</Col>
 			<Col xl={4} lg={4} md={4}>
 			<FormsyText
 			required
 			fullWidth={true}
 			onChange={this.percent}
 			name="percent"
 			floatingLabelText="Percentage Obtained"
 			disabled={!this.props.studyDetails}
 			validations="isNumeric,checkMin"
 			validationError="numbers within 100"
 			value={this.state.eduData.percent+""}
 			/>
 			</Col>
 			</div>)
 	}
 }