import React, { Component } from 'react';
import '../main.css';
import logo from './tc_logo.png';

export default class Header extends Component {
    static defaultProps = {
      name:  "Chapter",
      index:  1
    }

    render() {
      console.log( this.props.location.pathname[1]);
      
        return(
          <header className="col text-center shadow">
            <div id="logo"><img src={logo} alt="logo"/></div>
            <h1>{this.props.location.pathname.indexOf("S") === -1 ? "< Chapter Select />" : "< Stage Select />" || this.name}</h1>
          </header>
        );
    };
}
// this.props.location.pathname[1] === "C" ? "Chapter" : "Stage" || 