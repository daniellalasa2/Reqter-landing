import React from "react";
import {
  ProductSpecs,
  Title,
  SpecList,
  Spec,
  Btn
} from "../ProductSpecs/ProductSpecs";
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
import { FilterContents, SafeValue } from "../ApiHandlers/ApiHandler";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import Validator from "../Validator/Validator";
//Import images
import sessionRoom from "../../assets/images/session-room.jpg";
import dedicatedOffice from "../../assets/images/dedicated-office.jpg";
import sharedDesk from "../../assets/images/shared-desk.jpg";
import privateDesk from "../../assets/images/private-desk.jpg";
import service from "../../assets/images/service-icons/service.png";
import apply from "../../assets/images/service-icons/apply.png";
import offer from "../../assets/images/service-icons/offer.png";
import ContextApi from "../../components/ContextApi/ContextApi";
//icons
import sharedDeskIcon from "../../assets/images/products-icons/005-coworking.png";
import privateDeskIcon from "../../assets/images/products-icons/002-desk.png";
import officeIcon from "../../assets/images/products-icons/office.png";
import conferenceRoomIcon from "../../assets/images/products-icons/004-meet.png";
//backgrounds
import product_defaultBgImg from "../../assets/images/products-bgImg/default.jpg";
import product_privateDeskBgImg from "../../assets/images/products-bgImg/coworking.jpg";
import product_sessionRoomBgImg from "../../assets/images/products-bgImg/conferenceRoom.jpg";
import product_sharedDeskBgImg from "../../assets/images/products-bgImg/invest.jpg";
import product_dedicatedOffice from "../../assets/images/products-bgImg/privateOffice.jpg";
//styles
import "./Home.scss";
import "./Products.scss";
class Home extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.defaultLang = context.defaultLang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.toggle = this.toggle.bind(this);
    this.state = {
      form: {
        //This field is used to validate form inputs. True means the form data is value otherwise false
        isValid: false,
        fields: {
          selectedCity: { value: "", isValid: true },
          neededSeats: { value: "", isValid: true }
        }
      },
      activeTab: "2",
      bgImg: {
        "1": product_defaultBgImg,
        "2": product_sharedDeskBgImg,
        "3": product_privateDeskBgImg,
        "4": product_dedicatedOffice,
        "5": product_sessionRoomBgImg
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
      window.scrollTo(0, 0);
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
    const { lang } = this;
    FilterContents("list_of_cities", res => {
      if (res.success_result.code === 200) {
        res.data.map(
          val =>
            (obj[val._id] = SafeValue(
              val.fields,
              `name.${lang}`,
              "string",
              "",
              "name"
            ))
        );
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
    const { lang } = this;
    const { locale, direction } = this.translate;
    const { product, how_to_use, contact_us } = locale;
    return (
      <div className={classnames(direction === "ltr" && "_ltr")}>
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
                <div className={classnames("picture-fader", `_${direction}`)}>
                  <TabContent activeTab={this.state.activeTab}>
                    {/* Default */}
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <section className="default-header-content">
                            <h1>
                              <strong>{product.header.title}</strong>
                            </h1>
                            <br />
                            <h4>{product.header.slang}</h4>

                            <span className="choose-a-product">
                              <strong>{product.header.choose_a_product}</strong>
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
                            <h1
                              style={{
                                "font-size": "32px",
                                "margin-bottom": "20px"
                              }}
                            >
                              <strong style={{ padding: "10px" }}>
                                {product.header.title}
                              </strong>
                            </h1>
                            <h5> {product.header.slang}</h5>
                            <div
                              className="product-request-form-box"
                              style={{
                                textAlign: "right",
                                "padding-top": "15px"
                              }}
                            >
                              <span
                                className="choose-a-product"
                                style={{
                                  color: "black",
                                  textAlign: "right"
                                }}
                              >
                                <strong style={{ padding: "10px" }}>
                                  {product.header_forms.choose_city_and_seats}
                                </strong>
                              </span>
                              <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">
                                  <Button
                                    disabled={this.state.form.isValid}
                                    onClick={() =>
                                      this.checkFormValidation() &&
                                      this.props.history.push({
                                        pathname: `/${lang}/apply/shareddesk`,
                                        search: `?city=${this.state.form.fields.selectedCity.value}&seats=${this.state.form.fields.neededSeats.value}`
                                      })
                                    }
                                  >
                                    {product.header_forms.submit_button}
                                  </Button>
                                </InputGroupAddon>
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder={
                                    product.header_forms.seats_placeholder
                                  }
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
                                  <option value="">
                                    {product.header_forms.city_placeholder}
                                  </option>
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
                            <h1
                              style={{
                                "font-size": "32px",
                                "margin-bottom": "20px"
                              }}
                            >
                              <strong>{product.header.title}</strong>
                            </h1>
                            <h5>{product.header.slang}</h5>
                            <div
                              className="product-request-form-box"
                              style={{
                                textAlign: "right",
                                "padding-top": "15px"
                              }}
                            >
                              <span
                                className="choose-a-product"
                                style={{
                                  color: "black",
                                  textAlign: "right"
                                }}
                              >
                                <strong style={{ padding: "10px" }}>
                                  {product.header_forms.choose_city_and_seats}
                                </strong>
                              </span>
                              <InputGroup size="lg">
                                <InputGroupAddon addonType="prepend">
                                  <Button
                                    disabled={this.state.form.isValid}
                                    onClick={() =>
                                      this.checkFormValidation() &&
                                      this.props.history.push({
                                        pathname: `/${lang}/apply/privatedesk`,
                                        search: `?city=${this.state.form.fields.selectedCity.value}&seats=${this.state.form.fields.neededSeats.value}`
                                      })
                                    }
                                  >
                                    {product.header_forms.submit_button}
                                  </Button>
                                </InputGroupAddon>
                                <Input
                                  type="number"
                                  name="neededSeats"
                                  min="1"
                                  placeholder={
                                    product.header_forms.seats_placeholder
                                  }
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
                                  <option value="">
                                    {product.header_forms.city_placeholder}
                                  </option>
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
                          <h1
                            style={{
                              "font-size": "32px",
                              "margin-bottom": "20px"
                            }}
                          >
                            <strong>{product.header.title}</strong>
                          </h1>
                          <h5>{product.header.slang}</h5>
                          <div
                            className="product-request-form-box"
                            style={{
                              textAlign: "right",
                              "padding-top": "15px"
                            }}
                          >
                            <span
                              className="choose-a-product"
                              style={{
                                color: "black",
                                textAlign: "right"
                              }}
                            >
                              <strong style={{ padding: "10px" }}>
                                {product.header_forms.choose_city_and_seats}
                              </strong>
                            </span>
                            <InputGroup size="lg">
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  disabled={this.state.form.isValid}
                                  onClick={() =>
                                    this.checkFormValidation() &&
                                    this.props.history.push({
                                      pathname: `/${lang}/apply/dedicatedoffice`,
                                      search: `?city=${this.state.form.fields.selectedCity.value}&seats=${this.state.form.fields.neededSeats.value}`
                                    })
                                  }
                                >
                                  {product.header_forms.submit_button}
                                </Button>
                              </InputGroupAddon>
                              <Input
                                type="number"
                                name="neededSeats"
                                min="1"
                                placeholder={
                                  product.header_forms.seats_placeholder
                                }
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
                                <option value="">
                                  {product.header_forms.city_placeholder}
                                </option>
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
                          <h1
                            style={{
                              "font-size": "32px",
                              "margin-bottom": "20px"
                            }}
                          >
                            <strong>{product.header.title}</strong>
                          </h1>
                          <h5>{product.header.slang}</h5>
                          <div
                            className="product-request-form-box"
                            style={{
                              textAlign: "right",
                              "padding-top": "15px"
                            }}
                          >
                            <span
                              className="choose-a-product"
                              style={{
                                color: "black",
                                textAlign: "right"
                              }}
                            >
                              <strong style={{ padding: "10px" }}>
                                {product.header_forms.choose_city_and_seats}
                              </strong>
                            </span>
                            <InputGroup size="lg">
                              <InputGroupAddon addonType="prepend">
                                <Button
                                  disabled={this.state.form.isValid}
                                  onClick={() =>
                                    this.checkFormValidation() &&
                                    this.props.history.push({
                                      pathname: `/${lang}/apply/sessionroom`,
                                      search: `?city=${this.state.form.fields.selectedCity.value}&seats=${this.state.form.fields.neededSeats.value}`
                                    })
                                  }
                                >
                                  {product.header_forms.submit_button}
                                </Button>
                              </InputGroupAddon>
                              <Input
                                type="number"
                                name="neededSeats"
                                min="1"
                                placeholder={
                                  product.header_forms.team_placeholder
                                }
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
                                <option value="">
                                  {product.header_forms.city_placeholder}
                                </option>
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
                    <img
                      src={sharedDeskIcon}
                      alt=""
                      className="product-icons"
                    />

                    <strong>{product.items.shared_desk}</strong>

                    <FontAwesomeIcon
                      icon={
                        direction === "rtl"
                          ? faChevronCircleLeft
                          : faChevronCircleRight
                      }
                      pull={direction === "rtl" ? "left" : "right"}
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
                    <img
                      src={privateDeskIcon}
                      alt=""
                      className="product-icons"
                    />

                    <strong>{product.items.private_desk}</strong>

                    <FontAwesomeIcon
                      icon={
                        direction === "rtl"
                          ? faChevronCircleLeft
                          : faChevronCircleRight
                      }
                      pull={direction === "rtl" ? "left" : "right"}
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
                    <img src={officeIcon} alt="" className="product-icons" />

                    <strong>{product.items.dedicated_office}</strong>
                    <FontAwesomeIcon
                      icon={
                        direction === "rtl"
                          ? faChevronCircleLeft
                          : faChevronCircleRight
                      }
                      pull={direction === "rtl" ? "left" : "right"}
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
                      src={conferenceRoomIcon}
                      alt=""
                      className="product-icons"
                    />

                    <strong>{product.items.session_room}</strong>
                    <FontAwesomeIcon
                      icon={
                        direction === "rtl"
                          ? faChevronCircleLeft
                          : faChevronCircleRight
                      }
                      pull={direction === "rtl" ? "left" : "right"}
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
          <Col lg="12">{/* <div className="crooked-divider" /> */}</Col>
        </Row>
        <section>
          <Row>
            <Col lg="12">
              <section className="facilities-description">
                <div className="header">{how_to_use._title}</div>
                {/* <p>
                  Credible is an online marketplace that provides borrowers with
                  competitive, personalized loan offers from multiple, vetted
                  lenders in real time.
                </p> */}
                <ul>
                  <li>
                    <div className="image-circle">
                      <img src={service} alt={how_to_use.get_service._title} />
                    </div>
                    <span>{how_to_use.get_service._title}</span>
                    <p>{how_to_use.get_service.description}</p>
                  </li>
                  <li>
                    <div className="image-circle">
                      <img src={offer} alt={how_to_use.match_making._title} />
                    </div>
                    <span>{how_to_use.match_making._title}</span>
                    <p>{how_to_use.match_making.description}</p>
                  </li>
                  <li>
                    <div className="image-circle">
                      <img src={apply} alt={how_to_use.submit_form._title} />
                    </div>
                    <span>{how_to_use.submit_form._title}</span>
                    <p>{how_to_use.submit_form.description}</p>
                  </li>
                </ul>
              </section>
            </Col>
          </Row>

          <ProductSpecs img={sharedDesk} direction="ltr">
            <Title>{product.product_specs.shared_desk._title}</Title>
            <SpecList className="rtl">
              <Spec>{product.product_specs.shared_desk.description}</Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() =>
                this.props.history.push(`/${lang}/apply/shareddesk`)
              }
            >
              {product.product_specs.submit_button}
            </Btn>
          </ProductSpecs>
          <ProductSpecs img={privateDesk} direction="rtl">
            <Title>{product.product_specs.private_desk._title}</Title>
            <SpecList className="rtl">
              <Spec>{product.product_specs.private_desk.description}</Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() =>
                this.props.history.push(`/${lang}/apply/privatedesk`)
              }
            >
              {product.product_specs.submit_button}
            </Btn>
          </ProductSpecs>
          <ProductSpecs img={dedicatedOffice}>
            <Title>{product.product_specs.dedicated_office._title}</Title>
            <SpecList className="rtl">
              <Spec>{product.product_specs.dedicated_office.description}</Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() =>
                this.props.history.push(`/${lang}/apply/dedicatedoffice`)
              }
            >
              {product.product_specs.submit_button}
            </Btn>
          </ProductSpecs>

          <ProductSpecs img={sessionRoom} direction="rtl">
            <Title>{product.product_specs.session_room._title}</Title>
            <SpecList className="rtl">
              <Spec>{product.product_specs.session_room.description}</Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() =>
                this.props.history.push(`/${lang}/apply/sessionroom`)
              }
            >
              {product.product_specs.submit_button}
            </Btn>
          </ProductSpecs>
        </section>
        <section className="contact-info">
          <h1>{contact_us.slang}</h1>
          <p>{contact_us.description}</p>
          <div className="contact-button-box">
            <Button
              onClick={() => this.props.history.push(`/${lang}/contactus`)}
            >
              {contact_us.contact_us_button}
            </Button>
            <Button onClick={() => this.props.history.push(`/${lang}/faq`)}>
              {contact_us.faq_button}
            </Button>
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
