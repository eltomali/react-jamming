import React, {Component} from 'react';

import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sign: '-'
    }
    this.renderAction = this.renderAction.bind(this);
  }
  renderAction() {
    if(this.props.isRemoval === "true"){
      console.log("It is true");
      return this.setState({sign: '-'})
    } 
    if(this.props.isRemoval === "false") {
      console.log("It is true");
      return this.setState({sign: '+'})
    }
  }
  render() {
    return (
    <div className="Track">
      <div className="Track-information">
        <h3>
          {/* <!-- track name will go here --> */}
        </h3>
        <p>
          {/* <!-- track artist will go here--> | <!-- track album will go here --> */}
        </p>
      </div>
      <button className="Track-action">{this.state.sign}</button>
    </div>
    );
  }
}
export default Track;