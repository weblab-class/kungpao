import React from 'react';

import "./FishPopup.css";
import byfish from '../data/blueyellowfish.png';
import '../data/doryfish.png';

class FishPopup extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.availFish[0]);
  }

  componentDidMount () {

  }

  render() {
    return (
      <div className="window">
          <p> What do you want to put in your aquarium? </p>
        <button className="fishButton" onClick={() => this.props.addingFish(byfish)}>
          {this.props.availFish.map((f) =>(
            <img src={f} alt='fishy' height="100px" width="100px"></img>
            // <img src={f.type.concat('.png')} alt='fishy' height="100px" width="100px"></img>
          ))};
        </button>
        <button className="closeButton" onClick={this.props.onClose}>
            Close
        </button>
      </div>
    );
  }
}


export default FishPopup;