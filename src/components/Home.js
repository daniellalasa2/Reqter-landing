import React from "react";
import { ProductSpecs, Title, SpecList, Spec, Btn } from "./ProductSpecs";
import { Collapse, Button, Row, Col } from "reactstrap";
import "../assets/styles/Home.scss";
//Import images
import sessionRoom from "../assets/images/session-room.jpg";
import dedicatedOffice from "../assets/images/dedicated-office.jpg";
import sharedDesk from "../assets/images/shared-desk.jpg";
import privateDesk from "../assets/images/private-desk.jpg";
import service from "../assets/images/service-icons/service.png";
import apply from "../assets/images/service-icons/apply.png";
import offer from "../assets/images/service-icons/offer.png";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";

//Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Products = React.lazy(() => import("./Products"));
class Home extends React.Component {
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
      <React.Fragment>
        <Products {...this.props} />
        <section>
          <Row>
            <Col lg="12">
              <section className="facilities-description">
                <div className="header">مراحل انجام کار</div>
                {/* <p>
                  Credible is an online marketplace that provides borrowers with
                  competitive, personalized loan offers from multiple, vetted
                  lenders in real time.
                </p> */}
                <ul>
                  <li>
                    <div className="image-circle">
                      <img src={service} alt="دریافت سرویس" />
                    </div>
                    <span>دریافت سرویس</span>
                    <p>
                      بعد از بررسی پیشنهادهای رسیده توسط سرویس دهندگان توسط شما،
                      ارتباط بین شما و سرویس دهنده مناسب جهت انجام کار برقرار
                      میگردد
                    </p>
                  </li>
                  <li>
                    <div className="image-circle">
                      <img
                        src={offer}
                        alt="بررسی و ارسال به سرویس دهندگان مرتبط"
                      />
                    </div>
                    <span>بررسی و ارسال به سرویس دهندگان مرتبط</span>
                    <p>
                      درخواست شما بعد از بررسی توسط تیم حرفه ای و تخصصی ما به
                      صاحبان و ارایه دهندگان برتر سرویس ارایه میگردد
                    </p>
                  </li>
                  <li>
                    <div className="image-circle">
                      <img
                        src={apply}
                        alt="پرکردن فرم تقاضای سرویس مورد نیاز"
                      />
                    </div>
                    <span>پرکردن فرم تقاضای سرویس مورد نیاز</span>
                    <p>
                      فرم درخواست سرویس مورد نیاز خود را بصورت آنلاین پر می کنید
                    </p>
                  </li>
                </ul>
              </section>
            </Col>
          </Row>
          <ProductSpecs img={sessionRoom}>
            <Title>اتاق جلسات و همایش</Title>
            <SpecList className="rtl">
              <Spec>
                ببرای یه استارتاپ خیلی پیش میاد که روی موضوعات مهم جلسات متعددی
                داشته باشه و علاوه بر اینکه محیط رسمی داشته باشه مهمه که صحبتهای
                رد و بدل شده بین اعضای جلسه محرمانه بمونه که تو فضای کار اشتراکی
                نمیشه این جلسات رو برگزار کرد پس نیاز به اتاق جلسه داری، با
                سرویس اتاق جلسات ما میتونی تو بهترین فضاهای کاری شهرت اتاق جلسات
                با ظرفیتهای متنوع و مدلهای گوناگون پیدا کنی و برای جلسه ات آماده
                بشی
              </Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() =>
                this.props.history.push({ pathname: "/apply/sessionroom" })
              }
            >
              شروع درخواست
            </Btn>
          </ProductSpecs>
          <ProductSpecs img={sharedDesk} direction="rtl">
            <Title>میزکار اشتراکی</Title>
            <SpecList className="rtl">
              <Spec>
                میزکار اشتراکی در فضای کار اشتراکی یا کوورک ها به میزی اطلاق می
                شود که مختص شما نیست و هر روز ممکن است شخص متفاوتی از آن استفاده
                نماید. بنابراین امکان استقرار ملزومات کار از قبیل کامپیوتر و …
                برروی آنها وجود ندارد. یک نکته جالب راجع به این میزها این است که
                هرروز ممکن است شخص کناری شما شخص دیگه ای باشد و دوستی و همکاری
                جدیدی شکل بگیرد. با سرویس میزکار اشتراکی ما تنها با یک درخواست
                شما چندین پیشنهاد از فضاهای کاری اشتراکی شهر را دریافت می کنید و
                بهترین و مناسبترین را انتخاب می نمایید.
              </Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() => this.props.history.push("/apply/shareddesk")}
            >
              شروع درخواست
            </Btn>
          </ProductSpecs>
          <ProductSpecs img={dedicatedOffice}>
            <Title>اتاق کار اختصاصی</Title>
            <SpecList className="rtl">
              <Spec>
                هیچ جایی بهتر از این نیست که یک اتاق اختصاصی برای خودت یا تیمت
                داشته باشی و هرروز با تیمت در یک اتاق دور یک میز بنشینید و کارتو
                انجام بدی، چه خوب! با سرویس اتاق کار اختصاصی با پرکردن فرم
                درخواست میتونی یه اتاق کار مناسب هزینه و شرایطی که خودت میخوای
                پیدا کنی
              </Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() => this.props.history.push("/apply/dedicatedoffice")}
            >
              شروع درخواست
            </Btn>
          </ProductSpecs>
          <ProductSpecs img={privateDesk} direction="rtl">
            <Title>میز کار اختصاصی</Title>
            <SpecList className="rtl">
              <Spec>
                داشتن یک میز اختصاصی در فضای کار اشتراکی مزیت های خاص خود را
                دارد که مهمترین آن امکان استقرار لوازم کار خود بر روی آن می باشد
                و مانند یک دفتر کار تک نفره می باشد و هرروز که سرکار می روید
                جایگاه مختص خودتان را دارید. عموما در فضاهای کار اشتراکی میزهای
                اختصاصی و اشتراکی از هم جدا می باشند و این نکته باعث می شود که
                با شخص کنار دستی ارتباط عمیق تری داشته باشید و خیلی مواقع به
                همکاری در پروژه های هم منجر می شود. با سرویس میز کار اختصاصی می
                توانید میز کار مناسب خودتان را از فضای کار اشتراکی مورد نظر
                خودتان پیشنهاد بگیرید
              </Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() => this.props.history.push("/apply/privatedesk")}
            >
              شروع درخواست
            </Btn>
          </ProductSpecs>
        </section>

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
                چجوری کار میکنه؟
                <FontAwesomeIcon icon={faPlus} color="#3fc35f" />
                <FontAwesomeIcon icon={faMinus} color="#3fc35f" />
              </CardHeader>
              <Collapse isOpen={this.state.FAQCollapse === "question1"}>
                <CardBody>فعلا کار نمیکنه</CardBody>
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
                چجوری رزرو کنم؟
                <FontAwesomeIcon icon={faPlus} color="#3fc35f" />
                <FontAwesomeIcon icon={faMinus} color="#3fc35f" />
              </CardHeader>
              <Collapse isOpen={this.state.FAQCollapse === "question2"}>
                <CardBody>به سادگی</CardBody>
              </Collapse>
            </Card>
          </div>
        </section>

        <section className="contact-info">
          <h1 style={{ paddingTop: "90px", fontWeight: 400 }}>
            تیم موفقیت مشتریان ما همیشه همراهته .
          </h1>
          <p style={{ fontSize: "25px", paddingTop: "10px" }}>
            سوالی داری؟ فاصله ات با ما یه زنگ یا چت یا ایمیله :)
          </p>
          <div className="contact-button-box">
            <Button onClick={() => this.props.history.push("/comingsoon")}>
              تماس با ما
            </Button>
            <Button onClick={() => this.props.history.push("/comingsoon")}>
              سوالات متداول
            </Button>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Home;
