import React from "react";
import "./IssueOffer.scss";
import {
  FlatImageSelect,
  FlatInput,
  FlatTextArea,
  FlatButton
} from "../../FlatForm/FlatForm";
import Validator from "../../Validator/Validator";
import { Button } from "reactstrap";
import {
  SafeValue,
  PartnerpanelIssueOffer,
  DownloadAsset
} from "../../ApiHandlers/ApiHandler";
import PersianNumber, { addCommas } from "../../PersianNumber/PersianNumber";
import NoImageAlt from "../../../assets/images/alternatives/noimage.png";
import classnames from "classnames";
import NumberFormat from "react-number-format";
import ContextApi from "../../ContextApi/ContextApi";
export default class IssueOffer extends React.Component {
  static contextType = ContextApi;
  constructor(props) {
    super(props);
    this.lang = props.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.state = {
      currentStep: 1,
      stepsValidation: {
        //Button will be disable if each step validation was false
        1: false,
        2: false,
        3: true
      },
      selectedProduct: {},
      form: {
        isValid: false, //Form validation
        submitted: false,
        isSubmitting: false,
        fields: {
          name: {
            value: "",
            error: "",
            isValid: true
          },
          hourlyprice: {
            value: "",
            error: "",
            isValid: true
          },
          dailyprice: {
            value: "",
            error: "",
            isValid: true
          },
          weeklyprice: {
            value: "",
            error: "",
            isValid: true
          },
          monthlyprice: {
            value: "",
            error: "",
            isValid: true
          },
          description: {
            value: "",
            error: "",
            isValid: true
          },
          startdate: {
            value: "",
            error: "",
            isValid: false
          }
        },
        backgroundData: {
          city: props.data.city,
          country: props.data.country,
          productid: "",
          partnerid: props.data.partnerid,
          requestid: props.data.requestid,
          stage: props.data.stage
        }
      }
    };
    this.validationRules = {
      name: ["required"],
      startdate: ["required", "date"]
    };
    this.productsDataForCheckbox = this.convertProductsDataToCheckboxData(
      props.data.partnerProducts
    );
  }
  convertProductsDataToCheckboxData = productObj => {
    const productArr = [];
    productObj.forEach((product, idx) => {
      if (
        product.status === "published" &&
        SafeValue(product, "fields.itemstatus", "string", null) === "active"
      ) {
        productArr.push({
          imgSrc: DownloadAsset(
            SafeValue(
              product,
              `fields.media.0.${this.lang}`,
              "string",
              "",
              "fields.media"
            )
          ),
          title: SafeValue(
            product,
            `fields.name.${this.lang}`,
            "string",
            "---",
            "fields.name"
          ),
          value: JSON.stringify(product),
          key: idx
        });
      }
    });
    return productArr;
  };
  checkboxStateHandler = (name, data, callback) => {
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
    this.setState(
      {
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
      },
      () => typeof callback === "function" && callback()
    );
  };
  formStateHandler = (name, value, callback) => {
    const validation = Validator(
      value,
      SafeValue(this.validationRules, name, "object", []),
      this.lang
    );
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
      () => {
        this.checkFormValidation();
        if (typeof callback === "function") {
          callback();
        }
      }
    );
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
  forwardToStep = (tabNumber, callback) => {
    this.setState(
      {
        currentStep: tabNumber
      },
      () => typeof callback === "function" && callback(tabNumber)
    );
  };
  submitOffer = () => {
    const inputs = this.state.form.fields;
    const { locale } = this.translate;
    let _isValid = this.checkFormValidation();
    const _backgroundData = this.state.form.backgroundData;
    let _formObjectGoingToSubmit = {};
    //if form was valid then convert state form to api form
    // if the form was valid then submit it
    if (_isValid) {
      for (let index in inputs) {
        _formObjectGoingToSubmit[index] = inputs[index].value;
      }

      // fetch additional background data state to final api object if form was valid
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
          PartnerpanelIssueOffer(_formObjectGoingToSubmit, res => {
            const { success } = res.success_result;
            this.setState(
              {
                form: {
                  ...this.state.form,
                  submitted: success,
                  isSubmitting: false
                }
              },
              () => {
                if (success) {
                  return this.context.displayNotif(
                    "success",
                    locale.notification.issue_offer.success,
                    () =>
                      typeof this.props.callback === "function" &&
                      this.props.callback()
                  );
                } else {
                  return this.context.displayNotif(
                    "error",
                    locale.notification.issue_offer.failed
                  );
                }
              }
            );
          });
        }
      );
    }
  };
  submitSelectedProduct = (name, checkedObj) => {
    const productParsedObj = JSON.parse(checkedObj.value);
    const { backgroundData, fields } = this.state.form;
    checkedObj = JSON.parse(checkedObj.value);
    this.setState({
      selectedProduct: productParsedObj,
      stepsValidation: {
        ...this.state.stepsValidation,
        1: true
      },
      form: {
        ...this.state.form,
        fields: {
          ...fields,
          hourlyprice: {
            ...fields.hourlyprice,
            value: SafeValue(checkedObj, "fields.perhourprice", "string", "")
          },
          dailyprice: {
            ...fields.dailyprice,
            value: SafeValue(checkedObj, "fields.dailyprice", "string", "")
          },
          weeklyprice: {
            ...fields.weeklyprice,
            value: SafeValue(checkedObj, "fields.weeklyprice", "string", "")
          },
          monthlyprice: {
            ...fields.monthlyprice,
            value: SafeValue(checkedObj, "fields.monthlyprice", "string", "")
          }
        },
        backgroundData: {
          ...backgroundData,
          productid: productParsedObj._id
        }
      }
    });
  };
  thousandSeprator = (number, reverseOperation) => {
    // Remove the number commas
    number = number
      .toString()
      .split(",")
      .join("");
    if (!reverseOperation) return PersianNumber(addCommas(number), this.lang);
    else return number;
  };
  render() {
    const { currentStep, stepsValidation, form, selectedProduct } = this.state;
    const { locale, direction } = this.translate;
    return (
      <div
        id="issueOffer"
        className={classnames("issueOffer", `_${direction}`)}
      >
        {currentStep === 1 && (
          <div className="issueOffer-step -step1">
            <span className="chooseAProduct">
              {locale.step1.choose_a_product}
            </span>
            <FlatImageSelect
              className="product-items"
              items={this.productsDataForCheckbox}
              onChange={(name, checkedObj) =>
                this.submitSelectedProduct(name, checkedObj)
              }
              imgAltSrc={NoImageAlt}
              type="radio"
              name="offeredProduct"
            />
            <div className="field-row">
              <Button
                color="primary"
                disabled={!stepsValidation[currentStep]}
                onClick={() => this.forwardToStep(2)}
              >
                {locale.step1.next_step_button}
              </Button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="issueOffer-step -step2">
            <FlatInput
              label={locale.fields.name._title}
              type="text"
              placeholder={locale.fields.name.placeholder}
              name="name"
              id="name"
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.name.error}
            />
            <div className="field-row">
              <span className="field-title">
                {locale.fields.startdate._title}
              </span>

              <div className="FlatTimePicker">
                <NumberFormat
                  mask=" _ "
                  format="####-##-##"
                  type="text"
                  name="startdate"
                  placeholder={locale.fields.startdate.placeholder}
                  onChange={e =>
                    this.formStateHandler(e.target.name, e.target.value)
                  }
                  style={{
                    direction: "ltr",
                    textAlign: direction === "rtl" ? "right" : "left"
                  }}
                />
                <span className="error-message">
                  {this.state.form.fields.startdate.error}
                </span>
              </div>
            </div>
            <FlatInput
              label={locale.fields.hourlyprice._title}
              type="text"
              name="hourlyprice"
              id="hourlyprice"
              defaultValue={this.thousandSeprator(
                SafeValue(selectedProduct, "fields.perhourprice", "string", 0)
              )}
              onChange={e => {
                e.target.value = this.thousandSeprator(e.target.value, false);
                const apiData = this.thousandSeprator(e.target.value, true);
                this.formStateHandler(e.target.name, apiData);
              }}
              error={this.state.form.fields.hourlyprice.error}
            />
            <FlatInput
              label={locale.fields.dailyprice._title}
              type="text"
              name="dailyprice"
              defaultValue={this.thousandSeprator(
                SafeValue(selectedProduct, "fields.dailyprice", "string", 0)
              )}
              id="dailyprice"
              onChange={e => {
                e.target.value = this.thousandSeprator(e.target.value, false);
                const apiData = this.thousandSeprator(e.target.value, true);
                this.formStateHandler(e.target.name, apiData);
              }}
              error={this.state.form.fields.dailyprice.error}
            />
            <FlatInput
              label={locale.fields.weeklyprice._title}
              type="text"
              name="weeklyprice"
              defaultValue={this.thousandSeprator(
                SafeValue(selectedProduct, "fields.weeklyprice", "string", 0)
              )}
              data-value={this.thousandSeprator(
                SafeValue(selectedProduct, "fields.weeklyprice", "string", 0)
              )}
              id="weeklyprice"
              onChange={e => {
                e.target.value = this.thousandSeprator(e.target.value, false);
                const apiData = this.thousandSeprator(e.target.value, true);
                this.formStateHandler(e.target.name, apiData);
              }}
              error={this.state.form.fields.weeklyprice.error}
            />
            <FlatInput
              label={locale.fields.monthlyprice._title}
              type="text"
              name="monthlyprice"
              id="monthlyprice"
              data-value={this.thousandSeprator(
                SafeValue(selectedProduct, "fields.weeklyprice", "string", 0)
              )}
              defaultValue={this.thousandSeprator(
                SafeValue(selectedProduct, "fields.monthlyprice", "string", 0)
              )}
              onChange={e => {
                e.target.value = this.thousandSeprator(e.target.value, false);
                const apiData = this.thousandSeprator(e.target.value, true);
                this.formStateHandler(e.target.name, apiData);
              }}
              error={this.state.form.fields.monthlyprice.error}
            />

            <FlatTextArea
              label={locale.fields.description._title}
              type="text"
              placeholder={locale.fields.description.placeholder}
              name="description"
              id="description"
              data-value=""
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.description.error}
            />
            <br />
            <FlatButton
              color="primary"
              disabled={!form.isValid}
              suspense={this.state.form.isSubmitting}
              onClick={() => this.submitOffer()}
            >
              {locale.step2.submit_offer_button}
            </FlatButton>
          </div>
        )}
      </div>
    );
  }
}
