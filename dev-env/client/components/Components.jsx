import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
var elements=[];
const style = {
	margin: 12,
};
const fly = {
	
	width: "225px",
	margin: "0px auto",
};
const fonts={
	margin: "0px auto",
	textAlign: "center",
	fontFamily: "sans-serif",
	color: "#00bcd4",
}
const theader={
	fontSize: "20px",
	fontWeight: "bold",
	textAlign:"center",
}
const trow={
	fontSize: "16px",
	textAlign:"center",
}
const jobs={

	fontFamily: "sans-serif",
	color: "#00bcd4",
}
const cusbut={
	paddingRight:0,
}
const ed={
	backgroundColor: "#8BC34A",
}
const formcontainer = {
	width:"550px",
	padding:"30px",
	margin: "5px auto",
	background: "#c6f9f9",
};
const Fields=()=>{
	return(
		<table>
		<tbody>
		<tr>
		<td>
		<TextField  hintText="Job Name" id="1" floatingLabelText="Name" />
		</td>
		<td>
		<TextField   hintText="your API key" id="2" floatingLabelText="Key" />
		</td>
		</tr>
		<tr>
		<td>
		<TextField  hintText="xxxx:0000" id="3" floatingLabelText="Engine ID"/>
		</td>
		<td>
		<TextField  type="number" hintText="No of Results" id="4" floatingLabelText="Limit" />
		</td>
		</tr>	
		</tbody>
		</table>
		)
}
var i=0;
class Show extends React.Component{
	
	render()
	{
		return(
			<div style={fonts}>
			<h1 >JOBS</h1>
			{elements.length!=0?<div>
				<Table>
				<TableHeader >
				<TableRow>
				<TableHeaderColumn style={theader}>ID</TableHeaderColumn>
				<TableHeaderColumn style={theader}>Name</TableHeaderColumn>
				<TableHeaderColumn style={theader}>Key</TableHeaderColumn>
				<TableHeaderColumn style={theader}>Engine ID</TableHeaderColumn>
				<TableHeaderColumn style={theader}>Limit</TableHeaderColumn>
				<TableHeaderColumn style={theader}>EDIT</TableHeaderColumn>
				<TableHeaderColumn style={theader}>DELETE</TableHeaderColumn>
				</TableRow>
				</TableHeader>
				<TableBody>
				{elements.map(function(item, i) {
					return <TableRow key={'item-'+ i}>
					<TableRowColumn style={trow}>{i+1}</TableRowColumn>
					<TableRowColumn style={trow}>{item.name}</TableRowColumn>
					<TableRowColumn style={trow}>{item.apikey}</TableRowColumn>
					<TableRowColumn style={trow}>{item.engine}</TableRowColumn>
					<TableRowColumn style={trow}>{item.limit}</TableRowColumn>
					<TableRowColumn style={trow}><RaisedButton label="EDIT" primary={true} style={cusbut} /></TableRowColumn>
					<TableRowColumn style={trow}><RaisedButton label="DELETE" secondary={true} style={cusbut} /></TableRowColumn>
					</TableRow>
				})}
				</TableBody>
				</Table>
				</div>:<h1>NO DATA</h1>}
				</div>
				);




	}


}
export default class FormComponent extends React.Component{
	constructor(props)
	{
		super(props);
		this.state={arr:[]};
		this.add=this.add.bind(this);
	}

	add() {	
		let json={}
		let i=1
		let fields=["name","apikey","engine","limit"]
		fields.forEach(field => {
			json[field]=document.getElementById(""+(i)).value
			document.getElementById(""+(i++)).value=null
		})	
		elements.push(json)		
		this.setState({arr:elements});
		console.log(json)

	}

	render()
	{
		return(
			<div >
			<form style={formcontainer}>
			<Fields />
			<div style={fly}>	
			<RaisedButton label="ADD" onClick={this.add} primary={true} />
			<RaisedButton label="CLEAR"  type="reset"  />		
			</div>
			</form>
			<Show  style={jobs}/>			
			</div>
			)
	}
}

