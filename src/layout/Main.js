import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import Head from "./Head";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row className="main-container">
        <Col lg="12">
          <Head />
        </Col>
      </Row>
    );
  }
}

export default Layout;
