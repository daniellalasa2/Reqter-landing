import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import {
  SafeValue,
  GetPartnerInfo,
  FilterContents,
  PartnerpanelUpdateSetting
} from "../../ApiHandlers/ApiHandler";
import Validator from "../../Validator/Validator";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faList } from "@fortawesome/free-solid-svg-icons";
import ContextApi from "../../ContextApi/ContextApi";
import classnames from "classnames";
import PageSuspense from "../../PageSuspense";
import {
  FlatInput,
  FlatTextArea,
  FlatButton,
  FlatInlineSelect,
  FlatJsonInput,
  FlatUploader,
  FlatImageUploaderApiIncluded
} from "../../FlatForm/FlatForm";
import Skeleton from "react-loading-skeleton";
import "./PartnerSetting.scss";
import markerUrl from "../../../assets/images/map-marker.png";
import NoImageAlt from "../../../assets/images/alternatives/noimage.png";
import MapWithMarker from "../../SimpleMap/SimpleMap.js";
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
      partnerData: [],
      parnterId: "",
      filterContext: {
        activeFilter: "details",
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
          city: {
            value: "",
            error: "",
            isValid: false
          },
          amenities: {
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
            value: [],
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
          },
          collaborationtypes: {
            value: "",
            error: "",
            isValid: false
          }
        },
        backgroundData: {}
      },
      combo: {
        list_of_cities: {
          hasLoaded: false,
          items: {}
        },
        partnership_working_fields: {
          hasLoaded: false,
          items: {}
        },
        coworking_working_field: {
          hasLoaded: false,
          items: {}
        },
        amenities: {
          hasLoaded: false,
          items: {}
        }
      }
    };
    this.validationRules = {
      name: ["required"],
      regno: ["required"],
      collaborationtypes: ["required"],
      workingfields: ["required"],
      email: ["email"],
      homepage: ["url"],
      city: ["required"],
      partnership_working_fields: ["required"],
      coworking_working_field: ["required"]
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
    const fields = { ...this.state.form.fields };
    GetPartnerInfo({ "fields.phonenumber": this.context.auth.ID }, res => {
      if (res.success_result.success) {
        const _SafeValue = SafeValue;
        const result = _SafeValue(res, "data.0.fields", "object", {});
        const _id = _SafeValue(res, "data.0._id", "string", "");
        for (let dataIdx in result) {
          switch (dataIdx) {
            case "amenities":
            case "collaborationtypes":
            case "workingfields":
              fields[dataIdx] = {
                ...fields[dataIdx],
                value: _SafeValue(result, dataIdx, "object", []).map(
                  item => item._id
                ),
                isValid: true
              };
              break;
            case "country":
            case "city":
              fields[dataIdx] = {
                ...fields[dataIdx],
                value: _SafeValue(result, `${dataIdx}._id`, "string", ""),
                isValid: true
              };
              break;
            default:
              fields[dataIdx] = {
                ...fields[dataIdx],
                value: _SafeValue(result, dataIdx, "all", null),
                isValid: true
              };
          }
        }
        this.setState(
          {
            partnerData: _SafeValue(res, "data.0", "object", {}),
            partnerId: _id,
            pageLoaded: true,
            form: {
              ...this.state.form,
              isValid: true,
              fields: fields
            }
          },
          () =>
            typeof callback === "function" &&
            callback(_SafeValue(res, "data.0", "object", {}))
        );
      }
    });
  };
  handleAlbumUploadedImages = (name, res) => {
    const { value } = this.state.form.fields[name];
    let arr = Array.isArray(value) ? Array.from(value) : [];
    if (res.data.replace) {
      arr[arr.indexOf(res.data.prev_file)] = SafeValue(
        res,
        "data.file.url",
        "string",
        ""
      );
    } else {
      arr.push(res.data.file.url);
    }
    this.setState({
      didDataChange: true,
      form: {
        ...this.state.form,
        fields: {
          ...this.state.form.fields,
          [name]: {
            ...this.state.form.fields[name],
            value: arr
          }
        }
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
      didDataChange: true,
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
  submitForm = () => {
    const { locale } = this.translate;
    const _this = this;
    const inputs = this.state.form.fields;
    let _isValid = true; //this.checkFormValidation();
    let _formObjectGoingToSubmit = {};
    //if form was valid then convert state form to api form
    // if the form was valid then submit it
    if (_isValid) {
      for (let index in inputs) {
        _formObjectGoingToSubmit[index] = inputs[index].value;
      }
      this.setState({
        form: {
          ...this.state.form,
          isSubmitting: true
        }
      });
      PartnerpanelUpdateSetting(
        _this.state.partnerId,
        _formObjectGoingToSubmit,
        res => {
          if (res.success_result.success) {
            this.setState(
              {
                didDataChange: false,
                form: {
                  ...this.state.form,
                  submitted: true,
                  isSubmitting: false
                }
              },
              this.context.displayNotif(
                "success",
                locale.notification.update_partner.success
              )
            );
          } else {
            this.setState(
              {
                form: {
                  ...this.state.form,
                  isSubmitting: false
                }
              },
              this.context.displayNotif(
                "error",
                locale.notification.update_partner.failed
              )
            );
          }
        }
      );
    }
  };
  // uploadFile = e => {
  //   const { locale } = this.translate;
  //   let file = "";
  //   try {
  //     file = e.target.files[0];
  //   } catch (err) {
  //     this.setState({
  //       form: {
  //         ...this.state.form,
  //         fields: {
  //           ...this.state.form.fields,
  //           resume: {
  //             ...this.state.form.fields.resume,
  //             error: locale.fields.resume.error
  //           }
  //         }
  //       }
  //     });
  //     return 0;
  //   }
  //   this.setState(
  //     {
  //       form: {
  //         ...this.state.form,
  //         fields: {
  //           ...this.state.form.fields,
  //           resume: {
  //             ...this.state.form.fields.resume,
  //             uploading: true
  //           }
  //         }
  //       }
  //     },
  //     () => {
  //       Upload(
  //         file,
  //         res => {
  //           if (res.data.success) {
  //             this.setState({
  //               form: {
  //                 ...this.state.form,
  //                 fields: {
  //                   ...this.state.form.fields,
  //                   resume: {
  //                     ...this.state.form.fields.resume,
  //                     isValid: true,
  //                     value: [{ en: res.data.file.url, fa: res.data.file.url }],
  //                     uploading: false,
  //                     error: ""
  //                   }
  //                 }
  //               }
  //             });
  //           } else {
  //             this.setState({
  //               form: {
  //                 ...this.state.form,
  //                 fields: {
  //                   ...this.state.form.fields,
  //                   resume: {
  //                     ...this.state.form.fields.resume,
  //                     error: res.success_result.message,
  //                     uploading: false
  //                   }
  //                 }
  //               }
  //             });
  //           }
  //         },
  //         uploadDetail => {
  //           this.setState({
  //             form: {
  //               ...this.state.form,
  //               fields: {
  //                 ...this.state.form.fields,
  //                 resume: {
  //                   ...this.state.form.fields.resume,
  //                   uploadProgress: uploadDetail.progress
  //                 }
  //               }
  //             }
  //           });
  //         }
  //       );
  //     }
  //   );
  // };
  urlParser = url => {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  };
  // generateCheckboxDataFromApi = (name, defaultChecked) => {
  //   const { lang } = this;
  //   FilterContents(name, res => {
  //     const arr = [];
  //     SafeValue(res, "data", "object", []).map((val, key) => {
  //       arr.push({
  //         title: SafeValue(val.fields, `name.${lang}`, "string", null, "name"),
  //         key: val._id,
  //         boxValue: key + 1,
  //         dir: "rtl",
  //         value: val._id,
  //         defaultChecked: defaultChecked && defaultChecked === val._id
  //       });
  //       return null;
  //     });
  //     this.setState({
  //       combo: {
  //         ...this.state.combo,
  //         [name]: {
  //           hasLoaded: true,
  //           items: arr
  //         }
  //       }
  //     });
  //   });
  // };
  createImageAlbum = (items, count) => {
    const generatedElements = [];
    for (var i = 0; i < count; i++) {
      generatedElements.push(
        <React.Fragment key={i}>
          <FlatImageUploaderApiIncluded
            onChange={this.handleAlbumUploadedImages}
            defaultUrl={
              Array.isArray(items) &&
              SafeValue(items, String(i), "string", false)
                ? items[i]
                : undefined
            }
            name="images"
            innerText="انتخاب عکس"
          />
        </React.Fragment>
      );
    }
    return generatedElements;
  };
  generateCheckboxDataFromApi = (name, defaultChecked) => {
    const { lang } = this;
    const _defaultChecked = (checkedObj, toBeSearch) => {
      const typeofCheckedObj = typeof checkedObj;
      if (Array.isArray(defaultChecked)) {
        return checkedObj.indexOf(toBeSearch) > -1;
      } else if (
        typeofCheckedObj === "string" ||
        typeofCheckedObj === "number" ||
        typeofCheckedObj === "boolean"
      ) {
        return checkedObj === toBeSearch;
      } else {
        return false;
      }
    };
    FilterContents(name, res => {
      const arr = [];
      SafeValue(res, "data", "object", []).map((val, key) => {
        arr.push({
          title: SafeValue(val.fields, `name.${lang}`, "string", null, "name"),
          key: val._id,
          boxValue: key + 1,
          dir: "rtl",
          value: val._id,
          defaultChecked: _defaultChecked(defaultChecked, val._id)
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
  componentDidUpdate() {
    const { pageLoaded } = this.state;
    const {
      list_of_cities,
      partnership_working_fields,
      coworking_working_field
    } = this.state.combo;
    //checkif pageLoaded(means partner info data stored into current component state) and combos have not been loaded yet
    if (
      pageLoaded &&
      !list_of_cities.hasLoaded &&
      !partnership_working_fields.hasLoaded &&
      !coworking_working_field.hasLoaded
    ) {
      this.generateCheckboxDataFromApi(
        "list_of_cities",
        SafeValue(this.state.form, "fields.city.value", "string", "0")
      );
      this.generateCheckboxDataFromApi(
        "partnership_working_fields",
        SafeValue(
          this.state.form,
          "fields.collaborationtypes.value",
          "object",
          []
        )
      );
      this.generateCheckboxDataFromApi(
        "coworking_working_field",
        SafeValue(this.state.form, "fields.workingfields.value", "object", [])
      );
      this.generateCheckboxDataFromApi(
        "amenities",
        SafeValue(this.state.form, "fields.amenities.value", "object", "0")
      );
    }
  }
  componentDidMount() {
    //Initial datas which are going to display in partner panel
    this.updatePartnerInfo();
  }
  // componentWillUnmount() {
  // }
  render() {
    const { locale, direction } = this.translate;
    const { activeFilter } = this.state.filterContext;
    const { filterContext, pageLoaded, didDataChange, form } = this.state;
    const { fields } = this.state.form;
    const partnerData = form.fields;
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
                    className="filter-button active"
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
                <section
                  className={classnames(
                    "contentSection",
                    activeFilter === "details" && "displaySection"
                  )}
                >
                  <React.Fragment>
                    <FlatInput
                      label={locale.fields.name}
                      type="text"
                      direction={locale.direction}
                      name="name"
                      id="name"
                      defaultValue={SafeValue(
                        form,
                        "fields.name.value",
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
                        form,
                        "fields.regno.value",
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
                        form,
                        "fields.email.value",
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
                      style={{ direction: "ltr" }}
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        form,
                        "fields.phonenumber.value",
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
                        form,
                        "fields.homepage.value",
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
                        form,
                        "fields.linkedin.value",
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
                        form,
                        "fields.twitter.value",
                        "string",
                        null
                      )}
                      error={fields.twitter.error}
                    />
                    <FlatInput
                      label={locale.fields.instagram}
                      type="text"
                      direction={locale.direction}
                      name="instagram"
                      id="instagram"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        form,
                        "fields.instagram.value",
                        "string",
                        null
                      )}
                      error={fields.instagram.error}
                    />
                    <FlatInput
                      label={locale.fields.capacity}
                      type="number"
                      direction={locale.direction}
                      name="capacity"
                      id="capacity"
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        form,
                        "fields.capacity.value",
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
                        form,
                        "fields.partnerkey.value",
                        "string",
                        null
                      )}
                      error={fields.partnerkey.error}
                    >
                      {SafeValue(
                        form,
                        "fields.partnerkey.value",
                        "string",
                        false
                      ) && (
                        <Link
                          to={`/${this.lang}/p/${form.fields.partnerkey.value}`}
                          target="_blank"
                          style={{
                            float: "right",
                            display: "inline-block",
                            textAlign: "right",
                            fontSize: "14px",
                            marginTop: "0px",
                            width: "100%"
                          }}
                        >
                          {locale.fields.visit_profile}
                        </Link>
                      )}
                    </FlatInput>
                    <br />
                    <div className="field-row" style={{ width: "100%" }}>
                      <span className="field-title">
                        {locale.fields.amenities}
                      </span>

                      {/* fill checkboxes */}
                      {this.state.combo.amenities.hasLoaded ? (
                        <FlatInlineSelect
                          type="checkbox"
                          items={this.state.combo.amenities.items}
                          onChange={this.checkboxStateHandler}
                          dir={direction}
                          name="amenities"
                        />
                      ) : (
                        <Skeleton count={2} style={{ lineHeight: 2 }} />
                      )}
                      <span className="error-message">
                        {this.state.form.fields.amenities.error}
                      </span>
                    </div>
                    <FlatTextArea
                      label={locale.fields.overview}
                      name="overview"
                      id="overview"
                      direction={locale.direction}
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        form,
                        "fields.overview.value",
                        "string",
                        null
                      )}
                      error={fields.overview.error}
                      style={{
                        height: "150px",
                        width: "96.3%"
                      }}
                    />
                  </React.Fragment>
                </section>
                <section
                  className={classnames(
                    "contentSection",
                    activeFilter === "imagealbum" && "displaySection"
                  )}
                >
                  <React.Fragment>
                    <span style={{ width: "100%", margin: "1rem 0 0.5rem" }}>
                      لوگو
                    </span>
                    <FlatImageUploaderApiIncluded
                      onChange={this.handleAlbumUploadedImages}
                      name="logo"
                      innerText="تغییر عکس"
                      defaultUrl={SafeValue(
                        form,
                        "fields.logo.value.0",
                        "string",
                        ""
                      )}
                    />

                    <br />
                    <br />
                    <div className="albumImageUploaderWrapper">
                      <span style={{ width: "100%", margin: "1rem 0 0.5rem" }}>
                        آلبوم عکس
                      </span>
                      <br />
                      {this.createImageAlbum(
                        this.state.form.fields.images.value,
                        10
                      )}
                    </div>
                  </React.Fragment>
                </section>

                <section
                  className={classnames(
                    "contentSection",
                    activeFilter === "map" && "displaySection"
                  )}
                >
                  <React.Fragment>
                    <div className="field-row" style={{ width: "100%" }}>
                      <span className="field-title">{locale.fields.city}</span>

                      {/* fill checkboxes */}
                      {this.state.combo.list_of_cities.hasLoaded ? (
                        <FlatInlineSelect
                          type="radio"
                          items={this.state.combo.list_of_cities.items}
                          onChange={this.checkboxStateHandler}
                          dir={direction}
                          name="city"
                        />
                      ) : (
                        <Skeleton count={2} style={{ lineHeight: 2 }} />
                      )}
                      <span className="error-message">
                        {this.state.form.fields.city.error}
                      </span>
                    </div>
                    <FlatTextArea
                      label={locale.fields.address}
                      name="address"
                      id="address"
                      direction={locale.direction}
                      onChange={this.formStateHandler}
                      defaultValue={SafeValue(
                        form,
                        `fields.address.value.${this.lang}`,
                        "string",
                        null,
                        "fields.address.value"
                      )}
                      error={fields.address.error}
                      style={{
                        height: "83px"
                      }}
                      wrapperStyle={{ width: "100%" }}
                    />
                    <br />
                    <div id="map">
                      {/* Map component */}
                      <span className="field-title">
                        {locale.fields.location}
                        <small
                          style={{ display: "block" }}
                          className="field-title"
                        >
                          {locale.fields.location_help}
                        </small>
                      </span>
                      <br />
                      <MapWithMarker
                        center={{
                          lat: SafeValue(
                            fields,
                            "location.value.latitude",
                            "all",
                            32.4279
                          ),
                          lng: SafeValue(
                            fields,
                            "location.value.longitude",
                            "all",
                            53.688
                          )
                        }}
                        defaultCenter={{ lat: 32.4279, lng: 53.688 }}
                        className="mapWithMarker"
                        defaultMarkerPosition={{ lat: 32.4279, lng: 53.688 }}
                        zoom={13}
                        markerPosition={{
                          lat: SafeValue(
                            fields,
                            "location.value.latitude",
                            "all",
                            32.4279
                          ),
                          lng: SafeValue(
                            fields,
                            "location.value.longitude",
                            "all",
                            53.688
                          )
                        }}
                        draggable={true}
                        onMarkerUpdate={position =>
                          this.formStateHandler({
                            target: {
                              name: "location",
                              value: {
                                latitude: position.lat,
                                longitude: position.lng
                              }
                            }
                          })
                        }
                        static={false}
                        dragMarkerMessage={locale.fields.location_help}
                        locationName={this.state.form.fields.name.value}
                      />
                    </div>
                  </React.Fragment>
                </section>

                <section
                  className={classnames(
                    "contentSection",
                    activeFilter === "setting" && "displaySection"
                  )}
                >
                  <div className="field-row">
                    <span className="field-title">
                      {locale.fields.collaborationtypes}
                    </span>

                    {/* fill checkboxes */}
                    {this.state.combo.partnership_working_fields.hasLoaded ? (
                      <FlatInlineSelect
                        type="checkbox"
                        items={
                          this.state.combo.partnership_working_fields.items
                        }
                        onChange={this.checkboxStateHandler}
                        dir={direction}
                        name="collaborationtypes"
                      />
                    ) : (
                      <Skeleton count={2} style={{ lineHeight: 2 }} />
                    )}
                    <span className="error-message">
                      {this.state.form.fields.collaborationtypes.error}
                    </span>
                  </div>
                  <br />
                  <div className="field-row">
                    <span className="field-title">
                      {locale.fields.workingfields}
                    </span>

                    {/* fill checkboxes */}
                    {this.state.combo.coworking_working_field.hasLoaded ? (
                      <FlatInlineSelect
                        type="checkbox"
                        items={this.state.combo.coworking_working_field.items}
                        onChange={this.checkboxStateHandler}
                        dir={direction}
                        name="workingfields"
                      />
                    ) : (
                      <Skeleton count={2} style={{ lineHeight: 2 }} />
                    )}
                    <span className="error-message">
                      {this.state.form.fields.workingfields.error}
                    </span>
                  </div>
                  <br />
                  <FlatJsonInput
                    onChange={this.formStateHandler}
                    name="workinghours"
                    text={{
                      remove: locale.fields.remove,
                      addButton: locale.fields.add_working_hour_row,
                      keyText: locale.fields.workinghours_key,
                      valueText: locale.fields.workinghours_value,
                      duplicateKeyError: locale.fields.duplcation_keys_error,
                      emptyKey: locale.fields.empty_key
                    }}
                    defaultItem={SafeValue(
                      form,
                      "fields.workinghours.value",
                      "string",
                      {}
                    )}
                  />
                </section>
              </CardBody>
              <CardFooter>
                <FlatButton
                  disabled={!didDataChange}
                  suspense={form.isSubmitting}
                  color="success"
                  onClick={this.submitForm}
                  style={{
                    minWidth: "120px",
                    float: "left",
                    marginLeft: "14px"
                  }}
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
