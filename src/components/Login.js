import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FlatInput } from "./FlatForm/FlatForm";
import { LoginRequest } from "./ApiHandlers/ApiHandler";
import Validator from "./Validator/Validator";
import { SetCookie } from "../components/CookieHandler/CookieHandler";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.openModal,
      loginStep: 1,
      form: {
        isValid: false,
        submitted: false,
        isSubmitting: false,
        fields: {
          phonenumber: {
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
    this.toggle = this.toggle.bind(this);
    this.validationRules = {
      phonenumber: ["phonenumber"]
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return true;
  }
  componentDidMount() {
    this.setState({
      modal: this.props.openModal
    });
  }
  LoginRequest = () => {
    LoginRequest(this.state.form.phonenumber.value, res => {
      console.log(res);
      // SetCookie("SSUSERAUTH");
      this.setState({
        loginStep: 2
      });
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
    const value = _this.value;
    const validation = Validator(value, this.validationRules[name]);
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
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>ورود به استارتاپ اسپیس</ModalHeader>
          {/* Get number */}
          {this.state.loginStep === 1 && (
            <ModalBody>
              <FlatInput
                label="شماره تماس"
                type="tel"
                placeholder="شماره تماس خود را وارد کنید"
                name="phonenumber"
                id="phonenumber"
                onChange={this.formStateHandler}
                error={this.state.form.fields.phonenumber.error}
              />
              <Button
                color="info"
                onClick={this.LoginRequest}
                disabled={this.state.form.isValid}
              >
                دریافت کد تایید
              </Button>
            </ModalBody>
          )}
          {/* Verify sent code */}
          {this.state.loginStep === 2 && (
            <ModalBody>
              <FlatInput
                label="تایید شماره تماس"
                type="tel"
                placeholder="کد ارسال شده را وارد کنید"
                name="code"
                id="code"
                onChange={this.formStateHandler}
                error={this.state.form.fields.code.error}
              />
              <Button color="info">تایید و ورود</Button>
            </ModalBody>
          )}
        </Modal>
      </div>
    );
  }
}
