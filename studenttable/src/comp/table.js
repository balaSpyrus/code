import React, { Component } from 'react';

export default class TabComp extends Component{

	componentWillMount(){
		console.log(this.props)

	}

	render(){
		return(
			<table >      
			<tbody>
			<tr>
			<th>name </th>
			<th>sex </th>
			{
				this.props.subjects.map((sub,i)=>sub !== undefined ? <th key={i}>{sub}</th>:null)
			}
			{this.props.showtotal === true ? <th>total</th>:null}
			</tr>
			{
				this.props.studentData.map((data,index)=>{
					return <tr key={index}>
					<td>{data.name}</td>
					<td>{data.sex}</td>
					{
						data.subjects.map((sub,i)=><td key={i}>{sub.mark}</td>)
					}
					{this.props.showtotal === true ? <td>{data.total}</td>:null}
					</tr>

				})

			}
			</tbody>
			</table>
			)
	}
}