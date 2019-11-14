import React from "react";
import { Card, CardHeader, CardBody, Button, CardFooter } from "reactstrap";
import {
  SafeValue,
  GetPartnerInfo,
  Config,
  FilterContents,
  Upload
} from "../../ApiHandlers/ApiHandler";
import Validator from "../../Validator/Validator";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faList } from "@fortawesome/free-solid-svg-icons";
import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
import PageSuspense from "../../PageSuspense";
import { FlatInput, FlatTextArea, FlatButton } from "../../FlatForm/FlatForm";
import "./PartnerProfile.scss";
// import NoImageAlt from "../../../assets/images/alternatives/noimage.png";
//!!!!!!!!IMPORTANT: Partner state checking////////////////////////////
export default class PartnerPanel extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.filters = {
      details: "details",
      imagealbum: "imagealbum",
      map: "map",
      setting: "setting"
    };
    this.state = {
      didDataChange: false,
      pageLoaded: false,
      filterContext: {
        activeFilter: "",
        dataContent: [],
        loading: false
      },
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
          regno: {
            value: "",
            error: "",
            isValid: false
          },
          capacity: {
            value: "",
            error: "",
            isValid: false
          },
          phonenumber: {
            value: "",
            error: "",
            isValid: false,
            readOnly: true
          },
          partnerkey: {
            value: "",
            error: "",
            isValid: false,
            readOnly: true
          },
          logo: {
            value: "",
            error: "",
            isValid: false
          },
          location: {
            value: "",
            error: "",
            isValid: false
          },
          address: {
            value: "",
            error: "",
            isValid: false
          },
          email: {
            value: "",
            error: "",
            isValid: false
          },
          overview: {
            value: "",
            error: "",
            isValid: false
          },
          images: {
            uploading: false,
            uploadProgress: 0,
            value: "",
            error: "",
            isValid: false
          },
          homepage: {
            value: "",
            error: "",
            isValid: false
          },
          instagram: {
            value: "",
            error: "",
            isValid: false
          },
          linkedin: {
            value: "",
            error: "",
            isValid: false
          },
          twitter: {
            value: "",
            error: "",
            isValid: false
          },
          workingfields: {
            value: "",
            error: "",
            isValid: false
          }
        },
        backgroundData: {}
      },
      combo: {
        coworking_working_field: {
          hasLoaded: false,
          items: []
        }
      }
    };
  }

  //-------------------------------------Filter request --------------------------------------//
  // Functionality:
  //    1- If user clicks on filter requests tab inside partner panel this function will be call

  filterTabs = (filter, e, callback) => {
    this.setState({
      filterContext: {
        ...this.state.filterContext,
        activeFilter: filter,
        loading: true
      }
    });
    if (this.filters[filter]) {
      filter = this.filters[filter];
    } else {
      filter = null;
    }
    if (typeof e === "object" && e.length === undefined) {
      const filterButtons = Array.from(
        document.getElementsByClassName("filter-button")
      );
      filterButtons.forEach(button => {
        button.classList.remove("active");
      });
      e.target.classList.add("active");
    }
  };
  updatePartnerInfo = callback => {
    GetPartnerInfo({ "fields.phonenumber": this.context.auth.ID }, res => {
      if (res.success_result.success) {
        const { _id } = res.data[0];
        this.setState(
          {
            partnerData: res.data[0],
            partnerId: _id,
            pageLoaded: true
          },
          () => typeof callback === "function" && callback()
        );
      }
    });
  };

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
      didDataChange: true, //make didDataChange state true if it used to be false before
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
  // submitForm = () => {
  //   const { locale } = this.translate;
  //   const _this = this;
  //   const inputs = this.state.form.fields;
  //   let _isValid = this.checkFormValidation();
  //   const _backgroundData = this.state.form.backgroundData;
  //   let _formObjectGoingToSubmit = {};
  //   //if form was valid then convert state form to api form
  //   // if the form was valid then submit it
  //   if (_isValid) {
  //     for (let index in inputs) {
  //       _formObjectGoingToSubmit[index] = inputs[index].value;
  //     }
  //     this.validatePhoneNumber(true, () => {
  //       // fetch additional background data state to final api object if form was valid
  //       const { seats, city, phonenumber } = _formObjectGoingToSubmit;
  //       _formObjectGoingToSubmit["phonenumber"] =
  //         this.state.form.fields.phonenumber.code + phonenumber;
  //       let cityname = locale.email_subject[2];
  //       this.state.combo.list_of_cities.items.forEach(curr => {
  //         if (curr.value === city) {
  //           cityname = curr.title;
  //         }
  //       });
  //       _formObjectGoingToSubmit[
  //         "name"
  //       ] = `${locale.email_subject[0]} ${seats} ${locale.email_subject[1]} ${cityname}`;
  //       _formObjectGoingToSubmit = {
  //         ..._formObjectGoingToSubmit,
  //         ..._backgroundData
  //       };
  //       this.setState(
  //         {
  //           form: {
  //             ...this.state.form,
  //             isSubmitting: true
  //           }
  //         },
  //         () => {
  //           SubmitForm(_this.contentTypeName, _formObjectGoingToSubmit, res => {
  //             if (res.success) {
  //               this.setState({
  //                 form: {
  //                   ...this.state.form,
  //                   submitted: true
  //                 }
  //               });
  //             } else {
  //               this.setState({
  //                 form: {
  //                   ...this.state.form,
  //                   isSubmitting: false
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       );
  //     });
  //   }
  // };
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
    const { lang } = this;
    FilterContents(name, res => {
      const arr = [];
      SafeValue(res, "data", "object", []).map((val, key) => {
        arr.push({
          title: SafeValue(val.fields, `name.${lang}`, "string", null, "name"),
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
    //Initial datas which are going to display in partner panel
    this.updatePartnerInfo();
  }
  render() {
    const { locale, direction } = this.translate;
    const { loading, activeFilter } = this.state.filterContext;
    const {
      filterContext,
      pageLoaded,
      partnerData,
      didDataChange,
      form
    } = this.state;
    const { fields } = this.state.form;
    if (pageLoaded) {
      return (
        <section
          className={classnames(
            "partner-profile-section form-section",
            `_${direction}`
          )}
          style={{
            backgroundColor: "whitesmoke",
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <React.Fragment>
            <Card className="form-card">
              {/* Approved requests */}
              <CardHeader>
                <nav className="card-header-nav filter">
                  <button
                    className="filter-button"
                    onClick={button => this.filterTabs("details", button)}
                  >
                    {locale.card_header.details}
                  </button>
                  <button
                    className="filter-button"
                    onClick={button => this.filterTabs("imagealbum", button)}
                  >
                    {locale.card_header.image_album}
                  </button>
                  <button
                    className="filter-button"
                    onClick={button => this.filterTabs("map", button)}
                  >
                    {locale.card_header.map}
                  </button>
                  <button
                    className="filter-button"
                    onClick={button => this.filterTabs("setting", button)}
                  >
                    {locale.card_header.setting}
                  </button>
                </nav>
              </CardHeader>
              <CardBody>
                {/************ Details ************/}
                {activeFilter === "details" && (
                  <React.Fragment>
                    <FlatInput
                      label={locale.fields.name}
                      type="text"
                      direction={locale.direction}
                      name="name"
                      id="name"
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.name",
                        "string",
                        null
                      )}
                      onChange={this.formStateHandler}
                      error={fields.name.error}
                    />
                    <FlatInput
                      label={locale.fields.regno}
                      type="text"
                      direction={locale.direction}
                      name="regno"
                      id="regno"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.regno",
                        "string",
                        null
                      )}
                      error={fields.regno.error}
                    />
                    <FlatInput
                      label={locale.fields.email}
                      type="text"
                      direction={locale.direction}
                      name="email"
                      id="email"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.email",
                        "string",
                        null
                      )}
                      error={fields.email.error}
                    />
                    <FlatInput
                      label={locale.fields.phonenumber}
                      type="text"
                      direction={locale.direction}
                      name="phonenumber"
                      id="phonenumber"
                      readOnly
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.phonenumber",
                        "string",
                        null
                      )}
                      error={fields.phonenumber.error}
                    />
                    <FlatInput
                      label={locale.fields.homepage}
                      type="text"
                      direction={locale.direction}
                      name="homepage"
                      id="homepage"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.homepage",
                        "string",
                        null
                      )}
                      error={fields.homepage.error}
                    />
                    <FlatInput
                      label={locale.fields.linkedin}
                      type="text"
                      direction={locale.direction}
                      name="linkedin"
                      id="linkedin"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.linkedin",
                        "string",
                        null
                      )}
                      error={fields.linkedin.error}
                    />
                    <FlatInput
                      label={locale.fields.twitter}
                      type="text"
                      direction={locale.direction}
                      name="twitter"
                      id="twitter"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.twitter",
                        "string",
                        null
                      )}
                      error={fields.twitter.error}
                    />
                    <FlatInput
                      label={locale.fields.capacity}
                      type="number"
                      direction={locale.direction}
                      name="capacity"
                      id="capacity"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.capacity",
                        "string",
                        null
                      )}
                      error={fields.capacity.error}
                    />
                    <FlatInput
                      label={locale.fields.partnerkey}
                      type="text"
                      direction={locale.direction}
                      name="partnerkey"
                      id="partnerkey"
                      onChange={this.formStateHandler}
                      readOnly
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.partnerkey",
                        "string",
                        null
                      )}
                      error={fields.partnerkey.error}
                    />
                    <br />
                    <FlatTextArea
                      label={locale.fields.overview}
                      name="overview"
                      id="overview"
                      direction={locale.direction}
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.overview",
                        "string",
                        null
                      )}
                      error={fields.overview.error}
                      style={{ height: "150px", width: "100%" }}
                    />
                  </React.Fragment>
                )}
                {activeFilter === "imagealbum" && (
                  <React.Fragment>
                    <FlatInput
                      label={locale.fields.name}
                      type="text"
                      name="name"
                      id="name"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.name",
                        "string",
                        null
                      )}
                      error={fields.fullname.error}
                    />
                    <FlatInput
                      label={locale.fields.regno}
                      type="text"
                      name="regno"
                      id="regno"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        partnerData,
                        "fields.regno",
                        "string",
                        null
                      )}
                      error={fields.regno.error}
                    />
                  </React.Fragment>
                )}
                {/* {activeFilter === "map" && (

                )}
                {activeFilter === "setting" && (

                )} */}
              </CardBody>
              <CardFooter>
                <FlatButton
                  disabled={!didDataChange}
                  suspense={form.isSubmitting}
                  colorr="success"
                >
                  {locale.fields.submit_changes}
                </FlatButton>
              </CardFooter>
            </Card>
          </React.Fragment>
        </section>
      );
    } else {
      return <PageSuspense />;
    }
  }
}
