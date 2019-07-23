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
import "../assets/styles/FlatForm.scss";
import "../assets/styles/Startup.scss";
export default class StartUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: ""
      }
    };
  }
  handleForm = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };
  render() {
    return (
      <section className="startup-section">
        <Row>
          <Col xs="12" sm="12" md={{ size: 8, offset: 2 }}>
            <Card style={{ margin: "auto" }}>
              <CardHeader>
                <i className="" />
                اطلاعات استارت آپ ::
              </CardHeader>
              <CardBody>
                <div className="field-row">
                  <label>نام و نام خانوادگی&nbsp;&nbsp;</label>
                  <Input type="text" onChange={this.handleForm} name="name" />
                </div>

                <div className="field-row">
                  <label>نام ایده شما&nbsp;&nbsp;</label>
                  <Input
                    type="text"
                    onChange={this.handleForm}
                    name="ideaname"
                  />
                </div>

                <div className="field-row">
                  <label>نام ایده شما&nbsp;&nbsp;</label>
                  <Input
                    type="select"
                    onChange={this.handleForm}
                    name="ideaname"
                  />
                </div>
                <div className="field-row">
                  <label className="checkboxContainer">
                    چک باکس
                    <Input type="checkbox" onChange={this.handleForm} />
                    <span className="checkmark" />
                  </label>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}
