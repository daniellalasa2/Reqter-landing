import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/SuccessSubmit.scss";
function SuccessSubmit() {
  return (
    <Row>
      <Col xs="12" className="success-section">
        <section className="main">
          <div className="thankyou-section">
            <h1 className="thankyou-sentence">از درخواست شما متشکریم !</h1>
            <p>
              درخواست شما برای تیم استارتاپ اسپیس ارسال شد و بزودی با شما تماس
              خواهیم گرفت .
            </p>
          </div>
          <div className="more-request">
            <Link to="/">
              <Button color="info" className="moreRequestBtn">
                درخواست جدید ...
              </Button>
            </Link>
          </div>
        </section>
      </Col>
    </Row>
  );
}

export default SuccessSubmit;
