import React from "react";
import "./AddProduct.scss";
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
  PartnerpanelAddProduct
} from "../../ApiHandlers/ApiHandler";
import { thousandSeprator } from "../../../assets/script/thousandSeprator";
import NoImageAlt from "../../../assets/images/alternatives/noimage.png";
import classnames from "classnames";
// import NumberFormat from "react-number-format";
import ContextApi from "../../ContextApi/ContextApi";
export default class AddProduct extends React.Component {
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
      selectedProductType: {},
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
          code: {
            value: "",
            error: "",
            isValid: true
          },
          count: {
            value: "",
            error: "",
            isValid: true
          },
          media: {
            value: "",
            error: "",
            isValid: true
          },
          shortdesc: {
            value: "",
            error: "",
            isValid: true
          },
          perhourprice: {
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
          }
        },
        backgroundData: {
          productid: "",
          partnerid: props.data.partnerId,
          itemstatus: "active"
        }
      }
    };
    this.validationRules = {
      name: ["required"]
    };
    this.productsDataForCheckbox = this.convertProductsDataToCheckboxData(
      props.data.productType
    );
  }
  convertProductsDataToCheckboxData = productObj => {
    const productArr = [];
    productObj.forEach((product, idx) => {
      productArr.push({
        imgSrc:
          SafeValue(product, `fields.thumbnail`, "string", false) || NoImageAlt,
        title: SafeValue(product, `fields.name.${this.lang}`, "string", "---"),
        value: JSON.stringify(product),
        key: idx
      });
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
  submitProduct = () => {
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
          PartnerpanelAddProduct(_formObjectGoingToSubmit, res => {
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
                    locale.notification.add_product.success,
                    () => this.props.callback({ success: true })
                  );
                } else {
                  return this.context.displayNotif(
                    "error",
                    locale.notification.add_product.failed
                  );
                }
              }
            );
          });
        }
      );
    }
  };
  submitselectedProductType = (name, checkedObj) => {
    const productParsedObj = JSON.parse(checkedObj.value);
    const { backgroundData, fields } = this.state.form;
    checkedObj = JSON.parse(checkedObj.value);
    this.setState({
      selectedProductType: productParsedObj,
      stepsValidation: {
        ...this.state.stepsValidation,
        1: true
      },
      form: {
        ...this.state.form,
        backgroundData: {
          ...backgroundData,
          producttype: checkedObj._id
        }
      }
    });
  };
  render() {
    const {
      currentStep,
      stepsValidation,
      form,
      selectedProductType
    } = this.state;
    const { locale, direction } = this.translate;
    return (
      <div
        id="addProduct"
        className={classnames("addProduct", `_${direction}`)}
      >
        {currentStep === 1 && (
          <div className="addProduct-step -step1">
            <span className="chooseAProduct">
              {locale.step1.choose_a_product}
            </span>
            <FlatImageSelect
              className="product-items"
              items={this.productsDataForCheckbox}
              onChange={(name, checkedObj) =>
                this.submitselectedProductType(name, checkedObj)
              }
              type="radio"
              name="offeredProduct"
            />
            <Button
              color="primary"
              disabled={!stepsValidation[currentStep]}
              onClick={() => this.forwardToStep(2)}
            >
              {locale.step1.next_step_button}
            </Button>
          </div>
        )}
        {currentStep === 2 && (
          <div className="addProduct-step -step2">
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
            <FlatInput
              label={locale.fields.code._title}
              type="text"
              placeholder={locale.fields.code.placeholder}
              name="code"
              id="code"
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.code.error}
            />
            <FlatInput
              label={locale.fields.count._title}
              type="number"
              placeholder={locale.fields.count.placeholder}
              name="count"
              id="count"
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.count.error}
            />
            <FlatInput
              label={locale.fields.media._title}
              type="number"
              placeholder={locale.fields.media.placeholder}
              name="media"
              id="media"
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.media.error}
            />
            <FlatInput
              label={locale.fields.shortdesc._title}
              type="text"
              placeholder={locale.fields.shortdesc.placeholder}
              name="shortdesc"
              id="shortdesc"
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.shortdesc.error}
            />
            <FlatInput
              label={locale.fields.hourlyprice._title}
              type="text"
              name="perhourprice"
              id="perhourprice"
              defaultValue={thousandSeprator(
                SafeValue(
                  selectedProductType,
                  "fields.perhourprice",
                  "string",
                  0
                )
              )}
              onChange={e => {
                e.target.value = thousandSeprator(e.target.value, false);
                const apiData = thousandSeprator(e.target.value, true);
                this.formStateHandler(e.target.name, apiData);
              }}
              error={this.state.form.fields.perhourprice.error}
            />
            <FlatInput
              label={locale.fields.dailyprice._title}
              type="text"
              name="dailyprice"
              defaultValue={thousandSeprator(
                SafeValue(selectedProductType, "fields.dailyprice", "string", 0)
              )}
              id="dailyprice"
              onChange={e => {
                e.target.value = thousandSeprator(e.target.value, false);
                const apiData = thousandSeprator(e.target.value, true);
                this.formStateHandler(e.target.name, apiData);
              }}
              error={this.state.form.fields.dailyprice.error}
            />
            <FlatInput
              label={locale.fields.weeklyprice._title}
              type="text"
              name="weeklyprice"
              defaultValue={thousandSeprator(
                SafeValue(
                  selectedProductType,
                  "fields.weeklyprice",
                  "string",
                  0
                )
              )}
              data-value={thousandSeprator(
                SafeValue(
                  selectedProductType,
                  "fields.weeklyprice",
                  "string",
                  0
                )
              )}
              id="weeklyprice"
              onChange={e => {
                e.target.value = thousandSeprator(e.target.value, false);
                const apiData = thousandSeprator(e.target.value, true);
                this.formStateHandler(e.target.name, apiData);
              }}
              error={this.state.form.fields.weeklyprice.error}
            />
            <FlatInput
              label={locale.fields.monthlyprice._title}
              type="text"
              name="monthlyprice"
              id="monthlyprice"
              data-value={thousandSeprator(
                SafeValue(
                  selectedProductType,
                  "fields.weeklyprice",
                  "string",
                  0
                )
              )}
              defaultValue={thousandSeprator(
                SafeValue(
                  selectedProductType,
                  "fields.monthlyprice",
                  "string",
                  0
                )
              )}
              onChange={e => {
                e.target.value = thousandSeprator(e.target.value, false);
                const apiData = thousandSeprator(e.target.value, true);
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
              onClick={() => this.submitProduct()}
            >
              {locale.step2.submit_product_button}
            </FlatButton>
          </div>
        )}
      </div>
    );
  }
}
