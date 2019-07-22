import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "../assets/styles/Footer.scss";

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
                    <a href="/comingsoon">فضای کار اشتراکی</a>
                  </li>
                  <li>
                    <a href="/comingsoon">سالن جلسات</a>
                  </li>
                  <li>
                    <a href="/comingsoon">جذب سرمایه</a>
                  </li>
                  <li>
                    <a href="/comingsoon">اتاق کار خصوصی</a>
                  </li>
                  <li>
                    <a href="/comingsoon">پذیرش استارت آپ</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>پشتیبانی</h6>
                <ul>
                  <li>
                    <a href="/comingsoon">سوالات متداول</a>
                  </li>
                  <li>
                    <a href="/comingsoon">امنیت</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>شرکت</h6>
                <ul>
                  <li>
                    <a href="/comingsoon">بلاگ</a>
                  </li>
                  <li>
                    <a href="/comingsoon">فرصت های شغلی</a>
                  </li>
                  <li>
                    <a href="/comingsoon">اخبار</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>همکاران تجاری</h6>
                <ul>
                  <li>
                    <a href="/comingsoon">درخواست همکاری</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>قوانین و مجوز ها</h6>
                <ul>
                  <li>
                    <a href="/comingsoon" />
                  </li>
                  <li>
                    <a href="/comingsoon">قوانین استفاده</a>
                  </li>
                  <li>
                    <a href="/comingsoon">حریم خصوصی</a>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="copyright">
              <Col lg="12">
                <span style={{ float: "right" }}>© 2019 Startup Space</span>
                <span style={{ float: "left" }}>
                  ما را دنبال کنید: <a href="/comingsoon">اینستاگرام</a> |{" "}
                  <a href="/comingsoon">لینکداین</a>
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
