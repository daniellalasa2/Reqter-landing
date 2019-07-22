import React from "react";
import { Row, Col, Container, Button } from "reactstrap";
import "../assets/styles/ProductSpecs.scss";
import classnames from "classnames";

function ProductSpecs(props) {
  return (
    <React.Fragment>
      <Row style={{ width: "100%", margin: 0, backgroundColor: "#f6f6f6" }}>
        <section
          className={
            "product-specs" +
            (props.direction === "rtl" ? " product-specs-rtl" : "")
          }
          style={{ background: `url(${props.img}) no-repeat right` }}
        >
          <div className="box specs">
            <div className="specs-inner-box">{props.children}</div>
          </div>
        </section>
      </Row>
    </React.Fragment>
  );
}
function Title(props) {
  return (
    <span className={classnames("product-specs-title", props.className)}>
      <strong>{props.children}</strong>
    </span>
  );
}
function Spec(props) {
  return (
    <li className={classnames("product-specs-item", props.className)}>
      {props.children}
    </li>
  );
}
function SpecList(props) {
  return (
    <ul className={classnames("product-specs-list", props.className)}>
      {props.children}
    </ul>
  );
}
function Btn(props) {
  return (
    <Button
      style={{ backgroundColor: props.color }}
      className={classnames(props.classNames)}
    >
      {props.children}
    </Button>
  );
}

export { ProductSpecs, SpecList, Title, Spec, Btn };
