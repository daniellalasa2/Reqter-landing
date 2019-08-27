import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FlatInput } from "./FlatForm/FlatForm";
import { LoginRequest, VerifyCode } from "./ApiHandlers/ApiHandler";
import Validator from "./Validator/Validator";
import { SetCookie } from "../components/CookieHandler/CookieHandler";
import "../assets/styles/Login.scss";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loginStep: 1,
      form: {
        isValid: false,
        submitted: false,
        isSubmitting: false,
        fields: {
          phoneNumber: {
            value: "",
            isValid: false,
            error: ""
          },
          code: {
            value: "",
            isValid: false,
            error: ""
          }
        }
      }
    };
    this.toggle = () => {
      const _this = this;
      this.setState(
        {
          loginStep: 1
        },
        _this.props.toggle.bind(_this)
      );
    };
    this.validationRules = {
      phoneNumber: ["phonenumber"]
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.openModal !== nextProps.openModal) {
      this.setState({
        modal: nextProps.openModal
      });
      return true;
    } else {
      return true;
    }
  }
  LoginRequest = () => {
    const _this = this;
    LoginRequest(this.state.form.fields.phoneNumber.value, res => {
      if (res.data.success) {
        _this.setState({
          loginStep: 2,
          form: {
            ...this.state.form,
            fields: {
              ...this.state.form.fields,
              code: {
                ...this.state.form.fields.code,
                isValid: false,
                error: ""
              }
            }
          }
        });
      }
    });
  };
  CheckCode = () => {
    const _this = this;
    const data = {};
    data["phoneNumber"] = this.state.form.fields.phoneNumber.value;
    data["code"] = this.state.form.fields.code.value;
    VerifyCode(data, res => {
      if (res.data.success) {
        _this.setState(
          {
            loginStep: 3,
            form: {
              ...this.state.form,
              fields: {
                ...this.state.form.fields,
                code: {
                  ...this.state.form.fields.code,
                  isValid: true,
                  error: ""
                }
              }
            }
          },
          () => {
            SetCookie(
              "SSUSERAUTH",
              res.data.access_token,
              parseInt(res.data.expiresIn) / (60 * 60 * 24)
            );
            _this.props.userLoggedIn();
          }
        );
      } else {
        _this.setState({
          form: {
            ...this.state.form,
            fields: {
              ...this.state.form.fields,
              code: {
                ...this.state.form.fields.code,
                isValid: false,
                error: "کد نادرست است"
              }
            }
          }
        });
      }
    });
  };
  ResetPhonenumber = () => {
    this.setState({
      loginStep: 1
    });
  };
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
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="login-modal"
        >
          <ModalHeader className="login-modal-header" toggle={this.toggle}>
            ورود به استارتاپ اسپیس
          </ModalHeader>
          {/* Get number */}
          {this.state.loginStep === 1 && (
            <ModalBody>
              <FlatInput
                label="شماره تماس"
                type="tel"
                placeholder="شماره تماس خود را وارد کنید"
                name="phoneNumber"
                id="phoneNumber"
                onChange={this.formStateHandler}
                error={this.state.form.fields.phoneNumber.error}
              />
              <Button
                color="info"
                onClick={this.LoginRequest}
                disabled={!this.state.form.fields.phoneNumber.isValid}
              >
                دریافت کد تایید
              </Button>
            </ModalBody>
          )}
          {/* Verify sent code */}
          {this.state.loginStep === 2 && (
            <ModalBody>
              <FlatInput
                label="تایید شماره تماس"
                type="tel"
                placeholder="کد ارسال شده را وارد کنید"
                name="code"
                id="code"
                onChange={this.formStateHandler}
                error={this.state.form.fields.code.error}
              />
              <Button color="success" onClick={this.CheckCode}>
                تایید و ورود
              </Button>
              <Button color="warning" onClick={this.LoginRequest}>
                ارسال مجدد کد
              </Button>
              <Button color="info" onClick={this.ResetPhonenumber}>
                ویرایش شماره
              </Button>
            </ModalBody>
          )}
          {this.state.loginStep === 3 && (
            <ModalBody className="success-login">
              <h3 style={{ color: "green", padding: "2rem" }}>
                با موفقیت وارد شدید.
              </h3>
              <Button
                color="info"
                onClick={() => this.props.history.push("user/myrequests")}
              >
                ورود به پنل
              </Button>
            </ModalBody>
          )}
        </Modal>
      </div>
    );
  }
}
