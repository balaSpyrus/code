import React from 'react';
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/AppBar';
import Request from 'superagent'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import DialogModal from './../Modal.jsx';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MovieDetails from '../common/MovieDetails.jsx';
import {Container, Row, Col} from 'react-grid-system';
import {Link} from 'react-router';
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  ulsty:{
    display:"inline"
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


export default class Search extends React.Component {
  constructor(props) {
super(props);
this.state = {
  movies: [],
  results:0,
   page:1,
   query:""
};
}


search( query = '', page) {
console.log(query, " of page ", page);
let url =`http://www.omdbapi.com/?s=${query}&page=${page}`;
let that = this;
console.log(url);
Request
  .get(url)
  .end(function(err, res){
    that.setState({
      movies: res.body.Search,
      results:res.body.totalResults,
      page: page
  });
});
}

onClickPage(e)
{
 var j = e.currentTarget.dataset.id;
 // this.setState({movies: [], results: [], page:e.currentTarget.dataset.id})
 this.updateSearch(j);
}

updateSearch(page) {
 if(!page) page = 1;
 var s=ReactDOM.findDOMNode(this.refs.query).querySelector('input').value
 this.setState({query:s})
this.search(s, page);
}

render() {
 if(this.state.movies)
 {
   console.log("hi")
  this.state.movies.forEach(function(element) {
    if(element.Poster==="N/A")
    {
      element.Poster="./../images/no-image.jpg"
    }
});
var movies = <Container><Row>
   {this.state.movies.map((tile,i) => (
     <Col lg={4} sm={6} xs={12}><Link to={'movieDetails/'+tile.Title} key={i} style={{textDecoration:"none"}}>
     <Card  key={i} style={{height: "310px",width:"280px",marginBottom:"15px"}}>

       <CardMedia
         overlay={<CardTitle title={tile.Title} subtitle={tile.Year} />}
       >
         <img src={tile.Poster} style={{height: "220px",width:"280px"}}/>
       </CardMedia>
       <CardTitle title={tile.Type} style={{paddingBottom:"0px",paddingTop:"6px",textDecoration:"none"}} />

       <CardActions>
         <FlatButton label="More Details" style={{padding:"0px"}}/>
       </CardActions>
     </Card>
     </Link></Col>
   ))}

</Row></Container>
   var pages=0
   if(this.state.results>100)
   {
     pages=10
   }
   else {
     pages=Math.ceil(this.state.results/10)
   }
   var pagination=[]
   for(var i=1;i<=pages;i++)
   {
     pagination.push(<RaisedButton label={i}  key={i} data-id={i} style={styles.breadth} onClick={this.onClickPage.bind(this)}/>)
   }


}
return (
  <div>
    <TextField
     id="text-field-default"
     defaultValue="" ref="query" type="text"  className="app_input"
   />
   <RaisedButton label="Search" onClick={this.updateSearch.bind(this, 1)} style={style} />

   <br />
    { movies }
    <Container>{pagination}</Container>
  </div>
);
}
}
