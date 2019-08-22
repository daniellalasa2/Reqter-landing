import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone
} from "@fortawesome/free-solid-svg-icons";

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
            <input type="text" name="name" placeholder="نام و نام خانوادگی" />
            <input type="text" placeholder="موضوع پیام" name="subject" />
            <textarea name="description" placeholder="توضیحات" />
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
                +98 21 284 2114
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
          </div>
        </div>
        <button className="submit">ارسال</button>
      </section>
    );
  }
}

export default ContactUs;
