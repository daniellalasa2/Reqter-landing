import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FlatInput } from "./FlatForm/FlatForm";
export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: !props.isLogin,
      form: {
        isValid: false,
        submitted: false,
        isSubmitting: false,
        fields: {
          phonenumber: {
            value: "",
            isValid: false,
            error: ""
          }
        }
      }
    };
    this.toggle = this.toggle.bind(this);
  }

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
          <ModalBody>
            {/* <FlatInput
              label="نام و نام خانوادگی"
              type="text"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              name="name"
              id="name"
              onChange={this.formStateHandler}
              error={this.state.form.fields.name.error}
            /> */}
            <FlatInput
              label="شماره تماس"
              type="tel"
              placeholder="شماره تماس خود را وارد کنید"
              name="phonenumber"
              id="phonenumber"
              onChange={this.formStateHandler}
              error={this.state.form.fields.phonenumber.error}
            />
            <Button color="info">ورود</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
