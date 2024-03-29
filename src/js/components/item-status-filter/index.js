import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  constructor(props) {
    super(props);

    this.buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'done', label: 'Done' },
    ];
    this.state = {};
  }

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          key={name}
          type="button"
          className={`btn ${clazz}`}
          onClick={() => onFilterChange(name)}>{label}</button>
      );
    });
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}
