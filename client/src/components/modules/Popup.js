import React from 'react';

import "./Popup.css";

class Popup extends React.Component {
  render() {
    return (
      <div className="window">
          <p> {this.props.popText}</p>
        <button className="closeButton" onClick={this.props.onClose}>
            Close
        </button>
      </div>
    );
  }
}


export default Popup;