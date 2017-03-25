	  import React from 'react';
	  import ReactDOM from 'react-dom';
	  import RaisedButton from 'material-ui/RaisedButton';	  
	  import {Link} from 'react-router';
	  import {Container,Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
	  import Paper from 'material-ui/Paper';

	  const style = {
	  	height: 120,
	  	width: 300,
	  	marginLeft: "auto",
	  	marginRight:"auto",
	  	marginTop:"20%"
	  	
	  };
	  export default class ShowPage extends React.Component {
	  	constructor(props){
	  		super(props)
	  	}
	  	render(){
	  		return(
	  			<div style={style}>
	  			<Paper style={style} zDepth={2}>
	  			<Container style={{paddingTop:40}}>
	  			<Row >
	  			<Col xl={6} lg={6} md={6} sm={6} xs={6} style={{paddingLeft:42}}>
	  			<Link to= '/login'>
	  			<RaisedButton label="Log In" primary={true}  />
	  			</Link>
	  			</Col>
	  			<Col xl={6} lg={6} md={6} sm={6} xs={6}>
	  			<Link to= '/signUp'>
	  			<RaisedButton label="Sign Up" secondary={true} />
	  			</Link>
	  			</Col>
	  			</Row>
	  			</Container>
	  			</Paper>
	  			</div>
	  			)
	  	}
	  }
	  