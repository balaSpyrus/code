import React, { Component } from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import TabComp from './comp/table';
import SelectComp from './comp/select';
class App extends Component {

  state={
    studentData:[],
    subjects:[],
    filterData:[],
    genders:[],
    selected:-1
  }

  componentDidMount(){

    let self= this;

    axios.get('/data.json').then(res=>{

      let data = res.data;
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
        studentData:studentData,
        filterData:studentData,
        genders:genders,
        subjects:subjects
      })
    })

  }
  
  filSub=(i)=>{

    let data = this.state.studentData
    let sub = this.state.subjects[i];

    let filterData = []

    data.map((data,i)=>{

      let fillSub =[]

      data.subjects.map(eachSub=>{
        if(eachSub.subject === sub)
          fillSub.push(Object.assign({},eachSub))
      })

      filterData.push(Object.assign({},data))
      filterData[i].subjects = fillSub

    })
    this.setState({
      filterData:filterData,
      selected:i
    })
  }

  filterData=(i,filter)=>{   

    if(filter === 'subjects')
   i === this.state.subjects.length?
      this.setState((prevState)=>({filterData:prevState.studentData,selected:-1})):this.filSub(i)


 }

 render() {
  const {studentData,subjects,filterData,genders, selected} = this.state
  return (
    <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <TabComp studentData={studentData} subjects={subjects} showtotal={true}/>
    <SelectComp filterby="subjects" data={subjects} filterData={this.filterData}/>
    <SelectComp filterby="genders" data={genders} filterData={this.filterData}/>
    <TabComp studentData={filterData} subjects={selected === -1 ? subjects : new Array(subjects[selected])} 
    showtotal={false}/>

    </div>

    );
}
}

export default App;
