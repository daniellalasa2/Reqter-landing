import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import {
  SafeValue,
  GetPartnerpanelRequests,
  GetPartnerInfo,
  PartnerpanelRejectRequest,
  PartnerpanelOpenRequest,
  QueryContent,
  Config
} from "../../ApiHandlers/ApiHandler";
import PersianNumber from "../../PersianNumber/PersianNumber";
import DateFormat from "../../DateFormat/DateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
import "./PartnerPanel.scss";
//!!!!!!!!IMPORTANT: Partner state checking////////////////////////////
export default class PartnerPanel extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.requestsAPIType = {
      newrequests: "assigned",
      openrequests: "opened"
    };
    this.state = {
      contactModal: {},
      requests: {
        activeFilter: "",
        dataContent: [],
        loading: false
      },
      products: [],
      partnerId: "",
      modals: {
        warning: { openStatus: false, data: {} },
        requestContact: { openStatus: false, data: {} }
      }
    };
  }
  filterRequests = (type, e) => {
    this.setState({
      requests: {
        ...this.state.requests,
        activeFilter: type,
        loading: true
      }
    });
    if (this.requestsAPIType[type]) {
      type = this.requestsAPIType[type];
    } else {
      type = null;
    }
    //active button class
    if (typeof e === "object") {
      const filterButtons = Array.from(
        document.getElementsByClassName("filter-button")
      );
      filterButtons.forEach(button => {
        button.classList.remove("active");
      });
      e.target.classList.add("active");
    }
    GetPartnerpanelRequests(this.state.partnerId, type, res => {
      let APIDataContent = [];
      if (res.success_result.success) {
        APIDataContent = res.data;
      }
      this.setState({
        requests: {
          ...this.state.requests,
          dataContent: APIDataContent,
          loading: false
        }
      });
    });
  };
  getAndUpdateProductsList = () => {
    QueryContent([Config.CONTENT_TYPE_ID.product_list], res => {
      if (res.success_result.success) {
        this.setState({
          products: res.data
        });
      }
    });
  };
  openRequest = (requestid, request) => {
    PartnerpanelOpenRequest(requestid, res => {
      if (res.success_result.success) {
        this.toggleModals("requestContact", request, () => {
          this.filterRequests("newrequests", undefined);
        });
      }
    });
  };
  rejectRequest = requestid => {
    PartnerpanelRejectRequest(requestid, res => {
      if (res.success_result.success) {
        this.filterRequests(() => {
          this.setState({
            modals: {
              ...this.state.modals,
              warning: {
                openStatus: false,
                data: {}
              }
            }
          });
        });
      }
    });
  };
  toggleModals = (modalType, dataObj, callback) => {
    const auhorizedModals = ["warning", "requestContact"];
    if (auhorizedModals.indexOf(modalType) > -1) {
      this.setState(
        {
          modals: {
            ...this.state.modals,
            [modalType]: {
              openStatus: !this.state.modals.requestContact.openStatus,
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
  displayRequestsTable = (requestType, requestsObj) => {
    const { locale } = this.translate;
    let generatedElements = [];
    requestType = requestsObj.length > 0 ? requestType : null;
    const _tableWrapper = children => (
      <Table hover className="requests-table">
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
    switch (requestType) {
      case "newrequests":
        generatedElements = requestsObj.map(
          (request, idx) =>
            request.status === "published" && (
              <tr key={idx}>
                <td>{PersianNumber(idx + 1, this.lang)}</td>
                <td>
                  {request.fields.requestid.fields.product &&
                    this.state.products.map(
                      (product, idx) =>
                        product._id ===
                          request.fields.requestid.fields.product && (
                          <span key={idx}>
                            <img
                              src={SafeValue(
                                product,
                                `fields.thumbnail.${this.lang}`,
                                "string",
                                null,
                                "fields.thumbnail.0"
                              )}
                              alt="Product"
                              width="70"
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
                    onClick={() => this.openRequest(request._id, request)}
                  >
                    {locale.requests.open_request_button}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() =>
                      this.toggleModals("warning", { requestId: request._id })
                    }
                  >
                    {locale.requests.reject_request_button}
                  </Button>
                </td>
              </tr>
            )
        );
        return _tableWrapper(generatedElements);
      case "openrequests":
        generatedElements = requestsObj.map(
          (request, idx) =>
            request.status === "published" && (
              <tr key={idx}>
                <td>{PersianNumber(idx + 1, this.lang)}</td>
                <td>
                  {request.fields.requestid.fields.product &&
                    this.state.products.map(
                      (product, idx) =>
                        product._id ===
                          request.fields.requestid.fields.product && (
                          <span key={idx}>
                            <img
                              src={SafeValue(
                                product,
                                `fields.thumbnail.${this.lang}`,
                                "string",
                                null,
                                "fields.thumbnail.0"
                              )}
                              alt="Product"
                              width="70"
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
                    color="danger"
                    onClick={() =>
                      this.toggleModals("warning", { requestId: request._id })
                    }
                  >
                    {locale.requests.reject_request_button}
                  </Button>
                </td>
              </tr>
            )
        );
        return _tableWrapper(generatedElements);
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
            partnerId: _id
          },
          () => typeof callback === "function" && callback()
        );
      }
    });
  };
  componentDidMount() {
    this.getAndUpdateProductsList();
    this.updatePartnerInfo();
  }

  render() {
    const { locale, direction } = this.translate;
    const { loading } = this.state.requests;
    const { modals, requests } = this.state;

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
                  onClick={button => this.filterRequests("newrequests", button)}
                >
                  {locale.card_header.new_requests}
                </button>
                <button
                  className="filter-button"
                  onClick={button =>
                    this.filterRequests("openrequests", button)
                  }
                >
                  {locale.card_header.open_requests}
                </button>
                <button
                  className="filter-button"
                  onClick={button => this.filterRequests("offers", button)}
                >
                  {locale.card_header.offers}
                </button>
                <button
                  className="filter-button"
                  onClick={button => this.filterRequests("accepted", button)}
                >
                  {locale.card_header.accepted}
                </button>
                <button
                  className="filter-button"
                  onClick={button => this.filterRequests("rejected", button)}
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
                  requests.activeFilter,
                  requests.dataContent
                )
              )}
            </CardBody>
          </Card>
          {/************************* Alert modal ***********************/}
          <Modal
            isOpen={this.state.modals.warning.openStatus}
            toggle={() => this.toggleModals("warning", {})}
            className="login-modal"
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
                <br />
                <br />
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
                  this.rejectRequest(this.state.modals.warning.data.requestId)
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
              {locale.requests.customer_contact_detail.title}
            </ModalHeader>
            <ModalBody>
              <fieldset>
                <legend>
                  {locale.requests.customer_contact_detail.request_info.title}
                </legend>
                {console.log(modals.requestContact.data)}
                نام درخواست کننده: <span className="requestInfo-text">{}</span>
                <br />
                ایمیل: <span className="requestInfo-text">{}</span>
                <br />
                تاریخ تولد: <span className="requestInfo-text">{}</span>
              </fieldset>
              <br />
              <fieldset>
                <legend>
                  {locale.requests.customer_contact_detail.contact_info.title}{" "}
                </legend>
                {locale.requests.customer_contact_detail.contact_info.tel}:{" "}
                <span className="requestInfo-text">{}</span>
                <br />
                {
                  locale.requests.customer_contact_detail.contact_info.email
                }: <span className="requestInfo-text"></span>
              </fieldset>
            </ModalBody>
          </Modal>
        </React.Fragment>
      </section>
    );
  }
}
