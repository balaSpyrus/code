import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Webcam from 'react-webcam';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Request from "superagent"
import FontIcon from 'material-ui/FontIcon';	  	  
import Dropzone from 'react-dropzone';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Row, Col, ScreenClassRender,Container, Visible} from 'react-grid-system';
const appStyle={
	position: 'fixed',
	top: 0,
	backgroundColor:'#222222'
}
const fieldStyle={
	display:"block",
	width:"90%",
	margin:"0 auto"
}
const capStyle={
	fontFamily:"sans-serif",
	marginTop: "50%",
	textAlign: "center",
	fontSize: "medium",
	color: "#383737"
}
const iconStyle={
	marginLeft: "42%",
	position: 'absolute',
	marginTop: "-2%",
	background:'black',
	borderRadius:30
}
const iconStyle2={
	marginLeft: "84%",
	position: 'absolute',
	marginTop: "-4%",
	background:'black',
	borderRadius:30
}
const tabStyle={
	width:"80%",
	margin:"0 auto"
}
const butStyle={
	width:"80%",
	margin:"15px auto 0"
}
const queryStyle={
	width:"80%",
	margin:"0 auto"
}
const upStyle={
	width:"75%",
	display:"block",
	height:500,
	border:"5px solid black",
	margin:"0 auto"
}
const cap2Style={textAlign:"center",
marginTop: '45%',
fontFamily: 'sans-serif',
fontSize: 20,
fontWeight: 500,
color: '#585858'}

