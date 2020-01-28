import React from 'react';

import "./StorePopup.css";
import { Link } from "@reach/router";

class StorePopup extends React.Component {

  constructor(props) {
    super(props);
    console.log("storepopup");
  }

  render() {
    return (
      <div className="big-store-window" onClick={this.props.onCloseP}>
      <div className="store-popup-window" onClick={(event) => event.stopPropagation()}>
          <p> {this.props.popText}</p>

        <button className="closeButton" onClick={this.props.restart}>Talk to Ray Again</button>
        <Link className="closeButton" to="/">Return to Aquarium</Link>
      </div>
      </div>
    );
  }
}

export default StorePopup;