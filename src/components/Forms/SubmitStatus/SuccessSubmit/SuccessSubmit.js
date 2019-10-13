import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./SuccessSubmit.scss";
import classnames from "classnames";
export default class SuccessSubmit extends React.Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.lang = props.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
  }
  render() {
    const { locale, direction } = this.translate;
    return (
      <Row>
        <Col xs="12" className={classnames("success-section", `_${direction}`)}>
          <section className="main">
            <div className="thankyou-section">
              <h1 className="thankyou-sentence">{locale.title}</h1>
              <p>
                <span>{locale.description[0]}</span>
                <span>
                  <Link to={`/${this.lang}/user/myrequests`}>
                    {locale.mypage}
                  </Link>
                </span>
                <span>{locale.description[1]}</span>
              </p>
              <div className="more-request">
                <Link to="/">
                  <Button color="info" className="moreRequestBtn">
                    {locale.newrequest}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    );
  }
}
