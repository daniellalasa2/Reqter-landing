import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FlatInput } from "../../FlatForm/FlatForm";
import {
  LoginRequest,
  VerifyCode,
  SafeValue
} from "../../ApiHandlers/ApiHandler";
import Validator from "../../Validator/Validator";
import { SetCookie, JsonToString } from "../../CookieHandler/CookieHandler";
import "./Login.scss";
import LoadingSpinner from "../../../assets/images/spinner.svg";
// import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
export default class Login extends React.Component {
  // static contextType = ContextApi;
  constructor(props) {
    super(props);
    this.lang = props.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.state = {
      modal: false,
      loginStep: 1,
      form: {
        isValid: false,
        submitted: false,
        isSubmitting: false,
        fields: {
          phoneNumber: {
            code: "+98",
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
      phoneNumber: ["phonenumber", "required.NOMESSAGE"]
    };
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.openModal !== nextProps.openModal) {
      this.setState({
        modal: nextProps.openModal,
        form: {
          ...this.state.form,
          fields: {
            ...this.state.form.fields,
            phoneNumber: {
              ...this.state.form.fields.phoneNumber,
              value: SafeValue(nextProps, "defaultPhoneNumber", "string", ""),
              isValid: Validator(
                SafeValue(nextProps, "defaultPhoneNumber", "string", ""),
                this.validationRules.phoneNumber,
                this.lang
              ).valid
            }
          }
        }
      });
      return true;
    }
    return true;
  }
  Login = () => {
    const { locale } = this.translate;
    this.PendingForm(true);
    const _this = this;
    const { value, code } = this.state.form.fields.phoneNumber;
    const phonenumber = code + value;
    LoginRequest(phonenumber, res => {
      _this.PendingForm(false);
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
      } else if (res.success_result.code === 400) {
        _this.setState({
          form: {
            ...this.state.form,
            fields: {
              ...this.state.form.fields,
              code: {
                ...this.state.form.fields.code,
                isValid: false,
                error: ""
              },
              phoneNumber: {
                ...this.state.form.fields.phoneNumber,
                error: locale.errors.invalid_number
              }
            }
          }
        });
      } else {
        _this.setState({
          form: {
            ...this.state.form,
            fields: {
              ...this.state.form.fields,
              code: {
                ...this.state.form.fields.code,
                isValid: false,
                error: ""
              },
              phoneNumber: {
                ...this.state.form.fields.phoneNumber,
                error: locale.errors.code_error
              }
            }
          }
        });
      }
    });
  };
  PendingForm = status => {
    this.setState({
      form: {
        ...this.state.form,
        isSubmitting: status
      }
    });
  };
  CheckCode = () => {
    const { locale } = this.translate;
    this.PendingForm(true);
    const _this = this;
    const data = {};
    const { value, code } = this.state.form.fields.phoneNumber;
    const phonenumber = code + value;
    data["phoneNumber"] = phonenumber;
    data["code"] = this.state.form.fields.code.value;
    VerifyCode(data, res => {
      _this.PendingForm(false);
      if (res.data.success) {
        //set cookie then update program Cookie authentication
        SetCookie(
          "SSUSERAUTH",
          JsonToString({
            ROLE: "user",
            TOKEN: res.data.access_token,
            ID: phonenumber
          }),
          parseInt(res.data.expiresIn) / (60 * 60 * 24)
        );
        _this.props.updateAuth();
      } else {
        _this.setState({
          form: {
            ...this.state.form,
            fields: {
              ...this.state.form.fields,
              code: {
                ...this.state.form.fields.code,
                isValid: false,
                error: locale.errors.code_error
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
  checkFieldValidation = fieldName => {
    const field = this.state.form.fields[fieldName];
    const validation = Validator(
      field.value,
      this.validationRules[fieldName],
      this.lang
    );
    const fieldContent = {
      error: validation.message,
      isValid: validation.valid
    };
    this.setState({
      form: {
        ...this.state.form,
        fields: {
          ...this.state.form.fields,
          [field]: {
            ...[field],
            ...fieldContent
          }
        }
      }
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
    let value = _this.value;
    const validation = Validator(value, this.validationRules[name], this.lang);
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
    const { locale, direction } = this.translate;
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={classnames("login-modal", `_${direction}`)}
        >
          <ModalHeader className="login-modal-header" toggle={this.toggle}>
            {this.props.modalTitle}
          </ModalHeader>
          {/* Get number */}
          {this.state.loginStep === 1 && (
            <ModalBody>
              <FlatInput
                label={locale.fields.phonenumber._title}
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                prefix={this.state.form.fields.phoneNumber.code}
                placeholder={locale.fields.phonenumber.placeholder}
                onChange={this.formStateHandler}
                error={this.state.form.fields.phoneNumber.error}
                autoFocus={true}
                defaultValue={this.props.defaultPhoneNumber}
                onKeyUp={e => e.key === "Enter" && this.Login()}
              />
              <Button
                color="info"
                onClick={this.Login}
                disabled={!this.state.form.fields.phoneNumber.isValid}
              >
                {this.state.form.isSubmitting ? (
                  <img
                    src={LoadingSpinner}
                    alt=""
                    style={{ margin: "-12px 20px" }}
                  />
                ) : (
                  locale.fields.verify_code._title
                )}
              </Button>
            </ModalBody>
          )}
          {/* Verify sent code */}
          {this.state.loginStep === 2 && (
            <ModalBody>
              <FlatInput
                label={locale.fields.enter_code._title}
                type="tel"
                name="code"
                id="code"
                maxLength="4"
                autoFocus={true}
                slyle={{ letterSpacing: "7px", marginTop: "14px" }}
                onChange={this.formStateHandler}
                error={this.state.form.fields.code.error}
                onKeyUp={e => e.key === "Enter" && this.CheckCode()}
              />
              <span
                className="resend-code-link"
                onClick={this.ResetPhonenumber}
              >
                {locale.fields.resend_code._title}
              </span>
              <div className="buttons-wrapper">
                <Button color="success" onClick={this.CheckCode}>
                  {this.state.form.isSubmitting ? (
                    <img
                      src={LoadingSpinner}
                      alt=""
                      style={{ margin: "-12px 16px" }}
                    />
                  ) : (
                    locale.fields.submit.submit_code
                  )}
                </Button>
              </div>
            </ModalBody>
          )}
        </Modal>
      </div>
    );
  }
}
