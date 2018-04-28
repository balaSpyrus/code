import React, { Component } from 'react';

export default class SelectComp extends Component{


	selectedOp=(e)=>{		
		
		this.props.filterData(e.target.value,this.props.filterBy)
	}

	render(){
		return(
		
			this.props.data.length!==0?
			<select onChange={this.selectedOp} defaultValue="all">			
			{this.props.data.map((eachData,i)=><option key={i} value={eachData}>{eachData}</option>)}
			<option value="all">all</option>
			</select>
			:null
		
		)
	}
}