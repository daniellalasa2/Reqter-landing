import React from "react";
import classnames from "classnames";
import ContextApi from "../../ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDizzy } from "@fortawesome/free-solid-svg-icons";
import "./InternalError.scss";
export default class InternalError extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
  }
  componentDidMount() {}

  render() {
    const { title, body, back, home } = this.translate.locale;
    const { direction } = this.translate;
    return (
      <div id="InternalError" className={classnames(`_${direction}`)}>
        <h1 className="title">
          <span className="text">
            {title}
            <FontAwesomeIcon
              icon={faDizzy}
              pull={direction === "ltr" ? "left" : "right"}
              color="black"
              className="icon-interalError"
            />
          </span>
        </h1>
        <h4 className="body">{body}</h4>
        <div className="redirect-links">
          <button className="back" onClick={() => this.props.history.goBack()}>
            {back}
          </button>
          <button
            className="home"
            onClick={() => window.location.replace(`#/${this.lang}`)}
          >
            {home}
          </button>
        </div>
      </div>
    );
  }
}
