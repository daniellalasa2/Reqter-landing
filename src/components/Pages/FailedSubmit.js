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
          <Row className="moreRequest">
            <img src={this.props.imgSrc} alt="Success" className="SuccessImg" />
          </Row>
        </Col>
      </Row>
    );
  }
}
