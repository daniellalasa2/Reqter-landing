import React from "react";
import classnames from "classnames";
import ContextApi from "../../ContextApi/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlink } from "@fortawesome/free-solid-svg-icons";
import "./NotFound.scss";
export default class NotFound extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
  }
  render() {
    const { title, body, back, home } = this.translate.locale;
    const { direction } = this.translate;
    return (
      <div id="NotFound" className={classnames(`_${direction}`)}>
        <h1 className="title">
          <span className="text">
            {title}
            <FontAwesomeIcon
              icon={faUnlink}
              pull={direction === "ltr" ? "left" : "right"}
              color="black"
              className="icon-unlink"
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
