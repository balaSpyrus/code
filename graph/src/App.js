import React, { Component } from 'react';
import axios from 'axios';
import {BarChart} from 'react-d3-components';
import HeatMap from 'react-heatmap-grid';
import './App.css'

class App extends Component {

  state={
    data : [{
      label: 'ap1',
      values: [{x: 'ap1', y:  Math.floor(Math.random() * 100)}, {x: 'ap2', y:  Math.floor(Math.random() * 100)}, {x: 'ap3', y:  Math.floor(Math.random() * 100)}]
    },
    {
      label: 'ap2',
      values: [{x: 'ap1', y:  Math.floor(Math.random() * 100)}, {x: 'ap2', y:  Math.floor(Math.random() * 100)}, {x: 'ap3', y:  Math.floor(Math.random() * 100)}]
    },
    {
      label: 'ap3',
      values: [{x: 'ap1', y:  Math.floor(Math.random() * 100)}, {x: 'ap2', y:  Math.floor(Math.random() * 100)}, {x: 'ap3', y:  Math.floor(Math.random() * 100)}]
    }],
    x:[],
    y:[],
    grid:[]
  }

  componentWillMount(){

   let self = this;

  // axios.get('/data.json')
  // .then(x=>self.setState({data:x.data}))
  // .catch(er=>console.log(er))

  axios.get('/gridData.json')
  .then(res=>{

    let data = new Array(res.data.times.length)
    .fill(0).map(() => new Array(res.data.apis.length)
      .fill(0).map(() => Math.round(Math.random() * 1)));

    self.setState({
      x:res.data.apis,
      y:res.data.times,
      grid:data
    })

  }).catch(err=>console.log(err))

}
render() {
  return (
    <div >
    
    <div className='container'>
    <HeatMap
    background='green'
    xLabels={this.state.x}
    yLabels={this.state.y}
    data={this.state.grid}
    />
    </div>
    <BarChart
    data={this.state.data}
    width={400}
    height={400}
    margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
    </div>
    );
}
}

export default App;
