import React, { Component } from 'react';
import './../App.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import saveCardDetails from './../actions'
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import {Container,Row,Col} from 'react-grid-system';
import FlatButton from 'material-ui/FlatButton';


class SavedCards extends Component {
  state={
    error:'',
    type : ['American Express',"Dinner Club", 'Visa'],
    months:['JAN','FEB','MAR','APR','MAY'],
    years:([...Array(10).keys()].map(x => x+2010)),
    selectedType : 'Visa',
    number:'',
    name:'',
    cvv:'',
    month:'JAN',
    year:1
  }

  componentDidMount(){
    //console.log(this.props)
  }

  handleChange=(e,i,value)=>{
    this.setState({
      selectedType:value
    })
  }
  handleChangeMonth=(e,i,value)=>{
    this.setState({
      month:value
    })
  }
  handleChangeYear=(e,i,value)=>{
    this.setState({
      year:value
    })
  }
  getNumber=(e)=>{

    let prevState = this.state.number

    this.setState({
      number:(/^[0-9]*$/gm).test(e.target.value) === false ? 
      prevState : e.target.value
    })

  }

  getCvv=(e)=>{

    let prevState = this.state.cvv

    this.setState({
      cvv:(/^[0-9]*$/gm).test(e.target.value) === false ?
      prevState : e.target.value
    })
  }

  getName=(e)=>{

    this.setState({
      name:e.target.value
    })
  }

  saveCard=()=>{
    let data={

      "bank":"CITI",
      "type": this.state.selectedType,
      "number":this.state.number,
      "Cvv":this.state.cvv,
      "name":this.state.name,
      "expireDate":this.state.month+"-"+this.state.years[this.state.year-1]
    }

    this.props.saveCardDetails(data)
    console.log(data)

  }
  render() {
    return (
      <Container className='container'>

     <Row>

     <Col xl={4} lg={4} md={4} sm ={4} xs={4}>
     <label >
     card type
     </label>
     </Col>
     
     <Col xl={8} lg={8} md={8} sm ={8} xs={8}>
     <SelectField
     value={this.state.selectedType}
     onChange={this.handleChange}
     >
     {
      this.state.type.map((each,i)=>{
        return <MenuItem key ={i} value={each} primaryText={each} />
      })
    }    
    </SelectField>
    </Col>

    </Row>

    <Row>

     <Col xl={4} lg={4} md={4} sm ={4} xs={4}>
    <label >
    Card Number
    </label>
    </Col>

    <Col xl={8} lg={8} md={8} sm ={8} xs={8}>
    <TextField hintText='type Card Number' value={this.state.number} 
    onChange={this.getNumber} errorText={this.state.errorCard}/>
    </Col>

    </Row>

    <Row>

    <Col xl={4} lg={4} md={4} sm ={4} xs={4}>
    <label >
    Name on Card
    </label>
    </Col>

    <Col xl={8} lg={8} md={8} sm ={8} xs={8}>
    <TextField hintText='type name on card'  value={this.state.name} 
    onChange={this.getName} errorText={this.state.errorName} />   
    </Col> 

    </Row>

    <Row>

   <Col xl={4} lg={4} md={4} sm ={4} xs={4}>
    <label >
    CVV number
    </label>
    </Col>

    <Col xl={8} lg={8} md={8} sm ={8} xs={8}>
    <TextField type='password' maxLength={3} hintText='your 3 digit cvv number'
    value={this.state.cvv}  onChange={this.getCvv} errorText={this.state.errorCvv} />
    </Col>

    </Row>

    <Row>

    <Col xl={4} lg={4} md={4} sm ={4} xs={4}>
    <label >
    expire date
    </label>
    </Col>

    <Col xl={4} lg={4} md={4} sm ={4} xs={4}>
    <SelectField
    value={this.state.month}
    onChange={this.handleChangeMonth}
    >
    {
      this.state.months.map((each,i)=>{
        return <MenuItem key ={i} value={each} primaryText={each} />
      })

    } 
    </SelectField>
    </Col>

    <Col xl={4} lg={4} md={4} sm ={4} xs={4}>
    <SelectField
    value={this.state.year}
    onChange={this.handleChangeYear}
    >
    {
      this.state.years.map((each,i)=>{
        return <MenuItem key ={i} value={i+1} primaryText={each} />
      })

    } 
    </SelectField>
    </Col>

    </Row>

    <div className="pay">
    <FlatButton label="pay now" secondary={true} onClick={this.saveCard} />
    </div>
    </Container>
    );
  }
}

const mapStateToProps =(state)=>({

  cardDetails:state.cardDetails
})

const mapActionToProps = {
  saveCardDetails
}

export default connect(mapStateToProps,mapActionToProps)(SavedCards);
