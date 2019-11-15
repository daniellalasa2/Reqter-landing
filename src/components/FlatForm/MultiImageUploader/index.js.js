import React from "react";
import DropzoneComponent from "react-dropzone-component";

export default class MultiImageUploader extends React.Component {
  constructor(props) {
    super(props);
    const src = props.defaultSrc;
    const { messages, width, height, maxFileSize } = props;
    const componentConfig = {
      iconFiletypes: [".jpg", ".png", ".gif"],
      showFiletypeIcon: true,
      postUrl: ""
    };
    const djsConfig = { autoProcessQueue: false };
    const eventHandlers = { addedfile: file => console.log(file) };
    this.state = {
      preview: null,
      src,
      width,
      height,
      messages,
      maxFileSize,
      djsConfig,
      config: componentConfig,
      eventHandlers
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  render() {
    const { eventHandlers, djsConfig, src, config } = this.state;
    return (
      <div>
        <DropzoneComponent
          config={config}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig}
        />
        , );
      </div>
    );
  }
}
