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
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.navTransform);
  }
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
                  <label for="name">نام و نام خانوادگی&nbsp;&nbsp;</label>
                  <Input type="text" value="" name="name" />
                </div>

                <div className="field-row">
                  <label for="ideaname">نام ایده شما&nbsp;&nbsp;</label>
                  <Input type="text" value="" name="ideaname" />
                </div>

                <div className="field-row">
                  <label for="ideaname">نام ایده شما&nbsp;&nbsp;</label>
                  <Input type="select" value="" name="ideaname" />
                </div>
                <div className="field-row">
                  <label className="checkboxContainer">
                    چک باکس
                    <Input type="checkbox" checked="" />
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
