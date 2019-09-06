import React, { Component } from "react";

import { Link } from "react-router-dom";
import classnames from "classnames";
import { Card, CardHeader, CardBody } from "reactstrap";
import { SafeValue, GetRequestsList } from "../ApiHandlers/ApiHandler";
import Skeleton from "react-loading-skeleton";
import moment from "jalali-moment";
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
    const targetList = SafeValue(this.state.requestsList, stage, "object", []);
    if (targetList.length > 0) {
      switch (stage) {
        case "approved":
          generatedElements = this.state.requestsList["approved"].map(item => (
            <div className="request-card" key={item._id}>
              <div className="request-card-image">
                <img src={deskImg} alt="Desk" />
                <strong className="product-title">{item.fields.name}</strong>
              </div>
              <div className="request-card-details">
                <ul>
                  <li className="product-title-wrapper">
                    <strong className="product-title">
                      {item.fields.name}
                    </strong>
                  </li>
                  <li>تعداد :‌ {item.fields.seats}</li>
                  <li>تاریخ : {item.fields.date}</li>
                  <li>شهر : {item.fields.city}</li>
                  {item.fields.resume && (
                    <li>
                      <span>رزومه :‌ </span>
                      <a href={item.fields.resume}>
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
                <strong>{item.fields.quotes.lengt} پیشنهاد</strong>
                <button onClick={() => null}>مشاهده پیشنهاد ها</button>
              </div>
            </div>
          ));
          break;
        case "pending":
          generatedElements = this.state.requestsList["pending"].map(item => (
            <React.Fragment key={item._id}>
              <div className="request-card" key={item._id}>
                <div className="request-card-image">
                  <img src={deskImg} alt="Desk" />
                  <strong className="product-title">
                    {SafeValue(
                      item.fields,
                      "product.fields.name.fa",
                      "string",
                      ""
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
                          ""
                        )}
                      </strong>
                    </li>
                    <li>
                      تعداد :‌ {SafeValue(item, "fields.seats", "string", "fa")}
                    </li>
                    <li>تاریخ : {moment(item.sys.issueDate)}</li>
                    <li>
                      شهر :{" "}
                      {SafeValue(
                        item,
                        "fields.city.0.fields.name.fa",
                        "string",
                        ""
                      )}
                    </li>
                    {item.fields.resume && (
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
                  <strong>در انتظار بررسی</strong>
                </div>
              </div>
            </React.Fragment>
          ));
          break;
        case "closed":
          generatedElements = this.state.requestsList["closed"].map(item => (
            <div className="request-card" key={item._id}>
              <div className="request-card-image">
                <img src={deskImg} alt="Desk" />
                <strong className="product-title">{item.fields.name}</strong>
              </div>
              <div className="request-card-details">
                <ul>
                  <li className="product-title-wrapper">
                    <strong className="product-title">
                      {item.fields.name}
                    </strong>
                  </li>
                  <li>تعداد :‌ {item.fields.seats}</li>
                  <li>تاریخ : {moment(item.fields.date)}</li>
                  <li>شهر : {item.fields.city}</li>
                  {item.fields.resume && (
                    <li>
                      <span>رزومه :‌ </span>
                      <a href={item.fields.resume}>
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
    } else {
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
  componentDidMount() {
    // setInterval(() => {
    this.updateRequestList();
    // }, 10000);
  }
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
