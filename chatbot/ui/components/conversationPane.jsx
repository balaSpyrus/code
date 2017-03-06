import React from 'react';
import ReactDOM from 'react-dom';
import Chip from 'material-ui/Chip';
import {Row, Col} from 'react-grid-system';

const spaceStyle={
	backgroundColor:"#e8e9ea",
	height:420,
	overflowY: "scroll"
}

const userChip={
	
	float:"right",
	textAlign:"right",
	margin:"8px 35px 8px 0px"
}
const botChip={
	
	float:"left",
	textAlign:"left",
	margin:"8px 0px 8px 35px"
}
export default class ConvPane extends React.Component{
	constructor(props) {
		super(props);
		console.log(props);
		
	}
	
	componentDidUpdate() {		
		let len = this.props.convArr.length-1;
		const node = ReactDOM.findDOMNode(this[''+len]);
		if (node) {
			node.scrollIntoView();
		}
	} 

	render() {

		return (
			<Row style={{paddingBottom:15}}>
			<div style={spaceStyle}>
			{
				this.props.convArr.map((eachConv,key)=>{

					let displayText=[];
					if(eachConv.length<60)
					{
						displayText.push(eachConv)
					}					
					else
					{							
						let start=0,end=60,len=eachConv.length;
						while(end!=len)
						{
							displayText.push(eachConv.slice(start,end))
							start=end;
							if(len-end>0 && (len-end)>=60)
								{end+=60;}
							else
								{end=len;}
						}
						displayText.push(eachConv.slice(start,end))
						console.log(displayText);
					}

					if(key%2==0)
					{
						
						return (
							<Col key={key} ref={(ref) => this[''+key] = ref} >							
							{
								displayText.map(function (data,i) {
									return(
										<Chip backgroundColor="#3fda96"
										labelColor="#ffffff"
										key={i}
										style={userChip} >
										{data}
										</Chip>
										)
								})}							
								</Col>
								)
					}

					else
					{
						return (
							<Col key={key} ref={(ref) => this[''+key] = ref} >
							{
								displayText.map(function (data,i) {
									return(
										<Chip backgroundColor="#ffffff"
										labelColor="#3fda96"
										key={i}
										style={botChip} >
										{data}
										</Chip>
										)
								})}		
								</Col>)
					}
				})

			}
			</div>
			</Row>
			
			);
	}
}