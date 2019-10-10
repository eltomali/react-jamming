import React, {Component} from 'react';

import './Track.css';

class Track extends Component {
  renderAction() {
    if(this.props.isRemoval){
      console.log("It is true");
      return <button className="Track-action">-</button>
    } else {
      console.log("It is true");
      return <button className="Track-action">+</button>
    }
  }
  render() {
    return (
    <div className="Track">
      <div className="Track-information">
        <h3>
          {this.props.track.name}
        </h3>
        <p>
          {this.props.track.artist} | {this.props.track.album}
        </p>
      </div>
      {this.renderAction()}
    </div>
    );
  }
}
export default Track;