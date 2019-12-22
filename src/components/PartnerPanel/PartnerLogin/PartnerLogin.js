import React from "react";
import { Button, Card, CardHeader, CardBody, Alert } from "reactstrap";
import { FlatInput } from "../../FlatForm/FlatForm";
import {
  PartnerLoginRequest,
  PartnerVerifyCode,
  SafeValue,
  GetPartnerInfo
} from "../../ApiHandlers/ApiHandler";
import Validator from "../../Validator/Validator";
import { SetCookie, JsonToString } from "../../CookieHandler/CookieHandler";
import LoadingSpinner from "../../../assets/images/spinner.svg";
import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
import "./PartnerLogin.scss";
export default class Login extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.state = {
      loginStep: 1,
      partnerStatusError: "",
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
    PartnerLoginRequest(phonenumber, res => {
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
  ValidatePartnerByPhonenumber = (phonenumber, callback) => {
    const { locale } = this.translate;
    GetPartnerInfo({ "fields.phonenumber": phonenumber }, res => {
      if (res.success_result.success) {
        callback();
      } else {
        this.setState({
          partnerStatusError: locale.partner_status_error.not_verified
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
    const _this = this; //PartnerLogin object
    const data = {};
    const { value, code } = this.state.form.fields.phoneNumber;
    const phonenumber = code + value;
    data["phoneNumber"] = phonenumber;
    data["code"] = this.state.form.fields.code.value;
    PartnerVerifyCode(data, res => {
      _this.PendingForm(false);
      if (res.data.success) {
        //set cookie then update program Cookie authentication
        _this.ValidatePartnerByPhonenumber(phonenumber, () => {
          SetCookie(
            "SSUSERAUTH",
            JsonToString({
              ROLE: "partner",
              TOKEN: res.data.access_token,
              ID: phonenumber
            }),
            parseInt(res.data.expiresIn) / (60 * 60 * 24)
          );
          _this.context.updateAuth(() => {
            this.props.history.push(`/${this.lang}/partnerpanel/panel`);
          });
        });
      } else {
        _this.setState({
          form: {
            ..._this.state.form,
            fields: {
              ..._this.state.form.fields,
              code: {
                ..._this.state.form.fields.code,
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
      <div className={classnames("PartnerLogin", `_${direction}`)}>
        {this.state.partnerStatusError && (
          <Alert color="warning">
            {locale.partner_status_error.not_verified}
          </Alert>
        )}
        <Card className="login-card">
          <CardHeader className="login-card-header">
            <h5>{locale.card.title}</h5>
          </CardHeader>
          {/* Get number */}
          {this.state.loginStep === 1 && (
            <CardBody>
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
                onKeyUp={e => (e.key === "Enter" ? this.Login() : null)}
              />
              <Button
                color="info"
                onClick={this.Login}
                disabled={!this.state.form.fields.phoneNumber.isValid}
                // onKeyUp={e => console.log("this: ", e)}
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
            </CardBody>
          )}
          {/* Verify sent code */}
          {this.state.loginStep === 2 && (
            <CardBody>
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
            </CardBody>
          )}
        </Card>
      </div>
    );
  }
}
