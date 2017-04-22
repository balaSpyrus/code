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
import {LineChart} from 'react-d3';



const style = {
  padding:"10px 0px",
  height: "auto",
  // width: 690,
  // marginLeft:"auto",
  // marginRight:"auto"

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
    background: "white",
    marginRight:10,
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
  textAlign: 'left',
  padding:15,
  margin:0,
  background:'#c5dfff'
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

  componentDidMount(){
    var intervalId = setInterval(this.getStockData, 5000);
   // store intervalId in the state so it can be accessed later:
   this.setState({intervalId: intervalId});
 }
 
 getStockData()
 {
  let that=this
  Request
  .get('http://finance.google.com/finance/info?client=ig&q=BOM:INFY')    
  .end(function(err, res){
    if(err){
      console.log(err);
    }
    else
    {
      let tempVal=res.text.split('//')
      let stockData=JSON.parse(tempVal[1]);
      let curValue=parseFloat(stockData[0].l_cur.substr(1,stockData[0].l_cur.length))
      let timeValue=parseFloat(new Date().getMinutes()+'.'+new Date().getSeconds())
      let data=that.state.chartData2; 
      if(data[0].values[0].y===0)     
      {
        data[0].values[0].x=1
        data[0].values[0].y=Math.floor(curValue)
        console.log("1st stock data : ",curValue,timeValue)
      }
      else if(data[0].values.length<10)
      {
        data[0].values.push({x:data[0].values[data[0].values.length-1].x+1,y:curValue})
        console.log("2nd stock data : ",curValue,timeValue)

      }
      else
      {
        let tempData=[]
        data[0].values.map(function(data,i){
          if(i!==0)
          {
            tempData.push(data)
          }

        })

        tempData.push({x:data[0].values[data[0].values.length-1].x+1,y:curValue})
        data[0].values=tempData

      }
      that.setState({
        chartData2:data
      })
      console.log(data[0].values)
    }
  })
  Request
  .get('http://finance.google.com/finance/info?client=ig&q=BOM:WIPRO')    
  .end(function(err, res){
    if(err){
      console.log(err);
    }
    else
    {
      let tempVal=res.text.split('//')
      let stockData=JSON.parse(tempVal[1]);
      let curValue=parseFloat(stockData[0].l_cur.substr(1,stockData[0].l_cur.length))
      let timeValue=parseFloat(new Date().getMinutes()+'.'+new Date().getSeconds())
      let data=that.state.chartData1; 
      if(data[0].values[0].y===0)     
      {
        data[0].values[0].x=1
        data[0].values[0].y=Math.floor(curValue)
        console.log("1st stock data : ",curValue,timeValue)
      }
      else if(data[0].values.length<10)
      {
        data[0].values.push({x:data[0].values[data[0].values.length-1].x+1,y:curValue})
        console.log("2nd stock data : ",curValue,timeValue)

      }
      else
      {
        let tempData=[]
        data[0].values.map(function(data,i){
          if(i!==0)
          {
            tempData.push(data)
          }

        })

        tempData.push({x:data[0].values[data[0].values.length-1].x+1,y:curValue})
        data[0].values=tempData

      }
      that.setState({
        chartData1:data
      })
      console.log(data[0].values)
    }
  })
}

componentWillMount(){
  clearInterval(this.state.intervalId);
  this.getStockData()
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
    clicked:false,
    algoNames:[],
    switches:[],
    selectedAlgo:"",
    selectedIndex:0,
    guideMsg:"",
    intervalId:0,
    query:"",
    chartData2:[
    {
      name: "INFOSYS",
      values: [{x:0,y:0}]
    }],
    chartData1:[
    {
      name: "WIPRO",
      values: [{x:0,y:0}]
    }],
    processSparkData:null,
    answer:"",
    expand:false,
    prosButt:false,
    prosButtDisable:false,
    anaButtDisable:false,
    TNPButtDisable:false,
    analyzeButt:false,
    trainNPreButt:false,
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
  this.handleProcess=this.handleProcess.bind(this);
  this.handleAnalyze=this.handleAnalyze.bind(this);
  this.handleTrainNPredict=this.handleTrainNPredict.bind(this);
  this.getStockData=this.getStockData.bind(this);
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
  .send({Algorithm:this.state.selectedAlgo,index:this.state.selectedIndex-1,query:this.state.query})
  .set('Content-Type','application/json;charset=utf-8')
  .end(function(err, res){
   if(err){
     console.log(err);
   }
   else
   {
    let data=JSON.parse(res.text);
    console.log("from the test response : \n",data)
    let value=data.progress[6]
    let dataset=value.split(':')
    console.log(dataset)
    that.setState({
      answer:dataset[1]
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
      analyzeButt:false,
      trainNPreButt:false,
      testButt:false,
      clicked:false,
      TNPButtDisable:false,
      anaButtDisable:false,
      prosButtDisable:false
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
handleTrainNPredict()
{
  this.setState({
    TNPButtDisable:true
  })
  let that=this;
  Request
  .post('http://127.0.0.1:5000/trainNpredict')
  .send({Algorithm:this.state.selectedAlgo,index:this.state.selectedIndex-1})
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

handleAnalyze()
{
  this.setState({
    anaButtDisable:true
  })
  let that=this;
  Request
  .post('http://127.0.0.1:5000/analyze')
  .send({Algorithm:this.state.selectedAlgo,index:this.state.selectedIndex-1})
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

handleProcess(event)
{
  this.setState({clicked: true,algoAccess:true});
  let that=this;
  Request
  .post('http://127.0.0.1:5000/process')
  .send({Algorithm:this.state.selectedAlgo,index:this.state.selectedIndex-1})
  .set('Content-Type','application/json;charset=utf-8')
  .end(function(err, res){
   if(err){
     console.log(err);
   }
   else
   {
    that.setState({
      prosButt:false,
      analyzeButt:false,
      trainNPreButt:false,
      testButt:false
    })
    let data=JSON.parse(res.text);
    console.log("from the progress response : \n",data)

    let intervalArr=[500,1000,1500,2000,2500,3000,3500,4000,4500,5000];
    let offset=0;
    let msg="";

    _(intervalArr).each(function(interval){

      setTimeout(function(){

       that.setState({
        prosButt:true,
        prosButtDisable:true
      });
         //ajax for getting for process
         that.setState({
          processSparkData:null
        })
         if(interval===1000)
         {
          msg+="process finished-analyze started....!!!"

          that.setState({             
            analyzeButt:true,
            guideMsg:msg
          });

          //ajax for getting for analyze
          that.setState({
            processSparkData:null
          })
        }


        else if(interval==2500)
        {
          msg+="-analyzig finished-training and predicting started......"

          that.setState({           
            trainNPreButt:true,
            guideMsg:msg
          });

          //ajax for getting for train and predict
          that.setState({
            processSparkData:null
          })
        }

        else if(interval ==3500)
        {
         that.setState({           
          testButt:true,
          guideMsg:msg

          

        });
       }
       else if(interval==5000)
       {
        msg+="-everything went well..!!-Ready for manual testing"
        that.setState({
          guideMsg:msg,
          algoAccess:false,

        })
      }
      console.log(interval,msg)

    }, 1000 + offset);    
      offset += 1000;
    });


  }
})
}

render() {
  return (

    <div >

    <Col xl={3} lg={3} md={3} style={{ backgroundColor: '#6db5ef',minHeight:'100vh',maxHeight:'100vh' }}>
    <h1 style={desHead}>ALGORITHMS</h1>
    {
      this.state.algoAccess===true?
      <h3 style={desStyle}>An Algorithm under Process</h3>        :
      this.state.algoNames.map(
        (item,i) => <ListAlgo key={i} item={item} index={i}  switchValue={this.state.switches[i]}   algoName={this.algoName}/>
        )

    }
    </Col>
    <Col xl={6} lg={6} md={6} style={{paddingTop:40}}>


    <Row style={gap}>


    {
      this.state.algoNames.length===0?
      <Col> <h3 style={capErr}>NO ALGORITHM FOUND</h3></Col>
      :       
      <Col>
      <Paper zDepth={3} >
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
      <Row style={{margin:0}}>
      <Formsy.Form
      ref="form"
      onValidSubmit={this.fetchData}
      >      
      <Col xl={10} lg={10} md={10} >
      <FormsyText
      name="Query"
      multiLine={true}
      rows={3}
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
      <Row onClick={this.ansGuide} style={{margin:0}}>
      <Col md={6} xl={6} lg={6} >
      <TextField        
      floatingLabelText="Expected Output"
      value={this.state.expectedOutput}
      disabled={true}
      fullWidth={true}
      multiLine={true}
      />
      </Col>
      <Col md={6} xl={6} lg={6} >
      <TextField        
      floatingLabelText="Predicted Output"
      value={this.state.answer}
      disabled={true}
      fullWidth={true}
      multiLine={true}
      />
      </Col>
      </Row>
      <Row onClick={this.ansGuide} style={{margin:0}}>        
      <Col >
      <TextField        
      floatingLabelText="Error in Difference"
      value={this.state.answer===""?"":""+Math.pow(this.state.answer-this.state.expectedOutput,2)}
      disabled={true}
      fullWidth={true}
      multiLine={true}
      />
      </Col>
      </Row>
      </CardText>

      <CardActions  style={{backgroundColor:"#b5b5b5",minHeight:46,maxHeight:46}}>
      <div style={{float:'right'}}>
      <IconButton className="effect"
      disabled={this.state.prosButtDisable}

      onTouchTap={this.handleProcess}
      tooltip="Process" touch={true} tooltipPosition="bottom-center"
      iconStyle={iconStyle.sizeIcon}
      style={iconStyle.size}>
      <AvPlayArrow color={this.state.prosButt===false?"#e46666":"#4caf50"}/>
      </IconButton> 
      <IconButton className="effect"
      disabled={this.state.anaButtDisable}
      onTouchTap={this.handleAnalyze}
      tooltip="Analyze" touch={true} tooltipPosition="bottom-center"
      iconStyle={iconStyle.sizeIcon}
      style={iconStyle.size}>
      <ActionRestore color={this.state.analyzeButt===false?"#e46666":"#4caf50"}/>
      </IconButton> 
      <IconButton className="effect"
      disabled={this.state.TNPButtDisable}
      onTouchTap={this.handleTrainNPredict}
      tooltip="Train / Predict" touch={true} tooltipPosition="bottom-center"
      iconStyle={iconStyle.sizeIcon}
      style={iconStyle.size}>
      <ActionLightbulbOutline color={this.state.trainNPreButt===false?"#e46666":"#4caf50"}/>
      </IconButton> 
      <IconButton className="effect"
      onTouchTap={this.handleTest}
      tooltip="Test" touch={true} tooltipPosition="bottom-center"
      iconStyle={iconStyle.sizeIcon}
      style={iconStyle.size}>
      <ActionBuild color={this.state.testButt===false?"#e46666":"#4caf50"}/>
      </IconButton> 
      </div>
      </CardActions>
      </Card>
      </Paper>
      </Col>

    }     
    </Row>
    <Row>
    <Col>

    <LineChart
    legend={true}
    data={this.state.chartData1}
    width={600}
    height={300}
    title="WIPRO stock Chart"
    showXGrid= {false}
    showYGrid= {false}
    />
    </Col>
    </Row>
    <Row>
    <Col>

    <LineChart
    legend={true}
    data={this.state.chartData2}
    width={600}
    height={300}
    title="INFY stock Chart"
    showXGrid= {false}
    showYGrid= {false}
    />
    </Col>
    </Row>

    {
      // this.state.clicked==true?

      // <Row>
      // {this.state.prosButt===true?<Col>
      //   <Paper zDepth={3} style={{minHeight:180,maxHeight:180,marginTop:20}}>
      //   <h3  style={capStyle}>Processing...</h3>
      //   </Paper>
      //   </Col>:null}
      //   { this.state.analyzeButt===true?<Col>
      //    <Paper zDepth={3} style={{minHeight:180,maxHeight:180,marginTop:20}}>
      //    <h3  style={capStyle}>Analyzing...</h3>
      //    </Paper>
      //    </Col>:null}
      //    {this.state.trainNPreButt===true?<Col>
      //     <Paper zDepth={3} style={{minHeight:180,maxHeight:180,marginTop:20}}>
      //     <h3  style={capStyle}>Train & Predicting...</h3>
      //     </Paper>
      //     </Col>:null}

      //     </Row>:null
    }
    </Col>  
    <Col xl={3} lg={3} md={3} style={{ position:'fixed',left:'75%',backgroundColor: '#888888',minHeight:'100vh',maxHeight:'100vh',overflowY:'scroll',float:'right'}}>
    <h1 style={desHead}>DESCRIPTION PANE</h1>
    {
      this.state.guideMsg!==""?
      this.state.guideMsg.split('-').map(function(string,i){
        return  <div key={i}><h1 style={desStyle}>{string}</h1></div>
      }):null
    }
    </Col>

    </div>

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