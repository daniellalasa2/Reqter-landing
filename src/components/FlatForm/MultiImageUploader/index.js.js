import React from "react";
import DropzoneComponent from "react-dropzone-component";

export default class MultiImageUploader extends React.Component {
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
      alert(messages.FILE_SIZE_EXCEEDED);
      elem.target.value = "";
    }
  }

  render() {
    const { preview, height, width, src } = this.state;
    return (
      <div>
        <DropzoneComponent
          config={componentConfig}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig}
        />
        );
        <img src={preview} alt="Preview" />
      </div>
    );
  }
}
