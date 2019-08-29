import React, { Component } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Collapse,
  Row,
  Col
} from "reactstrap";

import { Link } from "react-router-dom";
import classnames from "classnames";
import { Button, CardFooter, Card, CardHeader, CardBody } from "reactstrap";
import {
  SubmitForm,
  Upload,
  FilterContents,
  SafeValue
} from "../ApiHandlers/ApiHandler";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheckCircle,
  faSyncAlt,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import "./MyRequests.scss";
import deskImg from "../../assets/images/products-icons/002-desk.png";
export default class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1
    };
  }
  tabChanger = tab => {
    this.setState({
      activeTab: tab
    });
  };
  render() {
    return (
      <section
        className="my-requests-section form-section rtl-layout"
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <React.Fragment>
          <div className="filter-section">
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
          </div>
          <Card className="form-card">
            {/* Approved requests */}
            {this.state.activeTab === 1 && (
              <section className="approved-requests-section">
                <CardHeader>
                  <span className="fa-layers fa-fw icon">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      pull="right"
                      size="lg"
                      color="white"
                    />
                  </span>
                  <span className="title">
                    <strong>درخواستهای دارای پیشنهاد</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  {/* <span className="no-content">
                    درخواستی برای نمایش وجود ندارد
                  </span> */}
                  <div className="request-card">
                    <div className="request-card-image">
                      <img src={deskImg} alt="Desk" />
                      <strong className="product-title">صندلی اشتراکی</strong>
                    </div>
                    <div className="request-card-details">
                      <ul>
                        <li className="product-title-wrapper">
                          <strong className="product-title">
                            صندلی اشتراکی
                          </strong>
                        </li>
                        <li>تعداد :‌ ۷</li>
                        <li>تاریخ :‌۱۳۹۸-۰۷-۰۳</li>
                        <li>شهر : تهران</li>
                        <li>
                          <span> رزومه :‌</span>
                          <a href="#">
                            <FontAwesomeIcon
                              icon={faDownload}
                              size="lg"
                              color="black"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="request-card-status">
                      <strong>۲ پیشنهاد</strong>
                      <button>مشاهده پیشنهاد ها</button>
                    </div>
                  </div>

                  <div className="request-card">
                    <div className="request-card-image">
                      <img src={deskImg} alt="Desk" />
                    </div>
                    <div className="request-card-details">
                      <ul>
                        <li>
                          <strong>صندلی اختصاصی</strong>
                        </li>
                        <li>تعداد :‌ ۷</li>
                        <li>تاریخ :‌۱۳۹۸-۰۷-۰۳</li>
                        <li>شهر : تهران</li>
                        <li>
                          <span> رزومه :‌</span>
                          <FontAwesomeIcon
                            icon={faDownload}
                            size="lg"
                            color="black"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="request-card-status">
                      <strong>۱ پیشنهاد</strong>
                      <button>مشاهده پیشنهاد ها</button>
                    </div>
                  </div>

                  <div className="request-card">
                    <div className="request-card-image">
                      <img src={deskImg} alt="Desk" />
                    </div>
                    <div className="request-card-details">
                      <ul>
                        <li>
                          <strong>اتاق کار اختصاصی</strong>
                        </li>
                        <li>تعداد :‌ ۷</li>
                        <li>تاریخ :‌۱۳۹۸-۰۷-۰۳</li>
                        <li>شهر : تهران</li>
                        <li>
                          <span> رزومه :‌</span>
                          <FontAwesomeIcon
                            icon={faDownload}
                            size="lg"
                            color="black"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="request-card-status">
                      <strong>۹ پیشنهاد</strong>
                      <button>مشاهده پیشنهاد ها</button>
                    </div>
                  </div>

                  <div className="request-card">
                    <div className="request-card-image">
                      <img src={deskImg} alt="Desk" />
                    </div>
                    <div className="request-card-details">
                      <ul>
                        <li>
                          <strong>صندلی اشتراکی</strong>
                        </li>
                        <li>تعداد :‌ ۷</li>
                        <li>تاریخ :‌۱۳۹۸-۰۷-۰۳</li>
                        <li>شهر : تهران</li>
                        <li>
                          <span> رزومه :‌</span>
                          <FontAwesomeIcon
                            icon={faDownload}
                            size="lg"
                            color="black"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="request-card-status">
                      <strong>۵ پیشنهاد</strong>
                      <button>مشاهده پیشنهاد ها</button>
                    </div>
                  </div>
                </CardBody>
              </section>
            )}
            {/* Pending Requests */}
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
                <CardBody>
                  <span className="no-content">
                    درخواستی برای نمایش وجود ندارد
                  </span>
                </CardBody>
              </section>
            )}
            {/* Closed Requests */}
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
                <CardBody>
                  <span className="no-content">
                    درخواستی برای نمایش وجود ندارد
                  </span>
                </CardBody>
              </section>
            )}
          </Card>
        </React.Fragment>
      </section>
    );
  }
}
