//TODO:
// When all the inputs are filled and one of the required fields would remove, form submition happens but why?
// Card transition stuffs is ready but not modified
// scroll bug after component update
import React from "react";
import { Button, CardFooter, Card, CardHeader, CardBody } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import {
  SubmitForm,
  FilterContents,
  SafeValue
} from "./ApiHandlers/ApiHandler";
import SuccessSubmit from "./Pages/SuccessSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../assets/images/spinner.svg";
import ContextApi from "./ContextApi/ContextApi";
// import { InlineCheckBox, CheckBoxRow } from "./CustomCheckbox/CustomCheckbox";
import { FlatInlineSelect, FlatInput } from "./FlatForm/FlatForm";
import "../assets/styles/FlatForm.scss";
import Validator from "./Validator/Validator";
class PartnerShip extends React.PureComponent {
  static contextType = ContextApi;
  constructor(props) {
    super(props);
    this.urlParams = this.urlParser(this.props.location.search);
    this.contentTypeName = "partnership";
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
          primarycontact: {
            value: "",
            error: "",
            isValid: false
          },
          collaborationtypes: {
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
          email: {
            value: "",
            error: "",
            isValid: false
          },
          homepage: {
            value: "",
            error: "",
            isValid: false
          }
        },
        backgroundData: {
          src: this.urlParams.src ? this.urlParams.src : "direct"
        }
      },
      combo: {
        partnership_working_fields: {
          hasLoaded: false,
          childs: {}
        }
      }
    };
    this.validationRules = {
      name: ["required"],
      primarycontact: ["required"],
      collaborationtypes: ["required"],
      phonenumber: ["required", "phonenumber"],
      email: ["email"],
      homepage: ["url"]
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
    const checkBoxValuesArr = [];
    let name = "";
    if (data.length > 1) {
      data.forEach(val => {
        name = val.name;
        checkBoxValuesArr.push(val.value);
      });
    } else {
      name = data.name;
      checkBoxValuesArr.push(data.value);
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
          }
        }
      },
      () => {
        this.checkFormValidation();
      }
    );
  };
  formStateHandler = e => {
    let _this = e.target;
    const name = _this.name;
    const value = _this.value;
    const validation = Validator(value, this.validationRules[name]);
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
    const { value, code } = this.state.form.fields.phonenumber;
    const phonenumber = code + value;
    if (this.context.auth && this.context.auth.ID === phonenumber) {
      callback && typeof callback === "function" && callback();
    } else {
      this.context.toggleLoginModal(true, "تایید شماره تماس", value);
    }
  };
  submitForm = () => {
    const inputs = this.state.form.fields;
    let _isValid = true;
    const _fields = {};
    const _backgroundData = this.state.form.backgroundData;
    let _formObjectGoingToSubmit = {};
    let _validation = {};
    const _this = this;
    for (let index in inputs) {
      _formObjectGoingToSubmit[index] = inputs[index].value;
      _validation = Validator(inputs[index].value, this.validationRules[index]);
      if (!_validation.valid) {
        _isValid = false;
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
    FilterContents(name, res => {
      const arr = [];
      SafeValue(res, "data", "object", []).map((val, key) => {
        arr.push({
          title: val.fields.name.fa,
          key: val._id,
          boxValue: key + 1,
          dir: "rtl",
          value: val._id,
          defaultChecked: defaultChecked && defaultChecked === val._id
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
    this.generateCheckboxDataFromApi("partnership_working_fields");
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
                    <strong>فرم همکاری</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  <FlatInput
                    label="نام شرکت یا سازمان"
                    type="text"
                    placeholder="نام شرکت یا سازمان را وارد کنید"
                    name="name"
                    id="name"
                    autoFocus
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.name.error}
                  />

                  <FlatInput
                    label="نام درخواست کننده"
                    type="text"
                    placeholder="نام درخواست کننده را وارد کنید"
                    name="primarycontact"
                    id="primarycontact"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.primarycontact.error}
                  />
                  <div className="field-row">
                    <span className="field-title">زمینه همکاری</span>

                    {/* fill checkboxes */}
                    {this.state.combo.partnership_working_fields.hasLoaded ? (
                      <FlatInlineSelect
                        type="checkbox"
                        items={
                          this.state.combo.partnership_working_fields.items
                        }
                        onChange={this.checkboxStateHandler}
                        dir="rtl"
                        name="collaborationtypes"
                      />
                    ) : (
                      <Skeleton count={8} style={{ lineHeight: 3 }} />
                    )}
                    <span className="error-message">
                      {this.state.form.fields.collaborationtypes.error}
                    </span>
                  </div>
                  <FlatInput
                    label="شماره تماس"
                    type="text"
                    prefix={this.state.form.fields.phonenumber.code}
                    placeholder="9123456789"
                    name="phonenumber"
                    id="phonenumber"
                    maxLength="10"
                    style={{ direction: "ltr" }}
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
                  <FlatInput
                    label="وبسایت"
                    type="text"
                    placeholder="آدرس وبسایت خود را وارد کنید"
                    name="homepage"
                    id="homepage"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.homepage.error}
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

export default PartnerShip;
