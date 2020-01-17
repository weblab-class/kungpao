import React from 'react';

import "./FishPopup.css";
import byfish from '../data/blueyellowfish.png';
import doryfish from '../data/doryfish.png';

class FishPopup extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.availFish.length);
  }

  componentDidMount () {

  }

  displayFish = (fishname) => {
    console.log(fishname);
    if (fishname == 'doryfish') {
      console.log('heLLOOOOo');
      return doryfish;
    }
    else if (fishname == 'blueyellowfish') {
      return byfish;
    }
  }

  render() {
    return (
      <div className="window">
          <p> What do you want to put in your aquarium? </p>
          {this.props.availFish.length == 0 ? null : this.props.availFish.map((f) =>(
            <>
            <img src={this.displayFish(f.type)} alt='fishy' height="100px" width="100px"></img>
            <button className="fishButton" onClick={() => this.props.addingFish(f)}> Add this fish! </button>
            </>
          ))}
          
        
        <button className="closeButton" onClick={this.props.onClose}>
            Close
        </button>
      </div>
    );
  }
}


export default FishPopup;