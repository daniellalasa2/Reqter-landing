import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { SubmitForm } from "../ApiHandlers/ApiHandler";
import { FlatInput, FlatTextArea } from "../FlatForm/FlatForm";
import LoadingSpinner from "../../assets/images/spinner.svg";
import Validator from "../Validator/Validator";
import ContextApi from "../../components/ContextApi/ContextApi";
import "./ContactUs.scss";
import classnames from "classnames";
class ContactUs extends React.PureComponent {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.contentTypeName = "contact_us";
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
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
          phonenumber: {
            value: "",
            error: "",
            isValid: false
          },
          subject: {
            value: "",
            error: "",
            isValid: false
          },
          message: {
            value: "",
            error: "",
            isValid: false
          }
        }
      }
    };
    this.validationRules = {
      name: ["required"],
      phonenumber: ["required", "phonenumber"],
      message: ["required"]
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
  formStateHandler = e => {
    let _this = e.target ? e.target : e;
    const name = _this.name;
    let value = _this.value;
    let validation = Validator(value, this.validationRules[name], this.lang);
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
  submitForm = () => {
    const inputs = this.state.form.fields;
    let _isValid = true;
    const _fields = {};
    let _formObjectGoingToSubmit = {};
    let _validation = {};
    for (let index in inputs) {
      _formObjectGoingToSubmit[index] = inputs[index].value;
      _validation = Validator(
        inputs[index].value,
        this.validationRules[index],
        this.lang
      );
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
      // fetch additional background data state to final api object if form was valid
      const { value, code } = this.state.form.fields.phonenumber;
      _formObjectGoingToSubmit = {
        ...this.state.form.backgroundData,
        ..._formObjectGoingToSubmit
      };
      this.setState(
        {
          form: {
            ...this.state.form,
            isSubmitting: true
          }
        },
        () => {
          SubmitForm(this.contentTypeName, _formObjectGoingToSubmit, res => {
            if (res.success) {
              window.scrollTo(0, 0);
              this.setState({
                form: {
                  ...this.state.form,
                  submitted: true,
                  isSubmitting: false
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
    }
  };

  render() {
    const { locale, direction } = this.translate;
    return (
      <section
        id="contactUs"
        className={classnames("contactUs", direction === "ltr" && "_ltr")}
      >
        <h3 className="section-title" style={{ fontWeight: "bold" }}>
          {locale.contact_us._title}
        </h3>
        <div className="contactUs-row-wrapper">
          <div className="contactUs-fields">
            {this.state.form.submitted && (
              <div className="successful-submittion">
                {locale.fields.success_message}
              </div>
            )}
            <FlatInput
              name="name"
              type="text"
              placeholder={locale.fields.fullname}
              onChange={this.formStateHandler}
              error={this.state.form.fields.name.error}
            />
            <FlatInput
              placeholder={locale.fields.phonenumber}
              type="number"
              maxLength="14"
              name="phonenumber"
              onChange={this.formStateHandler}
              error={this.state.form.fields.phonenumber.error}
            />
            <FlatInput
              placeholder={locale.fields.subject}
              name="subject"
              type="text"
              onChange={this.formStateHandler}
              error={this.state.form.fields.subject.error}
            />
            <FlatTextArea
              name="message"
              placeholder={locale.fields.description}
              type="textarea"
              onChange={this.formStateHandler}
              error={this.state.form.fields.message.error}
            />
            <br />
            <button
              className="submit"
              onClick={() => this.submitForm()}
              disabled={this.state.form.isSubmitting}
            >
              {this.state.form.isSubmitting ? (
                <img
                  src={LoadingSpinner}
                  alt=""
                  style={{ margin: "-12px -3px" }}
                />
              ) : (
                locale.fields.submit
              )}
            </button>
          </div>
          <div className="contactUs-details">
            <div className="contantUs-details-spec">
              <span>
                <FontAwesomeIcon icon={faMapMarkerAlt} color="#6d8ae0" />
              </span>
              <p>
                <strong>{locale.contact_us.contact_info.address._title}</strong>
                <br />
                {locale.contact_us.contact_info.address.description}
              </p>
            </div>

            <div className="contantUs-details-spec">
              <span>
                <FontAwesomeIcon icon={faPhone} color="#6d8ae0" />
              </span>
              <p>
                <strong>{locale.contact_us.contact_info.tel._title}</strong>
                <br />
                {locale.contact_us.contact_info.tel.tel}
              </p>
            </div>

            <div className="contantUs-details-spec">
              <span>
                <FontAwesomeIcon icon={faEnvelope} color="#6d8ae0" />
              </span>
              <p>
                <strong>{locale.contact_us.contact_info.email._title}</strong>
                <br />
                {locale.contact_us.contact_info.email.email1} <br />
                {locale.contact_us.contact_info.email.email2}
              </p>
            </div>
            <div className="contantUs-details-spec social-links">
              {/* Location */}
              <a
                href="https://goo.gl/maps/tWxnvbC6PfcFFDqe7"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} color="#6d8ae0" />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/startupspace_hub/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} color="#6d8ae0" />
              </a>
              {/* Linkedin */}
              <a
                href="https://www.linkedin.com/company/startup-space/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedinIn} color="#6d8ae0" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContactUs;
