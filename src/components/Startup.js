import React from "react";
import {
  Button,
  Col,
  Input,
  Row,
  FormGroup,
  Card,
  CardHeader,
  CardFooter,
  CardBody
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/FlatForm.scss";
import "../assets/styles/Startup.scss";
import classnames from "classnames";
export default class StartUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: { value: "", error: "" },
        idea: {
          value: "",
          error: ""
        }
      },
      wizardInfo: {
        firstStep: 1,
        currentStep: 1,
        lastStep: 3
      }
    };
  }
  formStateHandler = e => {
    let _this = e.target;
    const value = _this.value;
    const name = _this.name;

    if (value.length < 3) {
      _this.classList.add("error-input");
      this.setState({
        form: {
          ...this.state.form,
          [name]: { ...this.state.form[name], error: "حداقل ۳ کاراکتر" }
        }
      });
    } else {
      _this.classList.remove("error-input");
      this.setState({
        form: {
          ...this.state.form,
          [name]: { value: value, error: "" }
        }
      });
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
        console.log(this.state.wizardInfo);
        currentForm.classList.remove("show");
        nextForm.classList.add("show");
      }
    );
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
                      {this.state.form.name.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>نام استارتاپ شما&nbsp;&nbsp;</label>
                    <Input
                      type="text"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="idea"
                      placeholder="نام استارتاپ خود را وارد کنید."
                    />
                    <span className="error-message">
                      {this.state.form.idea.error}
                    </span>
                  </div>
                  {/* <div className="field-row">
                  <label>نام ایده شما&nbsp;&nbsp;</label>
                  <Input
                    type="select"
                    onChange={this.handleForm}
                    name="ideaname"
                  />
                </div> */}
                  {/* <div className="customCheckbox">
                  <label class="container">
                    One
                    <input type="checkbox" />
                    <span class="checkmark" />
                  </label>
                </div> */}
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
                    <strong>اطلاعات تکمیلی</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  {/* Second Stage */}
                  <div className="field-row">
                    <label>مبلغ وام&nbsp;&nbsp;</label>
                    <Input
                      placeholder="مبلغ وام رو بنویسید"
                      type="text"
                      name="name"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                    />
                    <span className="error-message">
                      {this.state.form.name.error}
                    </span>
                  </div>

                  <div className="field-row">
                    <label>نام استارتاپ شما&nbsp;&nbsp;</label>
                    <Input
                      type="text"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                      name="idea"
                      placeholder="نام استارتاپ خود را وارد کنید."
                    />
                    <span className="error-message">
                      {this.state.form.idea.error}
                    </span>
                  </div>
                </CardBody>
              </section>

              <section id="form3" className="wizardForm">
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
                    <strong>اطلاعات تکمیلی</strong>
                  </span>
                </CardHeader>
                <CardBody>
                  {/* Second Stage */}
                  <div className="field-row">
                    <label>مبلغ وام&nbsp;&nbsp;</label>
                    <Input
                      placeholder="مبلغ وام رو بنویسید"
                      type="text"
                      name="name"
                      onChange={this.formStateHandler}
                      onBlur={this.formStateHandler}
                    />
                    <span className="error-message">
                      {this.state.form.name.error}
                    </span>
                  </div>
                </CardBody>
              </section>
              <CardFooter>
                {this.state.wizardInfo.lastStep !==
                  this.state.wizardInfo.currentStep && (
                  <Button
                    className="navigation-button next"
                    onClick={this.wizardStep.bind(this, "next")}
                  >
                    بعدی
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
