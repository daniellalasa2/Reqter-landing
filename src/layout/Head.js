import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";
import Navigation from "./Nav";

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Navigation />;
  }
}

export default Head;
