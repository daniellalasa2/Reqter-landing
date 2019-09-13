import React, { Component } from "react";

import { Link } from "react-router-dom";
import classnames from "classnames";
import { Card, CardHeader, CardBody } from "reactstrap";
import { SafeValue, GetRequestsList } from "../ApiHandlers/ApiHandler";
import moment from "jalali-moment";
import PersianNumber from "../PersianNumber/PersianNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheckCircle,
  faSyncAlt,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import "./MyRequests.scss";
import deskImg from "../../assets/images/products-icons/002-desk.png";
export default class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      requestsList: []
    };
    this.updateRequestList();
  }
  updateRequestList = () => {
    const _this = this;
    GetRequestsList(requests_list => {
      const SAFE_requests_list = SafeValue(requests_list, "data", "object", []);
      const filtered_requests_list = {
        pending: [],
        approved: [],
        closed: [],
        _draft: []
      };
      SAFE_requests_list.forEach(request => {
        //approved
        if (request.fields.quotes && request.fields.quotes.length > 0)
          filtered_requests_list.approved.push(request);
        //pending
        else if (
          !request.fields.quotes ||
          !Boolean(request.fields.quotes) ||
          request.fields.quotes.length === 0
        )
          filtered_requests_list.pending.push(request);
        else if (request.fields.quotes)
          filtered_requests_list.closed.push(request);
        else filtered_requests_list._draft.push(request);
      });
      _this.setState({
        requestsList: filtered_requests_list
      });
    });
  };
  generateRequestsElements = stage => {
    let generatedElements = [];
    const targetList = SafeValue(this.state.requestsList, stage, "object", "");
    try {
      if (targetList.length > 0) {
        switch (stage) {
          case "approved":
            generatedElements = targetList.map(item => (
              <div className="request-card" key={item._id}>
                <div className="request-card-image">
                  <img src={deskImg} alt="Desk" />
                  <strong className="product-title">
                    {SafeValue(
                      item,
                      "fields.product.fields.name.fa",
                      "string",
                      item.contentType.title.fa
                    )}
                  </strong>
                </div>
                <div className="request-card-details">
                  <ul>
                    <li className="product-title-wrapper">
                      <strong className="product-title">
                        {SafeValue(
                          item,
                          "fields.product.fields.name.fa",
                          "string",
                          item.contentType.title.fa
                        )}
                      </strong>
                    </li>
                    <li>
                      تعداد :‌ {SafeValue(item, "fields.seats", "string", "fa")}
                    </li>
                    <li>
                      تاریخ :{" "}
                      {SafeValue(item, "sys.issueDate", "string", null)
                        .replace(/T/, " ")
                        .replace(/\..+/, "")}
                    </li>
                    <li>
                      شهر :{" "}
                      {SafeValue(
                        item,
                        "fields.city.fields.name.fa",
                        "string",
                        ""
                      )}
                    </li>
                    {console.log("resume: ", item.fields.resume)}
                    {item.fields.resume && item.fields.resume.length !== 0 && (
                      <li>
                        <span>رزومه :‌ </span>
                        <a
                          href={SafeValue(
                            item,
                            "fields.resume.0.fa",
                            "string",
                            ""
                          )}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            size="lg"
                            color="black"
                          />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="request-card-status">
                  <strong>
                    {PersianNumber(
                      SafeValue(item, "fields.quotes", "object", "").length
                    )}{" "}
                    پیشنهاد
                  </strong>

                  <button
                    onClick={() =>
                      this.props.history.push(
                        `/user/offerlist/?rid=${item._id}`
                      )
                    }
                  >
                    مشاهده پیشنهاد ها
                  </button>
                </div>
              </div>
            ));
            break;
          case "pending":
            generatedElements = targetList.map(item => (
              <div className="request-card" key={item._id}>
                <div className="request-card-image">
                  <img src={deskImg} alt="Desk" />
                  <strong className="product-title">
                    {SafeValue(
                      item,
                      "fields.product.fields.name.fa",
                      "string",
                      item.contentType.title.fa
                    )}
                  </strong>
                </div>
                <div className="request-card-details">
                  <ul>
                    <li className="product-title-wrapper">
                      <strong className="product-title">
                        {SafeValue(
                          item,
                          "fields.product.fields.name.fa",
                          "string",
                          item.contentType.title.fa
                        )}
                      </strong>
                    </li>
                    <li>
                      تعداد :‌ {SafeValue(item, "fields.seats", "string", "fa")}
                    </li>
                    <li>
                      تاریخ :{" "}
                      {SafeValue(item, "sys.issueDate", "string", null)
                        .replace(/T/, " ")
                        .replace(/\..+/, "")}
                    </li>
                    <li>
                      شهر :{" "}
                      {SafeValue(
                        item,
                        "fields.city.fields.name.fa",
                        "string",
                        ""
                      )}
                    </li>
                    {item.fields.resume && item.fields.resume.length !== 0 && (
                      <li>
                        <span>رزومه :‌ </span>
                        <a
                          href={SafeValue(
                            item,
                            "fields.resume.0.fa",
                            "string",
                            ""
                          )}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            size="lg"
                            color="black"
                          />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="request-card-status">
                  <strong>در انتظار بررسی</strong>
                </div>
              </div>
            ));
            break;
          case "closed":
            generatedElements = targetList.map(item => (
              <div className="request-card" key={item._id}>
                <div className="request-card-image">
                  <img src={deskImg} alt="Desk" />
                  <strong className="product-title">
                    {SafeValue(
                      item,
                      "fields.product.fields.name.fa",
                      "string",
                      item.contentType.title.fa
                    )}
                  </strong>
                </div>
                <div className="request-card-details">
                  <ul>
                    <li className="product-title-wrapper">
                      <strong className="product-title">
                        {SafeValue(
                          item,
                          "fields.product.fields.name.fa",
                          "string",
                          item.contentType.title.fa
                        )}
                      </strong>
                    </li>
                    <li>
                      تعداد :‌ {SafeValue(item, "fields.seats", "string", "fa")}
                    </li>
                    <li>
                      تاریخ :{" "}
                      {SafeValue(item, "sys.issueDate", "string", null)
                        .replace(/T/, " ")
                        .replace(/\..+/, "")}
                    </li>
                    <li>
                      شهر :{" "}
                      {SafeValue(
                        item,
                        "fields.city.fields.name.fa",
                        "string",
                        ""
                      )}
                    </li>
                    {item.fields.resume && item.fields.resume.length !== 0 && (
                      <li>
                        <span>رزومه :‌ </span>
                        <a
                          href={SafeValue(item, "fields.resume", "string", "")}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            size="lg"
                            color="black"
                          />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="request-card-status">
                  <strong>درخواست بسته شده</strong>
                </div>
              </div>
            ));
            break;
          default:
            break;
        }
      } else if (targetList === "") {
        generatedElements = (
          <span className="no-content">...در حال دریافت لیست</span>
        );
      } else {
        generatedElements = (
          <span className="no-content">درخواستی برای نمایش وجود ندارد</span>
        );
      }
    } catch (err) {
      generatedElements = (
        <span className="no-content">درخواستی برای نمایش وجود ندارد</span>
      );
    }
    return generatedElements;
  };

  tabChanger = tab => {
    this.setState({
      activeTab: tab
    });
  };
  render() {
    return (
      <section
        className="my-requests-section form-section rtl-layout"
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <React.Fragment>
          <div className="filter-section">
            <div className="filter-title">
              <strong>فیلتر درخواستها</strong>
            </div>
            <ul className="filter-list">
              <li
                className={this.state.activeTab === 1 ? "active" : null}
                onClick={() => this.tabChanger(1)}
              >
                دارای پیشنهاد
              </li>
              <li
                className={this.state.activeTab === 2 ? "active" : null}
                onClick={() => this.tabChanger(2)}
              >
                بدون پیشنهاد
              </li>
              <li
                className={this.state.activeTab === 3 ? "active" : null}
                onClick={() => this.tabChanger(3)}
              >
                بسته شده
              </li>
            </ul>
          </div>
          <Card className="form-card">
            {/* Approved requests */}
            {this.state.activeTab === 1 && (
              <section className="approved-requests-section">
                <CardHeader>
                  <span className="fa-layers fa-fw icon">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      pull="right"
                      size="lg"
                      color="white"
                    />
                  </span>
                  <span className="title">
                    <strong>درخواستهای دارای پیشنهاد</strong>
                  </span>
                </CardHeader>
                <CardBody>{this.generateRequestsElements("approved")}</CardBody>
              </section>
            )}
            {/* Pending Requests */}
            {this.state.activeTab === 2 && (
              <section className="pending-requests-section">
                <CardHeader>
                  <span className="fa-layers fa-fw icon">
                    <FontAwesomeIcon
                      icon={faSyncAlt}
                      pull="right"
                      size="lg"
                      color="white"
                    />
                  </span>
                  <span className="title">
                    <strong>درخواستهای بدون پیشنهاد</strong>
                  </span>
                </CardHeader>
                <CardBody>{this.generateRequestsElements("pending")}</CardBody>
              </section>
            )}
            {/* Closed Requests */}
            {this.state.activeTab === 3 && (
              <section className="closed-requests-section">
                <CardHeader>
                  <span className="fa-layers fa-fw icon">
                    <FontAwesomeIcon
                      icon={faBan}
                      pull="right"
                      size="lg"
                      color="white"
                    />
                  </span>
                  <span className="title">
                    <strong>درخواستهای بسته شده</strong>
                  </span>
                </CardHeader>
                <CardBody>{this.generateRequestsElements("closed")}</CardBody>
              </section>
            )}
          </Card>
        </React.Fragment>
      </section>
    );
  }
}
