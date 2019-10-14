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
            {this.state.activeTab === 1 && (
              <section className="approved-requests-section">
                <CardHeader>
                  <span className="fa-layers fa-fw icon">
                    <FontAwesomeIcon
                      icon={faList}
                      pull="right"
                      size="lg"
                      color="white"
                    />
                  </span>
                  <span className="title">
                    <strong>{locale.card_title}</strong>
                  </span>
                </CardHeader>
                <CardBody>Welcome to the Partner Panel</CardBody>
              </section>
            )}
          </Card>
        </React.Fragment>
      </section>
    );
  }
}
