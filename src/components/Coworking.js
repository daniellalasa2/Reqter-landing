import React from "react";
import { Button, CardFooter, Card, CardHeader, CardBody } from "reactstrap";
import { SubmitForm } from "./ApiHandlers/ApiHandler";
import SuccessSubmit from "./Pages/SuccessSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FlatInput } from "./FlatForm/FlatForm";
import Validator from "./Validator/Validator";
import "../assets/styles/Coworking.scss";
class Coworking extends React.PureComponent {
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
          birthyear: {
            value: "",
            error: "",
            isValid: false
          },
          educationfield: {
            value: "",
            error: "",
            isValid: false
          },
          phonenumber: {
            value: "",
            error: "",
            isValid: false
          },
          university: {
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
          }
        },
        api: {
          name: "",
          birthyear: "",
          educationfield: "",
          phonenumber: "",
          university: "",
          seats: "",
          email: ""
        }
      }
    };
    this.validationRules = {
      name: ["required"],
      birthyear: ["required", "number"],
      educationfield: ["required"],
      phonenumber: ["required", "phonenumber"],
      university: ["required"],
      seats: ["required", "number"],
      email: ["email"]
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
  checkboxStateHandler = (name, data) => {
    const checkBoxValuesArr = [];
    data.forEach(val => {
      checkBoxValuesArr.push(val.key);
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
                ...this.state.form.fields[name],
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
      SubmitForm("coworking", this.state.form.api, res => {
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
                    <strong>فرم درخواست فضای کار اشتراکی</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  <FlatInput
                    label="نام و نام خانوادگی"
                    type="text"
                    placeholder="نام و نام خانوادگی را وارد کنید"
                    name="name"
                    id="name"
                    autoFocus
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.name.error}
                  />

                  <FlatInput
                    label="سال تولد"
                    type="number"
                    max={9999}
                    min={1270}
                    placeholder="مثال : 1359"
                    name="birthyear"
                    id="birthyear"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.birthyear.error}
                  />
                  <FlatInput
                    label="رشته تحصیلی"
                    type="text"
                    placeholder="مثال : مهندسی کامپیوتر"
                    name="educationfield"
                    id="educationfield"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.educationfield.error}
                  />
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
                  <FlatInput
                    label="دانشگاه"
                    type="text"
                    placeholder="دانشگاه محل تحصیل خود را وارد کنید"
                    name="university"
                    id="university"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.university.error}
                  />
                  <FlatInput
                    label="تعداد صندلی"
                    type="number"
                    min="1"
                    placeholder="تعداد صندلی درخواستی خود را وارد کنید"
                    name="seats"
                    id="seats"
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

export default Coworking;
