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
  GetPartnerInfo,
  Config
} from "../../ApiHandlers/ApiHandler";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faList } from "@fortawesome/free-solid-svg-icons";
import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
import PageSuspense from "../../PageSuspense";
import FlatInput from "../../FlatForm/FlatForm";
import "./PartnerProfile.scss";
// import NoImageAlt from "../../../assets/images/alternatives/noimage.png";
//!!!!!!!!IMPORTANT: Partner state checking////////////////////////////
export default class PartnerPanel extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.filters = {
      details: "details",
      imagealbum: "imagealbum",
      map: "map",
      setting: "setting"
    };
    this.state = {
      didDataChanged: false,
      pageLoaded: false,
      filterContext: {
        activeFilter: "",
        dataContent: [],
        loading: false
      },
      form: {
        isValid: false,
        submitted: false,
        isSubmitting: false,
        fields: {
          name: {
            value: "",
            error: "",
            isValid: false
          },
          regno: {
            value: "",
            error: "",
            isValid: false
          },
          logo: {
            value: "",
            error: "",
            isValid: false
          },
          location: {
            code: "+98",
            value: "",
            error: "",
            isValid: false
          },
          address: {
            value: "",
            error: "",
            isValid: false
          },
          email: {
            value: "",
            error: "",
            isValid: false
          },
          overview: {
            value: "",
            error: "",
            isValid: false
          },
          images: {
            uploading: false,
            uploadProgress: 0,
            value: "",
            error: "",
            isValid: false
          },
          homepage: {
            value: "",
            error: "",
            isValid: false
          },
          instagram: {
            value: "",
            error: "",
            isValid: false
          },
          linkedin: {
            value: "",
            error: "",
            isValid: false
          },
          twitter: {
            value: "",
            error: "",
            isValid: false
          },
          workingfields: {
            value: "",
            error: "",
            isValid: false
          }
        },
        backgroundData: {}
      },
      combo: {
        coworking_working_field: {
          hasLoaded: false,
          items: []
        }
      }
    };
  }

  //-------------------------------------Filter request --------------------------------------//
  // Functionality:
  //    1- If user clicks on filter requests tab inside partner panel this function will be call

  filterTabs = (filter, e, callback) => {
    this.setState({
      filterContext: {
        ...this.state.filterContext,
        activeFilter: filter,
        loading: true
      }
    });
    if (this.filters[filter]) {
      filter = this.filters[filter];
    } else {
      filter = null;
    }
    if (typeof e === "object" && e.length === undefined) {
      const filterButtons = Array.from(
        document.getElementsByClassName("filter-button")
      );
      filterButtons.forEach(button => {
        button.classList.remove("active");
      });
      e.target.classList.add("active");
    }
  };
  updatePartnerInfo = callback => {
    GetPartnerInfo({ "fields.phonenumber": this.context.auth.ID }, res => {
      if (res.success_result.success) {
        const { _id } = res.data[0];
        this.setState(
          {
            partnerData: res.data[0],
            partnerId: _id,
            pageLoaded: true
          },
          () => typeof callback === "function" && callback()
        );
      }
    });
  };

  componentDidMount() {
    //Initial datas which are going to display in partner panel
    this.updatePartnerInfo();
  }
  render() {
    const { locale, direction } = this.translate;
    const { loading, activeFilter } = this.state.filterContext;
    const { modals, filterContext, pageLoaded } = this.state;
    if (pageLoaded) {
      return (
        <section
          className={classnames(
            "partner-profile-section form-section",
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
                    onClick={button => this.filterTabs("details", button)}
                  >
                    {locale.card_header.details}
                  </button>
                  <button
                    className="filter-button"
                    onClick={button => this.filterTabs("imagealbum", button)}
                  >
                    {locale.card_header.image_album}
                  </button>
                  <button
                    className="filter-button"
                    onClick={button => this.filterTabs("map", button)}
                  >
                    {locale.card_header.map}
                  </button>
                  <button
                    className="filter-button"
                    onClick={button => this.filterTabs("setting", button)}
                  >
                    {locale.card_header.setting}
                  </button>
                </nav>
              </CardHeader>
              <CardBody>Nothing</CardBody>
            </Card>
          </React.Fragment>
        </section>
      );
    } else {
      return <PageSuspense />;
    }
  }
}
