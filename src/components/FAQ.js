import React from "react";
import { Collapse } from "reactstrap";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/FAQ.scss";
class FAQ extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      FAQCollapse: null
    };
  }

  toggleFaqCollapse = e => {
    let toggleId = e.target.id === this.state.FAQCollapse ? null : e.target.id;
    this.setState({
      FAQCollapse: toggleId
    });
  };
  render() {
    return (
      <section id="FAQ-accordion">
        <h3 style={{ fontWeight: "bold" }}>سوالات متداول</h3>
        <div className="questions-wrapper">
          <Card>
            <CardHeader
              id="question1"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question1" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              رسالت اصلی استارتاپ اسپیس چیست؟
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question1"}>
              <CardBody>
                هدف اصلی ما در استارتاپ اسپیس ایجاد مرجع جامعی از فضاهای کاری
                مشترک در سطح شهر می باشد تا استارتاپ ها و فری لنسرها هرچه راحتتر
                و سریعتر فضای کاری مورد نیاز خود را یافته و کار مورد علاقه خود
                را شروع کنند.
              </CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader
              id="question2"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question2" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              تفاوت استارتاپ اسپیس با سایر سرویسهای موجود که در این حوزه کار
              میکنند چیست؟
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question2"}>
              <CardBody>
                استارتاپ اسپیس به شما فضاهای کاری را معرفی نمی کند بلکه شما از
                ما درخواست فضای کار میکنید و ما به جای شما به همه فضاهای کاری
                مشترک در شهر درخواستی درخواست میدهیم و پیشنهادشان را به شما
                ارسال می کنیم و شما از بین پیشنهادهای رسیده بهترین را انتخاب
                میکنید.
              </CardBody>
            </Collapse>
          </Card>
        </div>
      </section>
    );
  }
}
export default FAQ;
