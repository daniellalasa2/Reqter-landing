import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  SafeValue,
  GetRequestsList,
  Configuration
} from "../../ApiHandlers/ApiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
import "./PartnerPanel.scss";
export default class PartnerPanel extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.state = {};
  }
  filterRequests = (type, e) => {
    e.target.classList.add("active");
  };
  render() {
    const { locale, direction } = this.translate;
    return (
      <section
        className={classnames(
          "partner-panel-section form-section",
          direction === "rtl" && "rtl-layout"
        )}
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <React.Fragment>
          <Card className="form-card">
            {/* Approved requests */}
            <CardHeader>
              <nav className="card-header-nav filter">
                <button
                  onClick={button => this.filterRequests("newrequests", button)}
                >
                  {locale.card_header.new_requests}
                </button>
                <button
                  onClick={button =>
                    this.filterRequests("openrequests", button)
                  }
                >
                  {locale.card_header.open_requests}
                </button>
                <button
                  onClick={button => this.filterRequests("offers", button)}
                >
                  {locale.card_header.offers}
                </button>
                <button
                  onClick={button => this.filterRequests("accepted", button)}
                >
                  {locale.card_header.accepted}
                </button>
                <button
                  onClick={button => this.filterRequests("denied", button)}
                >
                  {locale.card_header.denied}
                </button>
              </nav>
            </CardHeader>
            <CardBody>Welcome to the Partner Panel</CardBody>
          </Card>
        </React.Fragment>
      </section>
    );
  }
}
