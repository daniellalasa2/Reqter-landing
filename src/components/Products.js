//core
import React, { Component } from "react";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import "../assets/styles/Products.scss";
import classnames from "classnames";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
//icons
import startup from "../assets/images/products-icons/003-rocket.png";
import privateOffice from "../assets/images/products-icons/004-meet.png";
import cowork from "../assets/images/products-icons/005-coworking.png";
import invest from "../assets/images/products-icons/001-money.png";
import conferenceRoom from "../assets/images/products-icons/002-desk.png";
//backgrounds
import defaultBgImg from "../assets/images/products-bgImg/default.jpg";
import privateDeskBgImg from "../assets/images/products-bgImg/coworking.jpg";
import sharedDeskBgImg from "../assets/images/products-bgImg/conferenceRoom.jpg";
import dedicatedOffice from "../assets/images/products-bgImg/invest.jpg";
import sessionRoomBgImg from "../assets/images/products-bgImg/privateOffice.jpg";

class Products extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      bgImg: {
        "1": defaultBgImg,
        "2": sharedDeskBgImg,
        "3": privateDeskBgImg,
        "4": dedicatedOffice,
        "5": sessionRoomBgImg
      },
      combo: {
        startup: [
          "فینتک",
          "حوزه سلامت",
          "گردشگری",
          "آموزش",
          "حمل و نقل",
          "صادرات و واردات",
          "کشاورزی",
          "مشاغل",
          "اینترنت اشیا",
          "اتوماسیون",
          "ورزشی"
        ],
        investing: [
          "Pre-Seed",
          "Seed",
          "Round A",
          "Round B",
          "Round C",
          "Round D"
        ],
        city: ["تهران"]
      },
      productForms: {
        startup: {
          city: null,
          major: null
        },
        investing: {
          city: null,
          amount: null
        },
        privateOffice: {
          city: null,
          seats: null
        },
        conferenceRoom: {
          seats: null,
          city: null
        },
        coworking: {
          city: null,
          seats: null
        }
      }
    };
  }
  formHandler(product, element) {
    const name = element.target.name;
    const value = element.target.value;
    this.setState({
      productForms: {
        ...this.state.productForms,
        [product]: {
          ...this.state.productForms[product],
          [name]: value
        }
      }
    });
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  fillCombo(name) {
    return this.state.combo[name].map((val, key) => (
      <option value={val} key={key}>
        {val}
      </option>
    ));
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg="12" className="products-col">
            <div
              className="head-container"
              style={{
                backgroundImage: `url(${
                  this.state.bgImg[this.state.activeTab]
                })`,
                backgroundColor: "#93D2FA"
              }}
            >
              <div className="header-content">
                <div className="picture-fader">
                  <TabContent activeTab={this.state.activeTab}>
                    {/* Default */}
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <section className="default-header-content">
                            <br />
                            <br />
                            <h2>
                              <strong>موفقیت را فرا بخوان</strong>
                            </h2>
                            <h5>
                              استارتاپ اسپیس پلتفرم جامع نیازمندیهای استارتاپی
                              کشور
                            </h5>
                            <span className="choose-a-product">
                              <strong>: یک محصول را انتخاب کنید </strong>
                            </span>
                          </section>
                        </Col>
                      </Row>
                    </TabPane>

                    {/* coworking */}
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <div className="product-request-form-box">
                            <InputGroup size="lg">
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  onClick={() =>
                                    this.props.history.push({
                                      pathname: `/apply/coworking`,
                                      params: { city: "tehran" },
                                      state: {
                                        pathname: `/apply/coworking`,
                                        city: "tehran",
                                        title: "میزکار اشتراکی"
                                      }
                                    })
                                  }
                                >
                                  شروع درخواست
                                </Button>
                              </InputGroupAddon>
                              <Input
                                type="number"
                                min="1"
                                placeholder="تعداد"
                              />
                              {/* Combo box */}
                              <Input type="select">
                                <option>شهر</option>
                                {this.fillCombo("city")}
                              </Input>
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>

                    {/* coworking */}
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <div className="product-request-form-box">
                            <InputGroup size="lg">
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  onClick={() =>
                                    this.props.history.push({
                                      pathname: `/apply/coworking`,
                                      params: { city: "tehran" },
                                      state: {
                                        pathname: `/apply/coworking`,
                                        city: "tehran",
                                        title: "میزکار اختصاصی"
                                      }
                                    })
                                  }
                                >
                                  شروع درخواست
                                </Button>
                              </InputGroupAddon>
                              <Input
                                type="number"
                                min="1"
                                placeholder="تعداد"
                              />
                              {/* Combo box */}
                              <Input type="select">
                                <option>شهر</option>
                                {this.fillCombo("city")}
                              </Input>
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>

                    {/* coworking */}
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <div className="product-request-form-box">
                            <InputGroup size="lg">
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  onClick={() =>
                                    this.props.history.push({
                                      pathname: `/apply/coworking`,
                                      params: { city: "tehran" },
                                      state: {
                                        city: "tehran",
                                        title: "دفترکار اختصاصی"
                                      }
                                    })
                                  }
                                >
                                  شروع درخواست
                                </Button>
                              </InputGroupAddon>
                              <Input
                                type="number"
                                min="1"
                                placeholder="تعداد"
                              />
                              {/* Combo box */}
                              <Input type="select">
                                <option>شهر</option>
                                {this.fillCombo("city")}
                              </Input>
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>

                    {/* Conference */}
                    <TabPane tabId="5">
                      <Row>
                        <Col sm="12">
                          <div className="product-request-form-box">
                            <InputGroup size="lg">
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  onClick={() =>
                                    this.props.history.push({
                                      pathname: `/apply/coworking`,
                                      state: {
                                        city: "tehran",
                                        title: "سالن جلسات"
                                      }
                                    })
                                  }
                                >
                                  شروع درخواست
                                </Button>
                              </InputGroupAddon>
                              <Input
                                type="number"
                                min="1"
                                placeholder="ظرفیت"
                              />
                              <Input type="select">
                                <option>شهر</option>
                                {this.fillCombo("city")}
                              </Input>
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
              <div className="products-box">
                <ul className="products">
                  <li
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <img src={cowork} alt="" className="product-icons" />

                    <strong>میزکار اشتراکی</strong>

                    <FontAwesomeIcon
                      icon={faChevronCircleLeft}
                      pull="left"
                      size="lg"
                      className="chevron-icon"
                      color="grey"
                    />
                  </li>
                  <li
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    <img src={cowork} alt="" className="product-icons" />

                    <strong>میزکار اختصاصی</strong>

                    <FontAwesomeIcon
                      icon={faChevronCircleLeft}
                      pull="left"
                      size="lg"
                      className="chevron-icon"
                      color="grey"
                    />
                  </li>
                  <li
                    className={classnames({
                      active: this.state.activeTab === "4"
                    })}
                    onClick={() => {
                      this.toggle("4");
                    }}
                  >
                    <img src={privateOffice} alt="" className="product-icons" />

                    <strong>دفتر کار اختصاصی</strong>
                    <FontAwesomeIcon
                      icon={faChevronCircleLeft}
                      pull="left"
                      size="lg"
                      className="chevron-icon"
                      color="grey"
                    />
                  </li>
                  <li
                    className={classnames({
                      active: this.state.activeTab === "5"
                    })}
                    onClick={() => {
                      this.toggle("5");
                    }}
                  >
                    <img
                      src={conferenceRoom}
                      alt=""
                      className="product-icons"
                    />

                    <strong>سالن جلسات</strong>
                    <FontAwesomeIcon
                      icon={faChevronCircleLeft}
                      pull="left"
                      size="lg"
                      className="chevron-icon"
                      color="grey"
                    />
                  </li>
                </ul>
              </div>
              {/* <Row className="brands">
                <Col lg="3" style={{ borderRight: "1px solid grey" }}>
                  LOGO FIRST
                </Col>
                <Col lg="9">LOGO SECOND GOES HERE</Col>
              </Row> */}
            </div>
          </Col>
          <Col lg="12">
            <div className="crooked-divider" />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Products;
