import React from "react";
import { ProductSpecs, Title, SpecList, Spec, Btn } from "./ProductSpecs";
import { Row, Col } from "reactstrap";
import "../assets/styles/Main.scss";
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
const Home = () => {
  return (
    <React.Fragment>
      <Products />
      <section>
        <Row>
          <Col lg="12" style={{ padding: "5% 11%" }}>
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
                    <img src={apply} alt="پرکردن فرم تقاضای سرویس مورد نیاز" />
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
              تو این شرایط گرونی و هزینه های بالای دفترداری بنظر کار کردن تو یک
              فضای کار اشتراکی خیلی میتونه هزینه هاتون رو کم کنه و شما فقط تمرکز
              کنی رو تولید ایده ناب خودت! با سرویس فضای کار اشتراکی ما
              مناسبترین، بهترین و شاید زیباترین فضاهای کاری اشتراکی تو شهر خودت
              رو که به شرایط تیمت میخوره پیدا می کنی
            </Spec>
          </SpecList>
          <Btn color="#879cdd">همین الان ...</Btn>
        </ProductSpecs>
        <ProductSpecs img={sessionRoom}>
          <Title>اتاق جلسات و همایش</Title>
          <SpecList className="rtl">
            <Spec>
              بهترین جا برای کارکردن که دغدغه ها و هزینه های دفتر کار رو نداشته
              باشی و میز کار اختصاصی خودت رو داشته باشی که لپتاپت یا کامپیوترت و
              سایر وسایلت رو بگذاری بمونه و هر وقت رفتی همه چی سر جاش باشه را با
              سرویس میزکار اختصاصی ما تو بهترین فضاهای کاری شهر پیشنهاد میگیری و
              انتخاب میکنی و راحت میشی
            </Spec>
          </SpecList>
          <Btn color="#879cdd">همین الان فرمتو پر کن</Btn>
        </ProductSpecs>
        <ProductSpecs img={invest} direction="rtl">
          <Title>جذب سرمایه</Title>
          <SpecList className="rtl">
            <Spec>
              میخوای ایده و استارتاپی که براش زحمت کشیدی رو به نتیجه برسونی ولی
              هزینه تولید و نگهداری ایده ات بالاست و نمی دونی چطوری و از کجا
              پولشو بیاری؟ با سرویس جذب سرمایه ما با پرکردن یک فرم و بررسی ایده
              ات توسط تیم ما می تونی از بهترین شتابدهنده های کشور پیشنهاد بگیری
              و آینده کاریت رو بسازی
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
              انجام بدی، چه خوب! با سرویس اتاق کار اختصاصی با پرکردن فرم درخواست
              میتونی یه اتاق کار مناسب هزینه و شرایطی که خودت میخوای پیدا کنی
            </Spec>
          </SpecList>
          <Btn color="#879cdd">همین الان شروع کن</Btn>
        </ProductSpecs>
        <ProductSpecs img={startup} direction="rtl">
          <Title>پذیرش استارت آپ</Title>
          <SpecList className="rtl">
            <Spec>
              اگر استارتاپی داری که فک میکنی میتونه بترکونه و دنبال یه جایی هستی
              که حمایتت کنه تا به جایی که حقت هست برس
            </Spec>
          </SpecList>
          <Btn color="#879cdd">رشدت رو شروع کن</Btn>
        </ProductSpecs>
      </section>
    </React.Fragment>
  );
};
export default Home;
