import React from 'react';


class FishDiePopup extends React.Component {

  constructor(props) {
    super(props);
    // console.log(this.props.availFish.length);
  }

  componentDidMount () {
    console.log("hello?????");
  }

  render() {
    return (
        
      <div className="big-window"  onClick={this.props.onCloseFDP}>
        <div className="window" onClick={(event) => event.stopPropagation()}>
            <p> {this.props.popText}</p>
            <img src={this.props.displayFish(this.props.deadFish.type)} alt="fish" height="100%" width="100%"></img>
            <button className="closeButton" onClick={this.props.onCloseFDP}>
                Close
            </button>
            
            
            
        </div>
      </div>
    );
  }
}


export default FishDiePopup;