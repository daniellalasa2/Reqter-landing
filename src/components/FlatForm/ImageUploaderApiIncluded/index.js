import React from "react";
import { Upload, DownloadAsset } from "../../ApiHandlers/ApiHandler";
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
      selectedImgUrl: props.defaultUrl ? props.defaultUrl : "",
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
          backgroundColor: this.state.selectedImgUrl ? "gray" : "transparent",
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
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
        className="ImageUploaderApiIncluded"
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
              color: this.state.selectedImgUrl ? "white" : "#2e5b96",
              cursor: "pointer",
              backgroundColor: "rgba(255,255,255,0.6)",
              padding: "5px",
              borderRadius: "5px",
              zIndex: "1"
            }}
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
        />
      </div>
    );
  }
}
