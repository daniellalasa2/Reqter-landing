import React from "react";
// import { Ffo } from "./FormCreator";
class StartUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props.location.state.data);
  }
  render() {
    return (
      <div>
        <h1> Start Up</h1>
      </div>
    );
  }
}

export default StartUp;
