//make an appropriate behavior for Flat date and time picker components it must behave as a normal input

import React from "react";
import { Button, CardFooter, Card, CardHeader, CardBody } from "reactstrap";
import {
  SubmitForm,
  Upload,
  FilterContents,
  SafeValue
} from "./ApiHandlers/ApiHandler";
import Skeleton from "react-loading-skeleton";
import SuccessSubmit from "./Pages/SuccessSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  FlatInput,
  FlatUploader,
  FlatNumberSet,
  FlatInlineSelect,
  FlatTimePicker,
  FlatDatePicker
} from "./FlatForm/FlatForm";
import moment from "jalali-moment";
import LoadingSpinner from "../assets/images/spinner.svg";
import NumberFormat from "react-number-format";
import Validator from "./Validator/Validator";
import ContextApi from "./ContextApi/ContextApi";
import "../assets/styles/Coworking.scss";
class SessionRoom extends React.PureComponent {
  static contextType = ContextApi;
  constructor(props) {
    super(props);
    this.urlParams = this.urlParser(this.props.location.search);
    this.state = {
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
          subject: {
            value: "",
            error: "",
            isValid: false
          },
          phonenumber: {
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
            isValid: false
          }
        },
        backgroundData: {
          src: this.urlParams.src ? this.urlParams.src : "direct"
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
      name: ["required"],
      subject: ["required"],
      phonenumber: ["required", "phonenumber"],
      city: ["required"],
      seats: ["required", "number"],
      email: ["email"],
      startdate: ["date"],
      enddate: ["date"]
    };
  }

