import React from "react";
import { Table, Button, Input } from "reactstrap";
import classnames from "classnames";
export default class JsonInput extends React.Component {
  constructor(props) {
    super(props);
    const { defaultItems } = props;
    const initializeObj = defaultItems
      ? typeof defaultItems === "string"
        ? JSON.parse(defaultItems)
        : defaultItems
      : { key1: "" };
    this.state = {
      objectsList: initializeObj,
      jsonError: ""
    };
  }
  // jsonValidator = json => {
  //   const text = JSON.stringify(json);
  //   if (
  //     /^[\],:{}\s]*$/.test(
  //       text
  //         .replace(/\\["\\\/bfnrtu]/g, "@")
  //         .replace(
  //           /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  //           "]"
  //         )
  //         .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  //     )
  //   ) {
  //     return true;
  //   } else {
  //     console.log("JsonInput component error: JSON format error");
  //     return false;
  //   }
  // };
  removeThePair = key => {
    var newObj = this.state.objectsList;
    delete newObj[key];
    this.setState({
      objectsList: newObj
    });
  };
  addAPair = () => {
    const { objectsList } = this.state;
    const numberOfKeys = Object.keys(objectsList).length;
    const newKey = "key" + (numberOfKeys + 1);
    this.setState({
      objectsList: {
        ...objectsList,
        //generate a new key:value for new added item
        [newKey]: ""
      }
    });
  };
  inputChange = e => {
    let { name, value } = e.target; //key1 , 1
    const type = e.target.getAttribute("data-type"); //key
    let newObjectsList = this.state.objectsList; //key1:"",key2:""
    let jsonErrorText = ""; //""
    value = String(value); //1
    name = String(name); //key1
    switch (type) {
      case "key": //key
        //changing the name of a specific key in Json
        if (
          (newObjectsList[value] && newObjectsList[value].length > 0) ||
          newObjectsList[value] === ""
        ) {
          //ignoring keys duplication
          jsonErrorText = this.props.text.duplicateKeyError;
        } else {
          if (value.length > 0) {
            newObjectsList[value] = newObjectsList[name];
            delete newObjectsList[name];
          } else {
            jsonErrorText = this.props.text.emptyKey;
          }
        }
        break;
      case "value":
        //changing the value of a key
        newObjectsList[name] = value;
        break;
      default:
    }
    this.setState({
      objectsList: newObjectsList,
      jsonError: jsonErrorText
    });
  };
  generateTableBasedOnStateJson = () => {
    const { objectsList } = this.state;
    const generatedElements = [];
    let reactChildKey = 1;
    for (const itemKey in objectsList) {
      generatedElements.push(
        <tr key={reactChildKey}>
          <td>
            <Input
              type="text"
              data-type="key"
              placeholder="Key"
              defaultValue={itemKey}
              name={itemKey}
              onChange={this.inputChange}
            />
          </td>
          <td>
            <Input
              type="text"
              data-type="value"
              placeholder="Value"
              defaultValue={objectsList[itemKey]}
              name={itemKey}
              onChange={this.inputChange}
            />
          </td>
          <td>
            <Button
              style={{ borderWidth: "1px" }}
              size="sm"
              color="danger"
              onClick={() => this.removeThePair(itemKey)}
            >
              <strong>&nbsp;X&nbsp;</strong>
            </Button>
          </td>
        </tr>
      );
      reactChildKey++;
    }
    return generatedElements;
  };
  //life cycles
  componentWillMount() {
    //load styles while component is going to mount
    require("./index.scss");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    //call the parent callback on each component update
    if (this.state.jsonError === undefined || this.state.jsonError.length === 0)
      this.props.onChange({ ...this.state.objectsList });
  }
  componentDidMount() {}
  render() {
    const { direction, text } = this.props;
    const { jsonError } = this.state;
    return (
      <div
        className={classnames("JsonInput", () => direction && `_${direction}`)}
      >
        <Table>
          <thead>
            <tr>
              <th>
                <strong>{text.keyText}</strong>
              </th>
              <th>
                <strong>{text.valueText}</strong>
              </th>
              <th>
                <strong>{text.remove}</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.generateTableBasedOnStateJson()}
            <tr>
              <td colSpan="3">
                <Button
                  size="sm"
                  color="success"
                  style={{ display: "block", margin: "auto" }}
                >
                  <span className="addRow" onClick={this.addAPair}>
                    +&nbsp;{text.addButton}
                  </span>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        {jsonError !== "" && <span className="jsonError">{jsonError}</span>}
      </div>
    );
  }
}
