import React from "react";
import { ProductSpecs, Title, SpecList, Spec, Btn } from "./ProductSpecs";
import { Button, Row, Col } from "reactstrap";
import "../assets/styles/Home.scss";
//Import images
import startup from "../assets/images/startup.jpg";
import sessionRoom from "../assets/images/session-room.jpg";
import privateOffice from "../assets/images/private-office.jpg";
import shared from "../assets/images/shared.jpg";
import invest from "../assets/images/invest.jpg";
import service from "../assets/images/service-icons/service.png";
import apply from "../assets/images/service-icons/apply.png";
import offer from "../assets/images/service-icons/offer.png";

const Products = React.lazy(() => import("./Products"));
class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Products {...this.props} />
        <section>
          <Row>
            <Col lg="12">
              <section className="facilities-description">
                <div className="header">حالا روش کار چطوریه؟</div>
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
          <ProductSpecs img={shared} direction="rtl">
            <Title>فضای کار اشتراکی</Title>
            <SpecList className="rtl">
              <Spec>
                تو این شرایط گرونی و هزینه های بالای دفترداری بنظر کار کردن تو
                یک فضای کار اشتراکی خیلی میتونه هزینه هاتون رو کم کنه و شما فقط
                تمرکز کنی رو تولید ایده ناب خودت! با سرویس فضای کار اشتراکی ما
                مناسبترین، بهترین و شاید زیباترین فضاهای کاری اشتراکی تو شهر
                خودت رو که به شرایط تیمت میخوره پیدا می کنی
              </Spec>
            </SpecList>
            <Btn color="#879cdd">همین الان اقدام کن ...</Btn>
          </ProductSpecs>
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
            <Btn color="#879cdd">همین الان فرمتو پر کن</Btn>
          </ProductSpecs>
          <ProductSpecs img={invest} direction="rtl">
            <Title>میزکار اشتراکی</Title>
            <SpecList className="rtl">
              <Spec>
                میزکار اشتراکی در فضای کار اشتراکی یا کوورک ها به میزی اطلاق می
                شود که مختص شما نیست و هر روز ممکن است شخص متفاوتی از آن استفاده
                نماید. بنابراین امکان استقرار ملزومات کار از قبیل کامپیوتر و …
                برروی آنها وجود ندارد. یک نکته جالب راجع به این میزها این است که
                هرروز ممکن است شخص کناری شما شخص دیگه ای باشد و دوستی و همکاری
                جدیدی شکل بگیرد و می توانید قسمتهای مختلف فضای کار اشتراکی را
                امتحان کنید و تجربیات جدید و احتمالا دوستان جدید پیدا کنید. با
                سرویس میزکار اشتراکی ما تنها با یک درخواست شما چندین پیشنهاد از
                فضاهای کاری اشتراکی شهر را دریافت می کنید و بهترین و مناسبترین
                را انتخاب می نمایید.
              </Spec>
            </SpecList>
            <Btn color="#879cdd">درخواستت رو بفرست</Btn>
          </ProductSpecs>
          <ProductSpecs img={privateOffice}>
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
            <Btn color="#879cdd">همین الان شروع کن</Btn>
          </ProductSpecs>
          <ProductSpecs img={startup} direction="rtl">
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
            <Btn color="#879cdd">رشدت رو شروع کن</Btn>
          </ProductSpecs>
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
