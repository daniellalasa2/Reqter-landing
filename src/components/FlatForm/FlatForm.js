import React, { useRef, useState, useEffect } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./FlatForm.scss";
import { Button } from "reactstrap";
import Spinner from "../../assets/script/spinner";
import AvatarUploader from "./AvatarUploader";
import JsonInput from "./JsonInput";
import ImageUploaderApiIncluded from "./ImageUploaderApiIncluded";
import Skeleton from "react-loading-skeleton";
// import MultiImageUploader from "./MultiImageUploader";
/*
  Todo:
    1- CustomCheckBox must return data as the last or the first arguments toward onChange function
    2- CheckBoxRow radio mode has an error while a radio element is selected have not deselect by clicking again.
    3- Alphabetic value box for image and inline select components
    4- set proptypes for props of each component
    5- make an appropriate behavior for Flat date and time picker components it must behave as a normal input
    6- Use input with radio and checkbox type to handle inlineCheckbox component behavior
*/
//HOC select wrapper
class SelectRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedElements: props.checkedElements,
      renderedChildren: null
    };
    this.thisRef = React.createRef();
  }
  removeObjByKey = (array, object, indexName) => {
    array.forEach((val, key) => {
      if (val[indexName] === object[indexName]) {
        array.splice(key, 1);
      }
    });
    return array;
  };

  selectionHandler = (...restArgs) => {
    let name = restArgs[0];
    let data = restArgs[1];
    const type = this.props.type || "checkbox";
    let arr = [];
    let stateGoingToUpdate = {};
    switch (type) {
      case "checkbox":
        arr = this.state.checkedElements;
        if (data.checked) {
          arr.push(data);
        } else {
          //if value checkbox unchecked then remove unchecked item from list
          arr = this.removeObjByKey(arr, data, "value");
        }
        stateGoingToUpdate = {
          checkedElements: arr
        };
        break;
      case "radio":
        const newChilds = React.Children.map(
          this.state.renderedChildren,
          child => {
            return React.cloneElement(child, {
              width: `${this.childWidth}px`,
              onChange: this.selectionHandler,
              checked: child.props.val === data.value
            });
          }
        );

        stateGoingToUpdate = {
          checkedElements: data,
          renderedChildren: newChilds
        };

        break;
      default:
        console.error('CheckBoxRow component expected a "type" property !');
        break;
    }
    this.setState(
      {
        ...stateGoingToUpdate
      },
      () => {
        this.props.onChange(name, this.state.checkedElements);
      }
    );
  };
  childRenderer = newProps => {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        width: `${this.childWidth}px`,
        onChange: this.selectionHandler,
        dir: this.props.dir
      })
    );
  };
  componentDidMount() {
    //get width from props or style !!!!
    this.width = this.thisRef.current.clientWidth;
    this.childWidth = this.width / this.props.rowitems;
    this.setState({
      renderedChildren: this.childRenderer()
    });
  }

  render() {
    return (
      <div
        ref={this.thisRef}
        style={{
          ...this.props.style,
          boxSizing: "content-box",
          direction: this.props.dir
        }}
        className={classnames("CheckBoxRow", this.props.className)}
      >
        {this.state.renderedChildren}
      </div>
    );
  }
}

