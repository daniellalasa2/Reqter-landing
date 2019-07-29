import React, { useRef } from "react";
import "./CustomCheckbox.scss";
const CheckBoxRow = ({ width, col, type, ...props }) => {
  console.log(props);
  return <section style={{ width: width }}>{}</section>;
};
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
  const toggleCheckbox = e => {
    checked = !checked;
    if (checked) checkbox.current.classList.add("checked");
    else checkbox.current.classList.remove("checked");
    onChange();
  };
  return (
    <React.Fragment>
      <div className="inline-checkbox-wrapper" style={style}>
        <div
          className="inline-checkbox"
          ref={checkbox}
          onClick={toggleCheckbox}
          style={{ direction: dir }}
        >
          <div className="key">
            <span>{boxValue}</span>
          </div>
          <div className="title" style={{ width: width }}>
            {title}
          </div>
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
