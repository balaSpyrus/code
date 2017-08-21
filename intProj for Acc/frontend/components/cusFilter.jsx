import React from 'react';
import ReactDOM from 'react-dom';
import {BootstrapTable} from 'react-bootstrap-table';
import {Modal,Button} from "react-bootstrap";

export default class CusFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showModal:false,
      checkedStatus:[],
      allCheck:true
    }
    this.filter = this.filter.bind(this);
    this.allClick = this.allClick.bind(this);
    this.isFiltered = this.isFiltered.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  closeModal() {
      this.setState({ showModal: false });
    }

    openModal() {
      this.setState({ showModal: true });
    }
    allClick()
    {
      let flag=false
      let temp=!this.state.allCheck
      let tempArr=this.state.checkedStatus
      if(this.state.allCheck)
      flag=true

      Object.keys(this.refs).map((eachRef,i)=>{
        this.refs[eachRef].checked=!flag
tempArr[i]=!flag
      })
      this.setState({
        allCheck:temp,
        checkedStatus:tempArr
      })
      this.filter()
    }
  filter(event) {
    console.log('filter');
    let flag=true
    Object.keys(this.refs).map((eachRef,i)=>{
      if(this.refs[eachRef].checked!==this.state.checkedStatus[i])
      {
        let temp=this.state.checkedStatus
        temp[i]=!temp[i]
        this.setState({
          checkedStatus:temp
        })
      }
            if(this.refs[eachRef].checked===false)
        flag=false
    })
    console.log(this.state.checkedStatus);
    if (flag) {
      this.props.filterHandler();
    } else {
      this.props.filterHandler({ callback: this.isFiltered });
    }
  }

  isFiltered(targetValue) {
    if(Object.keys(this.props.parameters).includes(targetValue))
      if(targetValue,this.refs['check'+Object.keys(this.props.parameters).indexOf(targetValue)]!==undefined)
    return (this.refs['check'+Object.keys(this.props.parameters).indexOf(targetValue)].checked)

    }
  cleanFiltered() {
    Object.keys(this.refs).map((eachRef,i)=>{
      this.refs[eachRef].checked==true
    });
    let temp=this.state.checkedStatus
    temp.map((status,i)=>temp[i]=true)
    this.setState({
      checkedStatus:temp
    })
    this.props.filterHandler();
  }

componentWillMount(){
  let defaultValue=this.state.checkedStatus
  Object.keys(this.props.parameters).map((param,i)=>defaultValue.push(true))
  this.setState({
    checkedStatus:defaultValue
  })
  console.log(this.state);
}

  render() {
    return (
      <div>
        <Button
          bsSize="small"
          style={ {
    color: this.state.checkedStatus.includes(false)?'#c05757':null,
    background: this.state.checkedStatus.includes(false)?'#c5c5c5':null
}}
          block
          onClick={this.openModal}
        >
          <i className="fa fa-filter fa-lg " aria-hidden="true"></i>

        </Button>

        <Modal bsSize="small" show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select Fields</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{maxHeight:550,overflowY:'auto'}}>
            {/* <input type='checkbox' onChange={ this.allClick } defaultChecked={true}/>
            <label>All</label><br/><hr/> */}
            {
              Object.keys(this.props.parameters).map((key,i)=>{
                return <div key={i} ><input ref={'check'+i} type='checkbox' className='filter' onChange={ this.filter } checked={ this.state.checkedStatus[i] } /><label>{key}</label><br/><hr/></div>

              })
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
