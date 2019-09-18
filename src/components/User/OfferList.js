import React, { Component } from "react";

import { Link } from "react-router-dom";
import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
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
} from "../ApiHandlers/ApiHandler";
import Skeleton from "react-loading-skeleton";
import DateFormat from "../DateFormat/DateFormat";
import PersianNumber, { addCommas } from "../PersianNumber/PersianNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faTimesCircle,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import "./OfferList.scss";
import verifiedIcon from "../../assets/images/sample-icon/verified.png";
export default class MyRequests extends Component {
  constructor(props) {
    super(props);
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
    GetOfferList(reqId, offer_list => {
      const SAFE_offer_list = SafeValue(offer_list, "data", "object", []);
      // const filtered_offer = SAFE_offer_list.filter(
      //   value =>
      //     this.offerStageArr.validOffers.indexOf(value.fields.stage._id) > -1
      // );
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
    let generatedElements = [];
    let targetList = SafeValue(this.state.offerList, "", "object", []);
    if (targetList.length > 0) {
      generatedElements = targetList.map(item => (
        <div className="offer-card" key={item._id}>
          <div className="offer-card-details">
            <div className="product-header">
              {item.fields.partnerid.fields.logo[0].en && (
                <div className="partner-img">
                  <img src={item.fields.partnerid.fields.logo[0].en} alt="" />
                </div>
              )}
              <div className="partner-title">
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
                    )}{" "}
                    {item.fields.partnerid.fields.verified && (
                      <img src={verifiedIcon} alt="verified" width="20" />
                    )}
                  </strong>
                </h6>
              </div>
            </div>

            <br />
            <ul>
              <li>
                تعداد:
                <br />
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
                شهر:
                <br />
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
              {SafeValue(item, "sys.issueDate", "string", false) && (
                <li>
                  تاریخ ارسال پیشنهاد:
                  <br />
                  <strong>
                    {PersianNumber(
                      DateFormat(item.sys.issueDate).toPersianWithHour()
                    )}
                  </strong>
                </li>
              )}
              {SafeValue(item, "fields.startdate", "string", false) && (
                <li>
                  زمان فعالسازی محصول:
                  <br />
                  <strong>
                    {PersianNumber(
                      DateFormat(item.fields.startdate).toPersian()
                    )}
                  </strong>
                </li>
              )}
              {item.fields.description && (
                <li style={{ display: "contents" }}>
                  توضیح همکار درباره درخواست:
                  <br />
                  <strong>
                    {SafeValue(
                      item,
                      "fields.description",
                      "string",
                      "توضیح خاصی وجود ندارد"
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
                  onClick={() =>
                    this.toggleWarningModal({
                      stage: "reject",
                      offerId: item._id
                    })
                  }
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
              </React.Fragment>
            ) : (
              <React.Fragment>
                {this.offerStageArr.approved.indexOf(item.fields.stage._id) >
                  -1 && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    pull="right"
                    size="lg"
                    color="#58d37b"
                  />
                )}
                {this.offerStageArr.rejected.indexOf(item.fields.stage._id) >
                  -1 && (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    pull="right"
                    size="lg"
                    color="#dd4242"
                  />
                )}
                <span>
                  <strong className="offer-stage-text">
                    {item.fields.stage.fields.name}
                  </strong>
                </span>
              </React.Fragment>
            )}
          </div>
        </div>
      ));
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
          ... در حال دریافت پیشنهادات
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
          <Modal
            isOpen={this.state.openWarningModal}
            toggle={this.toggleWarningModal}
            className="login-modal"
          >
            <ModalHeader
              className="login-modal-header"
              toggle={this.toggleWarningModal}
            >
              هشدار
            </ModalHeader>
            <ModalBody>
              <span>
                در صورت قبول یا رد پیشنهاد امکان تغییر وضعیت پیشنهاد دیگر امکان
                پذیر نیست
                <br />
                <br />
                <strong style={{ fontSize: "20px" }}>
                  آیا اطمینان دارید ؟
                </strong>
              </span>
              <br />
              <Button
                pull="right"
                color="primary"
                style={{ padding: "6px 25px", margin: "20px 10px 0" }}
                onClick={() => this.offerStage()}
              >
                بله
              </Button>

              <Button
                pull="right "
                color="primary"
                style={{ padding: "6px 25px", margin: "20px 10px 0" }}
                onClick={this.toggleWarningModal}
              >
                خیر
              </Button>
            </ModalBody>
          </Modal>
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
