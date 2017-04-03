import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import $ from 'jquery'; 
import Request from "superagent";
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import {Container,Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'; 
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import MenuItem from 'material-ui/MenuItem';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  paper:{
    height: 270,
    width: 500,
    marginLeft: "auto",
    marginRight:"auto",
    marginTop:"15%"

  },
  slide: {
    padding: 10,
  },
  gap:{
    paddingBottom:10
  },
  layout:{

    height: "auto",
    width: 350,
    marginLeft:"auto",
    marginRight:"auto"

  },
  jarCaption:{
    display: "inline-block",
    paddingRight: 15,
    fontSize: 16,
    color: "#0564b1",
    fontFamily: "sans-serif"
  },
  capStyle:{
    fontFamily: 'sans-serif',
    fontSize: '17pt',
    color: '#e46666',
    textAlign: 'center'
  },
  desHead:{
    fontFamily: 'sans-serif',
 // backgroundColor: '#6db5ef',
 paddingTop: 10,
 color:"white",
 paddingLeft: 10,
 fontSize: '17px',   
 paddingBottom: 5
},
desStyle:{
  fontFamily: 'sans-serif',
 // backgroundColor: '#6db5ef',
 //paddingTop: 10,
 color:"white",
 paddingLeft: 10,
 fontSize: '17px'
}
};

var temp=[];
export default class RegisterAlgorithm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      algorithm_name:"",
      path:"",
      dataSource:"",
      slideIndex:0,
      msg:"",
      algoNames:[],
      guideMsg:""
    }
    this.onChangeSelect=this.onChangeSelect.bind(this);
    this.algorithm_name=this.algorithm_name.bind(this);
    this.dataSource=this.dataSource.bind(this);
    this.fetchData=this.fetchData.bind(this);
    this.anameGuide=this.anameGuide.bind(this);
    this.selectGuide=this.selectGuide.bind(this);
    this.sourceGuide=this.sourceGuide.bind(this);
    this.uploadGuide=this.uploadGuide.bind(this);
  }
  anameGuide()
  {
    this.setState({
      guideMsg:"the name of the algorithm to be registered"
    })
  }
  selectGuide()
  {
    this.setState({
      guideMsg:"whether to use Kafka or File System for the data source"
    })
  }
  sourceGuide()
  {
    this.setState({
      guideMsg:"the source of the data to be processed"
    })
  }
  uploadGuide()
  {
    this.setState({
      guideMsg:"the JAR file containing the logic for the algorithm"
    })
  }
  algorithm_name(event,value)
  {

    this.setState({
      algorithm_name:value
    })

  }
  dataSource(event,value)
  {

    this.setState({
      dataSource:value
    })

  }

  onChangeSelect(event, index){ 
    this.setState({
      path: index
    }) 
  }


  fetchData = () => {
    console.log("im going")
    console.log($('#file'))
    if(this.state.algorithm_name!=="" && this.state.dataSource!=="" && this.state.path!==""&& $('#file')[0].files.length!==0)
    {
      this.setState({
        msg:""
      })
      let data = new FormData();
      data.append('algorithmName',this.state.algorithm_name);
      data.append('dataSource',this.state.dataSource)
      console.log(data)
      $.each($('#file')[0].files, function(i, file) {
        if(file.size<=10485760)
          data.append('file', file);
        else
          this.setState({
            msg:"FILES ABOVE 10MB ARE OMITTED"
          })
      });

      $.ajax({
        useDefaultXhrHeader: false,
        cors: true,
        url: 'http://127.0.0.1:5000/uploader',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
          alert(data);
        }
      });
    }
    else
    {
      this.setState({
        msg:"PLEASE FILL ALL THE FIELDS"
      })
    }
  };
  render(){
    return(

     <Container style={{paddingTop:40}}>
     <Row>
     <Col xl={9} lg={9} md={9}>
     <div style={styles.layout}>
     <Formsy.Form
     ref="form"
     onValidSubmit={this.fetchData}
     >

     <Row style={styles.gap}>
     <Col >
     <FormsyText
     name="algorithm name"
     value={this.state.algorithm_name}
     type="text"
     onClick={this.anameGuide}
     fullWidth={true}
     validations="isAlphanumeric"
     validationError="Enter alpha numeric characters only"
     floatingLabelText="Algorithm name"
     onChange={this.algorithm_name}
     />
     </Col>  
     <Col style={{paddingTop:15}}>
     <FormsySelect
     name="path"        
     onClick={this.selectGuide} 
     value={this.state.path}
     fullWidth={true}
     onChange={this.onChangeSelect}
     >
     <MenuItem value="kafka" 
     primaryText="kafka" />
     <MenuItem value="file system" 
     primaryText="file system" />     
     </FormsySelect>
     </Col >
     {
      this.state.path!==""?
      <Col style={{marginTop:-15}}>
      <FormsyText
      name="Data source"
      value={this.state.dataSource}
      onClick={this.sourceGuide}
      type="text"
      fullWidth={true}
      floatingLabelText={this.state.path==="kafka"?"Topic":"Source Path"}
      onChange={this.dataSource}
      />
      </Col> :null
    } 
    </Row>
    <Row style={styles.gap}>

    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
    <div style={{width:356,paddingLeft:20}}>
    <p style={styles.jarCaption}> Upload JAR :</p>  
    <input type="file" name="file" id="file" onClick={this.uploadGuide} 
    style={{ color: "#0c64b8",fontSize: 13,fontWeight: 600}}/>
    </div>
    </Col>  
    </Row>
    <Row style={styles.gap}>
    <Col >
    <div style={{float:"none",width: 300,marginLeft: "auto",marginRight: "auto"}}>
    <RaisedButton label="Submit" type="submit" primary={true} fullWidth={true}/>
    </div>
    </Col>

    </Row>
    </Formsy.Form>
    {
      this.state.msg!==""?<h2 style={styles.capStyle}>{this.state.msg}</h2>:null
    }
    </div>
    </Col>
    <Col xl={3} lg={3} md={3} style={{ backgroundColor: '#6db5ef',paddingBottom: 250 }}>
    <h1 style={styles.desHead}>DESCRIPTION PANE</h1>
    {
      this.state.guideMsg!==""?
      <h1 style={styles.desStyle}>{this.state.guideMsg}</h1>:null
    }
    </Col>
    </Row>
    </Container>

    );
  }
}