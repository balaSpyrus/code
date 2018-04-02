
import React, { Component } from 'react';
import logo from './logo.svg';
import {connect} from 'react-redux';
import axios from "axios";
import './App.css';
import TabComp from './comp/table';
import SelectComp from './comp/select';
import setData from './actions/dataAction';
import clone from 'clone';
class App extends Component {
  
  state={
    studentData:[],
    subjects:[],
    filterData:[],
    genders:[],
    subFill:'all',
    genFill:'all'
  }
  
  componentDidMount(){
    
    let self= this;
    
    axios.get('/data.json').then(res=>{
      
      let data = res.data;
      
      if(this.props.data[0] === 'defaultStateMsg')
      this.props.setData(data)
      
      
      let genders = []
      let subjects =[]
      let studentData = data.map(det=>{
        let tot=0
        det.subjects.map(sub=>{
          subjects.includes(sub.subject)!==true ? subjects.push(sub.subject):null
          tot+=sub.mark
        })
        genders.includes(det.sex)!==true ? genders.push(det.sex):null
        det.total = tot;
        return det
        
      })
      
      self.setState({
        studentData,
        filterData:studentData,
        genders,
        subjects
      })
    })
    
  }
  
  filterData=()=>{
    
    let data = clone(this.state.studentData);    
    
    if(this.state.subFill!== 'all'){
      data.map(eachrec=>{
        eachrec.subjects = eachrec.subjects.filter(eachSub=>{      
          return eachSub.subject===this.state.subFill 
        })
      })
    }
    
    if(this.state.genFill !== 'all'){
      data = data.filter(eachrec=>{     
        return eachrec.sex===this.state.genFill
      })
    }
    console.log(data);
    
    this.setState({
      filterData: data
    })
    
    
  }
  
  filterSub=(sub)=>{
    
    this.setState({
      subFill:sub
    },function(){
      this.filterData()   
    })
    
  }
  
  filterGen=(gen)=>{
    this.setState({
      genFill:gen
    },function(){
    this.filterData()      
    })
    
  }
  
  
  
  render() {
    const {studentData,subjects,filterData,genders} = this.state
    return (
      <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <TabComp studentData={studentData} showtotal={true}/>
      <SelectComp data={subjects} filterData={this.filterSub}/>
      <SelectComp data={genders} filterData={this.filterGen}/>
      <TabComp studentData={filterData} showtotal={false}/>
      
      </div>
      
    );
  }
}

const mapStateToProps = (state)=>({
  data:state.data
})

const mapActionToProps = {
  setData
}

export default connect(mapStateToProps,mapActionToProps)(App);
