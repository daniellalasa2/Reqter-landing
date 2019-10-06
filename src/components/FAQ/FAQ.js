import React from "react";
import { Collapse } from "reactstrap";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import ContextApi from "../../components/ContextApi/ContextApi";
import "./FAQ.scss";
import classnames from "classnames";
class FAQ extends React.PureComponent {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
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
    const { locale, direction } = this.translate;
    return (
      <section
        id="FAQ-accordion"
        className={classnames(direction === "ltr" && "_ltr")}
      >
        <h3 style={{ fontWeight: "bold" }}>{locale.FAQ._title}</h3>
        <div className="questions-wrapper">
          <Card>
            <CardHeader
              id="question1"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question1" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              {locale.FAQ.q1.question}
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question1"}>
              <CardBody>{locale.FAQ.q1.answer}</CardBody>
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
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              {locale.FAQ.q2.question}
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question2"}>
              <CardBody>{locale.FAQ.q2.answer}</CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader
              id="question3"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question3" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              {locale.FAQ.q3.question}
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question3"}>
              <CardBody>{locale.FAQ.q3.answer}</CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader
              id="question4"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question4" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              {locale.FAQ.q4.question}
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question4"}>
              <CardBody>{locale.FAQ.q4.answer}</CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader
              id="question5"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question5" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              {locale.FAQ.q5.question}
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question5"}>
              <CardBody>{locale.FAQ.q5.answer}</CardBody>
            </Collapse>
          </Card>
        </div>
      </section>
    );
  }
}
export default FAQ;
