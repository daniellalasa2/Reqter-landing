//TODO:
// When all the inputs are filled and one of the required fields would remove, form submition happens but why?
// Card transition stuffs is ready but not modified
// scroll bug after component update
import React from "react";
import {
  Button,
  CardFooter,
  Card,
  CardHeader,
  CardBody,
  Input
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { SubmitForm, FilterContents } from "./ApiHandlers/ApiHandler";
import SuccessSubmit from "./Pages/SuccessSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { InlineCheckBox, CheckBoxRow } from "./CustomCheckbox/CustomCheckbox";
import {
  FlatInlineSelect,
  FlatImageSelect,
  FlatInput
} from "./FlatForm/FlatForm";
import "../assets/styles/FlatForm.scss";
import Validator from "./Validator/Validator";
class PartnerShip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        isValid: false,
        isSubmit: false,
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
        api: {
          name: "",
          primarycontact: "",
          collaborationtypes: "",
          phonenumber: "",
          email: "",
          homepage: ""
        }
      },
      combo: {
        startup: {
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
  checkboxStateHandler = (data, e) => {
    const checkBoxValuesArr = [];
    let name = "";
    data.forEach(val => {
      name = val.name;
      checkBoxValuesArr.push(val.value);
    });
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
        console.log(this.state.form.fields.collaborationtypes);
        this.checkFormValidation();
      }
    );
  };
  formStateHandler = e => {
    let _this = e.target;
    const name = _this.name;
    const value = _this.value;
    const validation = Validator(value, this.validationRules[name]);
    if (!validation.valid) {
      _this.classList.add("error-input");
      this.setState(
        {
          form: {
            ...this.state.form,
            fields: {
              ...this.state.form.fields,
              [name]: {
                value: value,
                error: validation.message,
                isValid: validation.valid
              }
            }
          }
        },
        () => this.checkFormValidation()
      );
    } else {
      _this.classList.remove("error-input");
      this.setState(
        {
          form: {
            fields: {
              ...this.state.form.fields,
              [name]: {
                value: value,
                error: validation.message,
                isValid: validation.valid
              }
            },
            api: {
              ...this.state.form.api,
              [name]: value
            }
          }
        },
        () => {
          this.checkFormValidation();
        }
      );
    }
  };
  submitForm = () => {
    const inputs = this.state.form.fields;
    let _isValid = true;
    const fields = {};
    let validation = {};
    for (let index in inputs) {
      validation = Validator(inputs[index].value, this.validationRules[index]);
      if (!validation.valid) {
        _isValid = false;
        fields[index] = {
          value: inputs[index].value,
          error: validation.message,
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
          ...fields
        }
      }
    });
    //if the form was valid then active form submit button
    if (_isValid) {
      //submit api call
      SubmitForm("partnership", this.state.form.api, res => {
        if (res.code === 200) {
          this.setState({
            form: {
              ...this.state.form,
              isSubmit: true
            }
          });
        }
      });
    }
  };
  PartnershipWorkingFields = () => {
    FilterContents("partnership_working_fields", res => {
      if (res.success_result.code === 200) {
        const arr = [];
        res.data.map((val, key) => {
          arr.push({
            title: val.fields.name.fa,
            key: val._id,
            boxValue: key + 1,
            dir: "rtl",
            value: val._id
          });
          return null;
        });
        this.setState({
          combo: {
            startup: {
              hasLoaded: true,
              items: arr
            }
          }
        });
      }
    });
  };
  componentDidMount() {
    this.PartnershipWorkingFields();
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
        {this.state.form.isSubmit ? (
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
                    {this.state.combo.startup.hasLoaded ? (
                      <FlatInlineSelect
                        type="checkbox"
                        items={this.state.combo.startup.items}
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
                    placeholder="مثال : 09123456789"
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
                  onClick={this.submitForm}
                >
                  ثبت
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
