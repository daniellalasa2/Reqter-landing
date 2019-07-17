import React, { Component } from "react";
import { Button, Row, Col, Container } from "reactstrap";
import "../assets/styles/Footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="contact-info-box">
        <section className="contact-info">
          <h1 style={{ paddingTop: "90px", fontWeight: 400 }}>
            Our Client Success Team is always here to help
          </h1>
          <p style={{ fontSize: "25px", paddingTop: "10px" }}>
            Have questions? We are only a call, email or chat away.
          </p>
          <div className="contact-button-box">
            <Button>Contact Us</Button>
            <Button>Read FAQs</Button>
          </div>
        </section>
        <section className="footer-links">
          <Container>
            <Row>
              <Col className="column" lg="2">
                <h6>PRODUCT</h6>
                <ul>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>PRODUCT</h6>
                <ul>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>PRODUCT</h6>
                <ul>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>PRODUCT</h6>
                <ul>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>PRODUCT</h6>
                <ul>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                  <li>
                    <a href="">Credit Cards</a>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="copyright">
              <Col lg="12">
                <span style={{ float: "left" }}>© 2019 Reqter</span>
                <span style={{ float: "right" }}>
                  FIND US: <a href="">Twitter</a> | <a href="">LinkedIn</a>
                </span>
                <br />
                <hr style={{ margin: 0, borderColor: "lightgrey" }} />
                <span style={{ float: "left" }}>
                  Credible Operations, Inc. NMLS ID# 1681276
                </span>
              </Col>
            </Row>
          </Container>
        </section>
      </footer>
    );
  }
}

export default Footer;
