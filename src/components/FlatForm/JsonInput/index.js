import React from "react";
import { Table, Button, Input } from "reactstrap";
import classnames from "classnames";
export default class JsonInput extends React.Component {
  constructor(props) {
    super(props);
    const { defaultItems } = props;
    // this.objStructure = { header: "", body: "" };
    const initializedObj =
      (defaultItems &&
        typeof defaultItems === "string" &&
        JSON.parse(defaultItems).length &&
        JSON.parse(defaultItems)) ||
      new Array({ header: "", body: "", childId: 0 });
    this.state = {
      objectsList: initializedObj,
      jsonError: ""
    };
  }
  removeThePair = idx => {
    var newObj = this.state.objectsList;
    newObj.splice(idx, 1);
    this.setState({
      objectsList: newObj
    });
  };
  addPair = () => {
    let stateObj = this.state.objectsList;
    const arrObj = Array.from(stateObj);
    arrObj.push({ header: "", body: "", childId: stateObj.length });
    this.setState({
      objectsList: arrObj
    });
  };
  inputChange = e => {
    let { name, value } = e.target;
    const type = e.target.getAttribute("data-type");
    const index = e.target.getAttribute("data-idx");
    let newObjectsList = Array.from(this.state.objectsList);
    let jsonErrorText = "";
    value = String(value);
    name = String(name);
    newObjectsList[index][type] = value;
    this.setState(
      {
        objectsList: newObjectsList,
        jsonError: jsonErrorText
      },
      () => {
        if (
          this.state.jsonError === undefined ||
          this.state.jsonError.length === 0
        ) {
          let generatedArr = Array.from(this.state.objectsList);
          for (var i = 0; i < generatedArr.length; i++) {
            delete generatedArr[i]["childId"];
          }
          console.log(generatedArr);
          this.props.onChange({
            target: {
              value: JSON.stringify(this.state.objectsList),
              name: this.props.name
            }
          });
        }
      }
    );
  };
  generateTableBasedOnStateJson = () => {
    const { objectsList } = this.state;
    const newArr = Array.from(objectsList);
    const generatedElements = newArr.map((obj, idx) => {
      return (
        <tr key={obj.childId}>
          <td>
            <Input
              type="text"
              data-type="header"
              data-idx={idx}
              defaultValue={obj.header}
              placeholder="Key"
              name={`key_${obj.childId}`}
              onChange={this.inputChange}
            />
          </td>
          <td>
            <Input
              data-idx={idx}
              type="text"
              data-type="body"
              placeholder="Value"
              defaultValue={obj.body}
              name={`value_${obj.childId}`}
              onChange={this.inputChange}
            />
          </td>
          <td>
            <Button
              style={{
                borderWidth: "0",
                borderRadius: "1px",
                backgroundColor: "#2e5b96"
              }}
              size="sm"
              onClick={() => this.removeThePair(obj.childId)}
            >
              <strong>&nbsp;X&nbsp;</strong>
            </Button>
          </td>
        </tr>
      );
    });
    return generatedElements;
  };
  //life cycles
  componentWillMount() {
    //load styles while component is going to mount
    require("./index.scss");
  }
  render() {
    const { direction, text } = this.props;
    const { jsonError } = this.state;
    return (
      <div
        className={classnames("JsonInput", () => direction && `_${direction}`)}
      >
        <Table bordered>
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
                  style={{
                    display: "block",
                    margin: "auto",
                    borderRadius: "1px",
                    backgroundColor: "#2e5b96"
                  }}
                >
                  <span className="addRow" onClick={this.addPair}>
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
