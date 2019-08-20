import React, { useRef, useState, useEffect } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./FlatForm.scss";
/*
  Todo:
    1- CustomCheckBox must return data as the last or the first arguments toward onChange function
    2- CheckBoxRow radio mode has an error while a radio element is selected have not deselect by clicking again.
    3- Alphabetic value box for image and inline select components
    4- set proptypes for props of each component
    5- make an appropriate behavior for Flat date and time picker components it must behave as a normal input

*/
//HOC select wrapper
class SelectRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkedElements: [],
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
  selectionHandler = data => {
    const type = this.props.type || "checkbox";
    switch (type) {
      case "checkbox":
        var arr = this.state.checkedElements;
        if (data.checked) {
          arr.push(data);
          this.setState(
            {
              checkedElements: arr
            },
            (...restArgs) => {
              this.props.onChange(this.state.checkedElements);
            }
          );
        } else {
          arr = this.removeObjByKey(arr, data, "value");
          this.setState(
            {
              checkedElements: arr
            },
            () => {
              this.props.onChange(this.state.checkedElements);
            }
          );
        }
        break;
      case "radio":
        const newChilds = React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {
            width: `${this.childWidth}px`,
            onChange: this.selectionHandler,
            checked: child.value === data.value
          });
        });
        this.setState(
          {
            checkedElements: data,
            renderedChildren: newChilds
          },
          () => {
            this.props.onChange(this.state.checkedElements);
          }
        );
        break;

      default:
        console.warn('CheckBoxRow component expected a "type" property .');
        break;
    }
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
        className="CheckBoxRow"
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
  imgAlt,
  name
}) => {
  const checkbox = useRef();
  const toggleCheckbox = () => {
    checked = !checked;
    if (checked) checkbox.current.classList.add("checked");
    else checkbox.current.classList.remove("checked");
    onChange({ title: title, value: val, checked: checked, name: name });
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
    onChange({ title: title, value: val, checked: checked, name: name });
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
    <div className="field-row" id={id}>
      <label>{label}</label>
      <div ref={_wrapperRef} className="number-range-buttons-container">
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
  minlength,
  maxlength,
  pattern,
  min,
  max,
  name,
  id
}) => {
  return (
    <div className="field-row">
      <span className="field-title">{label}</span>
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
        minLength={minlength}
        maxLength={maxlength}
        id={id}
        className={classnames(error && "error-input")}
      />
      <span className="error-message">{error}</span>
    </div>
  );
};
const FlatTextArea = ({
  type,
  placeholder,
  onClick,
  onChange,
  label,
  error,
  name,
  props
}) => {
  return (
    <div className="field-row">
      <span className="field-title">{label}</span>
      <textarea
        placeholder={placeholder}
        onClick={onClick}
        type={type}
        onChange={onChange}
        {...props}
        name={name}
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
  const _options = items.map((val, index) => {
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
  const _select = (
    <SelectRow onChange={onChange} dir={dir} type={type}>
      {_options}
    </SelectRow>
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
const FlatImageSelect = ({ items, onChange, dir, type, name }) => {
  const _options = items.map((val, index) => {
    return (
      <ImageSelect
        checked={val.defaultChecked}
        title={val.title}
        key={val.key}
        boxValue={index + 1}
        dir={dir}
        imgSrc={val.imgSrc}
        imgAlt={val.imgAlt | "Flat Image Select"}
        val={val.value}
        name={name}
      />
    );
  });
  const _select = (
    <SelectRow onChange={onChange} dir={dir} type={type}>
      {_options}
    </SelectRow>
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
  id,
  error
}) => {
  let input = useRef();
  const [fileName, setFileName] = useState(placeholder);
  const changeFileName = e => {
    setFileName(e.target.files[0].name);
  };
  return (
    <div className="field-row" id={id}>
      <label>{label}</label>
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

// Helper Functions
const removeClass = (e, nameOfClass) => {
  e.target.classList.remove(nameOfClass);
};
const addClass = (e, nameOfClass) => {
  e.target.classList.add(nameOfClass);
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
  FlatDatePicker
};
