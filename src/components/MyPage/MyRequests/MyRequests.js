import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  SafeValue,
  GetRequestsList,
  DownloadAsset
} from "../../ApiHandlers/ApiHandler";
import DateFormat from "../../DateFormat/DateFormat";
import PersianNumber from "../../PersianNumber/PersianNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Configuration from "../../ApiHandlers/Configuration";
import {
  // faBan,
  // faCheckCircle,
  // faSyncAlt,
  faDownload,
  faList
} from "@fortawesome/free-solid-svg-icons";
import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
import "./MyRequests.scss";
import deskImg from "../../../assets/images/products-icons/002-desk.png";
export default class MyRequests extends Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.UPLOAD_BASEURL = Configuration.BASE_URL_UPLOAD;
    this.state = {
      activeTab: 1,
      requestsList: []
    };
    this.offerStage = {
      approved: ["5d7e582415586f0017d4836c", "5d7e585915586f0017d4836d"]
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
        all: [],
        _draft: []
      };
      SAFE_requests_list.forEach(request => {
        //all
        filtered_requests_list.all.push(request);
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
    const { lang } = this;
    const { locale } = this.translate;
    const targetList = SafeValue(this.state.requestsList, stage, "object", "");
    try {
      if (targetList.length > 0) {
        switch (stage) {
          case "all":
            generatedElements = targetList.map(item => (
              <div className="request-card" key={item._id}>
                <div className="request-card-image">
                  <img src={deskImg} alt="Desk" />
                  <strong className="product-title">
                    {SafeValue(
                      item,
                      `fields.product.fields.name.${lang}`,
                      "string",
                      item.contentType.title[lang],
                      "fields.product.fields.name"
                    )}
                  </strong>
                </div>
                <div className="request-card-details">
                  <ul>
                    <li className="product-title-wrapper">
                      <strong className="product-title">
                        {SafeValue(
                          item,
                          `fields.product.fields.name.${lang}`,
                          "string",
                          item.contentType.title[lang],
                          "fields.product.fields.name"
                        )}
                      </strong>
                    </li>
                    <li>
                      {locale.fields.quantity} :‌{" "}
                      {PersianNumber(
                        SafeValue(item, "fields.seats", "string", " - "),
                        lang
                      )}
                    </li>
                    {SafeValue(item, "sys.issueDate", "string", false) && (
                      <li>
                        {locale.fields.date} :{" "}
                        {PersianNumber(
                          DateFormat(
                            item.sys.issueDate
                              .replace(/T/, " ")
                              .replace(/\..+/, "")
                          ).timeWithHour(
                            lang,
                            locale.fields.time_default_value
                          ),
                          lang
                        )}
                      </li>
                    )}
                    <li>
                      {locale.fields.city} :{" "}
                      {SafeValue(
                        item,
                        `fields.city.fields.name.${lang}`,
                        "string",
                        "",
                        "fields.city.fields.name"
                      )}
                    </li>
                    {item.fields.resume && item.fields.resume.length !== 0 && (
                      <li>
                        <span>{locale.fields.resume} :‌ </span>
                        <a
                          href={DownloadAsset(
                            SafeValue(
                              item,
                              `fields.resume.0.${lang}`,
                              "string",
                              "",
                              "fields.resume.0"
                            )
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
                  {this.offerStage.approved.indexOf(item.fields.stage._id) >
                  -1 ? (
                    <button
                      onClick={() =>
                        this.props.history.push(
                          `/${lang}/user/offerlist/?rid=${item._id}`
                        )
                      }
                    >
                      {locale.status.offers_list}
                    </button>
                  ) : (
                    <div
                      className="request-card-status"
                      style={{
                        width: "auto"
                      }}
                    >
                      <strong
                        style={{
                          backgroundColor: "#8ea3e3",
                          fontSize: "17px",
                          padding: "5px 15px"
                        }}
                      >
                        {SafeValue(
                          item,
                          `fields.stage.fields.name.${lang}`,
                          "string",
                          locale.status.no_status,
                          "fields.stage.fields.name"
                        )}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            ));
            break;
          case "approved":
            generatedElements = targetList.map(item => (
              <div className="request-card" key={item._id}>
                <div className="request-card-image">
                  <img src={deskImg} alt="Desk" />
                  <strong className="product-title">
                    {SafeValue(
                      item,
                      `fields.product.fields.name.${lang}`,
                      "string",
                      item.contentType.title[lang],
                      "fields.product.fields.name"
                    )}
                  </strong>
                </div>
                <div className="request-card-details">
                  <ul>
                    <li className="product-title-wrapper">
                      <strong className="product-title">
                        {SafeValue(
                          item,
                          `fields.product.fields.name.${lang}`,
                          "string",
                          item.contentType.title[lang],
                          "fields.product.fields.name"
                        )}
                      </strong>
                    </li>
                    <li>
                      {locale.fields.quantity} :‌{" "}
                      {SafeValue(item, "fields.seats", "string", " - ")}
                    </li>
                    <li>
                      {locale.fields.date} :{" "}
                      {SafeValue(item, "sys.issueDate", "string", null)
                        .replace(/T/, " ")
                        .replace(/\..+/, "")}
                    </li>
                    <li>
                      {locale.fields.city} :{" "}
                      {SafeValue(
                        item,
                        `fields.city.fields.name.${lang}`,
                        "string",
                        "",
                        "fields.city.fields.name"
                      )}
                    </li>
                    {item.fields.resume && item.fields.resume.length !== 0 && (
                      <li>
                        <span>{locale.fields.resume} :‌ </span>
                        <a
                          href={SafeValue(
                            item,
                            `fields.resume.0.${lang}`,
                            "string",
                            "",
                            "fields.resume.0"
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
                      SafeValue(item, "fields.quotes", "object", "").length,
                      lang
                    )}{" "}
                    {locale.fields.offer}
                  </strong>

                  <button
                    onClick={() =>
                      this.props.history.push(
                        `/${lang}/user/offerlist/?rid=${item._id}`
                      )
                    }
                  >
                    {locale.status.offers_list}
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
                      `fields.product.fields.name.${lang}`,
                      "string",
                      item.contentType.title[lang],
                      "fields.product.fields.name"
                    )}
                  </strong>
                </div>
                <div className="request-card-details">
                  <ul>
                    <li className="product-title-wrapper">
                      <strong className="product-title">
                        {SafeValue(
                          item,
                          `fields.product.fields.name.${lang}`,
                          "string",
                          item.contentType.title[lang],
                          "fields.product.fields.name"
                        )}
                      </strong>
                    </li>
                    <li>
                      {locale.fields.quantity} :‌{" "}
                      {SafeValue(item, "fields.seats", "string", lang)}
                    </li>
                    <li>
                      {locale.fields.date} :{" "}
                      {SafeValue(item, "sys.issueDate", "string", null)
                        .replace(/T/, " ")
                        .replace(/\..+/, "")}
                    </li>
                    <li>
                      {locale.fields.city} :{" "}
                      {SafeValue(
                        item,
                        `fields.city.fields.name.${lang}`,
                        "string",
                        "",
                        "fields.city.fields.name"
                      )}
                    </li>
                    {item.fields.resume && item.fields.resume.length !== 0 && (
                      <li>
                        <span>{locale.fields.resume} :‌ </span>
                        <a
                          href={SafeValue(
                            item,
                            `fields.resume.0.${lang}`,
                            "string",
                            "",
                            "fields.resume.0"
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
                  <strong>{locale.status.pending}</strong>
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
                      `fields.product.fields.name.${lang}`,
                      "string",
                      item.contentType.title[lang],
                      "fields.product.fields.name"
                    )}
                  </strong>
                </div>
                <div className="request-card-details">
                  <ul>
                    <li className="product-title-wrapper">
                      <strong className="product-title">
                        {SafeValue(
                          item,
                          `fields.product.fields.name.${lang}`,
                          "string",
                          item.contentType.title[lang],
                          "fields.product.fields.name"
                        )}
                      </strong>
                    </li>
                    <li>
                      {locale.fields.quantity} :‌{" "}
                      {SafeValue(item, "fields.seats", "string", lang)}
                    </li>
                    <li>
                      {locale.fields.date} :{" "}
                      {SafeValue(item, "sys.issueDate", "string", null)
                        .replace(/T/, " ")
                        .replace(/\..+/, "")}
                    </li>
                    <li>
                      {locale.fields.city} :{" "}
                      {SafeValue(
                        item,
                        `fields.city.fields.name.${lang}`,
                        "string",
                        "",
                        "fields.city.fields.name"
                      )}
                    </li>
                    {item.fields.resume && item.fields.resume.length !== 0 && (
                      <li>
                        <span>{locale.fields.resume} :‌ </span>
                        <a
                          href={SafeValue(
                            item,
                            `fields.resume.${lang}`,
                            "string",
                            "",
                            "fields.resume"
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
                  <strong>{locale.status.closed}</strong>
                </div>
              </div>
            ));
            break;
          default:
            break;
        }
      } else if (targetList === "") {
        generatedElements = (
          <span className="no-content">{locale.status.loading}</span>
        );
      } else {
        generatedElements = (
          <span className="no-content">{locale.status.no_request}</span>
        );
      }
    } catch (err) {
      generatedElements = (
        <span className="no-content">{locale.status.no_request}</span>
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
    const { direction, locale } = this.translate;
    return (
      <section
        className={classnames(
          "my-requests-section form-section",
          direction === "rtl" && "rtl-layout"
        )}
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <React.Fragment>
          {/* <div className="filter-section">
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
          </div> */}
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
                    <strong>{locale.form_title}</strong>
                  </span>
                </CardHeader>
                <CardBody>{this.generateRequestsElements("all")}</CardBody>
              </section>
            )}
            {/* Pending Requests
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
            //Closed requests
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
            )}{" "}
            */}
          </Card>
        </React.Fragment>
      </section>
    );
  }
}
