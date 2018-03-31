import React, { Component } from 'react';

export default class SelectComp extends Component{

	componentWillMount(){
		console.log(this.props)

	}

	selectedOp=(e)=>{

		this.props.filterData(e.target.options.selectedIndex,this.props.filterby)
	}

	render(){
		return(
		
			this.props.data.length!==0?
			<select onChange={this.selectedOp} defaultValue="all">			
			{this.props.data.map((sub,i)=><option key={i} value={sub}>{sub}</option>)}
			<option value="all">all</option>
			</select>
			:null
		
		)
	}
}