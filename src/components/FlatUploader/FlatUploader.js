import React from "react";
import "./FlatUploader.scss";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCheck } from "@fortawesome/free-solid-svg-icons";
class FlatUploader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      filename: "- - -"
    };
  }
  fillFileName = e => {
    this.setState({
      filename: e.target.files[0].name
    });
  };
  render() {
    return (
      <div
        className={classnames("flatuploader", () =>
          this.props.progress === 100 ? "success-upload" : null
        )}
        style={{ ...this.props.style }}
      >
        <div className="percentage-number">
          %{this.props.progress ? this.props.progress : "0"}
        </div>
        <FontAwesomeIcon
          classnames="cloud-icon"
          icon={faCloud}
          size="3x"
          color={this.props.progresscolor}
        />
        <FontAwesomeIcon
          className="success-icon"
          icon={faCheck}
          size="3x"
          color="green"
        />
        <span className="file-name-section">{this.state.filename}</span>
        <div
          className="file-select-button"
          onClick={() => this.input.current.click()}
        >
          <strong className="placeholder">{this.props.placeholder}</strong>
        </div>

        <input
          type="file"
          onChange={e => {
            this.fillFileName(e);
            if (typeof this.props.onChange === "function")
              return this.props.onChange;
          }}
          ref={this.input}
          {...this.props}
          style={{ display: "none" }}
        />
      </div>
    );
  }
}

export default FlatUploader;
