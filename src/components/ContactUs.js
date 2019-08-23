import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import "../assets/styles/ContactUs.scss";
class ContactUs extends React.PureComponent {
  render() {
    return (
      <section id="contactUs">
        <h3 className="section-title" style={{ fontWeight: "bold" }}>
          ارتباط با ما
        </h3>
        <div className="contactUs-row-wrapper">
          <div className="contactUs-fields">
            <input
              type="text"
              name="name"
              placeholder="نام و نام خانوادگی"
              required
            />
            <input
              type="tel"
              placeholder="شماره تماس"
              name="subject"
              required
            />
            <textarea name="description" placeholder="توضیحات" required />
            <br />
            <button className="submit">ارسال</button>
          </div>
          <div className="contactUs-details">
            <div className="contantUs-details-spec">
              <span>
                <FontAwesomeIcon icon={faMapMarkerAlt} color="#6d8ae0" />
              </span>
              <p>
                <strong>آدرس ما</strong>
                <br />
                تهران - آجودانیه - بلوار ارتش غرب - بعد از تقاطع اوشان - کوچه
                ابولفضل صمیع - مجموعه باغ بهشت - ساختمان پارادایس هاب
              </p>
            </div>

            <div className="contantUs-details-spec">
              <span>
                <FontAwesomeIcon icon={faPhone} color="#6d8ae0" />
              </span>
              <p>
                <strong>تلفن</strong>
                <br />
                +98 21 284 21147
                <br />
                +98 919 768 2386
              </p>
            </div>

            <div className="contantUs-details-spec">
              <span>
                <FontAwesomeIcon icon={faEnvelope} color="#6d8ae0" />
              </span>
              <p>
                <strong>آدرس ایمیل</strong>
                <br />
                info@startupspace.ir <br />
                support@startupspace.ir
              </p>
            </div>
            <div className="contantUs-details-spec social-links">
              {/* Location */}
              <a
                href="https://goo.gl/maps/tWxnvbC6PfcFFDqe7"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} color="#6d8ae0" />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/startupspace2020/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} color="#6d8ae0" />
              </a>
              {/* Linkedin */}
              <a
                href="https://www.linkedin.com/company/startup-space/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedinIn} color="#6d8ae0" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContactUs;
