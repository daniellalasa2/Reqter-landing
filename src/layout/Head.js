import React, { Component } from "react";
import { Button, Row, Col, Card } from "reactstrap";
import Navigation from "./Nav";
import "../assets/styles/Head.scss";

import icn from "../assets/images/graduated.png";
class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Row>
          <Col lg="12">
            <div className="head-container">
              <div className="header-text">
                <h1>Shape well your buisness</h1>
                <h1>
                  <strong>Try ReqTer</strong>
                </h1>
              </div>
              <div className="products-box">
                <ul className="products">
                  <li style={{}}>
                    <img src={icn} alt="" />
                    <br />
                    <br />
                    <strong>Student Loan</strong>
                  </li>
                  <li>
                    <img src={icn} alt="" />
                    <br />
                    <br />
                    <strong>Student Loan</strong>
                  </li>
                  <li>
                    <img src={icn} alt="" />
                    <br />
                    <br />
                    <strong>Student Loan</strong>
                  </li>
                  <li>
                    <img src={icn} alt="" />
                    <br />
                    <br />
                    <strong>Student Loan</strong>
                  </li>
                  <li>
                    <img src={icn} alt="" />
                    <br />
                    <br />
                    <strong>Student Loan</strong>
                  </li>
                </ul>
              </div>
              {/* <Row className="brands">
                <Col lg="3" style={{ borderRight: "1px solid grey" }}>
                  LOGO FIRST
                </Col>
                <Col lg="9">LOGO SECOND GOES HERE</Col>
              </Row> */}
            </div>
          </Col>
          <Col lg="12">
            <div className="crooked-divider" />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Head;
