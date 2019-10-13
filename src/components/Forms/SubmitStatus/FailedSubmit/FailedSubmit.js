import React from "react";
import { Row, Col } from "reactstrap";
import "./FailedSubmit.scss";
export default class FailedSubmit extends React.PureComponent {
  render() {
    return (
      <Row>
        <Col xs="12">
          <Row className="moreRequest">
            <img src={this.props.imgSrc} alt="Success" className="SuccessImg" />
          </Row>
        </Col>
      </Row>
    );
  }
}
