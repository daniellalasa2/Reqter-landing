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
                را شروع کنند .
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
                میکنید .
              </CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader
              id="question3"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question3" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              آیا استفاده از استارتاپ اسپیس برای من هزینه دارد؟
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question3"}>
              <CardBody>
                خیر. تمامی مراحل درخواست فضای کار از زمان ارسال درخواست تا
                دریافت پیشنهاد از فضاهای کار و تایید توسط شما از طریق این پلتفرم
                بصورت رایگان انجام میگیرد و شما هزینه ای بابت خدماتی که ما ارایه
                می کنیم به ما پرداخت نمی کنید .
              </CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader
              id="question4"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question4" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              امنیت اطلاعات در استارتاپ اسپیس چگونه است؟
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question4"}>
              <CardBody>
                اطلاعات شما شامل اسم و مشخصات و شماره تلفن و تمامی اطلاعات شخصی
                شما نزد ما نگهداری می شود و به هیچ عنوان برای مقاصد دیگر جز
                پیشنهادهای فضای کار از طریق استارتاپ اسپیس استفاده نمی شود و
                درخواستهای شما مستقیما برای ارائه دهندگان سرویس فضای کار ارسال
                می شوید .
              </CardBody>
            </Collapse>
          </Card>

          <Card>
            <CardHeader
              id="question5"
              onClick={this.toggleFaqCollapse}
              className={
                this.state.FAQCollapse === "question5" ? "activeHeader" : ""
              }
            >
              <FontAwesomeIcon icon={faPlus} color="#6d8ae0" />
              <FontAwesomeIcon icon={faMinus} color="#6d8ae0" />
              طرز کار استارتاپ اسپیس چگونه است؟
            </CardHeader>
            <Collapse isOpen={this.state.FAQCollapse === "question5"}>
              <CardBody>
                شما یک فرم چند مرحله ای ساده را که به منظور شناسایی نیازهای
                شماست پر کرده و ارسال می کنید و از داخل پنل خود بعد از ورود می
                توانید درخواستهای خود را مشاهده و از آخرین وضعیت درخواست خود
                مطلع می شوید و در صورت دریافت پیشنهاد می توانید قبول یا رد
                نمایید. شما امکان انتخاب چند پیشنهاد را نیز دارید و در نهایت
                فضای کاری مطلوب خود را انتخاب کرده و مراحل مستقر شدن و جابه جایی
                را تا انتها به سرانجام میرسانید .
              </CardBody>
            </Collapse>
          </Card>
        </div>
      </section>
    );
  }
}
export default FAQ;
