import React from "react";
import { Row, Button } from "reactstrap";
import "./ProductSpecs.scss";
import classnames from "classnames";

function ProductSpecs(props) {
  return (
    <React.Fragment>
      <Row
        className={classnames(
          "product-specs-wrapper",
          props.direction === "rtl" ? " product-specs-rtl" : ""
        )}
      >
        <div
          className={"product-specs"}
          style={{ background: `url(${props.img}) no-repeat right` }}
        />
        <div className="box specs">
          <div className="specs-inner-box">{props.children}</div>
        </div>
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
      style={{
        backgroundColor: props.color,
        minHeight: "50px",
        minWidth: "170px"
      }}
      className={classnames(props.classNames)}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}

export { ProductSpecs, SpecList, Title, Spec, Btn };