//Image check box comopnent
const ImageSelect = ({
  onChange,
  checked,
  className,
  title,
  style,
  boxValue,
  width,
  key,
  val,
  dir,
  imgSrc,
  imgAltText,
  imgAltSrc,
  name
}) => {
  const checkbox = useRef();
  const toggleCheckbox = () => {
    checked = !checked;
    if (checked) checkbox.current.classList.add("checked");
    else checkbox.current.classList.remove("checked");
    onChange(name, { title: title, value: val, checked: checked, name: name });
  };
  return (
    <React.Fragment>
      <div className="styled-checkbox-wrapper">
        <div
          className={"styled-checkbox" + (checked ? " checked" : "")}
          ref={checkbox}
          onClick={toggleCheckbox}
          style={style}
        >
          <img
            src={imgSrc}
            alt={imgAltText}
            onError={e => {
              return imgAltSrc ? (e.target.src = imgAltSrc) : "";
            }}
          />
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
const InlineSelect = ({
  onChange,
  checked,
  className,
  title,
  style,
  val,
  boxValue,
  width,
  key,
  dir,
  name
}) => {
  const checkbox = useRef();
  const toggleCheckbox = () => {
    checked = !checked;
    if (checked) checkbox.current.classList.add("checked");
    else checkbox.current.classList.remove("checked");
    onChange(name, { title: title, value: val, checked: checked, name: name });
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

const FlatNumberSet = ({
  onClick,
  onChange,
  label,
  range,
  error,
  name,
  defaultValue,
  direction,
  id
}) => {
  const _wrapperRef = useRef();
  const _activated = e => {
    const childs = _wrapperRef.current.children;
    const childCount = childs.length;
    for (let i = 0; i < childCount; i++) {
      childs[i].classList.remove("active");
    }
    e.target.classList.add("active");
    onChange(e);
  };
  let numberRangeButtons = [];
  for (let i = range[0]; i <= range[1]; i++) {
    numberRangeButtons.push(
      <input
        onClick={_activated}
        type="button"
        name={name}
        key={`flatFormNumberSetButton${i}`}
        className={
          "sets" +
          (parseInt(defaultValue) === i ||
          (i === range[1] && defaultValue > range[1])
            ? " active"
            : "")
        }
        value={i === range[1] ? `+${i}` : i}
      />
    );
  }
  return (
    <div
      className={classnames("field-row", direction ? "_" + direction : "")}
      id={id}
    >
      <label>{label}</label>
      <div
        ref={_wrapperRef}
        className={classnames(
          "number-range-buttons-container",
          direction ? "_" + direction : ""
        )}
      >
        {numberRangeButtons}
      </div>
      <span className="error-message">{error}</span>
    </div>
  );
};
//All components show the error property if it has value
const FlatInput = ({
  type,
  placeholder,
  onClick,
  onChange,
  label,
  error,
  defaultValue,
  minLength,
  maxLength,
  pattern,
  min,
  max,
  name,
  id,
  className,
  style,
  autoFocus,
  prefix,
  readOnly,
  disabled,
  direction,
  ...props
}) => {
  const propsClone = { ...props };
  delete props.children;
  return (
    <div className={classnames("field-row", direction && `_${direction}`)}>
      {label && <span className="field-title">{label}</span>}
      <div className="input-wrapper" style={{ direction: "ltr" }}>
        {prefix && <span className="flatinput-prefix">{prefix}</span>}
        <input
          type={type}
          placeholder={placeholder}
          onClick={onClick}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
          min={min}
          max={max}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          id={id}
          style={style}
          autoFocus={autoFocus}
          readOnly={readOnly}
          disabled={disabled}
          className={classnames(
            className,
            error && "error-input",
            prefix && "has-prefix"
          )}
          {...props}
        />
      </div>
      {propsClone.children}
      <span className="error-message">{error}</span>
    </div>
  );
};
const FlatTextArea = ({
  placeholder,
  onClick,
  onChange,
  label,
  error,
  name,
  direction,
  id,
  style,
  wrapperStyle,
  ...props
}) => {
  return (
    <div
      className={classnames("field-row", direction && `_${direction}`)}
      style={wrapperStyle}
    >
      <span className="field-title">{label}</span>
      <textarea
        id={id}
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChange}
        {...props}
        name={name}
        style={style}
        className={error && "error-input"}
      />
      <span className="error-message">{error}</span>
    </div>
  );
};

/*************************
    *** Flat Inline Select component ***
    Accepted array of object:
    example = [{
                checked = true || false
                title   = "select 1"
                key     = "A unique react child key :)"
                boxValue= "1"
                dir     = "rtl || ltr"
                value    = "select1"  value of select box
                },...]
***************************/
const FlatInlineSelect = ({ items, onChange, dir, type, name }) => {
  const checkedElements = [];
  const _options = items.map((val, index) => {
    if (val.defaultChecked) {
      checkedElements.push(val);
    }
    return (
      <InlineSelect
        checked={val.defaultChecked}
        title={val.title}
        val={val.value}
        boxValue={index + 1}
        dir={dir}
        key={val.key}
        name={name}
      />
    );
  });
  const _select =
    items.length > 0 ? (
      <SelectRow
        onChange={onChange}
        dir={dir}
        type={type}
        checkedElements={checkedElements}
      >
        {_options}
      </SelectRow>
    ) : (
      <React.Fragment>
        <br />
        <br />
        <strong style={{ color: "grey" }}>.گزینه ای موجود نیست</strong>
      </React.Fragment>
    );
  return _select;
};

/*************************
    *** Flat Image Select component ***
    Accepted array of object:
    example = [{
                checked = true || false
                title= "select 1"
                key = "A unique react child key :)"
                boxValue= "1"
                dir= "rtl || ltr"
                value = "select1"  value of select box
                imgSrc = "http://example.com/example.jpg" //image source of each select
                imgAlt = "Image Exampe"  //alt attr for img  
                },...]
***************************/
const FlatImageSelect = ({
  items,
  onChange,
  dir,
  type,
  name,
  className,
  imgAltSrc,
  imgAltText,
  defaultChecked
}) => {
  const checkedElements = [];
  const _options = items.map((val, index) => {
    if (val.defaultChecked) {
      checkedElements.push(val);
    }
    return (
      <ImageSelect
        checked={val.defaultChecked || defaultChecked === val.value}
        title={val.title}
        key={index}
        boxValue={index + 1}
        dir={dir}
        imgSrc={val.imgSrc}
        imgAltSrc={imgAltSrc || val.imgAltSrc}
        imgAltText={val.imgAltText || imgAltText || "Flat Image Select"}
        val={val.value}
        name={name}
      />
    );
  });
  const _select =
    items.length > 0 ? (
      <SelectRow
        onChange={onChange}
        dir={dir}
        type={type}
        checkedElements={checkedElements}
        className={className}
      >
        {_options}
      </SelectRow>
    ) : (
      <React.Fragment>
        <br />
        <br />
        <strong style={{ color: "grey" }}>.گزینه ای موجود نیست</strong>
      </React.Fragment>
    );
  return _select;
};

//Uploader Component
const FlatUploader = ({
  style,
  progress,
  progresscolor,
  label,
  placeholder,
  buttonValue,
  onChange,
  wrapperStyle,
  direction,
  id,
  error
}) => {
  let input = useRef();
  const [fileName, setFileName] = useState(placeholder);
  const changeFileName = e => {
    setFileName(e.target.files[0].name);
  };
  return (
    <div
      className={classnames("field-row", direction && "_" + direction)}
      id={id}
      style={wrapperStyle}
    >
      <span className="field-title">{label}</span>
      <div
        className={classnames(
          "flatuploader",
          progress === 100 ? "success-upload" : null
        )}
        style={{ ...style }}
      >
        <div
          className="percentage-number"
          style={{ display: progress ? "block" : "none" }}
        >
          {progress ? `%${progress}` : null}
        </div>
        <FontAwesomeIcon
          className="cloud-icon"
          icon={faCloud}
          size="3x"
          color={progresscolor}
        />
        <FontAwesomeIcon
          className="success-icon"
          icon={faCheck}
          size="3x"
          color="green"
        />
        <span className="file-name-section">{fileName}</span>
        <div
          className="file-select-button"
          onClick={() => input.current.click()}
        >
          <strong className="placeholder">
            {buttonValue || "انتخاب فایل"}
          </strong>
        </div>

        <input
          type="file"
          onChange={e => {
            changeFileName(e);
            if (typeof onChange === "function") return onChange(e);
          }}
          ref={input}
          style={{ display: "none" }}
        />
      </div>
      <span className="error-message">{error}</span>
    </div>
  );
};

// Flat Time
const FlatTimePicker = ({ onChange, name }) => {
  const [time, setTime] = useState({
    hour: { amount: "", valid: false },
    minute: { amount: "", valid: false }
  });

  useEffect(() => {
    let isValid = true;
    for (let detail in time) {
      isValid *= time[detail].valid;
    }
    if (isValid) {
      onChange(`${time.hour.amount}/${time.minute.amount}`);
    }
  });

  const StateHandler = e => {
    const name = e.target.name,
      value = e.target.value,
      isValid = Boolean(parseInt(e.target.value));
    setTime({
      ...time,
      [name]: { amount: value, valid: isValid }
    });
  };
  return (
    <div className="timeWrapper">
      <input
        type="number"
        className="hour"
        placeholder="ساعت"
        min="00"
        max="23"
        name="hour"
        onChange={StateHandler}
      />
      <input
        min="00"
        max="59"
        type="number"
        name="minute"
        placeholder="دقیقه"
        className="minute"
        onChange={StateHandler}
      />
    </div>
  );
};
const FlatButton = ({ value, color, suspense, ...props }) => {
  return (
    <Button {...props} disabled={suspense ? true : props.disabled}>
      {suspense ? <Spinner width="25px" /> : props.children}
    </Button>
  );
};
const FlatDatePicker = ({ onChange, name }) => {
  // define states
  const [date, setDate] = useState({
    year: { amount: "", valid: false },
    month: { amount: "", valid: false },
    day: { amount: "", valid: false }
  });
  useEffect(() => {
    let isValid = true;
    for (let detail in date) {
      isValid *= date[detail].valid;
    }
    if (isValid) {
      onChange(`${date.year.amount}/${date.month.amount}/${date.day.amount}`);
    }
  });
  // hanle state changes
  const StateHandler = e => {
    const name = e.target.name,
      value = e.target.value,
      isValid = Boolean(parseInt(e.target.value));
    setDate({
      ...date,
      [name]: { amount: value, valid: isValid }
    });
  };
  return (
    <div className="dateWrapper">
      <input
        type="number"
        className="year"
        placeholder="سال"
        min="1398"
        max="1400"
        name="year"
        onChange={StateHandler}
      />
      <input
        min="1"
        max="12"
        type="number"
        name="month"
        placeholder="ماه"
        className="month"
        onChange={StateHandler}
      />
      <input
        min="1"
        max="31"
        name="day"
        type="number"
        placeholder="روز"
        className="day"
        onChange={StateHandler}
      />
    </div>
  );
};
const FlatAvatarUploader = ({ style, id, label, ...props }) => {
  return (
    <div className="field-row" id={id}>
      <label>{label}</label>
      <div className={classnames("flatAvatarUploader")} style={{ ...style }}>
        <AvatarUploader {...props} />
      </div>
    </div>
  );
};
const FlatJsonInput = ({ label, id, name, style, ...props }) => {
  return (
    <div className="field-row" id={id}>
      <label>{label}</label>
      <div
        name={name}
        className={classnames("flatJsonInput")}
        style={{ ...style }}
      >
        <JsonInput {...props} name={name} />
      </div>
    </div>
  );
};

const FlatCustomWrapper = ({
  label, //section title(label)
  error, //error message
  direction, //wrapper direction: rtl or ltr
  skeleton, //make skeleton active or deactive
  skeletonConfig, //skeleton config accepts: all react-skeleton props
  ...props
}) => {
  return (
    <div
      className={classnames("field-row", direction && "_" + direction)}
      {...props}
    >
      {label && <span className="field-title">&nbsp;{label}</span>}

      {/* fill checkboxes */}
      {skeleton ? (
        props.children
      ) : (
        <Skeleton
          count={skeletonConfig.count}
          style={skeletonConfig.style}
          {...skeletonConfig}
        />
      )}
      <span className="error-message">{error}</span>
    </div>
  );
};
export {
  ImageSelect,
  InlineSelect,
  FlatInput,
  FlatTextArea,
  FlatInlineSelect,
  FlatImageSelect,
  FlatNumberSet,
  FlatUploader,
  FlatTimePicker,
  FlatDatePicker,
  FlatAvatarUploader,
  FlatButton,
  FlatJsonInput,
  FlatCustomWrapper,
  ImageUploaderApiIncluded as FlatImageUploaderApiIncluded
};
