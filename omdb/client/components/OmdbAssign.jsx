
import React from 'react';
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton'
import Request from 'superagent'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import DialogModal from './Modal.jsx';
import {Link} from 'react-router';
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1500,
    height:500,
    overflowY: 'auto',
  },
  breadth:
  {
    width:5,
    margin:12
  }
};

 const style = {
  margin: 12,
};

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {data:true}
      this.updateState = this.updateState.bind(this);
      }

      updateState() {
         this.setState({data:false});
      }
   render() {
      return (
        <div>
        <AppBar
          title="Omdb Search"
          iconElementRight={<span><Link to="/"><FlatButton label="Search" style={{fontSize:"50px",color:"white",marginTop:"4px"}}/></Link>
                                  <Link to="/about"><FlatButton label="About"  style={{fontSize:"50px",color:"white",marginTop:"4px"}}/></Link>
                                  <Link to="/contact"><FlatButton label="Contact"  style={{fontSize:"50px",color:"white",marginTop:"4px"}}/></Link></span>}
       />
       <main>
          {this.props.children}
        </main>
      </div>
      );
   }
}

export default App;
