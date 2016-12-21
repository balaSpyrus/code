import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import Request from 'superagent'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogModal extends React.Component {
  state = {
    open: false,
    movies:{},
    Year: "",
    Rated:"",
    Genre:"",
    Director:"",
    Writer:"",
    Actors:"",
    Poster:"",
    Plot:"",
    Language:"",
    Country:"",
    imdbRating:""
  };

  handleOpen = () => {
    this.setState({open: true});
    this.searchDetails();
  };

  handleClose = () => {
    this.setState({open: false});
  };

  searchDetails() {
   let url =`http://www.omdbapi.com/?t=${this.props.query}&y=&plot=short&r=json`;
   let that = this;
   Request
     .get(url)
     .end(function(err, res){
       that.setState({
         Year: res.body.Year,
         Rated:res.body.Rated,
         Genre:res.body.Genre,
         Director:res.body.Director,
         Writer:res.body.Writer,
         Actors:res.body.Actors,
         Poster:res.body.Poster,
         Plot:res.body.Plot,
         Language:res.body.Language,
         Country:res.body.Country,
         imdbRating:res.body.imdbrating
     });
   });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];
 var year="Year : "+this.state.Year
 var rated="Rated : "+this.state.Rated
 var genre="Genre : "+this.state.Genre
 var actors="Actors : "+this.state.Actors
 var plot="Plot : "+this.state.Plot
 var director="Director : "+this.state.Director
var poster=<img src={this.state.Poster} />

    return (
      <div>
        <IconButton onTouchTap={this.handleOpen}><StarBorder color="white" /></IconButton>
        <Dialog
          title={this.props.query}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
         {poster}
         <br />
         {year}
         <br />
         {rated}
         <br />
         {genre}
         <br />
         {actors}
         <br />
         {plot}
         <br />
         {director}
        </Dialog>
      </div>
    );
  }
}
