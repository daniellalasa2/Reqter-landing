import React from "react";
import { Table, Button, Input } from "reactstrap";
import classnames from "classnames";
export default class JsonInput extends React.Component {
  constructor(props) {
    super(props);
    const { defaultItems } = props;
    const initializedObj = defaultItems
      ? typeof defaultItems === "string"
        ? JSON.parse(defaultItems)
        : defaultItems
      : [{ key: "", value: "" }];
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
    let arrObj = this.state.objectsList;
    arrObj.push({ key: "", value: "" });
    this.setState({
      objectsList: arrObj
    });
  };
  inputChange = e => {
    let { name, value } = e.target;
    const type = e.target.getAttribute("data-type");
    const index = e.target.getAttribute("data-idx");
    let newObjectsList = this.state.objectsList;
    let jsonErrorText = "";
    value = String(value);
    name = String(name);
    newObjectsList[index][type] = value;
    this.setState({
      objectsList: newObjectsList,
      jsonError: jsonErrorText
    });
  };
  generateTableBasedOnStateJson = () => {
    const { objectsList } = this.state;
    const newArr = Array.from(objectsList);
    const generatedElements = newArr.map((obj, idx) => (
      <tr key={`child${idx}_${obj.key}`}>
        <td>
          <Input
            type="text"
            data-type="key"
            data-idx={idx}
            placeholder="Key"
            defaultValue={obj.key}
            name={`key_${idx}_${obj.key}`}
            onChange={this.inputChange}
          />
        </td>
        <td>
          <Input
            data-idx={idx}
            type="text"
            data-type="value"
            placeholder="Value"
            defaultValue={obj.value}
            name={`value_${idx}_${obj.value}`}
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
            onClick={() => this.removeThePair(idx)}
          >
            <strong>&nbsp;X&nbsp;</strong>
          </Button>
        </td>
      </tr>
    ));
    return generatedElements;
  };
  //life cycles
  componentWillMount() {
    //load styles while component is going to mount
    require("./index.scss");
  }
  componentDidUpdate(prevProps, prevState) {
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
