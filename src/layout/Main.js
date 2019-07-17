import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "./Head";
import Footer from "./Footer";
import { ProductSpecs, Title, SpecList, Spec, Btn } from "./ProductSpecs";
import "../assets/styles/Main.scss";
import ps from "../assets/images/ps.jpg";
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Head />
        <section>
          <Row>
            <Col lg="12" style={{ padding: "5% 11%" }}>
              <section className="facilities-description">
                <div className="header">How it works</div>
                <p>
                  Credible is an online marketplace that provides borrowers with
                  competitive, personalized loan offers from multiple, vetted
                  lenders in real time.
                </p>
                <ul>
                  <li>
                    <span>One Simple Form</span>
                    <p>Easy to fill out and your info is protected.</p>
                  </li>
                  <li>
                    <span>Get Personalized Rates</span>
                    <p>
                      Real rates - not ranges - from multiple lenders in 2
                      minutes.
                    </p>
                  </li>
                  <li>
                    <span>Choose Your Option</span>
                    <p>
                      Our expert Client Success Team is here to help you along
                      the way.
                    </p>
                  </li>
                </ul>
              </section>
            </Col>
          </Row>
          <ProductSpecs img={ps} direction="rtl">
            <Title>Personal Loans</Title>
            <SpecList>
              <Spec>
                Personalized rates from up to 11 vetted lenders in 2 minutes
              </Spec>
              <Spec>
                Consolidate credit cards or other debt to a lower rate
              </Spec>
              <Spec>Read unbiased card reviews and learn insider tips</Spec>
            </SpecList>
            <Btn color="green">Compare Cards</Btn>
          </ProductSpecs>
          <ProductSpecs img={ps}>
            <Title>Personal Loans</Title>
            <SpecList>
              <Spec>
                Personalized rates from up to 11 vetted lenders in 2 minutes
              </Spec>
              <Spec>
                Consolidate credit cards or other debt to a lower rate
              </Spec>
              <Spec>Read unbiased card reviews and learn insider tips</Spec>
            </SpecList>
            <Btn color="green">Compare Cards</Btn>
          </ProductSpecs>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Layout;
