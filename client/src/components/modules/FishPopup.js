import React from 'react';

import "./FishPopup.css";
import byfish from '../data/blueyellowfish.png';
import doryfish from '../data/doryfish.png';

class FishPopup extends React.Component {

  constructor(props) {
    super(props);
    // console.log(this.props.availFish.length);
  }

  componentDidMount () {

  }

  render() {
    return (
      <div className="big-window"  onClick={this.props.onCloseFP}>
      <div className="window" onClick={(event) => event.stopPropagation()}>
          <p> What do you want to put in your aquarium? </p>
          {this.props.availFish.length == 0 ? null : <button className="fishButton" onClick={this.props.addAllFish}> Add ALL fish! </button>}
          {this.props.availFish.length == 0 ? <div className="no-items">You don't have any items! Maintain habits to gain sand dollars to use in the store :)</div> : 
          this.props.availFish.map((f) =>(
            <>
            <img src={this.props.displayFish(f.type)} alt='fishy' height="100%" width="100%"></img>
            <button className="fishButton" onClick={() => this.props.addingFish(f)}> Add this fish! </button>
            </>
          ))}
          

          
        
        <button className="closeButton" onClick={this.props.onCloseFP}>
            Close
        </button>
      </div>
      </div>
    );
  }
}


export default FishPopup;