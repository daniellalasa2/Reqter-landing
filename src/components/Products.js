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
//icons
import startup from "../assets/images/products-icons/003-rocket.png";
import privateOffice from "../assets/images/products-icons/004-meet.png";
import cowork from "../assets/images/products-icons/005-coworking.png";
import invest from "../assets/images/products-icons/001-money.png";
import conferenceRoom from "../assets/images/products-icons/002-desk.png";
//backgrounds
import defaultBgImg from "../assets/images/products-bgImg/default.jpg";
import coworkingBgImg from "../assets/images/products-bgImg/coworking.jpg";
import conferenceRoomBgImg from "../assets/images/products-bgImg/conferenceRoom.jpg";
import investBgImg from "../assets/images/products-bgImg/invest.jpg";
import privateOfficeBgImg from "../assets/images/products-bgImg/privateOffice.jpg";
import startupBgImg from "../assets/images/products-bgImg/startup.jpg";

class Products extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      bgImg: {
        "1": defaultBgImg,
        "2": coworkingBgImg,
        "3": conferenceRoomBgImg,
        "4": investBgImg,
        "5": privateOfficeBgImg,
        "6": startupBgImg
      }
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="picture-fader" />
        <Row>
          <Col lg="12">
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
                <TabContent activeTab={this.state.activeTab}>
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
                          <div className="feautures">
                            <span />
                            <span />
                            <span />
                          </div>
                          <span className="choose-a-product">
                            <strong>: یک محصول را انتخاب کنید </strong>
                          </span>
                        </section>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <div className="product-request-form-box">
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <Button>شروع درخواست</Button>
                            </InputGroupAddon>
                            <Input type="number" min="1" placeholder="تعداد" />
                            <Input type="select">
                              <option>شهر</option>
                              <option>تهران</option>
                            </Input>
                          </InputGroup>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12">
                        <div className="product-request-form-box">
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <Button>شروع درخواست</Button>
                            </InputGroupAddon>
                            <Input type="number" min="1" placeholder="ظرفیت" />
                            <Input type="select">
                              <option>شهر</option>
                              <option>تهران</option>
                            </Input>
                          </InputGroup>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col sm="12">
                        <div className="product-request-form-box">
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <Button className="invest-fields">
                                شروع درخواست
                              </Button>
                            </InputGroupAddon>
                            <NumberFormat
                              thousandSeparator={true}
                              customInput={Input}
                              prefix="تومان "
                              style={{ textAlign: "right" }}
                              placeholder="چقدر سرمایه لازم داری؟"
                              className="invest-fields"
                            />
                            <Input type="select" className="invest-fields">
                              <option>مرحله</option>
                              <option>Pre-Seed</option>
                              <option>Seed</option>
                              <option>Round A</option>
                              <option>Round B</option>
                              <option>Round C</option>
                              <option>Round D</option>
                            </Input>
                          </InputGroup>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="5">
                    <Row>
                      <Col sm="12">
                        <div className="product-request-form-box">
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <Button>شروع درخواست</Button>
                            </InputGroupAddon>
                            <Input type="number" min="1" placeholder="ظرفیت" />
                            <Input type="select">
                              <option>شهر</option>
                              <option>تهران</option>
                            </Input>
                          </InputGroup>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="6">
                    <Row>
                      <Col sm="12">
                        <div className="product-request-form-box">
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <Button>شروع درخواست</Button>
                            </InputGroupAddon>
                            <Input type="select">
                              <option>زمینه فعالیت</option>
                              <option>فینتک</option>
                              <option>حوزه سلامت</option>
                              <option>گردشگری</option>
                              <option>آموزش</option>
                              <option>حمل و نقل</option>
                              <option>صادرات و واردات</option>
                              <option>کشاورزی</option>
                              <option>مشاغل</option>
                              <option>اینترنت اشیا</option>
                              <option>اتوماسیون</option>
                            </Input>
                            <Input type="select">
                              <option>شهر</option>
                              <option>تهران</option>
                            </Input>
                          </InputGroup>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
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

                    <br />
                    <br />
                    <strong>فضای کار اشتراکی</strong>
                  </li>
                  <li
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    <img
                      src={conferenceRoom}
                      alt=""
                      className="product-icons"
                    />

                    <br />
                    <br />
                    <strong>سالن جلسات</strong>
                  </li>
                  <li
                    className={classnames({
                      active: this.state.activeTab === "4"
                    })}
                    onClick={() => {
                      this.toggle("4");
                    }}
                  >
                    <img src={invest} alt="" className="product-icons" />

                    <br />
                    <br />
                    <strong>جذب سرمایه</strong>
                  </li>
                  <li
                    className={classnames({
                      active: this.state.activeTab === "5"
                    })}
                    onClick={() => {
                      this.toggle("5");
                    }}
                  >
                    <img src={privateOffice} alt="" className="product-icons" />

                    <br />
                    <br />
                    <strong>اتاق کار خصوصی</strong>
                  </li>
                  <li
                    className={classnames({
                      active: this.state.activeTab === "6"
                    })}
                    onClick={() => {
                      this.toggle("6");
                    }}
                  >
                    <img src={startup} alt="" className="product-icons" />

                    <br />
                    <br />
                    <strong>پذیرش استارتاپ</strong>
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
