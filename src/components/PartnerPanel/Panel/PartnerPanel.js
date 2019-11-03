import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import {
  SafeValue,
  GetPartnerpanelRequests,
  GetPartnerInfo,
  PartnerpanelRejectRequest,
  PartnerpanelOpenRequest,
  QueryContent,
  PartnerpanelIssueOffer,
  GetPartnerProducts,
  GetPartnerAllOffers,
  Config
} from "../../ApiHandlers/ApiHandler";
import PersianNumber from "../../PersianNumber/PersianNumber";
import DateFormat from "../../DateFormat/DateFormat";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faList } from "@fortawesome/free-solid-svg-icons";
import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
import Spinner from "../../../assets/script/spinner";
import IssueOffer from "../IssueOffer/IssueOffer";
import "./PartnerPanel.scss";
import NoImageAlt from "../../../assets/images/alternatives/noimage.png";
//!!!!!!!!IMPORTANT: Partner state checking////////////////////////////
export default class PartnerPanel extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.requestsAPIType = {
      newrequests: "assigned",
      openrequests: "opened",
      alloffers: "alloffers"
    };
    this.state = {
      contactModal: {},
      requestsOrOffers: {
        activeFilter: "",
        dataContent: [],
        loading: false
      },
      productsType: [],
      partnerProducts: [],
      partnerData: {},
      partnerId: "",
      modals: {
        warning: { openStatus: false, data: {} },
        requestContact: { openStatus: false, data: {} },
        issueOffer: { openStatus: false, data: {} }
      }
    };
  }

  //-------------------------------------Filter request --------------------------------------//
  // Functionality:
  //    1- If user clicks on filter requests tab inside partner panel this function will be call

  filterRequestsOrOffers = (type, filter, e, callback) => {
    const _partnerId = this.state.partnerId;
    this.setState({
      requestsOrOffers: {
        ...this.state.requestsOrOffers,
        activeFilter: filter,
        loading: true
      }
    });
    if (this.requestsAPIType[filter]) {
      filter = this.requestsAPIType[filter];
    } else {
      filter = null;
    }
    //active button class

    if (typeof e === "object" && e.length === undefined) {
      const filterButtons = Array.from(
        document.getElementsByClassName("filter-button")
      );
      filterButtons.forEach(button => {
        button.classList.remove("active");
      });
      e.target.classList.add("active");
    }
    if (type === "request") {
      GetPartnerpanelRequests(_partnerId, filter, res => {
        let APIDataContent = [];
        if (res.success_result.success) {
          APIDataContent = res.data;
        }
        this.setState(
          {
            requestsOrOffers: {
              ...this.state.requestsOrOffers,
              dataContent: APIDataContent,
              loading: false
            }
          },
          () => {
            if (typeof callback === "function") callback();
          }
        );
      });
    } else {
      GetPartnerAllOffers(_partnerId, res => {
        let APIDataContent = [];
        if (res.success_result.success) {
          APIDataContent = res.data;
        }
        this.setState(
          {
            requestsOrOffers: {
              ...this.state.requestsOrOffers,
              dataContent: APIDataContent,
              loading: false
            }
          },
          () => {
            if (typeof callback === "function") callback();
          }
        );
      });
    }
  };
  //--------------------------Get and update product types------------------------------//
  // Functionality:
  //  1-Get main website products from backend API and update state with product ids
  //  2-Get partner products by partnerid and update the state
  getAndUpdateProductsList = () => {
    //get and update productsType
    QueryContent([Config.CONTENT_TYPE_ID.product_type], res => {
      if (res.success_result.success) {
        this.setState({
          productsType: res.data
        });
      }
    });
    //this.state.partnerId
    GetPartnerProducts(
      { "fields.partnerid": "5d6d17bbaedb7b0017ae6b74" },
      res => {
        if (res.success_result.success) {
          this.setState({
            partnerProducts: res.data
          });
        }
      }
    );
  };
  openRequest = (requestid, request, reloadRequests) => {
    PartnerpanelOpenRequest(requestid, res => {
      if (res.success_result.success) {
        this.toggleModals("requestContact", res.data, () => {
          reloadRequests &&
            this.filterRequestsOrOffers("request", "newrequests", undefined);
        });
      }
    });
  };
  rejectRequest = (requestid, theListTypeThatIsGoingToUpdate, callback) => {
    PartnerpanelRejectRequest(requestid, res => {
      if (res.success_result.success) {
        this.filterRequestsOrOffers(
          "request",
          theListTypeThatIsGoingToUpdate,
          undefined,
          () => {
            if (typeof callback === "function") callback();
          }
        );
      }
    });
  };
  //------------------------Toggle Modals------------------------------//
  // Functionality:
  //  1-Open and close modals
  //  2-access sent data inside opened modal
  //  3-call a callback function after data reached inside modal
  toggleModals = (modalType, dataObj, callback) => {
    const auhorizedModals = ["warning", "requestContact", "issueOffer"];
    if (auhorizedModals.indexOf(modalType) > -1) {
      this.setState(
        {
          modals: {
            ...this.state.modals,
            [modalType]: {
              openStatus: !this.state.modals[modalType].openStatus,
              data: dataObj
            }
          }
        },
        () => {
          if (typeof callback === "function") callback();
        }
      );
    }
  };
  //------------------------- Display requests table -----------------------------//
  // generate partner panel requests table based on active request filter tab
  displayRequestsTable = (requestType, requestsObj) => {
    const { locale } = this.translate;
    let generatedElements = [];
    requestType = requestsObj.length > 0 ? requestType : null;
    const _tableWrapperDefault = children => (
      <Table hover responsive bordered className="requests-table">
        <thead>
          <tr>
            <th>{locale.table.row}</th>
            <th>{locale.table.product_name}</th>
            <th>{locale.table.qunatity}</th>
            <th>{locale.table.date}</th>
            <th>{locale.table.operation}</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    );
    const _tableWrapperOpenRequests = children => (
      <Table responsive bordered hover className="requests-table">
        <thead>
          <tr>
            <th>{locale.table.row}</th>
            <th>{locale.table.product_name}</th>
            <th>{locale.table.requester_detail}</th>
            <th>{locale.table.qunatity}</th>
            <th>{locale.table.date}</th>
            <th>{locale.table.operation}</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    );
    const _tableWrapperAllOffers = children => (
      <Table responsive bordered hover className="requests-table">
        <thead>
          <tr>
            <th>{locale.table.row}</th>
            <th>{locale.table.offer_name}</th>
            <th>{locale.table.request_details}</th>
            <th>{locale.table.sent_offer}</th>
            <th>{locale.table.offer_stage}</th>
            <th>{locale.table.date}</th>
            <th>{locale.table.operation}</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    );
    switch (requestType) {
      case "newrequests":
        generatedElements = requestsObj.map(
          (request, idx) =>
            request.status === "published" && (
              <tr key={idx}>
                <td>{PersianNumber(idx + 1, this.lang)}</td>
                <td>
                  {SafeValue(
                    request,
                    "fields.requestid.fields.product",
                    "string",
                    false
                  ) &&
                    this.state.productsType.map(
                      (product, idx) =>
                        product._id ===
                          request.fields.requestid.fields.product && (
                          <span key={idx}>
                            <img
                              src={SafeValue(
                                product,
                                `fields.thumbnail.${this.lang}`,
                                "string",
                                NoImageAlt,
                                "fields.thumbnail.0"
                              )}
                              alt="Product"
                              style={{ width: "60px", height: "48px" }}
                            />{" "}
                            <strong>
                              {SafeValue(
                                product,
                                `fields.name.${this.lang}`,
                                "string",
                                " - ",
                                "fields.name"
                              )}
                            </strong>
                          </span>
                        )
                    )}
                </td>
                <td>
                  {PersianNumber(
                    SafeValue(
                      request,
                      "fields.requestid.fields.seats",
                      "string",
                      " - "
                    ),
                    this.lang
                  )}
                </td>
                <td>
                  {PersianNumber(
                    DateFormat(
                      SafeValue(request, "sys.issueDate", "string", 0)
                    ).timeWithHour(this.lang, " - "),
                    this.lang
                  )}
                </td>
                <td>
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => this.openRequest(request._id, request, true)}
                  >
                    {locale.requests.open_request_button}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() =>
                      this.toggleModals("warning", {
                        requestId: request._id,
                        goingToUpdateRequestsListType: this.state
                          .requestsOrOffers.activeFilter,
                        callback: () => {
                          this.toggleModals("warning", {});
                        }
                      })
                    }
                  >
                    {locale.requests.reject_request_button}
                  </Button>
                </td>
              </tr>
            )
        );
        return _tableWrapperDefault(generatedElements);
      case "openrequests":
        generatedElements = requestsObj.map(
          (request, idx) =>
            request.status === "published" && (
              <tr key={idx}>
                <td>{PersianNumber(idx + 1, this.lang)}</td>
                <td>
                  {SafeValue(
                    request,
                    "fields.requestid.fields.product",
                    "string",
                    false
                  ) &&
                    this.state.productsType.map(
                      (product, idx) =>
                        product._id ===
                          request.fields.requestid.fields.product && (
                          <span key={idx}>
                            <img
                              src={SafeValue(
                                product,
                                `fields.thumbnail.${this.lang}`,
                                "string",
                                NoImageAlt,
                                "fields.thumbnail.0"
                              )}
                              alt="Product"
                              style={{ width: "60px", height: "48px" }}
                            />{" "}
                            <strong>
                              {SafeValue(
                                product,
                                `fields.name.${this.lang}`,
                                "string",
                                " - ",
                                "fields.name"
                              )}
                            </strong>
                          </span>
                        )
                    )}
                </td>
                <td>
                  {SafeValue(
                    request,
                    "fields.requestid.fields.fullname",
                    "string",
                    " - "
                  )}
                  <br />
                  <span style={{ direction: "ltr", display: "inline-block" }}>
                    {PersianNumber(
                      SafeValue(
                        request,
                        "fields.requestid.fields.phonenumber",
                        "string",
                        " - "
                      ),
                      this.lang
                    )}
                  </span>
                  <br />
                  {SafeValue(
                    request,
                    "fields.requestid.fields.email",
                    "string",
                    " - "
                  )}
                </td>
                <td>
                  {PersianNumber(
                    SafeValue(
                      request,
                      "fields.requestid.fields.seats",
                      "string",
                      " - "
                    ),
                    this.lang
                  )}
                </td>
                <td>
                  {PersianNumber(
                    DateFormat(
                      SafeValue(request, "sys.issueDate", "string", 0)
                    ).timeWithHour(this.lang, " - "),
                    this.lang
                  )}
                </td>
                <td>
                  <Button
                    size="sm"
                    color="success"
                    style={{ fontWeight: "bold" }}
                    onClick={() =>
                      this.toggleModals("issueOffer", {
                        name: "",
                        country: SafeValue(
                          this.state.partnerData,
                          "fields.country",
                          "string",
                          "0"
                        ),
                        city: SafeValue(
                          this.state.partnerData,
                          "fields.city",
                          "string",
                          "0"
                        ),
                        hourlyprice: "",
                        dailyprice: "",
                        weeklyprice: "",
                        monthlyprice: "",
                        description: null,
                        startdate: "",
                        partnerid: this.state.partnerId,
                        requestid: request._id,
                        stage: "5d7b968418a6400017ee1512",
                        partnerProducts: this.state.partnerProducts
                      })
                    }
                  >
                    {locale.requests.issue_offer}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() =>
                      this.openRequest(request._id, request, false)
                    }
                  >
                    {locale.requests.display_request}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() =>
                      this.toggleModals("warning", {
                        requestId: request._id,
                        goingToUpdateRequestsListType: this.state
                          .requestsOrOffers.activeFilter,
                        callback: () => {
                          this.toggleModals("warning", {});
                        }
                      })
                    }
                  >
                    {locale.requests.reject_request_button}
                  </Button>
                </td>
              </tr>
            )
        );
        return _tableWrapperOpenRequests(generatedElements);
      case "alloffers":
        generatedElements = requestsObj.map(
          (request, idx) =>
            request.status === "published" && (
              <tr key={idx}>
                <td>{PersianNumber(idx + 1, this.lang)}</td>
                <td>{SafeValue(request, "fields.name", "string", false)}</td>
                <td>
                  {SafeValue(
                    request,
                    "fields.requestid.fields.fullname",
                    "string",
                    " - "
                  )}
                  <br />
                  <span style={{ direction: "ltr", display: "inline-block" }}>
                    {PersianNumber(
                      SafeValue(
                        request,
                        "fields.requestid.fields.phonenumber",
                        "string",
                        " - "
                      ),
                      this.lang
                    )}
                  </span>
                  <br />
                  {SafeValue(
                    request,
                    "fields.requestid.fields.email",
                    "string",
                    " - "
                  )}
                </td>
                <td>
                  {PersianNumber(
                    SafeValue(
                      request,
                      "fields.requestid.fields.seats",
                      "string",
                      " - "
                    ),
                    this.lang
                  )}
                </td>
                <td>
                  {PersianNumber(
                    DateFormat(
                      SafeValue(request, "sys.issueDate", "string", 0)
                    ).timeWithHour(this.lang, " - "),
                    this.lang
                  )}
                </td>
                <td>
                  <Button
                    size="sm"
                    color="success"
                    style={{ fontWeight: "bold" }}
                    onClick={() =>
                      this.toggleModals("issueOffer", {
                        name: "",
                        country: SafeValue(
                          this.state.partnerData,
                          "fields.country",
                          "string",
                          "0"
                        ),
                        city: SafeValue(
                          this.state.partnerData,
                          "fields.city",
                          "string",
                          "0"
                        ),
                        hourlyprice: "",
                        dailyprice: "",
                        weeklyprice: "",
                        monthlyprice: "",
                        description: null,
                        startdate: "",
                        partnerid: this.state.partnerId,
                        requestid: request._id,
                        stage: "5d7b968418a6400017ee1512",
                        partnerProducts: this.state.partnerProducts
                      })
                    }
                  >
                    {locale.requests.issue_offer}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() =>
                      this.openRequest(request._id, request, false)
                    }
                  >
                    {locale.requests.display_request}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() =>
                      this.toggleModals("warning", {
                        requestId: request._id,
                        goingToUpdateRequestsListType: this.state
                          .requestsOrOffers.activeFilter,
                        callback: () => {
                          this.toggleModals("warning", {});
                        }
                      })
                    }
                  >
                    {locale.requests.reject_request_button}
                  </Button>
                </td>
              </tr>
            )
        );
        return _tableWrapperAllOffers(generatedElements);
      default:
        return (
          <span className="no-content">
            <strong>{locale.requests.no_items_found}</strong>
          </span>
        );
    }
  };
  updatePartnerInfo = callback => {
    GetPartnerInfo({ "fields.phonenumber": this.context.auth.ID }, res => {
      if (res.success_result.success) {
        const { _id } = res.data[0];
        this.setState(
          {
            partnerData: res.data[0],
            partnerId: _id
          },
          () => typeof callback === "function" && callback()
        );
      }
    });
  };
  componentDidMount() {
    //Initial datas which are going to display in partner panel
    this.getAndUpdateProductsList();
    this.updatePartnerInfo();
  }
  render() {
    const { locale, direction } = this.translate;
    const { loading } = this.state.requestsOrOffers;
    const { modals, requestsOrOffers } = this.state;
    return (
      <section
        className={classnames(
          "partner-panel-section form-section",
          `_${direction}`
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
                  className="filter-button"
                  onClick={button =>
                    this.filterRequestsOrOffers(
                      "request",
                      "newrequests",
                      button
                    )
                  }
                >
                  {locale.card_header.new_requests}
                </button>
                <button
                  className="filter-button"
                  onClick={button =>
                    this.filterRequestsOrOffers(
                      "request",
                      "openrequests",
                      button
                    )
                  }
                >
                  {locale.card_header.open_requests}
                </button>
                <button
                  className="filter-button"
                  onClick={button =>
                    this.filterRequestsOrOffers("offer", "alloffers", button)
                  }
                >
                  {locale.card_header.offers}
                </button>
                <button
                  className="filter-button"
                  onClick={button =>
                    this.filterRequestsOrOffers("offer", "accepted", button)
                  }
                >
                  {locale.card_header.accepted}
                </button>
                <button
                  className="filter-button"
                  onClick={button =>
                    this.filterRequestsOrOffers("offer", "rejected", button)
                  }
                >
                  {locale.card_header.rejected}
                </button>
              </nav>
            </CardHeader>
            <CardBody>
              {loading ? (
                <span className="no-content">
                  <strong>{locale.requests.loading}</strong>
                </span>
              ) : (
                this.displayRequestsTable(
                  requestsOrOffers.activeFilter,
                  requestsOrOffers.dataContent
                )
              )}
            </CardBody>
          </Card>

          {/************************** Issue offer modal**************************/}
          <Modal
            isOpen={this.state.modals.issueOffer.openStatus}
            toggle={() => this.toggleModals("issueOffer", {})}
            className={classnames("login-modal", `_${direction}`)}
            id="issueOffer-modal"
          >
            <ModalHeader
              className="login-modal-header"
              toggle={() => this.toggleModals("issueOffer", {})}
            >
              {locale.requests.issue_offer_modal.title}
            </ModalHeader>
            <ModalBody>
              {this.state.partnerProducts.length > 0 ? (
                <IssueOffer
                  data={modals.issueOffer.data}
                  type="radio"
                  lang={this.lang}
                  callback={() => this.toggleModals("issueOffer", {})}
                />
              ) : (
                <strong style={{ color: "var(--red)", lineHeight: 3 }}>
                  {locale.requests.issue_offer_modal.no_product_founded}
                </strong>
              )}
            </ModalBody>
          </Modal>
          {/************************* Warning modal ***********************/}
          <Modal
            isOpen={this.state.modals.warning.openStatus}
            toggle={() => this.toggleModals("warning", {})}
            className={classnames("login-modal", `_${direction}`)}
            id="rejectRequest-warning-modal"
          >
            <ModalHeader
              className="login-modal-header"
              toggle={() => this.toggleModals("warning", {})}
            >
              {locale.requests.alert.title}
            </ModalHeader>
            <ModalBody>
              <span>
                {locale.requests.alert.description}

                <strong style={{ fontSize: "20px" }}>
                  {locale.requests.alert.areyousure}
                </strong>
              </span>
              <br />
              <Button
                pull={direction === "ltr" ? "left" : "right"}
                color="primary"
                style={{ padding: "6px 25px", margin: "20px 10px 0" }}
                onClick={() =>
                  this.rejectRequest(
                    modals.warning.data.requestId,
                    modals.warning.data.goingToUpdateRequestsListType,
                    () => {
                      modals.warning.data.callback();
                    }
                  )
                }
              >
                {locale.requests.alert.accept}
              </Button>
              <Button
                pull={direction === "ltr" ? "left" : "right"}
                color="primary"
                style={{ padding: "6px 25px", margin: "20px 10px 0" }}
                onClick={() => this.toggleModals("warning", {})}
              >
                {locale.requests.alert.reject}
              </Button>
            </ModalBody>
          </Modal>
          {/******************* Requester's contact details modal **************/}
          <Modal
            isOpen={this.state.modals.requestContact.openStatus}
            toggle={() => this.toggleModals("requestContact", {})}
            className={classnames("requestContact-modal", `_${direction}`)}
          >
            <ModalHeader
              className="requestContact-modal-header"
              toggle={() => this.toggleModals("requestContact", {})}
            >
              {SafeValue(
                modals.requestContact,
                "data.fields.name",
                "string",
                locale.requests.customer_contact_detail.title
              )}
            </ModalHeader>

            <ModalBody>
              <fieldset>
                <legend>
                  {locale.requests.customer_contact_detail.request_info.title}
                </legend>
                <div>
                  <span className="requestInfo-title">
                    {
                      locale.requests.customer_contact_detail.request_info
                        .product_name
                    }
                  </span>{" "}
                  <span className="requestInfo-text">
                    {SafeValue(
                      modals.requestContact,
                      `data.fields.product.fields.name.${this.lang}`,
                      "string",
                      " - ",
                      "data.fields.product.fields.name"
                    )}
                  </span>
                </div>
                <div>
                  <span className="requestInfo-title">
                    {locale.requests.customer_contact_detail.request_info.seats}
                  </span>{" "}
                  <span className="requestInfo-text">
                    {PersianNumber(
                      SafeValue(
                        modals.requestContact,
                        "data.fields.seats",
                        "string",
                        " - "
                      ),
                      this.lang
                    )}
                  </span>
                </div>

                <div>
                  <span className="requestInfo-title">
                    {locale.requests.customer_contact_detail.request_info.city}
                  </span>{" "}
                  <span className="requestInfo-text">
                    {SafeValue(
                      modals.requestContact,
                      `data.fields.city.fields.name.${this.lang}`,
                      "string",
                      " - ",
                      "data.fields.city.fields.name"
                    )}
                  </span>
                </div>

                <div>
                  <span className="requestInfo-title">
                    {
                      locale.requests.customer_contact_detail.request_info
                        .country
                    }
                  </span>{" "}
                  <span className="requestInfo-text">
                    {SafeValue(
                      modals.requestContact,
                      `data.fields.country.fields.name.${this.lang}`,
                      "string",
                      " - ",
                      "data.fields.country.fields.name"
                    )}
                  </span>
                </div>

                <div>
                  <span className="requestInfo-title">
                    {
                      locale.requests.customer_contact_detail.request_info
                        .birthyear
                    }
                  </span>{" "}
                  <span className="requestInfo-text">
                    {PersianNumber(
                      SafeValue(
                        modals.requestContact,
                        `data.fields.birthyear`,
                        "string",
                        " - "
                      ),
                      this.lang
                    )}
                  </span>
                </div>

                {SafeValue(
                  modals.requestContact,
                  "data.fields.workingfield",
                  "object",
                  []
                ).length > 0 && (
                  <div>
                    <span className="requestInfo-title">
                      {
                        locale.requests.customer_contact_detail.request_info
                          .workingfield
                      }
                    </span>{" "}
                    <span className="requestInfo-text">
                      {modals.requestContact.data.fields.workingfield.map(
                        field => (
                          <div
                            id="workingfield-tag"
                            className="workingfield-tag"
                          >
                            {SafeValue(
                              field,
                              `fields.name.${this.lang}`,
                              "string",
                              " - "
                            )}
                          </div>
                        )
                      )}
                    </span>
                  </div>
                )}
                {SafeValue(
                  modals.requestContact,
                  "data.fields.resume",
                  "object",
                  []
                ).length > 0 && (
                  <div>
                    <span className="requestInfo-title">
                      {
                        locale.requests.customer_contact_detail.request_info
                          .resume
                      }
                    </span>{" "}
                    <span className="requestInfo-text">
                      <a
                        href={SafeValue(
                          modals.requestContact,
                          `data.fields.resume.0.${this.lang}`,
                          "string",
                          ""
                        )}
                      >
                        {
                          locale.requests.customer_contact_detail.request_info
                            .download
                        }
                      </a>
                    </span>
                  </div>
                )}
              </fieldset>
              <br />
              <fieldset>
                <legend>
                  {locale.requests.customer_contact_detail.contact_info.title}{" "}
                </legend>
                <div>
                  <span className="requestInfo-title">
                    {
                      locale.requests.customer_contact_detail.request_info
                        .requester_name
                    }
                  </span>{" "}
                  <span className="requestInfo-text">
                    {SafeValue(
                      modals.requestContact,
                      "data.fields.fullname",
                      "string",
                      " - "
                    )}
                  </span>
                </div>
                <div>
                  <span className="requestInfo-title">
                    {locale.requests.customer_contact_detail.contact_info.tel}
                  </span>{" "}
                  <span
                    className="requestInfo-text"
                    style={{ direction: "ltr" }}
                  >
                    {PersianNumber(
                      SafeValue(
                        modals.requestContact,
                        "data.fields.phonenumber",
                        "string",
                        " - ",
                        " "
                      ),
                      this.lang
                    )}
                  </span>
                </div>

                <div>
                  <span className="requestInfo-title">
                    {locale.requests.customer_contact_detail.contact_info.email}
                  </span>{" "}
                  <span className="requestInfo-text">
                    {SafeValue(
                      modals.requestContact,
                      "data.fields.email",
                      "string",
                      " - ",
                      " "
                    )}
                  </span>
                </div>
              </fieldset>
            </ModalBody>
            <ModalFooter
              style={{
                justifyContent: "space-between",
                flexDirection: "row-reverse"
              }}
            >
              <Button
                color="danger"
                onClick={() =>
                  this.toggleModals("warning", {
                    requestId: SafeValue(
                      modals.requestContact,
                      "data._id",
                      "string",
                      null
                    ),
                    goingToUpdateRequestsListType: this.state.requestsOrOffers
                      .activeFilter,
                    callback: () => {
                      this.toggleModals("warning", {}, () =>
                        this.toggleModals("requestContact", {})
                      );
                    }
                  })
                }
                push="right"
              >
                {locale.requests.reject_request_button}
              </Button>{" "}
              <Button
                color="success"
                onClick={() => this.issueOffer(modals.requestContact._id)}
                push="left"
                style={{ fontWeight: "bold" }}
              >
                {locale.requests.issue_offer}
              </Button>
            </ModalFooter>
          </Modal>
        </React.Fragment>
      </section>
    );
  }
}
