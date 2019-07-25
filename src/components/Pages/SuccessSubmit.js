import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/FailedSubmit";
export default class FailedSubmit extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col xs="12">
          <img src={this.props.imgSrc} alt="Error" className="FailedImg" />
          <Row className="moreRequest">
            <Button className="moreRequestBtn">درخواست جدید ...</Button>
          </Row>
        </Col>
      </Row>
    );
  }
}
