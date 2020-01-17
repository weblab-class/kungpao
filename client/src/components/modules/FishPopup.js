import React from 'react';

import "./FishPopup.css";
import byfish from '../data/blueyellowfish.png';

class FishPopup extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {

  }

  render() {
    return (
      <div className="window">
          <p> What do you want to put in your aquarium? </p>
        <button className="fishButton" onClick={() => this.props.addingFish(byfish)}>
          <img src={byfish} alt='fishy' height="100px" width="100px"></img>
          Add this fish!
        </button>
        <button className="closeButton" onClick={this.props.onClose}>
            Close
        </button>
      </div>
    );
  }
}


export default FishPopup;