export default class BillManager extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			uploadedFile:{},
			query:'',
			row:0,
			col:0,
			takePhoto:false,
			answer:'no answer',
			showButt:true,
			data:[]
		}
		this.onImageDrop=this.onImageDrop.bind(this)
		this.query=this.query.bind(this)
		this.analyzeButton=this.analyzeButton.bind(this)
		this.photoButton=this.photoButton.bind(this)
		this.saveButton=this.saveButton.bind(this)
		this.closeImg=this.closeImg.bind(this)
		this.editCell=this.editCell.bind(this)
		this.editData=this.editData.bind(this)
		this.mediaFile=this.mediaFile.bind(this)

	}
	editData(event ,value)
	{
		let editableData=this.state.data
		if(this.state.col === 1)
			editableData[this.state.row].key=value
		else
			editableData[this.state.row].value=value
		this.setState({
			data:editableData
		})
	}
	editCell(row,col){
		
		this.setState({
			row:row,
			col:col
		})
	}
	
	closeImg()
	{
		this.setState({
			uploadedFile:{}
		})
	}
	query(event , value)
	{
		this.setState({
			query:value
		})
	}
	analyzeButton()
	{
        // let url =`http://localhost:8001/analyseFile`;
		// let that = this;
		// Request
		// .post(url)
		// .send({'query':this.state.query})
		// .end(function(err, res){
		// 	if(err){
		// 		that.setState({
		// 			answer:""+err
		// 		})
		// 	}
		// 	else
		// 	{
		// 		that.setState({
		// 			answer:JSON.parse(res.text)
		// 		})
		// 	}

		// });

        // once the backend is connected comment the below code
        let data=this.state.query
        this.setState({
        	answer:data
        })
    }
    photoButton()
    {
    	this.setState({
    		uploadedFile:{},
    		takePhoto:true,
    		showButt:false,
    		data:[
    		{	key:'1',value:'aaa'	},
    		{	key:'2',value:'bbb'	},
    		{	key:'3',value:'ccc'	},
    		{	key:'4',value:'ddd'	},
    		{	key:'5',value:'ddd'	},
    		{	key:'6',value:'eee'	}
    		]
    	})
    }
    mediaFile()
    {
    	let capture={
    		preview:this.refs.webcam.getScreenshot()
    	}
    	console.log(capture);

    	this.setState({
    		uploadedFile:capture,
    		takePhoto:false,
    		showButt:true
    	})
    }
    saveButton()
    {
    	console.log(this.state.data);

    	// let url =`http://localhost:8001/saveFile`;
		// let that = this;
		// Request
		// .post(url)
		// .send({'data':this.state.data})
		// .end(function(err, res){
		// 	if(err){
		// 		that.setState({
		// 			data:""+err
		// 		})
		// 	}
		// 	else
		// 	{
		// 		that.setState({
		// 			data:JSON.parse(res.text)
		// 		})
		// 	}

		// });

	}
	onImageDrop(files) {

		// let url =`http://localhost:8001/uploadFile`;
		// let that = this;
		// Request
		// .post(url)
		// .send({'data':files[0]})
		// .end(function(err, res){
		// 	if(err){
		// 		that.setState({
		// 			data:""+err
		// 		})
		// 	}
		// 	else
		// 	{
		// 		that.setState({
		// 			data:JSON.parse(res.text)
		// 		})
		// 	}

		// });


        // once the backend is connected comment the below code
        this.setState({
        	uploadedFile: files[0],
        	data:[
        	{	key:'1',value:'aaa'	},
        	{	key:'2',value:'bbb'	},
        	{	key:'3',value:'ccc'	},
        	{	key:'4',value:'ddd'	},
        	{	key:'5',value:'ddd'	},
        	{	key:'6',value:'eee'	}
        	]
        });

        console.log(files[0].preview)
    }

    render() {
    	const that=this
    	return(
    		<div style={{marginTop: 44,backgroundColor:"#e6e6e6"}}>
    		<AppBar
    		style={appStyle}
    		title={
    			<img 
    			src='http://17776-presscdn-0-6.pagely.netdna-cdn.com/wp-content/themes/wiprodigital/images/wdlogo.png' 
    			width='140' alt='wiproDigital' style={{marginTop:7}}/>
    		}/>
    		<Container style={{
    			backgroundImage: "url('https://image.shutterstock.com/z/stock-photo-abstract-blue-on-white-digital-background-element-83822863.jpg')",
				//backgroundImage: "url('https://blog.hipchat.com/wp-content/uploads/2016/02/HipChat_hipBots_blog.png')",
				backgroundRepeat: 'no-repeat',padding:0
			}}>
			<div style={{backgroundColor:"rgba(136, 136, 136, 0.5)",backgroundSize:"100%"}}>
			<Row style={{margin:0}}>

			<Col xl={6} lg={6} md={6} style={{height:580,marginTop:40,paddingRight:0,paddingLeft:0}}>
			{
				this.state.takePhoto === true ?
				<div style={
					{
						marginTop:-67,
						marginLeft:30
					}
				}>
				<Visible xl lg md>
				<Webcam audio={false} width={540} height={500} 
				ref='webcam'
				screenshotFormat={'image/png'}/>
				</Visible>
				<Visible sm xs>
				<Webcam audio={false} width={300} height={500} 
				ref='webcam'
				screenshotFormat={'image/png'}/>
				</Visible>
				<RaisedButton onClick={this.mediaFile} label="CAPTURE" 
				primary={true} style={{margin:"-30px 0 50px",display:"block",height:37}} />
				</div>
				:
				Object.keys(this.state.uploadedFile).length === 0?
				<Dropzone
				multiple={false}
				accept="image/jpg,image/png,image/jpeg"
				style={upStyle}
				onDrop={this.onImageDrop}>
				<h3 style={capStyle}>Drop an image or click to select a file to upload.</h3>
				</Dropzone>
				:
				<div>
				<Visible xl lg md >
				<IconButton style={iconStyle} iconStyle={{color:'white'}} onTouchTap={this.closeImg}>
				<NavigationClose />
				</IconButton>
				</Visible>
				<Visible sm xs>
				<IconButton style={iconStyle2} iconStyle={{color:'white'}} onTouchTap={this.closeImg}>
				<NavigationClose />
				</IconButton>
				</Visible>
				
				<img src={this.state.uploadedFile.preview} style={upStyle}/>

				</div>
			}
			{
				this.state.showButt === true ?
				<RaisedButton onClick={this.photoButton} label="TAKE PHOTO"
				primary={true} style={{width:"75%",margin:"15px auto",display:"block",height:37}} />
				:null
			}
			
			</Col>
			{
				Object.keys(this.state.uploadedFile).length === 0?
				<Col xl={6} lg={6} md={6} style={{marginTop:40,paddingLeft:0,paddingRight:0}}>
				<h2 style={cap2Style}>UPLOAD TO ANALYSE THE BILL</h2>
				</Col>
				:
				<Col xl={6} lg={6} md={6} style={{marginTop:40,paddingLeft:0,paddingRight:0}}>
				<Row style={tabStyle}>
				<Table
				onCellClick={this.editCell}
				height={"250px"}
				selectable={false}
				multiSelectable={false}
				>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false} >
				<TableRow >
				<TableHeaderColumn>Key</TableHeaderColumn>
				<TableHeaderColumn>Value</TableHeaderColumn>
				</TableRow>
				</TableHeader>
				<TableBody
				displayRowCheckbox={false}
				>
				{

					this.state.data.map(function(eachData,i){
						return(
							<TableRow key={i}>
							<TableRowColumn>
							<TextField
							underlineShow={false}
							onChange={that.editData}
							name={eachData.key}
							value={eachData.key}
							/></TableRowColumn>
							<TableRowColumn>
							<TextField
							underlineShow={false}
							onChange={that.editData}
							name={eachData.value}
							value={eachData.value}
							/></TableRowColumn>
							</TableRow>
							)
					})
				}
				</TableBody>
				</Table>
				</Row>
				<Row style={butStyle}>

				<RaisedButton onClick={this.saveButton} label="SAVE" secondary={true} fullWidth={true} style={{height:37}}/>

				</Row>
				<Row style={queryStyle} >
				<TextField
				style={fieldStyle}
				onChange={this.query}
				floatingLabelText="Query"
				/>
				<TextField
				style={fieldStyle}
				value={this.state.answer}
				disabled={true}
				floatingLabelText="Answer"
				/>
				<RaisedButton onClick={this.analyzeButton} label="ANALYZE" secondary={true} fullWidth={true} style={{marginTop:20}}/>

				</Row>
				</Col>
			}
			</Row>
			</div>
			</Container>
			</div>

			)
}
}