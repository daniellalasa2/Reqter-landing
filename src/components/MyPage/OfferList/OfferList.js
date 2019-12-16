import React, { Component } from "react";

// import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  // Collapse,
  ModalBody,
  ModalHeader,
  Modal,
  Button
} from "reactstrap";
import {
  SafeValue,
  GetOfferList,
  AcceptOffer,
  RejectOffer
} from "../../ApiHandlers/ApiHandler";
import ContextApi from "../../ContextApi/ContextApi";
import DateFormat from "../../DateFormat/DateFormat";
import PersianNumber, { addCommas } from "../../PersianNumber/PersianNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCheckCircle,
  faTimesCircle
  // faChevronDown,
  // faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import "./OfferList.scss";
import verifiedIcon from "../../../assets/images/sample-icon/verified.png";
import classnames from "classnames";
import ImageAlt from "../../../assets/images/alternatives/noimage.png";
export default class MyRequests extends Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.urlParams = this.urlParser(this.props.location.search);
    this.state = {
      offerList: [],
      moreDetailCollapse: null,
      requestId: this.urlParams.rid,
      openWarningModal: false,
      currentOfferOperation: {
        stage: "",
        offerId: ""
      }
    };
    this.offerStageArr = {
      validOffers: ["5d7b968918a6400017ee1513", "5d7b969c18a6400017ee1515"],
      approved: ["5d7b969c18a6400017ee1515"],
      notDefined: ["5d7b968918a6400017ee1513"],
      rejected: ["5d7b96b218a6400017ee1518", "5d7b96a018a6400017ee1516"]
    };
    this.getAndFilterOfferList(this.urlParams.rid);
  }
  getAndFilterOfferList = reqId => {
    const _this = this;
    const { locale } = this.translate;
    GetOfferList(reqId, offer_list => {
      const SAFE_offer_list =
        SafeValue(offer_list, "data", "object", []).length > 0
          ? SafeValue(offer_list, "data", "object", [])
          : [
              <strong
                style={{
                  display: "block",
                  color: "grey",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                {locale.error.no_offer}
              </strong>
            ];
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
  offerStage = () => {
    const _this = this;
    const { stage, offerId } = this.state.currentOfferOperation;
    if (stage === "accept") {
      AcceptOffer(offerId, () => {
        _this.toggleWarningModal();
        _this.getAndFilterOfferList(_this.state.requestId);
      });
    }
    if (stage === "reject") {
      RejectOffer(offerId, () => {
        _this.toggleWarningModal();
        _this.getAndFilterOfferList(_this.state.requestId);
      });
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
    const { lang } = this;
    const { locale, direction } = this.translate;
    let generatedElements = [];
    let targetList = SafeValue(this.state, "offerList", "object", []);
    if (targetList.length > 0) {
      generatedElements = targetList.map(item =>
        SafeValue(item, "fields", "object", false) ? (
          <div className="offer-card" key={item._id}>
            <div className="offer-card-details">
              <div className="product-header">
                <div className="partner-img">
                  {SafeValue(
                    item,
                    "fields.partnerid.fields.partnerkey",
                    "string",
                    ""
                  ) ? (
                    <a
                      href={`/#/p/${SafeValue(
                        item,
                        "fields.partnerid.fields.partnerkey",
                        "string",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={SafeValue(
                          item,
                          "fields.partnerid.fields.logo.0.en",
                          "string",
                          ImageAlt,
                          "fields.partnerid.fields.logo.0"
                        )}
                        alt={SafeValue(
                          item,
                          "fields.partnerid.fields.partnerkey",
                          "string",
                          ""
                        )}
                      />
                    </a>
                  ) : (
                    <img
                      src={SafeValue(
                        item,
                        "fields.partnerid.fields.logo.0.en",
                        "string",
                        ImageAlt,
                        "fields.partnerid.fields.logo.0"
                      )}
                      alt={SafeValue(
                        item,
                        "fields.partnerid.fields.partnerkey",
                        "string",
                        ""
                      )}
                    />
                  )}
                </div>
                <div className="partner-title">
                  <h5>
                    <strong className="product-title-wrapper">
                      <strong className="product-title">
                        {SafeValue(
                          item,
                          `fields.name.${lang}`,
                          "string",
                          "",
                          "fields.name"
                        )}
                      </strong>
                    </strong>
                  </h5>
                  {SafeValue(
                    item,
                    "fields.partnerid.fields.partnerkey",
                    "string",
                    ""
                  ) ? (
                    <a
                      href={`/#/p/${SafeValue(
                        item,
                        "fields.partnerid.fields.partnerkey",
                        "string",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h6>
                        <strong>
                          {SafeValue(
                            item,
                            `fields.partnerid.fields.name.${lang}`,
                            "string",
                            locale.fields.parter_default_name,
                            "fields.partnerid.fields.name"
                          )}{" "}
                          {SafeValue(
                            item,
                            "fields.partnerid.fields.verified",
                            "string",
                            null
                          ) && (
                            <img src={verifiedIcon} alt="verified" width="20" />
                          )}
                        </strong>
                      </h6>
                    </a>
                  ) : (
                    <h6>
                      <strong>
                        {SafeValue(
                          item,
                          `fields.partnerid.fields.name.${lang}`,
                          "string",
                          locale.fields.parter_default_name,
                          "fields.partnerid.fields.name"
                        )}{" "}
                        {SafeValue(
                          item,
                          "fields.partnerid.fields.verified",
                          "string",
                          null
                        ) && (
                          <img src={verifiedIcon} alt="verified" width="20" />
                        )}
                      </strong>
                    </h6>
                  )}
                </div>
              </div>

              <br />
              <ul>
                <li>
                  {locale.fields.city}:
                  <br />
                  <strong>
                    {SafeValue(
                      item,
                      `fields.city.fields.name.${lang}`,
                      "string",
                      locale.error.not_specified,
                      "fields.city.fields.name"
                    )}
                  </strong>
                </li>
                <li>
                  {locale.fields.price.hourly}:‌
                  <br />
                  <strong>
                    {(item.fields.hourlyprice &&
                      PersianNumber(
                        addCommas(
                          SafeValue(item, "fields.hourlyprice", "string", "0")
                        ) + ` ${locale.fields.currency.name}`,
                        lang
                      )) ||
                      locale.error.not_specified}
                  </strong>
                </li>
                <li>
                  {locale.fields.price.daily}:‌
                  <br />
                  <strong>
                    {(item.fields.dailyprice &&
                      PersianNumber(
                        addCommas(
                          SafeValue(item, "fields.dailyprice", "string", "0")
                        ) + ` ${locale.fields.currency.name}`,
                        lang
                      )) ||
                      locale.error.not_specified}
                  </strong>
                </li>
                <li>
                  {locale.fields.price.weekly}:‌
                  <br />
                  <strong>
                    {(item.fields.weeklyprice &&
                      PersianNumber(
                        addCommas(
                          SafeValue(item, "fields.weeklyprice", "string", "")
                        ) + ` ${locale.fields.currency.name}`,
                        lang
                      )) ||
                      locale.error.not_specified}
                  </strong>
                </li>
                <li>
                  {locale.fields.price.monthly}:‌
                  <br />
                  <strong>
                    {(item.fields.monthlyprice &&
                      PersianNumber(
                        addCommas(
                          SafeValue(item, "fields.monthlyprice", "string", "0")
                        ) + ` ${locale.fields.currency.name}`,
                        lang
                      )) ||
                      locale.error.not_specified}
                  </strong>
                </li>
                {SafeValue(item, "sys.issueDate", "string", false) && (
                  <li>
                    {locale.fields.submission_date}:
                    <br />
                    <strong>
                      {PersianNumber(
                        DateFormat(item.sys.issueDate).timeWithHour(lang),
                        lang,
                        lang
                      )}
                    </strong>
                  </li>
                )}
                {SafeValue(item, "fields.startdate", "string", false) && (
                  <li>
                    {locale.fields.startdate}:
                    <br />
                    <strong>
                      {PersianNumber(item.fields.startdate, lang, lang)}
                    </strong>
                  </li>
                )}
                {item.fields.description && (
                  <li
                    style={{
                      width: "100%",
                      display: "flex",
                      flex: "1 1 100%",
                      maxWidth: "100%"
                    }}
                  >
                    {locale.fields.partner_comment._title}:
                    <br />
                    <strong>
                      {SafeValue(
                        item,
                        `fields.description.${lang}`,
                        "string",
                        locale.fields.partner_comment.not_specified,
                        "fields.description"
                      )}
                    </strong>
                  </li>
                )}
              </ul>
              {/* <div className="more-details">
              <Collapse isOpen={this.state.moreDetailCollapse === item._id}>
                <div className="more-details-description">
                  <ul style={{ marginTop: "20px" }}>
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
                      ایمیل :‌
                      <br />
                      <strong>
                        {PersianNumber(
                          SafeValue(
                            item,
                            "fields.partnerid.fields.email",
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
            </div> */}
            </div>
            <div className="offer-choose-state-wrapper">
              {this.offerStageArr.notDefined.indexOf(item.fields.stage._id) >
              -1 ? (
                <React.Fragment>
                  <div
                    className="accept-state"
                    onClick={() =>
                      this.toggleWarningModal({
                        stage: "accept",
                        offerId: item._id
                      })
                    }
                  >
                    <span>
                      <strong>{locale.fields.stage_buttons.approve}</strong>
                    </span>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      pull={direction === "ltr" ? "right" : "left"}
                      size="lg"
                      color="#58d37b"
                    />
                  </div>
                  <div
                    className="deny-state"
                    onClick={() =>
                      this.toggleWarningModal({
                        stage: "reject",
                        offerId: item._id
                      })
                    }
                  >
                    <span>
                      <strong>{locale.fields.stage_buttons.deny}</strong>
                    </span>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      pull={direction === "ltr" ? "right" : "left"}
                      size="lg"
                      color="#dd4242"
                    />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.offerStageArr.approved.indexOf(item.fields.stage._id) >
                    -1 && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      pull={direction === "ltr" ? "left" : "right"}
                      size="lg"
                      color="#58d37b"
                    />
                  )}
                  {this.offerStageArr.rejected.indexOf(item.fields.stage._id) >
                    -1 && (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      pull={direction === "ltr" ? "left" : "right"}
                      size="lg"
                      color="#dd4242"
                    />
                  )}
                  <span>
                    <strong className="offer-stage-text">
                      {SafeValue(
                        item,
                        `fields.stage.fields.name.${lang}`,
                        "string",
                        locale.error.not_specified,
                        "fields.stage.fields.name"
                      )}
                    </strong>
                  </span>
                </React.Fragment>
              )}
            </div>
          </div>
        ) : (
          item
        )
      );
    } else {
      generatedElements = (
        <strong
          style={{
            display: "block",
            color: "grey",
            width: "100%",
            textAlign: "center"
          }}
        >
          {locale.status.loading}
        </strong>
      );
    }
    return generatedElements;
  };
  toggleWarningModal = currentOfferOperation => {
    var goingToAttachObject = {};
    if (currentOfferOperation) {
      goingToAttachObject = currentOfferOperation;
    }
    this.setState({
      openWarningModal: !this.state.openWarningModal,
      currentOfferOperation: {
        ...this.state.currentOfferOperation,
        ...goingToAttachObject
      }
    });
  };
  // shouldComponentUpdate(nextProps, nextState) {

  // }
  render() {
    const { locale, direction } = this.translate;
    return (
      <section
        className={classnames(
          "offer-list-section form-section",
          direction === "rtl" && "rtl-layout"
        )}
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <React.Fragment>
          <Modal
            isOpen={this.state.openWarningModal}
            toggle={this.toggleWarningModal}
            className="login-modal"
          >
            <ModalHeader
              className="login-modal-header"
              toggle={this.toggleWarningModal}
            >
              {locale.alert_modal.title}
            </ModalHeader>
            <ModalBody>
              <span>
                {locale.alert_modal.body[0]}
                <br />
                <br />
                <strong style={{ fontSize: "20px" }}>
                  {locale.alert_modal.body[1]}
                </strong>
              </span>
              <br />
              <Button
                pull={direction === "ltr" ? "left" : "right"}
                color="primary"
                style={{ padding: "6px 25px", margin: "20px 10px 0" }}
                onClick={() => this.offerStage()}
              >
                {locale.alert_modal.accept}
              </Button>

              <Button
                pull={direction === "ltr" ? "left" : "right"}
                color="primary"
                style={{ padding: "6px 25px", margin: "20px 10px 0" }}
                onClick={this.toggleWarningModal}
              >
                {locale.alert_modal.deny}
              </Button>
            </ModalBody>
          </Modal>
          <Card className="form-card">
            <section className="offer-list-section">
              <CardHeader>
                <div className="back-button-section">
                  <span
                    className="fa-layers fa-fw icon "
                    onClick={() => this.props.history.goBack()}
                  >
                    <FontAwesomeIcon
                      icon={direction === "rtl" ? faArrowRight : faArrowLeft}
                      pull={direction === "ltr" ? "left" : "right"}
                      size="lg"
                      color="white"
                    />
                  </span>
                  <span className="title">
                    <strong>{locale.return}</strong>
                  </span>
                </div>
              </CardHeader>
              <CardBody>{this.generateOfferList()}</CardBody>
            </section>
          </Card>
        </React.Fragment>
      </section>
    );
  }
}
