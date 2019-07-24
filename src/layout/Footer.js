import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../assets/styles/Footer.scss";
import { Link } from "react-router-dom";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="contact-info-box">
        <section className="footer-links">
          <Container>
            <Row>
              <Col className="column" lg="2">
                <h6>محصولات</h6>
                <ul>
                  <li>
                    <Link to="/comingsoon">فضای کار اشتراکی</Link>
                  </li>
                  <li>
                    <Link to="/comingsoon">سالن جلسات</Link>
                  </li>
                  <li>
                    <Link to="/comingsoon">جذب سرمایه</Link>
                  </li>
                  <li>
                    <Link to="/comingsoon">اتاق کار خصوصی</Link>
                  </li>
                  <li>
                    <Link to="/comingsoon">پذیرش استارت آپ</Link>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>پشتیبانی</h6>
                <ul>
                  <li>
                    <Link to="/comingsoon">سوالات متداول</Link>
                  </li>
                  <li>
                    <Link to="/comingsoon">امنیت</Link>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>شرکت</h6>
                <ul>
                  <li>
                    <Link to="/comingsoon">بلاگ</Link>
                  </li>
                  <li>
                    <Link to="/comingsoon">فرصت های شغلی</Link>
                  </li>
                  <li>
                    <Link to="/comingsoon">اخبار</Link>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>همکاران تجاری</h6>
                <ul>
                  <li>
                    <Link to="/comingsoon">درخواست همکاری</Link>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>قوانین و مجوز ها</h6>
                <ul>
                  <li>
                    <Link to="/comingsoon">قوانین استفاده</Link>
                  </li>
                  <li>
                    <Link to="/comingsoon">حریم خصوصی</Link>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="copyright">
              <Col lg="12">
                <span style={{ float: "right" }}>© 2019 Startup Space</span>
                <span style={{ float: "left" }}>
                  ما را دنبال کنید: <Link to="/comingsoon">اینستاگرام</Link> |{" "}
                  <Link to="/comingsoon">لینکداین</Link>
                </span>
                <br />
                <hr style={{ margin: 0, borderColor: "lightgrey" }} />
                <span style={{ float: "right" }}>
                  حق کپی رایت برای استارت آپ اسپیس محفوظ است.
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
