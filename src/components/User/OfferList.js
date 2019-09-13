import React, { Component } from "react";

import { Link } from "react-router-dom";
import classnames from "classnames";
import { Card, CardHeader, CardBody, Collapse } from "reactstrap";
import { SafeValue, GetOfferList } from "../ApiHandlers/ApiHandler";
import Skeleton from "react-loading-skeleton";
import moment from "jalali-moment";
import PersianNumber, { addCommas } from "../PersianNumber/PersianNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tj from "./t.json";
import {
  faArrowRight,
  faCheckCircle,
  faTimesCircle,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import "./OfferList.scss";
export default class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.urlParams = this.urlParser(this.props.location.search);
    this.state = {
      offerList: [],
      moreDetailCollapse: null
    };
    this.getAndFilterOfferList(this.urlParams.rid, this.urlParams.ct);
  }
  getAndFilterOfferList = (reqId, contentType) => {
    const _this = this;
    GetOfferList(reqId, contentType, offer_list => {
      const SAFE_offer_list = SafeValue(offer_list, "data", "object", []);
      _this.setState({
        offerList: SAFE_offer_list
      });
    });
  };
  toggleMoreDetail = e => {
    let toggleId =
      e.target.id === this.state.moreDetailCollapse ? null : e.target.id;
    this.setState({
      moreDetailCollapse: toggleId
    });
  };
  acceptState = state => {
    switch (state) {
      case "accept":
        break;
      case "deny":
        break;
      default:
        break;
    }
  };
  urlParser = url => {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  };
  generateOfferList = () => {
    let generatedElements = [];
    let targetList = tj; // SafeValue(this.state.offerList, "", "object", []);
    if (targetList.length > 0) {
      generatedElements = targetList.map(item => (
        <div className="offer-card" key={item._id}>
          <div className="offer-card-details">
            <h5>
              <strong className="product-title-wrapper">
                <strong className="product-title">
                  {SafeValue(item, "fields.name", "string", "")}
                </strong>
              </strong>
            </h5>
            <h6>
              <strong>
                {SafeValue(
                  item,
                  "fields.partnerid.fields.name",
                  "string",
                  "همکار در استارتاپ اسپیس"
                )}
              </strong>
            </h6>
            <br />
            <ul>
              <li>
                تعداد :<br />
                <strong>
                  {PersianNumber(
                    SafeValue(
                      item,
                      "fields.productid.fields.count",
                      "string",
                      ""
                    )
                  )}
                </strong>
              </li>
              <li>
                شهر :<br />
                <strong>
                  {SafeValue(item, "fields.city.fields.name.fa", "string", "")}
                </strong>
              </li>
              <li>
                قیمت ساعتی:‌
                <br />
                <strong>
                  {(item.fields.hourlyprice &&
                    PersianNumber(
                      addCommas(
                        SafeValue(item, "fields.hourlyprice", "string", "0")
                      ) + " تومان"
                    )) ||
                    "تعیین نشده"}
                </strong>
              </li>
              <li>
                قیمت روزانه:‌
                <br />
                <strong>
                  {(item.fields.dailyprice &&
                    PersianNumber(
                      addCommas(
                        SafeValue(item, "fields.dailyprice", "string", "0")
                      ) + " تومان"
                    )) ||
                    "تعیین نشده"}
                </strong>
              </li>
              <li>
                قیمت هفتگی:‌
                <br />
                <strong>
                  {(item.fields.weeklyprice &&
                    PersianNumber(
                      addCommas(
                        SafeValue(item, "fields.weeklyprice", "string", "")
                      ) + " تومان"
                    )) ||
                    "تعیین نشده"}
                </strong>
              </li>
              <li>
                قیمت ماهانه:‌
                <br />
                <strong>
                  {(item.fields.monthlyprice &&
                    PersianNumber(
                      addCommas(
                        SafeValue(item, "fields.monthlyprice", "string", "0")
                      ) + " تومان"
                    )) ||
                    "تعیین نشده"}
                </strong>
              </li>
              <li>
                تاریخ ارسال پیشنهاد:
                <br />
                <strong>
                  {SafeValue(item, "sys.issueDate", "string", null)
                    .replace(/T/, " ")
                    .replace(/\..+/, "")}
                </strong>
              </li>
              {item.fields.startdate && (
                <li>
                  زمان فعالسازی محصول:
                  <br />
                  <strong>
                    {SafeValue(item, "fields.startdate", "string", null)
                      .replace(/T/, " ")
                      .replace(/\..+/, "")}
                  </strong>
                </li>
              )}
            </ul>
            <div className="more-details">
              <Collapse isOpen={this.state.moreDetailCollapse === item._id}>
                <div className="more-details-description">
                  <ul>
                    <li>
                      ظرفیت کل :‌
                      <br />
                      <strong>
                        {PersianNumber(
                          SafeValue(
                            item,
                            "fields.partnerid.fields.capacity",
                            "string",
                            "تعیین نشده"
                          )
                        )}
                      </strong>
                    </li>
                    <li>
                      آدرس :‌
                      <br />
                      <strong>
                        {PersianNumber(
                          SafeValue(
                            item,
                            "fields.partnerid.fields.address",
                            "string",
                            "ندارد"
                          )
                        )}
                      </strong>
                    </li>
                    <li>
                      وبسایت :‌
                      <br />
                      <strong>
                        <a
                          href={SafeValue(
                            item,
                            "fields.partnerid.fields.homepage",
                            "string",
                            "#"
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {SafeValue(
                            item,
                            "fields.partnerid.fields.homepage",
                            "string",
                            "تعیین نشده"
                          )}
                        </a>
                      </strong>
                    </li>
                    <li>
                      هویت همکار :‌
                      <br />
                      {item.fields.partnerid.fields.verified ? (
                        <strong style={{ color: "green" }}>تایید شده</strong>
                      ) : (
                        <strong style={{ color: "red" }}>تایید نشده</strong>
                      )}
                    </li>{" "}
                    <li>
                      توضیحات درباره همکار :‌
                      <br />
                      {SafeValue(
                        item,
                        "fields.partnerid.fields.overview",
                        "string",
                        "ندارد"
                      )}
                    </li>
                  </ul>
                </div>
              </Collapse>
              <span onClick={this.toggleMoreDetail} id={item._id}>
                {this.state.moreDetailCollapse === item._id ? (
                  <React.Fragment>
                    کمتر
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      size="lg"
                      color="grey"
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    بیشتر
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      size="lg"
                      color="grey"
                    />
                  </React.Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="offer-choose-state-wrapper">
            <div
              className="accept-state"
              onClick={() => this.acceptState("accept")}
            >
              <span>
                <strong>قبول</strong>
              </span>
              <FontAwesomeIcon
                icon={faCheckCircle}
                pull="left"
                size="lg"
                color="#58d37b"
              />
            </div>
            <div
              className="deny-state"
              onClick={() => this.acceptState("deny")}
            >
              <span>
                <strong>رد</strong>
              </span>
              <FontAwesomeIcon
                icon={faTimesCircle}
                pull="left"
                size="lg"
                color="#dd4242"
              />
            </div>
          </div>
        </div>
      ));
    } else {
      generatedElements = ["پیشنهادی موجود نیست"];
    }
    return generatedElements;
  };
  componentDidMount() {}
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
