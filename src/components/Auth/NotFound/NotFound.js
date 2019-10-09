import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import ContextApi from "../../ContextApi/ContextApi";
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
      <div id="NotFound">
        <h1 className="title">{title}</h1>
        <h3 className="body">{body}</h3>

        <button onClick={() => window.location.replace(`#/${this.lang}`)}>
          {home}
        </button>
        <button onClick={() => this.props.history.goBack()}>{back}</button>
      </div>
    );
  }
}
