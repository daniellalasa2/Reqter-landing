import React, { Component } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="contact-info-box">
        <section className="footer-links">
          <div className="column">
            <h6>محصولات</h6>
            <ul>
              <li>
                <Link to="/apply/sessionroom">سالن جلسات</Link>
              </li>
              <li>
                <Link to="/apply/shareddesk">میزکار اشتراکی</Link>
              </li>
              <li>
                <Link to="/apply/privatedesk">میزکار اختصاصی</Link>
              </li>
              <li>
                <Link to="/apply/dedicatedoffice">اتاق کار خصوصی</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h6>پشتیبانی</h6>
            <ul>
              <li>
                <Link to="/faq">سوالات متداول</Link>
              </li>
              <li>
                <Link to="/comingsoon">امنیت</Link>
              </li>
            </ul>
          </div>
          <div className="column">
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
          </div>
          <div className="column">
            <h6>همکاران تجاری</h6>
            <ul>
              <li>
                <Link to="/partnership">درخواست همکاری</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h6>قوانین و مجوز ها</h6>
            <ul>
              <li>
                <Link to="/comingsoon">قوانین استفاده</Link>
              </li>
              <li>
                <Link to="/comingsoon">حریم خصوصی</Link>
              </li>
            </ul>
          </div>
        </section>
        <section className="copyright">
          <span style={{ float: "right" }}>© 2019 Startup Space</span>
          <span style={{ float: "left", marginTop: "-15px" }}>
            <span className="followus-text"> ما را دنبال کنید: </span>
            <div className="footer-social-links">
              <a
                href="https://www.instagram.com/startupspace_hub/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} color="white" />
              </a>
              <a
                href="https://www.linkedin.com/company/startup-space/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedinIn} color="white" />
              </a>
            </div>
          </span>
          <br />
          <hr style={{ margin: 0, borderColor: "lightgrey" }} />
          <span style={{ float: "right" }}>
            حق کپی رایت برای استارت آپ اسپیس محفوظ است.
          </span>
        </section>
      </footer>
    );
  }
}

export default Footer;
