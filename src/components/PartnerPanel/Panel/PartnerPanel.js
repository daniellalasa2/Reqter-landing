import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Modal,
  ModalBody
} from "reactstrap";
import {
  SafeValue,
  GetPartnerpanelRequests,
  Configuration,
  GetPartnerInfo
} from "../../ApiHandlers/ApiHandler";
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
      requests: {
        activeFilter: "",
        dataContent: [],
        loading: false
      },
      partnerId: ""
    };
  }
  filterRequests = (type, e) => {
    if (this.requestsAPIType[type]) {
      type = this.requestsAPIType[type];
    } else {
      type = null;
    }
    //active button class
    const filterButtons = Array.from(
      document.getElementsByClassName("filter-button")
    );
    filterButtons.forEach(button => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
    this.setState({
      requests: {
        ...this.state.requests,
        activeFilter: type,
        loading: true
      }
    });
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
  openRequest = () => {};
  rejectRequest = () => {};
  displayRequestsTable = (requestType, requestsObj) => {
    const { locale } = this.translate;
    let generatedElements = [];
    const _tableWrapper = children => (
      <Table hover className="requests-table">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>محصول درخواستی</th>
            <th>شهر</th>
            <th>تعداد</th>
            <th>تاریخ</th>
            <th>عملیات</th>
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
              <tr ket={request._id}>
                <th scope="row">{idx}</th>
                <td>{request}</td>
                <td>تهران</td>
                <td>۶ صندلی</td>
                <td>12/5/98</td>
                <td>
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => this.openRequest()}
                  >
                    باز کردن
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => this.rejectRequest()}
                  >
                    رد کردن
                  </Button>
                </td>
              </tr>
            )
        );
        return _tableWrapper(generatedElements);
      case "openrequests":
        break;
      default:
        return (
          <span className="no-content">
            <strong>{locale.requests.no_items_found}</strong>
          </span>
        );
    }
  };
  componentDidMount() {
    GetPartnerInfo({ "fields.phonenumber": this.context.auth.ID }, res => {
      if (res.success_result.success) {
        const { _id } = res.data[0];
        this.setState({
          partnerId: _id
        });
      }
    });
  }

  render() {
    const { locale, direction } = this.translate;
    const { loading } = this.state.requests;
    const { requests } = this.state;
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
        </React.Fragment>
      </section>
    );
  }
}
