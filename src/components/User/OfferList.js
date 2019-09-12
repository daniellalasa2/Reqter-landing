import React, { Component } from "react";

import { Link } from "react-router-dom";
import classnames from "classnames";
import { Card, CardHeader, CardBody } from "reactstrap";
import { SafeValue, GetOfferList } from "../ApiHandlers/ApiHandler";
import Skeleton from "react-loading-skeleton";
import moment from "jalali-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./OfferList.scss";
export default class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestsList: [],
      requestId: this.props.requestId
    };
  }
  generateOfferList = () => {
    const _this = this;
    GetOfferList(offer_list => {
      const SAFE_offer_list = SafeValue(offer_list, "data", "object", []);
      const filtered_offer_list = {
        pending: [],
        approved: [],
        closed: [],
        _draft: []
      };
      SAFE_offer_list.forEach(offer => {
        //approved
        if (offer.fields.quotes && offer.fields.quotes.length > 0)
          filtered_offer_list.approved.push(offer);
        //pending
        else if (
          !offer.fields.quotes ||
          !Boolean(offer.fields.quotes) ||
          offer.fields.quotes.length === 0
        )
          filtered_offer_list.pending.push(offer);
        else if (offer.fields.quotes) filtered_offer_list.closed.push(offer);
        else filtered_offer_list._draft.push(offer);
      });
      _this.setState({
        requestsList: filtered_offer_list
      });
    });
  };
  render() {
    return (
      <section
        className="offer-list-section form-section rtl-layout"
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <React.Fragment>
          <Card className="form-card">
            <section className="offer-list-section">
              <CardHeader>
                <span
                  className="fa-layers fa-fw icon"
                  onClick={() => this.props.history.push("/user/myrequests")}
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    pull="right"
                    size="lg"
                    color="white"
                  />
                </span>
                <span className="title">
                  <strong>بازگشت</strong>
                </span>
              </CardHeader>
              <CardBody>{this.generateOfferList()}</CardBody>
            </section>
          </Card>
        </React.Fragment>
      </section>
    );
  }
}
