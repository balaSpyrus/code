import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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
export default class Show extends React.Component {
  render() {
    return (
      <div style={fonts}>
      <h1 >JOBS</h1>
      {this.props.items.length!=0?<div>
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
        {this.props.items.map((item, i) => <TableRow key={'item-'+ i}>
          <TableRowColumn style={trow}>{i+1}</TableRowColumn>
          <TableRowColumn style={trow}>{item.name}</TableRowColumn>
          <TableRowColumn style={trow}>{item.apikey}</TableRowColumn>
          <TableRowColumn style={trow}>{item.engine}</TableRowColumn>
          <TableRowColumn style={trow}>{item.limit}</TableRowColumn>
          <TableRowColumn style={trow}><FlatButton label="EDIT" primary={true} style={cusbut} /></TableRowColumn>
          <TableRowColumn style={trow}><FlatButton label="DELETE" secondary={true} style={cusbut} /></TableRowColumn>
          </TableRow>
          )}
        </TableBody>
        </Table>
        </div>:<h1>NO DATA</h1>}
        </div>
        );
  }
}

