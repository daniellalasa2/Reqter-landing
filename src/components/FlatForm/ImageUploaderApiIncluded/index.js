import React from "react";
import { Upload, DownloadAsset } from "../../ApiHandlers/ApiHandler";
import "./index.scss";
import classnames from "classnames";
export default class ImageUploaderApiIncluded extends React.Component {
  constructor(props) {
    super(props);
    const src = props.defaultSrc;
    const { messages, width, height, maxFileSize } = props;
    const componentConfig = {
      iconFiletypes: [".jpg", ".png", ".gif"],
      showFiletypeIcon: true,
      postUrl: ""
    };
    this.state = {
      progress: 0,
      selectedImgUrl: props.defaultUrl ? DownloadAsset(props.defaultUrl) : "",
      uploading: false
    };
    this.fileRef = React.createRef();
  }
  uploadImage = file => {
    file = file.target.files[0];
    this.setState({ uploading: true });
    Upload(
      file,
      res => {
        if (this.props.defaultUrl) {
          res.data["prev_file"] = this.props.defaultUrl;
          res.data["replace"] = true;
        } else {
          res.data["replace"] = false;
        }
        this.props.onChange(this.props.name, res);
        this.setState({
          selectedImgUrl: DownloadAsset(res.data.file.filename)
        });
        this.setState({ uploading: false });
      },
      prog => this.setState({ progress: prog.progress })
    );
  };
  styleExporter = name => {
    let grabbedStyle = {};
    switch (name) {
      case "imgWrapperStyle":
        grabbedStyle = {
          border: "2px dashed #2e5b96",
          width: "140px",
          height: "140px",
          borderRadius: "1px",
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "gray",
          margin: "10px"
        };
        break;
      case "imageStyle":
        grabbedStyle = {
          width: "140px",
          height: "140px",
          display: this.state.selectedImgUrl ? "block" : "none",
          position: "absolute"
        };
        break;
      default:
        break;
    }
    return grabbedStyle;
  };

  render() {
    const { styleExporter } = this;
    return (
      <div
        className={classnames(
          "ImageUploaderApiIncluded",
          this.state.selectedImgUrl ? "hasImage" : ""
        )}
        style={styleExporter("imgWrapperStyle")}
      >
        {this.state.selectedImgUrl && (
          <img
            src={this.state.selectedImgUrl}
            alt={`uploader+${this.props.name}`}
            style={styleExporter("imageStyle")}
          />
        )}
        {this.state.uploading ? (
          <span style={{ color: "gray", direction: "ltr", zIndex: "1" }}>
            {this.state.progress} %
          </span>
        ) : (
          <span
            style={{
              display: "flex",
              selfAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              color: this.state.selectedImgUrl ? "white" : "gray",
              cursor: "pointer",
              backgroundColor: this.state.selectedImgUrl
                ? "rgba(100, 100, 100, 0.8)"
                : "transparent",
              padding: "5px",
              borderRadius: "5px",
              zIndex: "1"
            }}
            className="selectorButton"
            onClick={() => this.fileRef.current.click()}
          >
            {this.props.innerText}
          </span>
        )}
        <input
          type="file"
          name={this.props.name}
          style={{ display: "none" }}
          onChange={this.uploadImage}
          ref={this.fileRef}
          accept="image/*"
        />
      </div>
    );
  }
}
