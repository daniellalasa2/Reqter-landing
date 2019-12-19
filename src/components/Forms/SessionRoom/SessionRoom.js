//make an appropriate behavior for Flat date and time picker components it must behaves as a normal input
import React from "react";
import { Button, CardFooter, Card, CardHeader, CardBody } from "reactstrap";
import {
  Config,
  SubmitForm,
  FilterContents,
  SafeValue
} from "../../ApiHandlers/ApiHandler";
import Skeleton from "react-loading-skeleton";
import SuccessSubmit from "../SubmitStatus/SuccessSubmit/SuccessSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  FlatInput,
  FlatInlineSelect,
  FlatTextArea
} from "../../FlatForm/FlatForm";
import moment from "jalali-moment";
import LoadingSpinner from "../../../assets/images/spinner.svg";
import NumberFormat from "react-number-format";
import Validator from "../../Validator/Validator";
import ContextApi from "../../ContextApi/ContextApi";
import "../Coworking.scss";
import classnames from "classnames";
class SessionRoom extends React.PureComponent {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.defaultLang = context.defaultLang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.urlParams = this.urlParser(this.props.location.search);
    this.contentTypeName = "session_room";
    this.state = {
      form: {
        isValid: false,
        submitted: false,
        isSubmitting: false,
        fields: {
          fullname: {
            value: "",
            error: "",
            isValid: false
          },
          subject: {
            value: "",
            error: "",
            isValid: false
          },
          phonenumber: {
            code: "+98",
            value: "",
            error: "",
            isValid: false
          },
          city: {
            value: "",
            error: "",
            isValid: false
          },
          seats: {
            value: "",
            error: "",
            isValid: false
          },
          email: {
            value: "",
            error: "",
            isValid: false
          },
          startdate: {
            value: "",
            error: "",
            isValid: false
          },
          enddate: {
            value: "",
            error: "",
            isValid: false
          },
          equipments: {
            value: "",
            error: "",
            isValid: false
          },
          country: {
            value: "5d35e8288e6e9a0017c28fcf",
            error: "",
            isValid: true
          },
          description: {
            value: "",
            error: "",
            isValid: true
          }
        },
        backgroundData: {
          src: window.src,
          product: Config.PRODUCT_TYPE_ID.session_room,
          stage: "5d6b5da15b60dc0017c95119",
          product_id: this.urlParams.product_id
        }
      },
      combo: {
        list_of_cities: {
          hasLoaded: false,
          items: []
        },
        sessionroom_equipments: {
          hasLoaded: false,
          items: []
        }
      }
    };
    this.validationRules = {
      fullname: ["required"],
      subject: ["required"],
      phonenumber: ["required", "phonenumber"],
      city: ["required"],
      seats: ["required", "number"],
      email: ["required", "email"],
      startdate: ["date"],
      enddate: ["date"]
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
        SafeValue(this.validationRules, index, "object", []),
        this.lang,
        index === "resume" && {
          uploading: this.state.form.fields.resume.uploading
        }
      );

