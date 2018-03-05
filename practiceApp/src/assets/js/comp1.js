import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { AccountCircle } from 'material-ui-icons';
import {Container, Row,Col} from 'react-grid-system';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const cardStyle={
  cardBody:{maxHeight:500,minHeight:500,overflowY:'auto'},
  cardTitleText:{paddingRight:0,maxHeight:50,minHeight:50,overflowY:'auto'},
  media:{    marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth:'75%',minWidth:'75%',
  width: '75%'},
  edge:{borderRadius:20}
}
const rowStyle={paddingTop:30}

class MenuAppBar extends Component{

	state={
		login:false,
    cardIndex:-1,
    movies:[]
  }

  toggleLogin= ()=>{

    this.setState((prevData)=>{
     return{ login: !prevData.login}
   })

  }

  toggleCard= (index)=>{

    console.log('toggling card'+index)
    this.setState({cardIndex:index})

  }

  componentDidMount(){

    let self = this
    axios.get('https://yts.am/api/v2/list_movies.json?genre=animation&sort_by=rating')
    .then(function (response) {
      console.log(response.data.data.movies[0])

      self.setState({
        movies:response.data.data.movies === undefined ? [] : response.data.data.movies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){

    const RightButton = () => (

      <IconMenu
      iconButtonElement={
        <IconButton><AccountCircle /></IconButton>
      }

      >
      {
        this.state.login === false ?
        <MenuItem primaryText="Sign in" onClick={this.toggleLogin}/>    
        :
        <div>
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" onClick={this.toggleLogin} />
        </div>
      }

      </IconMenu>
      );

    return(
      <Container fluid>
      <AppBar
      title={<span >YIFY</span>}
      iconElementRight={<RightButton />}
      />
      <Row style={rowStyle}>
      {
        this.state.login === true ? this.state.movies.map((movie,index)=>

          <Col lg={2.4} md ={4} key={index} style={{paddingBottom:20}}>
          <Card style={cardStyle.edge}>

          {
            this.state.cardIndex === index ?

            <div style={cardStyle.cardBody} onMouseLeave ={()=>this.toggleCard(-1)} >
            <CardTitle title={movie.title_long}  subtitleStyle={{wordWrap: 'break-word'}}
            subtitle='Description' />
            <CardText >
            {movie.synopsis}
            </CardText>
            </div>
            :
            <div>
            <CardHeader
            title={movie.title}
            subtitle={movie.language}
            textStyle={cardStyle.cardTitleText}
            />
            <CardMedia onMouseEnter={()=>this.toggleCard(index)} style={cardStyle.media}
            overlay={this.state.cardIndex === index ?'':<CardTitle title={'Rating : '+movie.rating} subtitleStyle={{wordWrap: 'break-word'}}
            subtitle={movie.genres.length === 0 ?'N/A':movie.genres.toString()} />}
            >
            <img src={movie.medium_cover_image} alt="cover_image" />
            </CardMedia>
            
            <CardActions>
            <FlatButton label="Get Torrent" />
            <FlatButton label="Details" />
            </CardActions>
            </div>
          }            
          </Card>
          </Col>

          ):null
      }
      </Row>
      </Container>
      )
  }
}
export default MenuAppBar;