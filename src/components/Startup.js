import React from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Card,
  CardHeader,
  CardFooter,
  CardBody
} from "reactstrap";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/FlatForm.scss";
import "../assets/styles/Startup.scss";
import { SubmitForm } from "./ApiHandlers/ApiHandler";
export default class StartUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      combo: {
        startup: [
          "فینتک",
          "حوزه سلامت",
          "گردشگری",
          "آموزش",
          "حمل و نقل",
          "صادرات و واردات",
          "کشاورزی",
          "مشاغل",
          "اینترنت اشیا",
          "اتوماسیون",
          "ورزشی"
        ],
        investing: [
          "Pre-Seed",
          "Seed",
          "Round A",
          "Round B",
          "Round C",
          "Round D"
        ],
        city: ["تهران"]
      },
      form: {
        step1: {
          isValid: false,
          fields: {
            name: { value: "", errorMessage: "", isValid: false },
            youridea: {
              value: "",
              error: "",
              isValid: false
            },
            stage: {
              value: "",
              error: "",
              isValid: false
            },
            summary: {
              value: "",
              error: "",
              isValid: true
            },
            theproblem: {
              value: "",
              error: "",
              isValid: true
            },
            domain: {
              value: "",
              error: "",
              isValid: false
            },
            country: {
              value: "",
              error: "",
              isValid: true
            },
            city: {
              value: "",
              error: "",
              isValid: true
            },
            acceleratorexperiance: {
              value: "",
              error: "",
              isValid: true
            }
          }
        },
        step2: {
          isValid: false,
          fields: {
            teammembers: {
              value: "",
              error: "",
              isValid: false
            }
          }
        },
        _api: {
          name: "",
          youridea: "",
          stage: "",
          summary: "",
          theproblem: "",
          domain: "",
          country: "",
          city: "",
          acceleratorexperiance: "",
          teammembers: ""
        }
      },
      wizardInfo: {
        currentStep: 1,
        lastStep: 2,
        firstStep: 1,
        stepsFormsStatus: {
          1: {
            isValid: false
          },
          2: {
            isValid: false
          }
        }
      }
    };
  }
  validationRules = {
    name: ["required", "minCharecters"],
    youridea: ["minCharecters"],
    stage: ["required"],
    summary: ["minCharecters"],
    theproblem: ["minCharecters"],
    domain: ["required"],
    teammembers: ["required"],
    acceleratorexperiance: ["required", "minCharecters"],
    country: ["required"],
    city: ["required"]
  };

  validation = (value, rules) => {
    let validationObj = { message: "", valid: true };

    let numberOfValidations = rules.length;
    if (numberOfValidations !== 0) {
      for (let rule of rules) {
        switch (rule) {
          case "required":
            if (!value) {
              validationObj.message = "فیلد الزامی";
              validationObj.valid = false;
              return validationObj;
            }
            break;
          case "minCharecters":
            if (value.length < 3) {
              validationObj.message = "حداقل ۳ کاراکتر";
              validationObj.valid = false;
              return validationObj;
            }
            break;
          case "checkbox":
            if (!value) {
              validationObj.message = "یک گزینه را انتخاب کنید .";
              validationObj.valid = false;
              return validationObj;
            }
            break;
          case "number":
            if (isNaN(Number(value))) {
              validationObj.message = "لطفا مقدار عددی صحیح وارد کنید .";
              validationObj.valid = false;
              return validationObj;
            }
            break;
          default:
            break;
        }
        //If everythings is valid and the loop is on the last child of array then return validationObj
        if (numberOfValidations === 1 && validationObj.valid) {
          return validationObj;
        }
        --numberOfValidations;
      }
    } else {
      return validationObj;
    }
  };
  formStateHandler = e => {
    let _this = e.target;
    const value = _this.value;
    const name = _this.name;
    const currentStep = this.state.wizardInfo.currentStep;
    const validation = this.validation(value, this.validationRules[name]);
    let checkStepValidation = () => {
      const fields = this.state.form[`step${currentStep}`].fields;
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
          [`step${currentStep}`]: {
            ...this.state.form[`step${currentStep}`],
            isValid: boolean
          }
        }
      });
    };

    if (!validation.valid) {
      _this.classList.add("error-input");
      this.setState(
        {
          form: {
            ...this.state.form,
            [`step${currentStep}`]: {
              ...this.state.form[`step${currentStep}`],
              fields: {
                ...this.state.form[`step${currentStep}`].fields,
                [name]: {
                  ...this.state.form[`step${currentStep}`].fields,
                  error: validation.message,
                  isValid: false
                }
              }
            }
          },
          wizardInfo: {
            ...this.state.wizardInfo,
            stepsFormsStatus: {
              ...this.state.wizardInfo.stepsFormsStatus,
              [currentStep]: { isValid: false }
            }
          }
        },
        () => checkStepValidation()
      );
    } else {
      _this.classList.remove("error-input");
      this.setState(
        {
          form: {
            ...this.state.form,
            [`step${currentStep}`]: {
              ...this.state.form[`step${currentStep}`],
              fields: {
                ...this.state.form[`step${currentStep}`].fields,
                [name]: {
                  value: value,
                  error: validation.message,
                  isValid: true
                }
              }
            },
            _api: {
              ...this.state.form._api,
              [name]: value
            }
          },
          wizardInfo: {
            ...this.state.wizardInfo,
            stepsFormsStatus: {
              ...this.state.wizardInfo.stepsFormsStatus,
              [currentStep]: { isValid: true }
            }
          }
        },
        () => checkStepValidation()
      );
    }
  };
  wizardStep = flow => {
    let newStep, currentForm, nextForm;
    switch (flow) {
      case "next":
        newStep = this.state.wizardInfo.currentStep + 1;
        currentForm = document.getElementById(
          `form${this.state.wizardInfo.currentStep}`
        );
        nextForm = document.getElementById(
          `form${this.state.wizardInfo.currentStep + 1}`
        );
        break;
      case "prev":
        newStep = this.state.wizardInfo.currentStep - 1;
        currentForm = document.getElementById(
          `form${this.state.wizardInfo.currentStep}`
        );
        nextForm = document.getElementById(
          `form${this.state.wizardInfo.currentStep - 1}`
        );
        break;
      default:
        break;
    }
    this.setState(
      {
        wizardInfo: {
          ...this.state.wizardInfo,
          currentStep: newStep
        }
      },
      () => {
        currentForm.classList.remove("show");
        nextForm.classList.add("show");
      }
    );
  };
  fillCombo(name) {
    return this.state.combo[name].map((val, key) => (
      <option value={val} key={key}>
        {val}
      </option>
    ));
  }
  submit = () => {
    SubmitForm(this.state.form._api, res => {
      alert(res.message);
    });
  };
  render() {
    return (
      <section className="startup-section rtl-layout">
        <Row>
          <Col xs="12" sm="12" md={{ size: 8, offset: 2 }}>
            <Card style={{ margin: "auto" }}>
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
                    <strong>اطلاعات استارتاپ</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="field-row">
                    <label>نام و نام خانوادگی&nbsp;&nbsp;</label>
                    <Input
                      placeholder="نام و نام خانوادگی خود را وارد کنید."
                      type="text"
                      name="name"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      autoFocus
                    />
                    <span className="error-message">
                      {this.state.form.step1.fields.name.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>نام استارتاپ شما&nbsp;&nbsp;</label>
                    <Input
                      type="text"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="youridea"
                      placeholder="نام استارتاپ خود را وارد کنید."
                    />
                    <span className="error-message">
                      {this.state.form.step1.fields.youridea.error}
                    </span>
                  </div>
                  <div className="field-row">
                    <label>شهر&nbsp;&nbsp;</label>
                    <Input
                      type="select"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="city"
                    >
                      <option>شهر</option>
                      {this.fillCombo("city")}
                    </Input>
                    <span className="error-message">
                      {this.state.form.step1.fields.city.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>کشور&nbsp;&nbsp;</label>
                    <Input
                      type="select"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="country"
                    >
                      <option>کشور</option>
                      <option value="ایران">ایران</option>
                    </Input>
                    <span className="error-message">
                      {this.state.form.step1.fields.country.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>حوزه فعالیتت&nbsp;&nbsp;</label>
                    <Input
                      type="select"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="domain"
                    >
                      <option>حوزه فعالیتت چیه؟</option>
                      {this.fillCombo("startup")}
                    </Input>
                    <span className="error-message">
                      {this.state.form.step1.fields.domain.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>مرحله استارتاپ&nbsp;&nbsp;</label>
                    <Input
                      type="select"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="stage"
                    >
                      <option>تو کدوم مرحله هستید؟</option>
                      {this.fillCombo("investing")}
                    </Input>
                    <span className="error-message">
                      {this.state.form.step1.fields.stage.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>خلاصه طرح شما&nbsp;&nbsp;</label>
                    <Input
                      type="textarea"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="summary"
                      placeholder="خلاصه طرحت رو وارد کن ."
                      rows="5"
                    />
                    <span className="error-message">
                      {this.state.form.step1.fields.summary.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>مشکل حل شده توسط استارتاپ شما&nbsp;&nbsp;</label>
                    <Input
                      type="textarea"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="theproblem"
                      placeholder="استارتاپ شما چه مشکلی رو حل کرده ؟"
                      rows="5"
                    />
                    <span className="error-message">
                      {this.state.form.step1.fields.theproblem.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>تجربه قبلی در شتاب دهنده&nbsp;&nbsp;</label>
                    <Input
                      type="textarea"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="acceleratorexperiance"
                      placeholder="اگه تجربه قبلی تو شتاب دهنده ای داشتی برامون بنویس ."
                      rows="5"
                    />
                    <span className="error-message">
                      {this.state.form.step1.fields.acceleratorexperiance.error}
                    </span>
                  </div>
                </CardBody>
              </section>

              <section id="form2" className="wizardForm">
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
                    <strong>اطلاعات تیم</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="field-row">
                    <label>تعداد اعضای تیمت&nbsp;&nbsp;</label>
                    <NumberFormat
                      customInput={Input}
                      style={{ textAlign: "right" }}
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      placeholder="تعداد اعضای تیمت"
                      name="teammembers"
                      min={1}
                    />
                    <span className="error-message">
                      {this.state.form.step2.fields.teammembers.error}
                    </span>
                  </div>
                </CardBody>
              </section>
              <CardFooter>
                {this.state.wizardInfo.lastStep !==
                this.state.wizardInfo.currentStep ? (
                  <Button
                    className="navigation-button next"
                    onClick={this.wizardStep.bind(this, "next")}
                    disabled={
                      !this.state.form[
                        `step${this.state.wizardInfo.currentStep}`
                      ].isValid
                    }
                  >
                    بعدی
                  </Button>
                ) : (
                  <Button
                    className="navigation-button submit"
                    onClick={this.submit.bind(this)}
                    disabled={
                      !this.state.form[
                        `step${this.state.wizardInfo.currentStep}`
                      ].isValid
                    }
                  >
                    ثبت
                  </Button>
                )}

                {this.state.wizardInfo.currentStep !==
                  this.state.wizardInfo.firstStep && (
                  <Button
                    className="navigation-button prev"
                    onClick={this.wizardStep.bind(this, "prev")}
                  >
                    قبلی
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Second stage */}
          </Col>
        </Row>
      </section>
    );
  }
}