      if (!_validation.valid) {
        //if form is valid value could change to false else value is unchangable
        _formIsValid = _formIsValid && false;
        _fields[index] = {
          ...inputs[index],
          value: inputs[index].value,
          error: _validation.message,
          isValid: false
        };
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
  checkboxStateHandler = (name, data) => {
    let checkBoxValuesArr = [];
    if (data.length) {
      data.forEach(obj => {
        checkBoxValuesArr.push(SafeValue(obj, "value", "string", ""));
      });
    } else {
      checkBoxValuesArr = SafeValue(data, "value", "string", []);
    }
    const validation = Validator(
      checkBoxValuesArr,
      this.validationRules[name],
      this.lang
    );
    let toBeAssignObject = {
      value: checkBoxValuesArr,
      error: validation.message,
      isValid: validation.valid
    };
    this.setState({
      form: {
        ...this.state.form,
        fields: {
          ...this.state.form.fields,
          [name]: {
            ...this.state.form.fields[name],
            ...toBeAssignObject
          }
        }
      }
    });
  };
  formStateHandler = e => {
    let _this = e.target ? e.target : e;
    const name = _this.name;
    let value = null;
    let validation = {};

    const { locale } = this.translate;
    if (name === "startdate") {
      const enddate = this.state.form.fields.enddate.value;
      try {
        value = moment
          .from(_this.value, "fa", "YYYY/MM/DD HH:mm")
          .format("MM/DD/YYYY HH:mm"); //convert shamsi date to georgian date
        value = new Date(value).getTime();
      } catch (err) {
        value = 0;
      }
      validation = Validator(value, this.validationRules[name], this.lang);
      validation = validation.valid
        ? {
            valid: enddate ? value < parseInt(enddate) : true,
            message: enddate
              ? value < enddate
                ? ""
                : locale.fields.startdate.error
              : ""
          }
        : validation;
    } else if (name === "enddate") {
      const startdate = this.state.form.fields.startdate.value;
      try {
        value = moment
          .from(_this.value, "fa", "YYYY/MM/DD HH:mm")
          .format("MM/DD/YYYY HH:mm"); //convert shamsi date to georgian date
        value = new Date(value).getTime();
      } catch (err) {
        value = 0;
      }
      validation = Validator(value, this.validationRules[name], this.lang);
      validation = validation.valid
        ? {
            valid: startdate ? value > parseInt(startdate) : true,
            message: startdate
              ? value > startdate
                ? ""
                : locale.fields.enddate.error
              : ""
          }
        : validation;
    } else {
      value = _this.value;
      validation = Validator(value, this.validationRules[name], this.lang);
    }
    this.setState({
      form: {
        ...this.state.form,
        fields: {
          ...this.state.form.fields,
          [name]: {
            ...this.state.form.fields[name],
            value: value,
            error: validation.message,
            isValid: validation.valid
          }
        }
      }
    });
  };
  validatePhoneNumber = (doLogin, callback) => {
    const { value, code } = this.state.form.fields.phonenumber;
    const phonenumber = code + value;
    const { locale } = this.translate;
    if (this.context.auth && this.context.auth.ID === phonenumber) {
      callback && typeof callback === "function" && callback();
      return true;
    } else {
      //if phone validation needs login action then start login flow
      doLogin &&
        this.context.toggleLoginModal(
          true,
          locale.fields.submit.verify_phonenumber,
          value
        );
      return false;
    }
  };
  submitForm = () => {
    const _this = this;
    const inputs = this.state.form.fields;
    let _isValid = this.checkFormValidation();
    const _backgroundData = this.state.form.backgroundData;
    let _formObjectGoingToSubmit = {};
    const { locale } = this.translate;
    //if form was valid then convert state form to api form
    // if the form was valid then submit it
    if (_isValid) {
      for (let index in inputs) {
        _formObjectGoingToSubmit[index] = inputs[index].value;
      }
      this.validatePhoneNumber(true, () => {
        // fetch additional background data state to final api object if form was valid
        const { seats, city, phonenumber } = _formObjectGoingToSubmit;
        _formObjectGoingToSubmit["phonenumber"] =
          this.state.form.fields.phonenumber.code + phonenumber;
        let cityname = locale.email_subject[2];
        this.state.combo.list_of_cities.items.forEach(curr => {
          if (curr.value === city) {
            cityname = curr.title;
          }
        });

        _formObjectGoingToSubmit[
          "name"
        ] = `${locale.email_subject[0]} ${seats} ${locale.email_subject[1]} ${cityname}`;
        _formObjectGoingToSubmit = {
          ..._formObjectGoingToSubmit,
          ..._backgroundData
        };
        this.setState(
          {
            form: {
              ...this.state.form,
              isSubmitting: true
            }
          },
          () => {
            SubmitForm(_this.contentTypeName, _formObjectGoingToSubmit, res => {
              if (res.success) {
                this.setState({
                  form: {
                    ...this.state.form,
                    submitted: true
                  }
                });
              } else {
                this.setState({
                  form: {
                    ...this.state.form,
                    isSubmitting: false
                  }
                });
              }
            });
          }
        );
      });
    }
  };
  urlParser = url => {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  };

  generateCheckboxDataFromApi = (name, defaultChecked) => {
    const { lang } = this;
    FilterContents(name, res => {
      const arr = [];
      SafeValue(res, "data", "object", []).map((val, key) => {
        arr.push({
          title: val.fields.name[lang]
            ? SafeValue(val.fields.name, lang, "string", "")
            : SafeValue(val.fields, "name", "string", ""),
          key: SafeValue(val, "_id", "string", ""),
          boxValue: key + 1,
          dir: "inherit",
          value: SafeValue(val, "_id", "string", ""),
          defaultChecked:
            defaultChecked &&
            defaultChecked === SafeValue(val, "_id", "string", "")
        });
        return null;
      });
      this.setState({
        combo: {
          ...this.state.combo,
          [name]: {
            hasLoaded: true,
            items: arr
          }
        }
      });
    });
  };
  componentDidMount() {
    const selectedCity = SafeValue(this.urlParams, "city", "string", ""),
      neededSeats = SafeValue(this.urlParams, "seats", "string", "1");
    this.setState({
      form: {
        ...this.state.form,
        fields: {
          ...this.state.form.fields,
          seats: {
            ...this.state.form.fields.seats,
            value: neededSeats,
            isValid: !isNaN(Number(neededSeats))
          },
          city: {
            ...this.state.form.fields.city,
            value: selectedCity,
            isValid: selectedCity && true
          }
        }
      }
    });
    this.generateCheckboxDataFromApi("sessionroom_equipments");
    this.generateCheckboxDataFromApi("list_of_cities", selectedCity);
  }

  render() {
    const { locale, direction } = this.translate;
    return (
      <section
        className={classnames(
          "form-section",
          direction === "rtl" && "rtl-layout"
        )}
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {this.state.form.submitted ? (
          <Card className="form-card">
            <SuccessSubmit lang={this.lang} />
          </Card>
        ) : (
          <React.Fragment>
            <Card className="form-card">
              <section id="form1" className="wizardForm show">
                <CardHeader>
                  <span className="fa-layers fa-fw icon">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      pull="right"
                      size="lg"
                      color="white"
                    />
                  </span>
                  <span className="title">
                    <strong>{locale.form_title}</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  <FlatInput
                    label={locale.fields.fullname._title}
                    type="text"
                    placeholder={locale.fields.fullname.placeholder}
                    name="fullname"
                    id="fullname"
                    autoFocus
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.fullname.error}
                  />
                  <FlatInput
                    label={locale.fields.subject._title}
                    type="text"
                    placeholder={locale.fields.subject.placeholder}
                    name="subject"
                    id="subject"
                    autoFocus
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.subject.error}
                  />
                  <div className="field-row">
                    <span className="field-title">
                      {locale.fields.startdate._title}
                    </span>
                    <br />
                    <br />
                    <div className="FlatTimePicker">
                      <NumberFormat
                        mask="_"
                        format="####/##/##   ## : ##"
                        type="text"
                        name="startdate"
                        placeholder={locale.fields.startdate.placeholder}
                        onChange={this.formStateHandler}
                        style={{
                          direction: "ltr",
                          textAlign: direction === "rtl" ? "right" : "left"
                        }}
                      />
                      <span className="error-message">
                        {this.state.form.fields.startdate.error}
                      </span>
                    </div>
                  </div>
                  <div className="field-row">
                    <span className="field-title">
                      {locale.fields.enddate._title}
                    </span>
                    <br />
                    <br />
                    <div className="FlatTimePicker">
                      <NumberFormat
                        mask="_"
                        format="####/##/##   ## : ##"
                        type="text"
                        placeholder={locale.fields.enddate.placeholder}
                        onChange={this.formStateHandler}
                        style={{
                          direction: "ltr",
                          textAlign: direction === "rtl" ? "right" : "left"
                        }}
                        name="enddate"
                      />
                      <span className="error-message">
                        {this.state.form.fields.enddate.error}
                      </span>
                    </div>
                  </div>
                  <div className="field-row">
                    <span className="field-title">
                      {locale.fields.equipments._title}
                    </span>

                    {/* fill checkboxes */}
                    {this.state.combo.sessionroom_equipments.hasLoaded ? (
                      <FlatInlineSelect
                        type="checkbox"
                        items={this.state.combo.sessionroom_equipments.items}
                        onChange={this.checkboxStateHandler}
                        dir={direction}
                        name="equipments"
                      />
                    ) : (
                      <Skeleton count={5} style={{ lineHeight: 2 }} />
                    )}
                    <span className="error-message">
                      {this.state.form.fields.equipments.error}
                    </span>
                  </div>
                  <div className="contact-section">
                    <FlatInput
                      label={locale.fields.phonenumber._title}
                      type="text"
                      prefix={this.state.form.fields.phonenumber.code}
                      placeholder={locale.fields.phonenumber.placeholder}
                      name="phonenumber"
                      id="phonenumber"
                      maxLength="10"
                      style={{ direction: direction }}
                      onChange={this.formStateHandler}
                      error={this.state.form.fields.phonenumber.error}
                    />
                    <FlatInput
                      label={locale.fields.email._title}
                      type="email"
                      placeholder={locale.fields.email.placeholder}
                      name="email"
                      id="email"
                      onChange={this.formStateHandler}
                      error={this.state.form.fields.email.error}
                    />
                  </div>
                  <div className="field-row">
                    <span className="field-title">
                      {locale.fields.city._title}
                    </span>

                    {/* fill checkboxes */}
                    {this.state.combo.list_of_cities.hasLoaded ? (
                      <FlatInlineSelect
                        type="radio"
                        items={this.state.combo.list_of_cities.items}
                        onChange={this.checkboxStateHandler}
                        dir={direction}
                        name="city"
                      />
                    ) : (
                      <Skeleton count={2} style={{ lineHeight: 2 }} />
                    )}
                    <span className="error-message">
                      {this.state.form.fields.city.error}
                    </span>
                  </div>
                  <FlatInput
                    label={locale.fields.seats._title}
                    type="number"
                    max={100}
                    min={1}
                    placeholder={locale.fields.seats.placeholder}
                    name="seats"
                    id="seats"
                    defaultValue={this.state.form.fields.seats.value}
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.seats.error}
                  />
                  <FlatTextArea
                    label={locale.fields.description._title}
                    type="text"
                    placeholder={locale.fields.description.placeholder}
                    name="description"
                    id="description"
                    onChange={this.formStateHandler}
                    style={{ minHeight: "100px" }}
                    error={this.state.form.fields.description.error}
                  />
                </CardBody>
              </section>
              <CardFooter>
                <Button
                  className="navigation-button submit"
                  onClick={() => this.submitForm()}
                >
                  {this.state.form.isSubmitting ? (
                    <img
                      src={LoadingSpinner}
                      alt=""
                      style={{ margin: "-12px 16px" }}
                    />
                  ) : this.validatePhoneNumber() ? (
                    locale.fields.submit.submit
                  ) : (
                    locale.fields.submit.verify_phonenumber
                  )}
                </Button>
              </CardFooter>
            </Card>
          </React.Fragment>
        )}
      </section>
    );
  }
}

export default SessionRoom;
