import React from "react";

class FormCreator extends React.Component {
  constructor(props) {
    super(props);
  }

  Tag = () => {
    return <h1>hi there</h1>;
  };

  render() {
    return "none";
  }
}
const ff = new FormCreator();
const Ffo = ff.Tag();

export { Ffo };
