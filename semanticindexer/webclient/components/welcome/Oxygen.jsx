import React from 'react';
import {Link} from 'react-router';
export default class Oxygen extends React.Component {
  constructor(props) {
    super(props)
  }
  render()
  {
    return(
      <div>
      <Link to="/welcome" style={{outline:0,marginLeft: 390,border:"none",borderColor:"white"}}>
      <img src='./../assets/images/Oxygen.png' style={{width: 800, height: 780,margin:0}} />
      </Link>
      </div>
      );
  }
}
