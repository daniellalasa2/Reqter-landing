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
            تیم موفقیت مشتریان ما همیشه همراهته .
          </h1>
          <p style={{ fontSize: "25px", paddingTop: "10px" }}>
            سوالی داری؟ فاصله ات با ما یه زنگ یا چت یا ایمیله :)
          </p>
          <div className="contact-button-box">
            <Button>تماس با ما</Button>
            <Button>سوالات متداول</Button>
          </div>
        </section>
        <section className="footer-links">
          <Container>
            <Row>
              <Col className="column" lg="2">
                <h6>محصولات</h6>
                <ul>
                  <li>
                    <a href="">فضای کار اشتراکی</a>
                  </li>
                  <li>
                    <a href="">سالن جلسات</a>
                  </li>
                  <li>
                    <a href="">جذب سرمایه</a>
                  </li>
                  <li>
                    <a href="">اتاق کار خصوصی</a>
                  </li>
                  <li>
                    <a href="">پذیرش استارت آپ</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>پشتیبانی</h6>
                <ul>
                  <li>
                    <a href="">سوالات متداول</a>
                  </li>
                  <li>
                    <a href="">امنیت</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>شرکت</h6>
                <ul>
                  <li>
                    <a href="">بلاگ</a>
                  </li>
                  <li>
                    <a href="">فرصت های شغلی</a>
                  </li>
                  <li>
                    <a href="">اخبار</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>همکاران تجاری</h6>
                <ul>
                  <li>
                    <a href="">درخواست همکاری</a>
                  </li>
                </ul>
              </Col>
              <Col className="column" lg="2">
                <h6>قوانین و مجوز ها</h6>
                <ul>
                  <li>
                    <a href="" />
                  </li>
                  <li>
                    <a href="">قوانین استفاده</a>
                  </li>
                  <li>
                    <a href="">حریم خصوصی</a>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="copyright">
              <Col lg="12">
                <span style={{ float: "right" }}>© 2019 Startup Space</span>
                <span style={{ float: "left" }}>
                  ما را دنبال کنید: <a href="">اینستاگرام</a> |{" "}
                  <a href="">لینکداین</a>
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
