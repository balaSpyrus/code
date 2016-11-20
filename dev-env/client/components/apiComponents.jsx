import React from 'react';
import Request from 'superagent'
import AutoComplete from 'material-ui/AutoComplete';
//const Request = window.superagent;

class Test extends React.Component {
 constructor() {
   super();
   this.state = {
     movies: []
   };
 }
 
 componentWillMount() {
   this.search();
 }
 
 search(query) {
   console.log(query);
   let page=1;
   //for (var i = page; i <=10; i++) {
    let url =`http://www.omdbapi.com/?s=${query}&y=&r=json&plot=short&page=${1}`;
    let that = this;
    console.log(url);
    Request
    .get(url)
    .end(function(err, res){
      if(res.body.Response){
        that.setState((prev)=>({
          movies: prev.movies.concat(res.body.Search),
        }));}
      }); 
  //}
}

updateSearch() {
  this.search(this.refs.query.value)
}

render() {
 var movies = this.state.movies.map(function(movie){
   return <li>{movie.Title}</li>
 });

 return (
   <div>
   <input className="app_input" ref="query" type="text" />
   <input type="button" ref="butt" onClick={this.updateSearch()}/>
   <ul>
   { movies }
   </ul>
   </div>
   );
}
}

export default Test;