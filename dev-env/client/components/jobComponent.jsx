import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Show from './showComponent'
import FormsyText from 'formsy-material-ui/lib/FormsyText';
//onChange={this.handlename}
 // handlename(e) {
  //   this.setState({name: e.target.value});
  // }
  // handlekey(e) {
  //   this.setState({apikey: e.target.value});
  // }
  // handleeng(e) {
  //   this.setState({engine: e.target.value});
  // }
  // handlelimit(e) {
  //   this.setState({limit: e.target.value});
  // }
  const fly = {
    width: "225px",
    margin: "0px auto",
  };
  const tfont={
    fontSize:"20px",
  };
  const formcontainer = {
    width:"550px",
    padding:"30px",
    margin: "5px auto",
    background: "#e2e2e2",
  };
  const errorMessages= {
    wordsError: "Please only use letters",
    numberError: "Please enter less than 100"
  } ;
  export default class Jobs extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.handlename = this.handlename.bind(this);
      this.handlekey = this.handlekey.bind(this);
      this.handleeng = this.handleeng.bind(this);
      this.handlelimit = this.handlelimit.bind(this);

      this.enableButton = this.enableButton.bind(this);
      this.disableButton = this.disableButton.bind(this);
      this.state = {items: [],canSubmit:false,name:'',apikey:'',engine:'',limit:0};
    }

    render() {
     let { wordsError, numberError} = errorMessages;
     return (
      <div>
      <Formsy.Form
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
      onChange={this.handlename}
      value={this.state.name}
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
      onChange={this.handlekey}
      value={this.state.apikey}
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
      onChange={this.handleeng}
      value={this.state.engine}
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
      onChange={this.handlelimit}
      value={this.state.limit==0?'':this.state.limit}
      style={tfont}
      /></td>
      </tr> 
      </tbody>
      </table>
      <div style={fly}> 
      <RaisedButton label={'Add'} primary={true} type="submit" fullWidth={true}  disabled={!this.state.canSubmit}/>
      </div>
      </Formsy.Form>
      <Show items={this.state.items} />
      </div>
      );
   }
   handlename(e) {
    this.setState({name: e.target.value});
  }
  handlekey(e) {
    this.setState({apikey: e.target.value});
  }
  handleeng(e) {
    this.setState({engine: e.target.value});
  }
  handlelimit(e) {
    this.setState({limit: e.target.value});
  }
  handleSubmit() {
    var newItem = {
      name: this.state.name,
      apikey: this.state.apikey,
      engine: this.state.engine,
      limit: this.state.limit,
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      name:'',
      apikey:'',
      engine:'',
      limit:0,
      canSubmit: !prevState.canSubmit,
      
    }));
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
}
