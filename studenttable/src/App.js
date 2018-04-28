
import React, { Component } from 'react';
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
    shows:['highest','lowest'],
    subFill:'all',
    genFill:'all',
    show :'all'
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

    if(this.state.subFill!== 'all' && this.state.show!= 'all'){

      let mark = this.state.show === 'highest' ? Number.MIN_VALUE: Number.MAX_VALUE;
      data.map(eachrec=>{
       eachrec.subjects.map(eachSub=>{               
         if(this.state.show === 'highest'? eachSub.mark > mark : eachSub.mark < mark)
          mark = eachSub.mark
      })
     })

      data = data.filter(eachData=>{
        eachData.subjects = eachData.subjects.filter(eachSub=>{
          return eachSub.mark === mark
        })
        if(eachData.subjects && eachData.subjects.length > 0 )
          return data
      })
    }

    this.setState({
      filterData: data
    })
    
    
  }
  
  filterBy=(data,field)=>{
    this.setState({
      [field]:data
    },function(){
      this.filterData()      
    })
    
  }
  
  
  
  render() {
    const {studentData,subjects,filterData,genders,shows} = this.state
    return (
      <div className="App">
      
      <TabComp studentData={studentData} showtotal={true}/>
      <SelectComp data={subjects} filterBy ='subFill' filterData={this.filterBy}/>
      <SelectComp data={genders} filterBy = 'genFill' filterData={this.filterBy}/>
      {
        this.state.subFill !== 'all' ?
        <SelectComp data={shows} filterBy = 'show' filterData={this.filterBy}/>:null
      }
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
