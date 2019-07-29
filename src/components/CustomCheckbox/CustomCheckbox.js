import React, { useRef } from "react";
import "./CustomCheckbox.scss";

//HOC wrapper
class CheckBoxRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.thisRef = React.createRef();
  }
  selectionHandler = data => {
    const type = this.props.type || "checkbox";
    switch (type) {
      case "checkbox":
        break;
      case "radio":
        break;

      default:
        console.warn('CheckBoxRow component expected a "type" property .');
        break;
    }

    console.log("handled: ", type);
  };
  componentDidMount() {
    //get width from props or style !!!!
    this.width = this.thisRef.current.clientWidth;
    this.childWidth = this.width / this.props.rowitems;
  }

  render() {
    const checkBoxes = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        width: `${this.childWidth}px`,
        onChange: this.selectionHandler
      })
    );
    return (
      <div
        ref={this.thisRef}
        style={{
          ...this.props.style,
          boxSizing: "content-box"
        }}
      >
        {checkBoxes}
      </div>
    );
  }
}

//Image check box comopnent
const ImageCheckBox = ({
  imgAlt,
  onChange,
  imgSrc,
  checked,
  className,
  value,
  title,
  style,
  ...props
}) => {
  const checkbox = useRef();
  const toggleCheckbox = e => {
    checked = !checked;

    if (checked) checkbox.current.classList.add("checked");
    else checkbox.current.classList.remove("checked");
    onChange();
  };
  return (
    <React.Fragment>
      <div className="styled-checkbox-wrapper">
        <div
          className="styled-checkbox"
          ref={checkbox}
          onClick={toggleCheckbox}
          style={style}
        >
          <img src={imgSrc} alt={imgAlt} />
          <span className="checked-icon">
            <svg height="40" width="40" id="polygon">
              <polygon
                points="0,0 40,0 40,40"
                style={{ fill: "grey", stroke: "purple", strokeWidth: 0 }}
              />
              Sorry, your browser does not support inline SVG.
            </svg>
            <svg id="tickSvg" x="0px" y="0px" viewBox="0 0 512 512">
              <g>
                <g>
                  <path
                    d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0
			c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7
			C514.5,101.703,514.499,85.494,504.502,75.496z"
                  />
                </g>
              </g>
            </svg>
          </span>
          <span className="title">{title}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

//Inline checkbox component
const InlineCheckBox = ({
  onChange,
  checked,
  className,
  value,
  title,
  style,
  boxValue,
  width,
  dir,
  ...props
}) => {
  const checkbox = useRef();
  const toggleCheckbox = () => {
    checked = !checked;
    if (checked) checkbox.current.classList.add("checked");
    else checkbox.current.classList.remove("checked");
    onChange({ title: title, key: boxValue, checked: checked });
  };
  return (
    <React.Fragment>
      <div
        className="inline-checkbox-wrapper"
        style={{ width: width, ...style }}
      >
        <div
          className={"inline-checkbox" + (checked ? " checked" : "")}
          ref={checkbox}
          onClick={toggleCheckbox}
          style={{ direction: dir }}
        >
          <div className="key">
            <span>{boxValue}</span>
          </div>
          <div className="title">{title}</div>
          <div className="checked-icon">
            <svg id="tickSvg" x="0px" y="0px" viewBox="0 0 512 512">
              <g>
                <g>
                  <path
                    d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0
			c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7
			C514.5,101.703,514.499,85.494,504.502,75.496z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { ImageCheckBox, InlineCheckBox, CheckBoxRow };
