import React from "react";
import { Button, CardFooter, Card, CardHeader, CardBody } from "reactstrap";
import {
  SafeValue,
  SubmitForm,
  Upload,
  FilterContents
} from "../../ApiHandlers/ApiHandler";
import { Config } from "../../ApiHandlers/ApiHandler";
import SuccessSubmit from "../SubmitStatus/SuccessSubmit/SuccessSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  FlatInput,
  FlatUploader,
  FlatNumberSet,
  FlatInlineSelect,
  FlatTextArea,
  FlatCustomWrapper
} from "../../FlatForm/FlatForm";
import LoadingSpinner from "../../../assets/images/spinner.svg";
import Validator from "../../Validator/Validator";
import ContextApi from "../../ContextApi/ContextApi";
import "../Coworking.scss";
import classnames from "classnames";
import Skeleton from "react-loading-skeleton";
class SharedDesk extends React.PureComponent {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.urlParams = this.urlParser(this.props.location.search);
    this.contentTypeName = "coworking";
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
          birthyear: {
            value: "",
            error: "",
            isValid: false
          },
          workingfield: {
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
            value: 1,
            error: "",
            isValid: false
          },
          email: {
            value: "",
            error: "",
            isValid: false
          },
          resume: {
            uploading: false,
            uploadProgress: 0,
            value: "",
            error: "",
            isValid: false
          },
          country: {
            value: "5d35e8288e6e9a0017c28fcf",
            error: "",
            isValid: false
          },
          description: {
            value: "",
            error: "",
            isValid: true
          }
        },
        backgroundData: {
          src: window.src,
          product: Config.PRODUCT_TYPE_ID.shared_desk,
          stage: "5d6b5da15b60dc0017c95119",
          product_id: this.urlParams.product_id
        }
      },
      combo: {
        list_of_cities: {
          hasLoaded: false,
          items: []
        },
        coworking_working_field: {
          hasLoaded: false,
          items: []
        }
      }
    };
    this.validationRules = {
      fullname: ["required"],
      birthyear: ["required", "birthyear_shamsi"],
      educationfield: ["required"],
      phonenumber: ["required", "phonenumber"],
      city: ["required"],
      seats: ["required", "number"],
      email: ["required", "email"],
      workingfield: ["required"],
      resume: ["upload"]
    };
  }

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
    let _this = e.target;
    const name = _this.name;
    const value = _this.value;
    const validation = Validator(
      value,
      SafeValue(this.validationRules, name, "object", []),
      this.lang
    );
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
    const { locale } = this.translate;
    const { value, code } = this.state.form.fields.phonenumber;
    const phonenumber = code + value;
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
  submitForm = () => {
    const { locale } = this.translate;
    const _this = this;
    const inputs = this.state.form.fields;
    let _isValid = this.checkFormValidation();
    const _backgroundData = this.state.form.backgroundData;
    let _formObjectGoingToSubmit = {};
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
  uploadFile = e => {
    const { locale } = this.translate;
    let file = "";
    try {
      file = e.target.files[0];
    } catch (err) {
      this.setState({
        form: {
          ...this.state.form,
          fields: {
            ...this.state.form.fields,
            resume: {
              ...this.state.form.fields.resume,
              error: locale.fields.resume.error
            }
          }
        }
      });
      return 0;
    }
    this.setState(
      {
        form: {
          ...this.state.form,
          fields: {
            ...this.state.form.fields,
            resume: {
              ...this.state.form.fields.resume,
              uploading: true
            }
          }
        }
      },
      () => {
        Upload(
          file,
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
                      value: [{ en: res.data.file.url, fa: res.data.file.url }],
                      uploading: false,
                      error: ""
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
                      error: res.success_result.message,
                      uploading: false
                    }
                  }
                }
              });
            }
          },
          uploadDetail => {
            this.setState({
              form: {
                ...this.state.form,
                fields: {
                  ...this.state.form.fields,
                  resume: {
                    ...this.state.form.fields.resume,
                    uploadProgress: uploadDetail.progress
                  }
                }
              }
            });
          }
        );
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
    const exportedUrlParams = this.urlParser(this.props.location.search);
    const selectedCity = SafeValue(exportedUrlParams, "city", "string", ""),
      neededSeats = SafeValue(exportedUrlParams, "seats", "string", "1");
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
    this.generateCheckboxDataFromApi("list_of_cities", selectedCity);
    this.generateCheckboxDataFromApi("coworking_working_field");
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
                    direction={direction}
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
                    direction={direction}
                    label={locale.fields.birthyear._title}
                    type="number"
                    max={9999}
                    min={1270}
                    placeholder={locale.fields.birthyear.placeholder}
                    maxLength="4"
                    name="birthyear"
                    id="birthyear"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.birthyear.error}
                  />
                  <FlatCustomWrapper
                    skeletonConfig={{
                      style: { lineHeight: 2 },
                      count: 5
                    }}
                    skeleton={
                      this.state.combo.coworking_working_field.hasLoaded
                    }
                    error={this.state.form.fields.workingfield.error}
                    label={locale.fields.workingfield._title}
                    direction={direction}
                  >
                    <FlatInlineSelect
                      direction={direction}
                      type="checkbox"
                      items={this.state.combo.coworking_working_field.items}
                      onChange={this.checkboxStateHandler}
                      dir={direction}
                      name="workingfield"
                    />
                  </FlatCustomWrapper>

                  <div className="contact-section">
                    <FlatInput
                      direction={direction}
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
                      direction={direction}
                      label={locale.fields.email._title}
                      type="email"
                      placeholder={locale.fields.email.placeholder}
                      name="email"
                      id="email"
                      onChange={this.formStateHandler}
                      error={this.state.form.fields.email.error}
                    />
                  </div>
                  <FlatCustomWrapper
                    skeletonConfig={{
                      style: { lineHeight: 2 },
                      count: 2
                    }}
                    skeleton={this.state.combo.list_of_cities.hasLoaded}
                    error={this.state.form.fields.city.error}
                    label={locale.fields.city._title}
                    direction={direction}
                  >
                    <FlatInlineSelect
                      direction={direction}
                      type="radio"
                      items={this.state.combo.list_of_cities.items}
                      onChange={this.checkboxStateHandler}
                      dir={direction}
                      name="city"
                    />
                  </FlatCustomWrapper>
                  <FlatNumberSet
                    direction={direction}
                    label={locale.fields.seats._title}
                    type="number"
                    range={[1, 10]}
                    defaultValue={this.state.form.fields.seats.value}
                    name="seats"
                    id="seats"
                    onChange={this.formStateHandler}
                    error={this.state.form.fields.seats.error}
                  />
                  <FlatUploader
                    direction={direction}
                    label={locale.fields.resume._title}
                    name="resume"
                    id="resume"
                    style={{ direction: direction }}
                    buttonValue={locale.fields.resume.buttonValue}
                    placeholder={locale.fields.resume.placeholder}
                    progress={this.state.form.fields.resume.uploadProgress}
                    progresscolor="lightblue"
                    onChange={this.uploadFile}
                    error={this.state.form.fields.resume.error}
                  />
                  <FlatTextArea
                    direction={direction}
                    label={locale.fields.description._title}
                    type="text"
                    placeholder={locale.fields.description.placeholder}
                    name="description"
                    id="description"
                    style={{ minHeight: "100px" }}
                    onChange={this.formStateHandler}
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

export default SharedDesk;
