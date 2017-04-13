import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import './transition.css'
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Container,Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
import Paper from 'material-ui/Paper';
import Request from "superagent";
import LinearProgress from 'material-ui/LinearProgress';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import TextField from 'material-ui/TextField';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionRestore from 'material-ui/svg-icons/action/restore';

const style = {
  padding:"10px 0px",
  height: "auto",
  width: 375,
  marginLeft:"auto",
  marginRight:"auto"

};
const iconStyle = {
  sizeIcon: {

    width: 26,
    height: 26,
    marginLeft:-2
  },
  size: {

    width: 45,
    height: 45,
    background: "#f3f3f3",
    borderRadius: 30
  }
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
const capErr={
  fontFamily: 'sans-serif',
  fontSize: '20pt',
  color: '#e46666',
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

const algSty={
  fontFamily: 'sans-serif',
  margin:0,
  paddingBottom:8,
  color:"white",
  paddingLeft: 30,
  fontSize: '17px'
}

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
        let aNames=JSON.parse(res.text);
        let switchData=[];
        aNames.map((names,i)=> switchData[i]=false)

        that.setState({
          algoNames:aNames,
          switches:switchData
        })

        if(aNames.length!==0)
        {
          that.algoName(aNames[0],0)
        }

        

      }})

  }
  constructor(props) {
    super(props);
    this.state = {
      algoAccess:false,
      flag:false,
      completed: 0,
      clicked:false,
      algoNames:[],
      switches:[],
      selectedAlgo:"",
      selectedIndex:0,
      guideMsg:"",
      query:"",
      answer:"",
      expand:false,
      prosButt:false,
      trainButt:false,
      preButt:false,
      testButt:false,
    };
    this.handleExpandChange=this.handleExpandChange.bind(this);

    this.camelize=this.camelize.bind(this);
    this.handleTest=this.handleTest.bind(this);
    this.algoGuide=this.algoGuide.bind(this);
    this.qryGuide=this.qryGuide.bind(this);
    this.ansGuide=this.ansGuide.bind(this);
    this.algoName=this.algoName.bind(this);
    this.queryValue=this.queryValue.bind(this);
    this.fetchData=this.fetchData.bind(this);
    this.handleProgress=this.handleProgress.bind(this);
    this.handleTrain=this.handleTrain.bind(this);
    this.handlePredict=this.handlePredict.bind(this);
  }
  handleExpandChange = (expanded) => {
    this.setState({expand: expanded});
  };
  algoGuide()
  {
    this.setState({
      guideMsg:"the Name of the algorithm"
    })
  }
  qryGuide()
  {
    this.setState({
      guideMsg:"the manual Query to be  passed to test the algorithm"
    })
  }
  ansGuide()
  {
    this.setState({
      guideMsg:"answeer for the query on the selected algorithm"
    })
  }
  queryValue(event,value)
  {
    this.setState({
      query:value
    })

  }
  fetchData()
  {

    let that=this;
    Request
    .post('http://127.0.0.1:5000/test')
    .send({Algorithm:this.state.selectedAlgo,index:this.state.selectedIndex,query:this.state.query})
    .set('Content-Type','application/json;charset=utf-8')
    .end(function(err, res){
     if(err){
       console.log(err);
     }
     else
     {
      let data=JSON.parse(res.text);
      console.log("from the test response : \n",data)
      that.setState({
        answer:"WORK UNDER PROCESS FOR THE QUERY : "+data.data.query
      })
      
    }
  })
    

  }
  algoName(selectedName,index)
  {
    let tempSwitch=this.state.switches.map((item,i)=>{
      if(i==index)
        return true 
      else
        return false
    })
    let tempName=selectedName.length>16?selectedName.toUpperCase().substr(0,16)+'...':selectedName.toUpperCase()
    this.setState({
      selectedAlgo:selectedName,
      switches:tempSwitch,
      selectedIndex:index+1,
      guideMsg:"the Algorithm "+tempName+" is selected"
    })
    if(selectedName!==this.state.selectedAlgo)
    {
      this.setState({
        prosButt:false,
        trainButt:false,
        preButt:false,
        testButt:false,
        clicked:false
      })
    }

    Request
    .post('http://127.0.0.1:5000/fileProcess')
    .send({Algorithm:selectedName})
    .set('Content-Type','application/json;charset=utf-8')
    .end(function(err, res){
      if(err){
        console.log(err);
      }
      else
       console.log("selected Algorithm : "+res.text)
   })
  }
  handleTest()
  {
    let toggle=this.state.expand
    this.setState({
      expand:!toggle
    })

  }
  handlePredict()
  {
    let that=this;
    Request
    .post('http://127.0.0.1:5000/predict')
    .send({Algorithm:this.state.selectedAlgo,index:this.state.selectedIndex})
    .set('Content-Type','application/json;charset=utf-8')
    .end(function(err, res){
     if(err){
       console.log(err);
     }
     else
     {
      let data=JSON.parse(res.text);
      console.log("from the predict response : \n",data)

    }
  })
  }

  handleTrain()
  {
    let that=this;
    Request
    .post('http://127.0.0.1:5000/train')
    .send({Algorithm:this.state.selectedAlgo,index:this.state.selectedIndex})
    .set('Content-Type','application/json;charset=utf-8')
    .end(function(err, res){
     if(err){
       console.log(err);
     }
     else
     {
      let data=JSON.parse(res.text);
      console.log("from the train response : \n",data)

    }
  })
  }

  camelize(str)
  {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
   if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
   return index !== 0 ? match.toLowerCase() : match.toUpperCase();
 });
  }

  handleProgress(event)
  {
    this.setState({clicked: true,algoAccess:true});
    let that=this;
    Request
    .post('http://127.0.0.1:5000/status')
    .send({Algorithm:this.state.selectedAlgo,index:this.state.selectedIndex})
    .set('Content-Type','application/json;charset=utf-8')
    .end(function(err, res){
     if(err){
       console.log(err);
     }
     else
     {
      let data=JSON.parse(res.text);
      console.log("from the progress response : \n",data)
      let arr=data.progress.split(',',10);
      let intArr=[];
      let offset=0;
      for(let i=0;i<arr.length;i++)
      {
        console.log(parseInt(arr[i]));
        intArr[i]=parseInt(arr[i]);
      }
      Array.from(intArr).forEach(function(percent){
        setTimeout(function(){
          let msg=that.state.guideMsg
          that.setState({
            completed:percent,
            prosButt:true,

          });
          if(percent===10)
          {
            msg="the process has been initiated"
            that.setState({
              guideMsg:msg
            })
          }
          else if(percent===20)
          {
            msg+="-the respective JAR files are fetched"
            that.setState({
              guideMsg:msg
            })
          }
          else if(percent===30)
          {
            msg+="-training started....!!!"

            that.setState({             
              trainButt:true,
              guideMsg:msg
            });
          }
          else if(percent===40)
          {
            msg+="-the model is training......"
            that.setState({
              guideMsg:msg
            })
          }
          else if(percent===50)
          {
            msg+="-the model is training......"
            that.setState({
              guideMsg:msg
            })
          }
          else if(percent==60)
          {
            msg+="-the model is training......"

            that.setState({           
              preButt:true,
              guideMsg:msg
            });
          }
          else if(percent===70)
          {
            msg+="-prediction are ready..!!"
            that.setState({
              guideMsg:msg
            })
          }
          else if(percent===80)
          {
            msg+="-preparing the model for the manual testing"
            that.setState({
              guideMsg:msg
            })
          }
          else if(percent ==90)
          {
            msg+="-commiting the data generated from the model"

            that.setState({           
              testButt:true,
              guideMsg:msg

            });
          }
          else
          {
            msg+="-everything went well..!!-Ready for manual testing"
            that.setState({
              guideMsg:msg,
              algoAccess:false
            })
          }
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
      <Col xl={3} lg={3} md={3} style={{ backgroundColor: '#6db5ef',minHeight:550 }}>
      <h1 style={desHead}>ALGORITHMS</h1>
      {
        this.state.algoAccess===true?
        <h3 style={desStyle}>An Algorithm under Process</h3>        :
        this.state.algoNames.map(
          (item,i) => <ListAlgo key={i} item={item} index={i}  switchValue={this.state.switches[i]}   algoName={this.algoName}/>
          )

      }
      </Col>
      <Col xl={6} lg={6} md={6}>


      <Row style={gap}>


      {
        this.state.algoNames.length===0?
        <Col> <h3 style={capErr}>NO ALGORITHM FOUND</h3></Col>
        :
        <div>
        <Col>
        <Card
        expanded={this.state.expand} 
        onExpandChange={this.handleExpandChange}

        >

        <CardTitle 
        onClick={this.algoGuide} 
        style={{paddingBottom:5}}
        title={
          <div style={{paddingBottom:10}}>
          <Avatar>{this.state.selectedAlgo.charAt(0).toUpperCase()}</Avatar>
          <h3 style={{margin:0,display:'inline-flex',paddingLeft:10,color:'#a9a7a7'}}>
          {this.camelize(this.state.selectedAlgo).length>16?
            this.camelize(this.state.selectedAlgo).substr(0,16)+'...'
            :
            this.camelize(this.state.selectedAlgo)
          }

          </h3>
          </div>
        } 
        subtitle={"Algorithm "+this.state.selectedIndex} />
        <CardText  expandable={true} style={style}>
        <Row>
        <Formsy.Form
        ref="form"
        onValidSubmit={this.fetchData}
        >      
        <Col xl={10} lg={10} md={10} >
        <FormsyText
        name="Query"
        value={this.state.query}
        onClick={this.qryGuide}
        onChange={this.queryValue}
        type="text"
        fullWidth={true}
        required
        floatingLabelText="Query"

        />
        </Col>
        <Col xl={2} lg={2} md={2} style={{paddingTop:17}}>
        <IconButton
        type="submit"

        iconStyle={{paddingTop:10}}
        style={{paddingTop:10}}
        >
        <ContentSend style={{color:"#4ace96"}}/>
        </IconButton> 
        </Col>      
        </Formsy.Form>
        </Row>
        <Row onClick={this.ansGuide}>
        <Col>
        <TextField
        hintText="Output"
        value={this.state.answer}
        disabled={true}
        fullWidth={true}
        multiLine={true}
        />
        </Col>
        </Row>
        </CardText>

        <CardActions  style={{backgroundColor:"#b5b5b5",paddingLeft:320}}>
        <IconButton className="effect"
        onTouchTap={this.handleProgress}
        tooltip="Process" touch={true} tooltipPosition="bottom-center"
        iconStyle={iconStyle.sizeIcon}
        style={iconStyle.size}>
        <AvPlayArrow color={this.state.prosButt===false?"#e46666":"#4caf50"}/>
        </IconButton> 
        <IconButton className="effect"
        onTouchTap={this.handleTrain}
        tooltip="Train" touch={true} tooltipPosition="bottom-center"
        iconStyle={iconStyle.sizeIcon}
        style={iconStyle.size}>
        <ActionRestore color={this.state.trainButt===false?"#e46666":"#4caf50"}/>
        </IconButton> 
        <IconButton className="effect"
        onTouchTap={this.handlePredict}
        tooltip="Predict" touch={true} tooltipPosition="bottom-center"
        iconStyle={iconStyle.sizeIcon}
        style={iconStyle.size}>
        <ActionLightbulbOutline color={this.state.preButt===false?"#e46666":"#4caf50"}/>
        </IconButton> 
        <IconButton className="effect"
        onTouchTap={this.handleTest}
        tooltip="Test" touch={true} tooltipPosition="bottom-center"
        iconStyle={iconStyle.sizeIcon}
        style={iconStyle.size}>
        <ActionBuild color={this.state.testButt===false?"#e46666":"#4caf50"}/>
        </IconButton> 
        </CardActions>

        </Card>

        </Col>
        </div>
      }     
      </Row>


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
      <Col xl={3} lg={3} md={3} style={{ backgroundColor: '#6db5ef',minHeight:550,maxHeight:550,overflowY:'none' }}>
      <h1 style={desHead}>DESCRIPTION PANE</h1>
      {
        this.state.guideMsg!==""?
        this.state.guideMsg.split('-').map(function(string,i){
          return  <div key={i}><h1 style={desStyle}>{string}</h1></div>
        }):null
      }
      </Col>
      </Row>
      </Container>

      );

}
}
class ListAlgo extends React.Component{
  constructor(props) {
    super(props);
    this.sendName=this.sendName.bind(this);
    
  }
  sendName()
  {
    this.props.algoName(this.props.item,this.props.index)
  }


  render() {
   return ( <h3 style={{fontFamily: 'sans-serif',
     backgroundColor:this.props.switchValue==true?'white':null,
     margin:0,
     paddingTop:6,
     paddingBottom:6,
     color:this.props.switchValue==true?"#6db5ef":"white",
     paddingLeft: 30,
     fontSize: '17px'}}
     className="menu"
     onClick={this.sendName} >{this.props.item.length>16?this.props.item.toUpperCase().substr(0,16)+'...':this.props.item.toUpperCase()}</h3>)
 }
}