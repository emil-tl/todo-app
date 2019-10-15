import React, { Component } from 'react';
import './serach-panel.css';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.onSearchChange = (e) => {
      const term = e.target.value;
      this.setState({ term });
      this.props.onSearchChange(term);
    };
  }

  render() {
    return (
      <input
        type="text"
        placeholder="search"
        value={this.state.term}
        onChange={this.onSearchChange}/>
    );
  }
}
