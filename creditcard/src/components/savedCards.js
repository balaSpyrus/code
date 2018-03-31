import React, { Component } from 'react';
import {Card,  CardHeader,  CardTitle, CardText} from 'material-ui/Card';
import './../App.css';
import {connect} from 'react-redux';
import {delCardDetails,upCardDetails} from './../actions'
import FlatButton from 'material-ui/FlatButton';

class SavedCards extends Component {

  componentDidMount(){
    // console.log(this.props)
  }

  deleteCard(cardNum){
    this.props.delCardDetails(cardNum)
  }

  updateCard(card){
    this.props.upCardDetails(card)
  }
  render() {
    return (
     <div>
     {
      this.props.cardDetails.length !==0 ? 
      this.props.cardDetails.map((eachCard,i)=>{

        return (
          <Card key={i} style={{marginBottom:10}}>
          <CardHeader
          textStyle={{paddingRight:0,width:'100%'}}
          title={<div >
            <span style={{float:'left'}}>{eachCard.bank}</span>
            <div style={{float:'right'}}>
            <FlatButton label="delete"  secondary={true} onClick={this.deleteCard.bind(this,eachCard.number)} />
            <FlatButton label="edit"  primary={true} onClick={this.updateCard.bind(this,eachCard)} />
            </div>
            </div>}
            />
            <CardTitle title={eachCard.type} subtitle={eachCard.number}  />
            <CardText >
            Bank : {eachCard.bank +" bank credit card"}<br/>            
            Name : {eachCard.name}
            </CardText>
            </Card>

            )
      }):
      <h3>No saved cards...!!</h3>
    }
    </div>
    );
  }
}

const mapStateToProps =(state)=>({

  cardDetails:state.cardDetails
})

const mapActionToProps = {
  delCardDetails,
  upCardDetails
}
export default connect(mapStateToProps,mapActionToProps)(SavedCards);
