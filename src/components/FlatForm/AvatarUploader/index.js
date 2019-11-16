import React from "react";
import Avatar from "react-avatar-edit";
export default class AvatarUploader extends React.Component {
  constructor(props) {
    super(props);
    const src = props.defaultSrc;
    const { messages, width, height, maxFileSize } = props;
    this.state = {
      preview: null,
      src,
      width,
      height,
      messages,
      maxFileSize
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
    this.props.onChange(preview);
  }

  onBeforeFileLoad(elem) {
    const { maxFileSize, messages } = this.state;
    //maxFileSize in byte
    if (elem.target.files[0].size > (maxFileSize ? maxFileSize : 71680)) {
      alert(messages.MAX_FILE_SIZE_EXEEDED);
      elem.target.value = "";
    }
  }

  render() {
    const { preview, height, width, src } = this.state;
    return (
      <div style={{ width: `${width}px`, margin: "auto", overflow: "hidden" }}>
        <Avatar
          width={width}
          height={height}
          onCrop={this.onCrop}
          style={{ margin: "auto" }}
          onClose={this.onClose}
          onBeforeFileLoad={this.onBeforeFileLoad}
          onFileLoad={this.props.onChange}
          src={src}
          label={this.props.placeholder}
          {...this.props}
        />
        {/* <img src={preview} alt="Preview" width={width} /> */}
      </div>
    );
  }
}
