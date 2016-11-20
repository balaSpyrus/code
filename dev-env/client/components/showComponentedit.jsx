import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const errorMessages= {
  wordsError: "Please only use letters",
  numberError: "Please enter less than 100"
} ;
const fonts={
  margin: "0px auto",
  textAlign: "center",
  fontFamily: "sans-serif",
  color: "#26a69a",
}
const tfont={
  fontSize:"15px",
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
const cusbut={
  paddingRight:0,
}
export default class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing:false,canSubmit:false};
    this.renderNormal = this.renderNormal.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.saveFunction = this.saveFunction.bind(this);
    this.cancelFunction = this.cancelFunction.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.editFunction = this.editFunction.bind(this);
    console.log(this.state.editing);
  }
  editFunction()
  {
   this.setState({editing:true})
 }
 enableButton() {
  this.setState(()=>({
    canSubmit: true,
  }));
}
disableButton() {
  this.setState(()=>({
    canSubmit: false,
  }));
}
saveFunction(e)
{
  var newItem = {
    name: ReactDOM.findDOMNode(this.refs.name1).querySelector("input").value,
    apikey: ReactDOM.findDOMNode(this.refs.apikey1).querySelector("input").value,
    engine: ReactDOM.findDOMNode(this.refs.engine1).querySelector("input").value,
    limit: ReactDOM.findDOMNode(this.refs.limit1).querySelector("input").value,
  };
  this.props.update(e,newItem);
  this.setState({editing:false});
}
componentWillMount()
{
  console.log(this.state.editing);
}

cancelFunction()
{
  this.setState({editing:false})
}
renderForm()
{ 
  let { wordsError, numberError} = errorMessages;
  return(
    <Formsy.Form
    ref="form"
    onValid={this.enableButton}
    onInvalid={this.disableButton}
    
    >
    <Table>
    <TableBody displayRowCheckbox={false} >
    <TableRow selectable={false} key={this.props.index}>
    <TableRowColumn style={trow}>{this.props.index+1}</TableRowColumn>
    <TableRowColumn style={trow}>

    <FormsyText
    type="text"
    validations="isWords"
    validationError={wordsError}
    updateImmediately
    required
    defaultValue={this.props.item.name}
    ref="name1"
    name="name"
    style={tfont}
    />
    </TableRowColumn>
    <TableRowColumn style={trow}>

    <FormsyText
    type="text"
    validationError={wordsError}
    updateImmediately
    required
    defaultValue={this.props.item.apikey}
    ref="apikey1"
    name="apikey"
    style={tfont}
    />

    </TableRowColumn>
    <TableRowColumn style={trow}>

    <FormsyText
    type="text"
    validations="isWords"
    validationError={wordsError}
    updateImmediately
    required
    defaultValue={this.props.item.engine}
    ref="engine1"
    name="engine"
    style={tfont}
    />

    </TableRowColumn>
    <TableRowColumn style={trow}>


    <FormsyText
    type="text"
    validations="maxLength:2"
    validationError={numberError}
    updateImmediately
    required
    defaultValue={this.props.item.limit}
    ref="limit1"
    name="limit"
    style={tfont}
    />

    </TableRowColumn>
    <TableRowColumn style={trow}><FlatButton onClick={this.saveFunction} disabled={!this.state.canSubmit} label="SAVE" data-id={this.props.index} primary={true} style={cusbut} /></TableRowColumn>
    <TableRowColumn style={trow}><FlatButton label="CANCEL" onClick={this.cancelFunction} secondary={true} style={cusbut} /></TableRowColumn>
    </TableRow>
    </TableBody>
    </Table>
    </Formsy.Form>   
    );
}
renderNormal() {
  return (
    <Table>
    <TableBody displayRowCheckbox={false}>
    <TableRow selectable={false}  key={this.props.index}>
    <TableRowColumn style={trow}>{this.props.index+1}</TableRowColumn>
    <TableRowColumn style={trow}>{this.props.item.name}</TableRowColumn>
    <TableRowColumn style={trow}>{this.props.item.apikey}</TableRowColumn>
    <TableRowColumn style={trow}>{this.props.item.engine}</TableRowColumn>
    <TableRowColumn style={trow}>{this.props.item.limit}</TableRowColumn>
    <TableRowColumn style={trow}><FlatButton label="EDIT" onClick={this.editFunction} primary={true} style={cusbut} /></TableRowColumn>
    <TableRowColumn style={trow}><FlatButton label="DELETE" data-id={this.props.index} onClick={this.props.delete} secondary={true} style={cusbut} /></TableRowColumn>
    </TableRow>
    </TableBody>
    </Table>
    );
}
render()
{
  return(
    <div>
    {this.state.editing?this.renderForm():this.renderNormal()}
    </div>
    );
}
}