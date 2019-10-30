import React from "react";
import "./IssueOffer.scss";
import {
  FlatImageSelect,
  FlatInput,
  FlatTextArea
} from "../../FlatForm/FlatForm";
import IconESandali from "../../../assets/images/products-icons/001-money.png";
import IconESandali2 from "../../../assets/images/products-icons/002-desk.png";
export default class IssueOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1
    };
  }

  componentDidCatch() {}
  render() {
    return (
      <div className="select-products">
        <div className="issueOffer-step">
          <FlatImageSelect
            items={[
              {
                imgSrc: IconESandali,
                value: 1,
                title: "میز اشتراکی",
                name: "test1"
              },
              {
                imgSrc: IconESandali2,
                value: 2,
                title: "میز اختصاصی",
                name: "test2"
              }
            ]}
            onChange={(name, checkedObj) => console.log("ok", name, checkedObj)}
            type="radio"
            name="offeredProduct"
          />
        </div>
        {/* <div className="issueOffer-step">
          <FlatImageSelect
            items={[
              { imgSrc: IconESandali, val: "Product", key: 1 },
              { imgSrc: IconESandali2, val: "Startup", key: 2 }
            ]}
            type="radio"
          />
        </div> */}
      </div>
    );
  }
}
