import React from "react";
import { Collapse } from "reactstrap";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/FAQ.scss";
class FAQ extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      FAQCollapse: null
    };
  }

  toggleFaqCollapse = e => {
    let toggleId = e.target.id === this.state.FAQCollapse ? null : e.target.id;
    this.setState({
      FAQCollapse: toggleId
    });
  };
  render() {
    return (
      <section id="FAQ-accordion">
        <h3 style={{ fontWeight: "bold" }}>سوالات متداول</h3>
        <div className="questions-wrapper">
          <Card>
            <CardHeader
              id="question1"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question1" ? "activeHeader" : ""
              }
            >
              چجوری کار میکنه؟
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question1"}>
              <CardBody>فعلا کار نمیکنه</CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader
              id="question2"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question2" ? "activeHeader" : ""
              }
            >
              چجوری رزرو کنم؟
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question2"}>
              <CardBody>به سادگی</CardBody>
            </Collapse>
          </Card>
        </div>
      </section>
    );
  }
}
export default FAQ;
