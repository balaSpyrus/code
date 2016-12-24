import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
    color:"white",
    fontWeight:600,

  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin:"20px 15px 0"
  },
};



export default class SelectedConcepts extends React.Component {

  constructor(props) {
    super(props)
    
    console.log("from the concept chiplets")
    console.log(props.conceptChips)

  }
  handleRequestDelete=(data) => {
    console.log("data to b deleted "+data)
    this.props.deleteConcept(data);
  }
  renderChip(chipData)
  {
    return <Chip
    key={chipData}
    backgroundColor="#eaeaea"
    onRequestDelete={()=>this.handleRequestDelete(chipData)}
    style={styles.chip}
    >
    <Avatar size={32} color="white" backgroundColor="#1976d2">
    {chipData.charAt(0).toUpperCase()}
    </Avatar>
    {chipData}
    </Chip>
  }
  render() {
    return (
      <div style={styles.wrapper}>
      {this.props.conceptChips.map(this.renderChip,this)}      
      </div>
      );
  }
}