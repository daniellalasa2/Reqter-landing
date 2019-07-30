import React from "react";
import {
  Button,
  Col,
  Row,
  CardFooter,
  Card,
  CardHeader,
  CardBody,
  Input
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { InlineCheckBox, CheckBoxRow } from "./CustomCheckbox/CustomCheckbox";
import "../assets/styles/FlatForm.scss";
import Validator from "./Validator/Validator";
class PartnerShip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        isValid: false,
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
          workingfields: {
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
          workingfields: "",
          phonenumber: "",
          email: "",
          homepage: ""
        }
      },
      combo: {
        startup: [
          "فضای کاری اشتراکی",
          "مرکز رشد",
          "پارک علم و فناوری",
          "شتاب دهنده",
          "سرمایه گذار",
          "مرکز نوآوری",
          "استارتاپ استودیو",
          "مشاور / منتور",
          "تولید محتوا"
        ]
      }
    };
    this.validationRules = {
      name: ["required", "minCharecters"],
      primarycontact: ["required", "minCharecters"],
      workingfields: ["required", "checkbox"],
      phonenumber: ["required", "phonenumber"],
      email: ["email"],
      homepage: ["url"]
    };
  }

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
        () => console.log(this.state.form)
      );
    } else {
      _this.classList.remove("error-input");
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
          },
          api: {
            ...this.state.form._api,
            [name]: value
          }
        },
        () => console.log(this.state.form)
      );
    }
  };
  handleCheckBox = () => {};
  submitForm = () => {
    console.log("done");
  };
  render() {
    return (
      <section
        className="startup-section rtl-layout"
        style={{ backgroundColor: "whitesmoke" }}
      >
        <Row>
          <Col xs="12" sm="12" md={{ size: 8, offset: 2 }}>
            <Card style={{ margin: "auto" }}>
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
                  <div className="field-row">
                    <span className="field-title">نام شرکت یا سازمان </span>
                    <Input
                      placeholder="نام شرکت یا سازمان را وارد کنید ."
                      type="text"
                      name="name"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      autoFocus
                    />
                    <span className="error-message">
                      {this.state.form.fields.name.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <span className="field-title">نام درخواست کننده </span>
                    <Input
                      type="text"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="primarycontact"
                      placeholder="نام درخواست کننده را وارد کنید."
                    />
                    <span className="error-message">
                      {this.state.form.fields.primarycontact.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <span className="field-title">زمینه همکاری</span>
                    <CheckBoxRow
                      rowitems="3"
                      onChange={() => this.handleCheckBox}
                      type="checkbox"
                      style={{ width: "100%", marginTop: "10px" }}
                      dir="rtl"
                    >
                      {this.state.combo["startup"].map((val, key) => (
                        <InlineCheckBox
                          checked={false}
                          title={val}
                          key={key}
                          onChange={() => console.log("selected")}
                          boxValue={key}
                          dir="rtl"
                        />
                      ))}
                    </CheckBoxRow>
                    <span className="error-message">
                      {this.state.form.fields.workingfields.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <span className="field-title">شماره تماس </span>
                    <Input
                      type="text"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="phonenumber"
                      placeholder="مثال : 09123456789"
                    />
                    <span className="error-message">
                      {this.state.form.fields.phonenumber.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <span className="field-title">ایمیل </span>
                    <Input
                      type="text"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="email"
                      placeholder="ایمیل خود را وارد کنید ."
                    />
                    <span className="error-message">
                      {this.state.form.fields.email.error}
                    </span>
                  </div>
                  <div className="field-row">
                    <span className="field-title">وبسایت </span>
                    <Input
                      type="text"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="homepage"
                      placeholder="آدرس وبسایت خود را وارد کنید ."
                    />
                    <span className="error-message">
                      {this.state.form.fields.homepage.error}
                    </span>
                  </div>
                </CardBody>
              </section>

              <CardFooter>
                <Button
                  className="navigation-button submit"
                  onClick={() => this.submitForm()}
                  disabled={!this.state.form.isValid}
                >
                  ثبت
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}

export default PartnerShip;
