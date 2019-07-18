//core
import React, { Component } from "react";
import { Row, Col, TabContent, TabPane } from "reactstrap";
import Navigation from "./Nav";
import "../assets/styles/Head.scss";
import classnames from "classnames";
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
class Head extends Component {
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
    console.log(this.state.bgImg["2"]);
  }
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Row>
          <Col lg="12">
            <div
              className="head-container"
              style={{
                backgroundImage: `url(${
                  this.state.bgImg[this.state.activeTab]
                })`
              }}
            >
              <div className="header-content">
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <h2>
                          <strong>موفقیت را فرا بخوان</strong>
                        </h2>
                        <h5>
                          استارتاپ اسپیس پلتفرم جامع نیازمندیهای استارتاپی کشور
                        </h5>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="6">
                        <h4>Tab 2 Contents</h4>
                      </Col>
                      <Col sm="6">
                        <h4>Tab 2 Contents</h4>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="6">
                        <h4>Tab 3 Contents</h4>
                      </Col>
                      <Col sm="6">
                        <h4>Tab 3 Contents</h4>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col sm="6">
                        <h4>Tab 4 Contents</h4>
                      </Col>
                      <Col sm="6">
                        <h4>Tab 4 Contents</h4>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="5">
                    <Row>
                      <Col sm="6">
                        <h4>Tab 5 Contents</h4>
                      </Col>
                      <Col sm="6">
                        <h4>Tab 5 Contents</h4>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="6">
                    <Row>
                      <Col sm="6">
                        <h4>Tab 6 Contents</h4>
                      </Col>
                      <Col sm="6">
                        <h4>Tab 6 Contents</h4>
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

export default Head;