  checkFormValidation = () => {
    const fields = this.state.form.fields;
    let boolean = true;
    for (let key in fields) {
      if (!fields[key].isValid) {
        boolean = false;
        break;
      }
    }
    this.setState({
      form: {
        ...this.state.form,
        isValid: boolean
      }
    });
  };
  checkboxStateHandler = data => {
    let checkBoxValuesArr = [];
    let name = "";
    if (data.length) {
      data.forEach(val => {
        name = val.name;
        checkBoxValuesArr.push(val.value);
      });
    } else {
      name = data.name;
      checkBoxValuesArr = SafeValue(data, "value", "string", []);
    }
    const validation = Validator(checkBoxValuesArr, this.validationRules[name]);
    let toBeAssignObject = {
      error: validation.message,
      isValid: validation.valid
    };
    //if value is valid then assign value to form state
    if (validation.valid) {
      toBeAssignObject.value = checkBoxValuesArr;
    }
    this.setState(
      {
        form: {
          ...this.state.form,
          fields: {
            ...this.state.form.fields,
            [name]: {
              ...this.state.form.fields[name],
              ...toBeAssignObject
            }
          },
          api: {
            ...this.state.form.api,
            [name]: checkBoxValuesArr
          }
        }
      },
      () => {
        this.checkFormValidation();
      }
    );
  };
  formStateHandler = e => {
    let _this = e.target ? e.target : e;
    const name = _this.name;
    let value = null;
    let validation = {};
    if (name === "startdate") {
      const enddate = this.state.form.fields.enddate.value;
      value = moment
        .from(_this.value, "fa", "YYYY/MM/DD HH:mm")
        .format("MM/DD/YYYY HH:mm"); //convert shamsi date to georgian date
      value = new Date(value).getTime();
      validation = Validator(value, this.validationRules[name]);
      validation = validation.valid
        ? {
            valid: enddate ? value < parseInt(enddate) : true,
            message: enddate
              ? value < enddate
                ? ""
                : "زمان شروع جلسه باید قبل از زمان پایان جلسه باشد"
              : ""
          }
        : validation;
    } else if (name === "enddate") {
      const startdate = this.state.form.fields.startdate.value;
      value = moment
        .from(_this.value, "fa", "YYYY/MM/DD HH:mm")
        .format("MM/DD/YYYY HH:mm"); //convert shamsi date to georgian date
      value = new Date(value).getTime();
      validation = Validator(value, this.validationRules[name]);
      validation = validation.valid
        ? {
            valid: startdate ? value > parseInt(startdate) : true,
            message: startdate
              ? value > startdate
                ? ""
                : "زمان پایان جلسه باید بعد از زمان شروع جلسه باشد"
              : ""
          }
        : validation;
    } else {
      value = _this.value;
      validation = Validator(value, this.validationRules[name]);
    }
    this.setState(
      {
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
      },
      () => this.checkFormValidation()
    );
  };
  validatePhoneNumber = callback => {
    if (
      this.context.userAuth &&
      this.context.userAuth.ID === this.state.form.fields.phonenumber.value
    ) {
      callback();
    } else {
      this.context.toggleLoginModal(
        true,
        "تایید شماره تماس",
        this.state.form.fields.phonenumber.value
      );
    }
  };
  submitForm = () => {
    const inputs = this.state.form.fields;
    let _isValid = true;
    const _fields = {};
    const _backgroundData = this.state.form.backgroundData;
    let _formObjectGoingToSubmit = {};
    let _validation = {};
    for (let index in inputs) {
      _formObjectGoingToSubmit[index] = inputs[index].value;
      _validation = Validator(inputs[index].value, this.validationRules[index]);
      if (!_validation.valid) {
        _isValid = false;
        _fields[index] = {
          value: inputs[index].value,
          error: _validation.message,
          isValid: false
        };
      }
    }
    this.setState({
      form: {
        ...this.state.form,
        isValid: _isValid,
        fields: {
          ...this.state.form.fields,
          ..._fields
        }
      }
    });
    // if the form was valid then submit it
    if (_isValid) {
      this.validatePhoneNumber(() => {
        // fetch additional background data state to final api object if form was valid
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
            SubmitForm("session_room", _formObjectGoingToSubmit, res => {
              if (res.code === 201) {
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
  uploadFile = e => {
    Upload(
      e.target.files[0],
      res => {
        if (res.data.success) {
          this.setState({
            form: {
              ...this.state.form,
              fields: {
                ...this.state.form.fields,
                resume: {
                  ...this.state.form.fields.resume,
                  isValid: true,
                  value: [{ en: res.data.file.url, fa: res.data.file.url }]
                }
              }
            }
          });
        } else {
          this.setState({
            form: {
              ...this.state.form,
              fields: {
                ...this.state.form.fields,
                resume: {
                  ...this.state.form.fields.resume,
                  error: res.success_result.message
                }
              }
            }
          });
        }
      },
      res => {
        this.setState({
          form: {
            ...this.state.form,
            fields: {
              ...this.state.form.fields,
              resume: {
                ...this.state.form.fields.resume,
                uploadProgress: res.progress
              }
            }
          }
        });
      }
    );
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
    FilterContents(name, res => {
      const arr = [];
      SafeValue(res, "data", "object", []).map((val, key) => {
        arr.push({
          title: val.fields.name.fa
            ? SafeValue(val.fields.name, "fa", "string", "")
            : SafeValue(val.fields, "name", "string", ""),
          key: SafeValue(val, "_id", "string", ""),
          boxValue: key + 1,
          dir: "rtl",
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
    const selectedCity = this.urlParams.city,
      neededSeats = this.urlParams.seats;
    this.setState({
      form: {
        ...this.state.form,
        fields: {
          ...this.state.form.fields,
          seats: {
            ...this.state.form.fields.seats,
            value: !isNaN(Number(neededSeats)) && neededSeats,
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
    return (
      <section
        className="form-section rtl-layout"
        style={{
          backgroundColor: "whitesmoke",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {this.state.form.submitted ? (
          <Card className="form-card">
            <SuccessSubmit />
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
                    <strong>فرم درخواست اتاق جلسات</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  <FlatInput
                    label="نام درخواست کننده"
                    type="text"
                    placeholder="نام خود را وارد کنید"
                    name="name"
                    id="name"
                    autoFocus
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.name.error}
                  />
                  <FlatInput
                    label="موضوع جلسه"
                    type="text"
                    placeholder="موضوع جلسه را وارد نمایید"
                    name="subject"
                    id="subject"
                    autoFocus
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.subject.error}
                  />
                  <div className="field-row">
                    <span className="field-title">زمان شروع جلسه</span>
                    <br />
                    <br />
                    <div className="FlatTimePicker">
                      <NumberFormat
                        mask="_"
                        format="####/##/##   ## : ##"
                        type="text"
                        name="startdate"
                        placeholder="تاریخ - ساعت و دقیقه"
                        onChange={this.formStateHandler}
                        style={{ direction: "ltr", textAlign: "right" }}
                      />
                      <span className="error-message">
                        {this.state.form.fields.startdate.error}
                      </span>
                    </div>
                  </div>
                  <div className="field-row">
                    <span className="field-title">زمان پایان جلسه</span>
                    <br />
                    <br />
                    <div className="FlatTimePicker">
                      <NumberFormat
                        mask="_"
                        format="####/##/##   ## : ##"
                        type="text"
                        placeholder="تاریخ - ساعت و دقیقه"
                        onChange={this.formStateHandler}
                        style={{ direction: "ltr", textAlign: "right" }}
                        name="enddate"
                      />
                      <span className="error-message">
                        {this.state.form.fields.enddate.error}
                      </span>
                    </div>
                  </div>
                  <div className="field-row">
                    <span className="field-title">تجهیزات مورد نیاز</span>

                    {/* fill checkboxes */}
                    {this.state.combo.sessionroom_equipments.hasLoaded ? (
                      <FlatInlineSelect
                        type="checkbox"
                        items={this.state.combo.sessionroom_equipments.items}
                        onChange={this.checkboxStateHandler}
                        dir="rtl"
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
                      label="شماره تماس"
                      type="text"
                      placeholder="شماره تماس خود را وارد کنید"
                      name="phonenumber"
                      id="phonenumber"
                      onChange={this.formStateHandler}
                      error={this.state.form.fields.phonenumber.error}
                    />
                    <FlatInput
                      label="ایمیل"
                      type="email"
                      placeholder="ایمیل خود را وارد کنید"
                      name="email"
                      id="email"
                      onChange={this.formStateHandler}
                      error={this.state.form.fields.email.error}
                    />
                  </div>
                  <div className="field-row">
                    <span className="field-title">شهر</span>

                    {/* fill checkboxes */}
                    {this.state.combo.list_of_cities.hasLoaded ? (
                      <FlatInlineSelect
                        type="radio"
                        items={this.state.combo.list_of_cities.items}
                        onChange={this.checkboxStateHandler}
                        dir="rtl"
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
                    label="ظرفیت درخواستی"
                    type="number"
                    max={100}
                    min={1}
                    placeholder="ظرفیت درخواستی"
                    name="seats"
                    id="seats"
                    defaultValue={this.state.form.fields.seats.value}
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.seats.error}
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
                  ) : (
                    "ثبت و ارسال "
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
