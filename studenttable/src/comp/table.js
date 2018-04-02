import React, { Component } from 'react';

export default class TabComp extends Component{

	getSubjects=(data)=>{
		let subs=[]
		if(data.length !==0){
			subs = data[0].subjects.map((sub,i)=><th key={i}>{sub.subject}</th>)
		}

		return subs
		
	}


	render(){
		return(
			<table >      
			<tbody>
			<tr>
			<th>name </th>
			<th>sex </th>
			{
			this.getSubjects(this.props.studentData)
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