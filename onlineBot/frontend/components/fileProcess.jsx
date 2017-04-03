import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Container,Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import Request from "superagent";
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  height: "auto",
  width: 375,
  marginLeft:"auto",
  marginRight:"auto"

};
const gap={
  paddingBottom:10
}
const capStyle={
  fontFamily: 'sans-serif',
  fontSize: '17pt',
  color: '#828181',
  textAlign: 'center'
}
const desHead={
  fontFamily: 'sans-serif',
 // backgroundColor: '#6db5ef',
 paddingTop: 10,
 color:"white",
 paddingLeft: 10,
 fontSize: '17px',   
 paddingBottom: 5
}
const desStyle={
  fontFamily: 'sans-serif',
 // backgroundColor: '#6db5ef',
 //paddingTop: 10,
 color:"white",
 paddingLeft: 10,
 fontSize: '17px'
}
var index=1;
export default class FileProcess extends React.Component{
  componentWillMount(){
    let that=this;
    Request
    .get('http://127.0.0.1:5000/retriveAlgorithmName')
    .end(function(err, res){
      if(err){
        console.log('error')
      }
      else
      {
       that.setState({algoNames:JSON.parse(res.text)})

     }})

  }
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      completed: 0,
      clicked:false,
      algoNames:[],
      guideMsg:""
    };
    this.handleChange=this.handleChange.bind(this);
    this.algoGuide=this.algoGuide.bind(this);
    this.handleProgressBar=this.handleProgressBar.bind(this);
  }

  algoGuide()
  {
    this.setState({
      guideMsg:"the set of algorithms to be processed"
    })
  }
  handleChange(event, index, value)
  {
    var algo=value;
    this.setState({value:value})
    Request
    .post('http://127.0.0.1:5000/fileProcess')
    .send({Algorithm:algo})
    .set('Content-Type','application/json;charset=utf-8')
    .end(function(err, res){
      if(err){
        console.log(err);
      }
      else
       console.log(res)
   })
  }

  handleProgressBar(event)
  {
    this.setState({clicked: true});
    let that=this;
    Request
    .post('http://127.0.0.1:5000/status')
    .end(function(err, res){
     if(err){
       console.log(err);
     }
     else
     {
      console.log(res.text);
      var arr=res.text.split(',',10);
      var intArr=[];
      var offset=0;
      for(var i=0;i<arr.length;i++)
      {
        console.log(parseInt(arr[i]));
        intArr[i]=parseInt(arr[i]);
      }
      Array.from(intArr).forEach(function(percent){
        setTimeout(function(){
          that.setState({completed:percent});
          if(percent<100)
           document.getElementById("status").innerHTML=percent+"% trained...please wait";
         else
           document.getElementById("status").innerHTML="Bot is Ready!!";
       }, 1000 + offset);
        offset += 1000;
      });
    }
  })
  }

  render() {
    return (

      <Container style={{paddingTop:40}} >
      <Row>
      <Col xl={9} lg={9} md={9}>
      <div style={style}  >

      <Row style={gap}>
      <Col style={{paddingLeft:0}}>
      <DropDownMenu style={{width:400}} menuStyle={{width:350}}value={this.state.value} 
      onClick={this.algoGuide}
      onChange={this.handleChange}>
      <MenuItem key ={"Select Algorithm Name"} value={1} primaryText="Select Algorithm Name" disabled/>
      {this.state.algoNames.map(item=> <MenuItem key={item} value={item} primaryText={item} />)}
      </DropDownMenu>
      </Col>
      <Col >
      <RaisedButton label="Process" type="submit" primary={true} fullWidth={true} onTouchTap={this.handleProgressBar} disabled={false}/>
      </Col>
      </Row>

      </div >
      {
        this.state.clicked==true?

        <Col>
        <LinearProgress id="progressBar" mode="determinate"
        color={this.state.completed<=25? "#e46666":this.state.completed<=50?"#ffc107":this.state.completed<=75?"#aaddaa":"#42A5F6"}
        value={this.state.completed} max={100}
        style={{visibility:this.state.completed===100? 'hidden':'',height:10,borderRadius:20,marginTop:this.state.completed===100? 0:20,color:"green"}}/>
        <h3 id="status" style={capStyle}></h3>
        </Col>:null
      }
      </Col>  
      <Col xl={3} lg={3} md={3} style={{ backgroundColor: '#6db5ef',paddingBottom: 250 }}>
      <h1 style={desHead}>DESCRIPTION PANE</h1>
      {
        this.state.guideMsg!==""?
        <h1 style={desStyle}>{this.state.guideMsg}</h1>:null
      }
      </Col>
      </Row>
      </Container>

      );

  }
}
