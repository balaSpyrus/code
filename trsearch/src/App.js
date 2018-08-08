import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'request';
import cheerio from 'cheerio';

const URL ='http://tamilrockers.gs/index.php?'

class App extends Component {
  
  state={
    count:0,
    links:[]
  }
  
  getData=()=>{
    
    let self=this;
    let datalinks =[];
    request(URL,function(x,y,z){
      
      let $ = cheerio.load(z)
      $('.bbc_url').each(function(i, link) {
        
        if($(link).attr('href').includes('tamilrockers.gs') && $(link).text().includes('720p')){
          
          request($(link).attr('href'),function(x1,y1,z1){
            
            let $$ = cheerio.load(z1)
            $$('a').each(function(index,link2) {
              
              if(!x1 && $$(link2).attr('title') && $$(link2).attr('title').includes('Download attachment')){
               // console.log($$(link2).text() + ' - ' + $$(link2).attr('href'));
               datalinks.push(<a href={$$(link2).attr('href')}>{$$(link2).text()}</a>)
                self.setState((prevState)=>({
                  count:prevState.count +1,
                  links:datalinks
                }))
              }
              
            })
          })
        }
        
        
      });
      
      
      
    })
    
  }
  render() {
    return (
      <div className="App">
      <div className="container">      
      <a href="#" className="btn cyan" onClick={this.getData}>GET TORRENTS</a>
      <h2>{this.state.count} torrents found !!</h2>
      <ul>
      {
        this.state.links.map(tags=><li>{tags}</li>)
      }
      </ul>
      </div>     
      </div>
    );
  }
}

export default App;
