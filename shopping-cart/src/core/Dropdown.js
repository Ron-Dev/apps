
import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DropdownList from 'react-widgets/lib/DropdownList'

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var props=this.props;
    return (
      <DropdownList
        data={props.data}
        value={props.value}
        onChange={props.onChange}
      />
    )
  }
}

export default Dropdown;