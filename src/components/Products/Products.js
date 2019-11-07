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
import { FilterContents } from "../ApiHandlers/ApiHandler";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import Validator from "../Validator/Validator";
import ContextApi from "../../components/ContextApi/ContextApi";

//icons
import privateOffice from "../../assets/images/products-icons/004-meet.png";
import cowork from "../../assets/images/products-icons/005-coworking.png";
import conferenceRoom from "../../assets/images/products-icons/002-desk.png";
//backgrounds
import defaultBgImg from "../../assets/images/products-bgImg/default.jpg";
import privateDeskBgImg from "../../assets/images/products-bgImg/coworking.jpg";
import sessionRoomBgImg from "../../assets/images/products-bgImg/conferenceRoom.jpg";
import sharedDeskBgImg from "../../assets/images/products-bgImg/invest.jpg";
import dedicatedOffice from "../../assets/images/products-bgImg/privateOffice.jpg";
//styles
import "./Products.scss";
class Products extends Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.toggle = this.toggle.bind(this);
    this.state = {
      form: {
        isValid: false,
        fields: {
          selectedCity: { value: "", isValid: true },
          neededSeats: { value: "", isValid: true }
        }
      },
      activeTab: "1",
      bgImg: {
        "1": defaultBgImg,
        "2": sharedDeskBgImg,
        "3": privateDeskBgImg,
        "4": dedicatedOffice,
        "5": sessionRoomBgImg
      },
      combo: {
        city: []
      }
    };
    this.validationRules = {
      selectedCity: ["required"]
    };
  }
  checkFormValidation = () => {
    const inputs = this.state.form.fields;
    const _fields = {};
    let _formIsValid = true;
    let _validation = {};
    for (let index in inputs) {
      _validation = Validator(
        inputs[index].value,
        this.validationRules[index],
        this.lang
      );
      if (!_validation.valid) {
        //if form is valid value could change to false else value is unchangable
        _formIsValid = _formIsValid && false;
        _fields[index] = {
          value: inputs[index].value,
          isValid: _validation.valid
        };
        break;
      }
    }
    this.setState({
      form: {
        ...this.state.form,
        isValid: _formIsValid,
        fields: {
          ...this.state.form.fields,
          ..._fields
        }
      }
    });
    return _formIsValid;
  };
  formStateHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    const validation = Validator(value, this.validationRules[name], this.lang);
    if (validation.valid) {
      e.target.classList.remove("has-error");
    } else {
      e.target.classList.add("has-error");
    }
    this.setState({
      form: {
        ...this.state.form,
        fields: {
          ...this.state.form.fields,
          [name]: { value: value, isValid: validation.valid }
        }
      }
    });
  };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        form: {
          isValid: false,
          fields: {
            ...this.state.form.fields,
            neededSeats: {
              value: "",
              isValid: true
            },
            selectedCity: {
              value: "",
              isValid: true
            }
          }
        }
      });
    }
  };
  fillCombo = optionsArray => {
    let toBeReturn = [];
    if (typeof optionsArray === "object") {
      for (let id in optionsArray) {
        toBeReturn.push(
          <option value={id} key={id}>
            {optionsArray[id]}
          </option>
        );
      }
    }
    return toBeReturn;
  };
  getCitiesList = () => {
    const obj = {};
    FilterContents("list_of_cities", res => {
      if (res.success_result.code === 200) {
        res.data.map(val => (obj[val._id] = val.fields.name.fa));
        this.setState({
          combo: {
            city: obj
          }
        });
      }
    });
  };
  componentDidMount() {
    this.getCitiesList();
  }
  render() {
    const { locale } = this.translate;
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
                            <h2>
                              <strong>
                                تامین فضای کاری استارت آپ ها و فریلنسر ها
                              </strong>
                            </h2>
                            <br />
                            <h4>
                              درخواست بدهید ، پیشنهاد بگیرید و انتخاب کنید
                            </h4>
                            <span className="choose-a-product">
                              <strong>یک محصول را انتخاب کنید</strong>
                            </span>
                          </section>
                        </Col>
                      </Row>
                    </TabPane>
                    {/* shared desk */}
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <div className="product-inline-form-wrapper">
                            <h5>
                              با انتخاب شهر و تعداد نفرات درخواست خود را شروع
                              کنید
                            </h5>
                            <div className="product-request-form-box">
                              <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">
                                  <Button
                                    disabled={this.state.form.isValid}
                                    onClick={() =>
                                      this.checkFormValidation() &&
                                      this.props.history.push({
                                        pathname: `/apply/shareddesk`,
                                        search: `?city=${this.state.form.fields.selectedCity.value}&seats=${this.state.form.fields.neededSeats.value}`
                                      })
                                    }
                                  >
                                    شروع درخواست
                                  </Button>
                                </InputGroupAddon>
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder="تعداد نفرات"
                                  name="neededSeats"
                                  onChange={this.formStateHandler}
                                  defaultValue={
                                    this.state.form.fields.neededSeats.value
                                  }
                                />
                                {/* Combo box */}
                                <Input
                                  name="selectedCity"
                                  type="select"
                                  onChange={this.formStateHandler}
                                  defaultValue={
                                    this.state.form.fields.selectedCity.value
                                  }
                                  className={
                                    !this.state.form.fields.selectedCity.isValid
                                      ? "has-error"
                                      : ""
                                  }
                                >
                                  <option value="">شهر</option>
                                  {this.fillCombo(this.state.combo.city)}
                                </Input>
                              </InputGroup>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    {/* private desk */}
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <div className="product-inline-form-wrapper">
                            <h5>
                              با انتخاب شهر و تعداد نفرات درخواست خود را شروع
                              کنید
                            </h5>
                            <div className="product-request-form-box">
                              <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">
                                  <Button
                                    disabled={this.state.form.isValid}
                                    onClick={() =>
                                      this.checkFormValidation() &&
                                      this.props.history.push({
                                        pathname: `/apply/privatedesk`,
                                        search: `?city=${this.state.form.fields.selectedCity.value}&seats=${this.state.form.fields.neededSeats.value}`
                                      })
                                    }
                                  >
                                    شروع درخواست
                                  </Button>
                                </InputGroupAddon>
                                <Input
                                  type="number"
                                  name="neededSeats"
                                  min="1"
                                  placeholder="تعداد نفرات"
                                  onChange={this.formStateHandler}
                                  defaultValue={
                                    this.state.form.fields.neededSeats.value
                                  }
                                />
                                {/* Combo box */}
                                <Input
                                  name="selectedCity"
                                  type="select"
                                  onChange={this.formStateHandler}
                                  defaultValue={
                                    this.state.form.fields.selectedCity.value
                                  }
                                  className={
                                    !this.state.form.fields.selectedCity.isValid
                                      ? "has-error"
                                      : ""
                                  }
                                >
                                  <option value="">شهر</option>
                                  {this.fillCombo(this.state.combo.city)}
                                </Input>
                              </InputGroup>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    {/* dedicated Office */}
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12" className="product-inline-form-wrapper">
                          <h5>
                            با انتخاب شهر و تعداد اعضای تیمتان درخواست خود را
                            شروع کنید
                          </h5>
                          <div className="product-request-form-box">
                            <InputGroup size="lg">
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  disabled={this.state.form.isValid}
                                  onClick={() =>
                                    this.checkFormValidation() &&
                                    this.props.history.push({
                                      pathname: `/apply/dedicatedoffice`,
                                      search: `?city=${this.state.form.fields.selectedCity.value}&seats=${this.state.form.fields.neededSeats.value}`
                                    })
                                  }
                                >
                                  شروع درخواست
                                </Button>
                              </InputGroupAddon>
                              <Input
                                type="number"
                                name="neededSeats"
                                min="1"
                                placeholder="تعداد اعضای تیم"
                                onChange={this.formStateHandler}
                                defaultValue={
                                  this.state.form.fields.neededSeats.value
                                }
                              />
                              {/* Combo box */}
                              <Input
                                type="select"
                                name="selectedCity"
                                onChange={this.formStateHandler}
                                defaultValue={
                                  this.state.form.fields.selectedCity.value
                                }
                                className={
                                  !this.state.form.fields.selectedCity.isValid
                                    ? "has-error"
                                    : ""
                                }
                              >
                                <option value="">شهر</option>
                                {this.fillCombo(this.state.combo.city)}
                              </Input>
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    {/* session room */}
                    <TabPane tabId="5">
                      <Row>
                        <Col sm="12" className="product-inline-form-wrapper">
                          <h5>
                            با انتخاب شهر و ظرفیت مد نظرتان درخواست خود را شروع
                            کنید
                          </h5>
                          <div className="product-request-form-box">
                            <InputGroup size="lg">
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  disabled={this.state.form.isValid}
                                  onClick={() =>
                                    this.checkFormValidation() &&
                                    this.props.history.push({
                                      pathname: `/apply/sessionroom`,
                                      search: `?city=${this.state.form.fields.selectedCity.value}&seats=${this.state.form.fields.neededSeats.value}`
                                    })
                                  }
                                >
                                  شروع درخواست
                                </Button>
                              </InputGroupAddon>
                              <Input
                                type="number"
                                name="neededSeats"
                                min="1"
                                placeholder="ظرفیت"
                                onChange={this.formStateHandler}
                                defaultValue={
                                  this.state.form.fields.neededSeats.value
                                }
                              />
                              <Input
                                type="select"
                                name="selectedCity"
                                onChange={this.formStateHandler}
                                defaultValue={
                                  this.state.form.fields.selectedCity.value
                                }
                                className={
                                  !this.state.form.fields.selectedCity.isValid
                                    ? "has-error"
                                    : ""
                                }
                              >
                                <option value="">شهر</option>
                                {this.fillCombo(this.state.combo.city)}
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
