import React from "react";
import { Row, Col, Container, Button } from "reactstrap";
import "../assets/styles/ProductSpecs.scss";
function ProductSpecs(props) {
  return (
    <React.Fragment>
      <Row style={{ width: "100%", margin: 0, backgroundColor: "#f6f6f6" }}>
        <section
          className={
            "product-specs " +
            (props.direction === "rtl" ? "product-specs-rtl" : "")
          }
          style={{ background: `url(${props.img}) no-repeat` }}
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
    <span className="product-specs-title">
      <strong>{props.children}</strong>
    </span>
  );
}
function Spec(props) {
  return <li className="product-specs-item">{props.children}</li>;
}
function SpecList(props) {
  return <ul className="product-specs-list">{props.children}</ul>;
}
function Btn(props) {
  return (
    <Button style={{ backgroundColor: props.color }}>{props.children}</Button>
  );
}

export { ProductSpecs, SpecList, Title, Spec, Btn };
