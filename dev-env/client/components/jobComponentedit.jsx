import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import Show from './showComponentedit';
import RaisedButton from 'material-ui/RaisedButton';
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
const fly = {
  width: "225px",
  margin: "0px auto",
};
const tfont={
  fontSize:"20px",
}
const formcontainer = {
  width:"550px",
  padding:"30px",
  margin: "5px auto",
  background: "#e2e2e2",
};
export default class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);      
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.state = {items: [],canSubmit:false};
  }
  delete(e)
  {
      //alert(e.target.getAttribute('key'));
      //alert(e.currentTarget.dataset.id);
      var invert=this.state.items;
      invert.splice(e.currentTarget.dataset.id,1);
      //alert()
      this.setState({items:invert});
      //alert(this.state.items)
    }
    update(e,newItem)
    {
     // e.preventDefault();
    // var newItem = {
    //   name: ReactDOM.findDOMNode(this.refs.show.refs.name1).querySelector("input").value,
    //   apikey: ReactDOM.findDOMNode(this.refs.show.refs.apikey1).querySelector("input").value,
    //   engine: ReactDOM.findDOMNode(this.refs.show.refs.engine1).querySelector("input").value,
    //   limit: ReactDOM.findDOMNode(this.refs.show.refs.limit1).querySelector("input").value,
    // };
    var j=e.currentTarget.dataset.id;
    var arr1=this.state.items;
    arr1.splice(j,1,newItem)
    this.setState({items:arr1})
  }
  render() {
    let { wordsError, numberError} = errorMessages;
    return (
      <div>
      <Formsy.Form
      ref="form"
      onValid={this.enableButton}
      onInvalid={this.disableButton}
      onValidSubmit={this.handleSubmit}
      style={formcontainer}
      >
      <table>
      <tbody>
      <tr>
      <td>
      <FormsyText
      type="text"
      name="search word"
      validations="isWords"
      validationError={wordsError}
      updateImmediately
      required
      hintText="Job Name"
      floatingLabelText="Name"
      ref="name"
      style={tfont}
      />
      </td>
      <td>
      <FormsyText
      type="text"
      name="search word"
      validationError={wordsError}
      updateImmediately
      required
      hintText="Your api key"
      floatingLabelText="key"
      ref="apikey"
      style={tfont}
      />
      </td>
      </tr>
      <tr>
      <td>
      <FormsyText
      type="text"
      name="search word"
      validationError={wordsError}
      updateImmediately
      required
      hintText="XXX:000"
      floatingLabelText="engine"
      ref="engine"
      style={tfont}
      />
      </td>
      <td>
      <FormsyText
      type="number"
      name="search word"
      validations="maxLength:2"
      validationError={numberError}
      updateImmediately
      required
      hintText="no of result"
      floatingLabelText="limit"
      ref="limit"
      style={tfont}
      /></td>
      </tr> 
      </tbody>
      </table>
      <div style={fly}> 
      <RaisedButton label={'Add'} primary={true} type="submit" fullWidth={true}  disabled={!this.state.canSubmit}/>
      </div>
      </Formsy.Form>
      <div style={fonts}>
      <h1 >JOBS</h1>
      {this.state.items.length!=0?<div>
        <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow selectable={false}>
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
        </TableBody>
        </Table>
        {this.state.items.map((item,i) =>
          <Show index={i} key={i} ref="show" update={this.update.bind(this)} delete={this.delete.bind(this)} item={item} />
          )}
        </div>:<h1>NO DATA</h1>}
        </div>
        </div>
        );
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
  handleSubmit() {
    var newItem = {
      name: ReactDOM.findDOMNode(this.refs.name).querySelector("input").value,
      apikey: ReactDOM.findDOMNode(this.refs.apikey).querySelector("input").value,
      engine: ReactDOM.findDOMNode(this.refs.engine).querySelector("input").value,
      limit: ReactDOM.findDOMNode(this.refs.limit).querySelector("input").value,
    };
    this.refs.form.reset();
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem)
    }));
  }
}
