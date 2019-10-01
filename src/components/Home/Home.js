import React from "react";
import {
  ProductSpecs,
  Title,
  SpecList,
  Spec,
  Btn
} from "../ProductSpecs/ProductSpecs";
import { Button, Row, Col } from "reactstrap";
import "./Home.scss";
//Import images
import sessionRoom from "../../assets/images/session-room.jpg";
import dedicatedOffice from "../../assets/images/dedicated-office.jpg";
import sharedDesk from "../../assets/images/shared-desk.jpg";
import privateDesk from "../../assets/images/private-desk.jpg";
import service from "../../assets/images/service-icons/service.png";
import apply from "../../assets/images/service-icons/apply.png";
import offer from "../../assets/images/service-icons/offer.png";

//Import icons
const Products = React.lazy(() => import("../Products/Products"));

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
                اگر جلسه مهمی مثل پرزنت برای سرمایه گزار ، جلسات هماهنگی بین
                تیمی ، جلسه مشاوره و فروش یا استخدام و ... دارید و میخواهید صحبت
                های شما محرمانه بماند و در محیط فضای کار اشتراکی برای دیگران
                مزاحمتی ایجاد نکند و هم چنین میخواهید در طول جلسه از امکانات
                اتاق جلسات مثل فیلم برداری و عکاسی ، پذیرایی و ... استفاده کنید
                میتوانید هم اکنون درخواست رزرو اتاق جلسات را ارسال کنید .
              </Spec>
            </SpecList>
            <Btn
              color="#879cdd"
              onClick={() => this.props.history.push("/apply/sessionroom")}
            >
              شروع درخواست اتاق جلسات
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
                اگر بعنوان دفترکار یا اتاق اختصاصی برای خود و تیمتان هستید که
                هزینه های دفتر کاری مستقل بیرون را نداشته باشد و در محیط کاملا
                پویا حصور داشته باشید سرویس دفترکار یا اتاق اختصاصی ما بهترین و
                مناسبترین دفاتر موجود در محیط های کاری مشترک را به شما معرفی
                میکند و شما از بین پیشنهادهای رسیده دفتر مناسب خود را انتخاب
                میکنید .
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
        <section className="contact-info">
          <h1>تیم موفقیت مشتریان ما همیشه همراه شماست</h1>
          <p>
            سوالی دارید؟ فاصله ما با شما یک ایمیل یا تلفن میباشد . با ما در تماس
            باشید
          </p>
          <div className="contact-button-box">
            <Button onClick={() => this.props.history.push("/contactus")}>
              تماس با ما
            </Button>
            <Button onClick={() => this.props.history.push("/faq")}>
              سوالات متداول
            </Button>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Home;
