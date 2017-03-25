import React from 'react';
import Show from './JobShow.jsx';
import Request from 'superagent';
import AddJobDialog from './AddJobDialog.jsx';
import {Container} from 'react-grid-system';
const fonts={
	margin: "0px auto",
	textAlign: "center",
	fontFamily: "sans-serif",
	color: "#1976d2 "
}
export default class Job extends React.Component {
	constructor(props) {
		super(props);
		this.enableButton = this.enableButton.bind(this);
		this.disableButton = this.disableButton.bind(this);
		this.state = {jobList: [],canSubmit:false};
	}

	addJob(job)
	{
		let url =`http://localhost:8081/job`;
		let that = this;
		Request
		.post(url)
		.send({'job':job})
		.end(function(err, res){
			let obj=JSON.parse(res.text);
			let jobList1=that.state.jobList;
			jobList1.push(obj);
			that.setState({jobList:jobList1});
		});
	}
	deletejob(id)
	{
		console.log("in delete module");
		var invert=this.state.jobList;
		var deleteItem=invert.filter(function(ele) {
			return ele._id!==id;
		});		
		this.setState({jobList:deleteItem});
		console.log("deleting job with id "+ id);
		let url =`http://localhost:8081/delete`;
		Request
		.del(url)
		.send({'_id':id})
		.end(function(err, res){
			if(err)
				console.log("error deleting "+err)
			else
				console.log("deleted")
		});
	}
	show()
	{
		let url =`http://localhost:8081/show`;
		let that = this;
		Request
		.get(url)
		.end(function(err, res){
			if(err)
			{
				res.send(err);
			}
			else
			{
				var data= res.body;
				console.log("recurring")
				that.setState({jobList:data})
			}
		});
	}

	componentDidMount()
	{
		this.show();
	}

	update(i,newItem)
	{
		console.log("updating from parent")
		let arr1=this.state.jobList;
		arr1.splice(i,1,newItem)
		this.setState({jobList:arr1})
	}
	render() {
		console.log("from main job component")
		return (
			<div style={fonts}>
			<h1 >JOB MANAGER</h1>
			{this.state.jobList.length!=0?<div>
				<h1>JOB LIST</h1>

				<Container>
				{this.state.jobList.map((item,i) =>{
					console.log("each job item")
					console.log(item)
					return <Show index={i} key={i} indexs={i} ref="show"
					update={this.update.bind(this)}
					deletejob={this.deletejob.bind(this)} item={item} />
				})}
				</Container>
				</div>:<h1>NO JOBS AVAILABLE</h1>}
				<AddJobDialog addJob={this.addJob.bind(this)} style={{color: "#1976d2 "}}/>
				</div>

				);
	}
	enableButton() {
		this.setState(()=>({
			canSubmit: true
		}));
	}
	disableButton() {
		this.setState(()=>({
			canSubmit: false
		}));
	}

}