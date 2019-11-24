import React from "react";
import "./AddProduct.scss";
import {
  FlatImageSelect,
  FlatInput,
  FlatTextArea,
  FlatButton,
  FlatUploader
} from "../../FlatForm/FlatForm";
import Validator from "../../Validator/Validator";
import { Button } from "reactstrap";
import {
  SafeValue,
  PartnerpanelAddProduct,
  PartnerpanelEditProduct,
  Upload,
  DownloadAsset
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
    this.true = true;
    this.false = props.data.operationType === "add" ? false : true;
    this.state = {
      currentStep: 1,
      stepsValidation: {
        //Button will be disable if each step validation was false
        1: this.false,
        2: this.false,
        3: this.true
      },
      selectedImg: "",
      selectedProductType: {},
      form: {
        isValid: this.false, //Form validation
        submitted: false,
        isSubmitting: false,
        fields: {
          name: {
            value: SafeValue(
              props,
              `data.fields.name.${this.lang}`,
              "string",
              "",
              "data.fields.name"
            ),
            error: "",
            isValid: this.true
          },
          code: {
            value: SafeValue(props, `data.fields.code`, "string", ""),
            error: "",
            isValid: this.true
          },
          count: {
            value: SafeValue(props, `data.fields.count`, "string", ""),
            error: "",
            isValid: this.true
          },
          media: {
            uploading: false,
            uploadProgress: 0,
            value: SafeValue(
              props,
              `data.fields.media.0.${this.lang}`,
              "string",
              "",
              "data.fields.media"
            ),
            error: "",
            isValid: this.true
          },
          shortDesc: {
            value: SafeValue(
              props,
              `data.fields.shortDesc.${this.lang}`,
              "string",
              "",
              "data.fields.shortDesc"
            ),
            error: "",
            isValid: this.true
          },
          perhourprice: {
            value: SafeValue(props, `data.fields.perhourprice`, "string", ""),
            error: "",
            isValid: this.true
          },
          dailyprice: {
            value: SafeValue(props, `data.fields.dailyprice`, "string", ""),
            error: "",
            isValid: this.true
          },
          weeklyprice: {
            value: SafeValue(props, `data.fields.weeklyprice`, "string", ""),
            error: "",
            isValid: this.true
          },
          monthlyprice: {
            value: SafeValue(props, `data.fields.monthlyprice`, "string", ""),
            error: "",
            isValid: this.true
          },
          about: {
            value: SafeValue(
              props,
              `data.fields.about.${this.lang}`,
              "string",
              "",
              "data.fields.about"
            ),
            error: "",
            isValid: this.true
          }
        },
        backgroundData: {
          productid: SafeValue(props, `data._id`, "string", ""),
          partnerid: props.data.partnerId,
          itemstatus: SafeValue(
            props,
            `data.fields.itemstatus`,
            "string",
            "active"
          ),
          producttype: SafeValue(
            props,
            `data.fields.producttype._id`,
            "string",
            ""
          )
        }
      }
    };
    this.validationRules = {
      name: ["required"]
    };
    this.productsDataForCheckbox = this.convertProductsDataToCheckboxData(
      props.data.productTypesList
    );
  }
  convertProductsDataToCheckboxData = productObj => {
    const productArr = [];
    productObj.forEach((product, idx) => {
      productArr.push({
        imgSrc:
          SafeValue(product, `fields.thumbnail`, "string", false) || NoImageAlt,
        title: SafeValue(product, `fields.name.${this.lang}`, "string", "---"),
        value: SafeValue(product, "_id", "string", "0"),
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
        index === "media" && {
          uploading: this.state.form.fields.media.uploading
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
            media: {
              ...this.state.form.fields.media,
              error: locale.fields.media.error
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
            media: {
              ...this.state.form.fields.media,
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
                    media: {
                      ...this.state.form.fields.media,
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
                    media: {
                      ...this.state.form.fields.media,
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
                  media: {
                    ...this.state.form.fields.media,
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
          const _callback = res => {
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
          };

          if (this.props.data.operationType === "add")
            PartnerpanelAddProduct(_formObjectGoingToSubmit, _callback);

          if (this.props.data.operationType === "edit")
            PartnerpanelEditProduct(
              _backgroundData.productid,
              _formObjectGoingToSubmit,
              _callback
            );
        }
      );
    }
  };
  submitselectedProductType = (name, checkedObj) => {
    const { backgroundData } = this.state.form;
    this.setState({
      stepsValidation: {
        ...this.state.stepsValidation,
        1: true
      },
      form: {
        ...this.state.form,
        backgroundData: {
          ...backgroundData,
          producttype: checkedObj.value
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
              defaultChecked={form.backgroundData.producttype}
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
              defaultValue={form.fields.name.value}
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
              defaultValue={form.fields.code.value}
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
              defaultValue={form.fields.count.value}
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.count.error}
            />
            <FlatInput
              label={locale.fields.shortDesc._title}
              type="text"
              placeholder={locale.fields.shortDesc.placeholder}
              name="shortDesc"
              id="shortDesc"
              defaultValue={form.fields.shortDesc.value}
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.shortDesc.error}
            />
            <FlatInput
              label={locale.fields.hourlyprice._title}
              type="text"
              name="perhourprice"
              defaultValue={form.fields.perhourprice.value}
              id="perhourprice"
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
              defaultValue={form.fields.dailyprice.value}
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
              defaultValue={form.fields.weeklyprice.value}
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
              defaultValue={form.fields.monthlyprice.value}
              data-value={thousandSeprator(
                SafeValue(
                  selectedProductType,
                  "fields.weeklyprice",
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
              label={locale.fields.about._title}
              type="text"
              placeholder={locale.fields.about.placeholder}
              name="about"
              id="about"
              data-value=""
              defaultValue={form.fields.about.value}
              onChange={e =>
                this.formStateHandler(e.target.name, e.target.value)
              }
              error={this.state.form.fields.about.error}
            />
            <div className="inline-row">
              <div className="image-container">
                <img
                  src={DownloadAsset(
                    SafeValue(
                      form,
                      "fields.media.value",
                      "string",
                      NoImageAlt,
                      `fields.media.value.0.${this.lang}`
                    )
                  )}
                  onError={e => (e.target.src = NoImageAlt)}
                  alt="product_imd"
                />
              </div>
              <FlatUploader
                label={locale.fields.product_image_upload}
                name="media"
                id="media"
                style={{ direction: direction }}
                buttonValue={locale.fields.product_image_upload_button}
                progress={this.state.form.fields.media.uploadProgress}
                progresscolor="lightblue"
                onChange={this.uploadFile}
                error={this.state.form.fields.media.error}
              />
            </div>
            <br />
            <FlatButton
              color="primary"
              disabled={!form.isValid || form.fields.media.uploading}
              suspense={this.state.form.isSubmitting}
              onClick={() => this.submitProduct()}
            >
              {this.props.data.operationType === "add"
                ? locale.step2.submit_product_button
                : locale.step2.edit_product_button}
            </FlatButton>
          </div>
        )}
      </div>
    );
  }
}
