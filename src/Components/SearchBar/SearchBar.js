import React, {Component} from 'react';
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: ''
    }
    this.search = this.search.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }
  search() {
    this.props.onSearch(this.state.query);
  }

  handleQueryChange(evt) {
    this.setState({query: evt.target.value});
  }
  render() {
    return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleQueryChange}/>
      <button className="SearchButton" onClick={this.search} >SEARCH</button>
    </div>
    );
  }
}

export default SearchBar;