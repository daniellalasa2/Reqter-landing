import React from "react";
import "./PartnerProfile.scss";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Table
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faMapMarkerAlt,
  faBoxOpen,
  faHeart,
  faClock,
  faMapPin
} from "@fortawesome/free-solid-svg-icons";
import { SafeValue, GetPartnerInfo } from "../ApiHandlers/ApiHandler";
import SimpleMap from "../SimpleMap/SimpleMap";
export default class PartnerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.partnerKey = props.match.params.slug;
    this.state = {
      activeSlideIndex: 0,
      isContentNavigatorFixed: false,
      partnerInfo: {},
      slideItems: []
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.fetchPartnerDetails();
  }
  //Image Carousel Functions
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    const { activeSlideIndex, slideItems } = this.state;
    if (this.animating) return;
    const nextIndex =
      activeSlideIndex === slideItems.length - 1 ? 0 : activeSlideIndex + 1;
    this.setState({ activeSlideIndex: nextIndex });
  }

  previous() {
    const { activeSlideIndex, slideItems } = this.state;
    if (this.animating) return;
    const nextIndex =
      activeSlideIndex === 0 ? slideItems.length - 1 : activeSlideIndex - 1;
    this.setState({ activeSlideIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeSlideIndex: newIndex });
  }
  sliderItemGenerator = () => {
    const { slideItems } = this.state;
    const slides = slideItems.map((item, key) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={key}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    ));
    return slides;
  };
  contentNavigatorScrollTrigger = () => {
    const sectionPositions = this.generateSectionPositions();
    const windowY = window.scrollY;
    const websiteNavHeight = document.getElementById("items-wrapper")
      .offsetHeight;
    const contentNavigator = document.getElementById("content-navigator");
    const contentNavigatorItemsWrapper = document.getElementById(
      "items-wrapper"
    );
    const pixelsFromTop = contentNavigator.offsetTop - websiteNavHeight;
    const windowSectionPositionName = sectionPositions.filter(
      item =>
        item.scrollPosition.from <= windowY && windowY < item.scrollPosition.to
    );
    if (windowY > pixelsFromTop) {
      contentNavigatorItemsWrapper.classList.add("fixed");
    } else {
      document.querySelectorAll(".content-navigator .tab").forEach(elem => {
        elem.classList.remove("active");
      });
      contentNavigatorItemsWrapper.classList.remove("fixed");
    }
    if (windowSectionPositionName.length > 0) {
      //first remove all active classes
      document.querySelectorAll(".content-navigator .tab").forEach(elem => {
        elem.classList.remove("active");
      });
      //then add new active class to the matched element
      document
        .getElementById(windowSectionPositionName[0].linkedNavId)
        .classList.add("active");
    } else {
      //else remove disable any active content navigator
      document.querySelectorAll(".content-navigator .tabs").forEach(elem => {
        elem.classList.remove("active");
      });
    }
  };

  generateSectionPositions = () => {
    const getElementOffest = elementId => {
      const websiteNavHeight = document.getElementById("items-wrapper")
        .clientHeight;
      const contentNavigatorHeight = 90;
      const element = document.getElementById(elementId);
      return {
        from: element.offsetTop - websiteNavHeight - contentNavigatorHeight,
        to:
          element.offsetTop -
          websiteNavHeight +
          element.clientHeight -
          contentNavigatorHeight
      };
    };
    return [
      {
        scrollPosition: getElementOffest("overview-section"),
        linkedNavId: "overview-section-navigator"
      },
      {
        scrollPosition: getElementOffest("products-section"),
        linkedNavId: "products-section-navigator"
      },
      {
        scrollPosition: getElementOffest("facilities-section"),
        linkedNavId: "facilities-section-navigator"
      },
      {
        scrollPosition: getElementOffest("address-section"),
        linkedNavId: "map-section-navigator"
      }
    ];
  };
  fetchPartnerDetails = () => {
    const _this = this;
    GetPartnerInfo({ "fields.partnerkey": _this.partnerKey }, partner => {
      if (partner.success_result.success) {
        const images = [];
        const { fields } = partner.data[0];

        fields.images.forEach(image => {
          images.push({
            src: image.en,
            altText: "",
            caption: ""
          });
        });
        this.setState({
          partnerInfo: {
            ...fields
          },
          slideItems: images
        });
      }
    });
  };
  scrollToSection = e => {
    const sectionPositions = this.generateSectionPositions().filter(
      item => e.target.id === item.linkedNavId
    );
    if (sectionPositions.length > 0) {
      window.scrollTo({
        top: sectionPositions[0].scrollPosition.from
      });
    }
  };

  componentDidMount() {
    this.fetchPartnerDetails();
    window.addEventListener(
      "scroll",
      this.contentNavigatorScrollTrigger,
      false
    );
  }
  componentWillUnmount() {
    window.removeEventListener(
      "scroll",
      this.contentNavigatorScrollTrigger,
      false
    );
  }

  render() {
    const { activeSlideIndex, slideItems } = this.state;
    const {
      name,
      verified,
      address,
      overview,
      logo,
      location
    } = this.state.partnerInfo;
    return (
      <section className="partner-profile">
        <Carousel
          activeIndex={activeSlideIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={slideItems}
            activeIndex={activeSlideIndex}
            onClickHandler={this.goToIndex}
          />
          {this.sliderItemGenerator()}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        <section className="partner-information">
          {SafeValue(name, "", "string", false) && (
            <div className="title">{name}</div>
          )}
          {SafeValue(verified, "", "boolean", false) && (
            <div className="verified">
              <FontAwesomeIcon
                icon={faCheckCircle}
                pull="right"
                size="lg"
                color="#58d37b"
              />{" "}
              تایید شده
            </div>
          )}
          {SafeValue(address, "fa", "string", false) && (
            <div className="address">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                pull="right"
                size="lg"
                color="black"
              />{" "}
              {address.fa}
            </div>
          )}
        </section>
        <section className="content-navigator" id="content-navigator">
          <div className="items-wrapper" id="items-wrapper">
            <div
              className="tab"
              id="overview-section-navigator"
              onClick={this.scrollToSection}
            >
              معرفی
            </div>
            <div
              className="tab"
              id="products-section-navigator"
              onClick={this.scrollToSection}
            >
              محصولات
            </div>
            <div
              className="tab"
              id="facilities-section-navigator"
              onClick={this.scrollToSection}
            >
              امکانات
            </div>
            <div
              className="tab"
              id="map-section-navigator"
              onClick={this.scrollToSection}
            >
              نقشه
            </div>
            <div
              className="tab"
              id="reviews-section-navigator"
              onClick={this.scrollToSection}
            >
              نظرات (بزودی)
            </div>
          </div>
        </section>
        <div className="overview nav-section" id="overview-section">
          {SafeValue(overview, "fa", "string", true) && (
            <p>{SafeValue(overview, "fa", "string", "متن معرفی خالیست")}</p>
          )}
          <div className="working-hours">
            <ul>
              <li className="title">
                <FontAwesomeIcon
                  icon={faClock}
                  pull="right"
                  size="lg"
                  color="dimgrey"
                />{" "}
                ساعات کاری
              </li>
              <li>
                <strong>شنبه - ۴شنبه</strong>
                <br />
                <span>۸:۰۰ الی ۲۱:۰۰</span>
              </li>

              <li>
                <strong>۵شنبه</strong>
                <br />
                <span>۱۰:۰۰ الی ۱۸:۰۰</span>
              </li>
              <li>
                <strong>جمعه</strong>
                <br />
                <span>۱۲:۰۰ الی ۱۷:۰۰</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="partner-products nav-section" id="products-section">
          <div className="section-title">
            <FontAwesomeIcon
              icon={faBoxOpen}
              pull="right"
              size="lg"
              color="dimgrey"
            />{" "}
            محصولات
          </div>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>نام محصول</th>
                <th>تعداد</th>
                <th>قیمت ساعتی</th>
                <th>قیمت هفتگی</th>
                <th>قیمت ماهانه</th>
                <th>رزرو</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">صندلی اشتراکی</th>
                <td>۱ نفره</td>
                <td>۳۰ هزار تومن</td>
                <td>۹۰ هزار تومن</td>
                <td>۲۷۰ هزار تومن</td>
                <td>
                  <button className="reserve-button">درخواست</button>
                </td>
              </tr>
              <tr>
                <th scope="row">صندلی اختصاصی</th>
                <td>۱ نفره</td>
                <td>۴۰ هزار تومن</td>
                <td>۱۱۰ هزار تومن</td>
                <td>۴۰۰ هزار تومن</td>
                <td>
                  <button className="reserve-button">درخواست</button>
                </td>
              </tr>
              <tr>
                <th scope="row">اتاق جلسه</th>
                <td>۱۰ نفره</td>
                <td>۹۰ هزار تومن</td>
                <td>ندارد</td>
                <td>ندارد</td>
                <td>
                  <button className="reserve-button">درخواست</button>
                </td>
              </tr>
              <tr>
                <th scope="row">دفتر کار</th>
                <td>۶ نفره</td>
                <td>ندارد</td>
                <td>ندارد</td>
                <td>۱.۵ میلیون تومان</td>
                <td>
                  <button className="reserve-button">درخواست</button>
                </td>
              </tr>
              <tr>
                <th scope="row">دفتر کار</th>
                <td>۱۰ نفره</td>
                <td>ندارد</td>
                <td>ندارد</td>
                <td>۲.۵ میلیون تومان</td>
                <td>
                  <button className="reserve-button">درخواست</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="partner-facilities nav-section" id="facilities-section">
          <div className="section-title">
            <FontAwesomeIcon icon={faHeart} size="lg" color="dimgrey" />
            امکانات رفاهی
          </div>
          <div className="facilities-detail">
            <ul>
              <li>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#58d37b"
                />
                چای رایگان
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#58d37b"
                />
                قهوه رایگان
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#58d37b"
                />
                اینترنت پرسرعت بدون محدودیت
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#58d37b"
                />
                صندلی ارگونومی
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#58d37b"
                />
                یخچال و فریزر
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#58d37b"
                />
                مایکرویو
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#58d37b"
                />
                ۲۰٪ تخفیف اسنپ فود
              </li>
            </ul>
          </div>
        </div>
        <div className="partner-address nav-section" id="address-section">
          <div className="section-title">
            <FontAwesomeIcon icon={faMapPin} size="lg" color="dimgrey" />
            <span>
              <strong> آدرس</strong>
              {SafeValue(address, "fa", "string", false) && <p>{address.fa}</p>}
            </span>
          </div>
          <div className="map">
            <SimpleMap
              apiKey="AIzaSyCHvdA69xND6716dQPzu24QghfxioYk_d0"
              lng={
                SafeValue(location, "longitude", "number", false) &&
                location.longitude
              }
              lat={
                SafeValue(location, "latitude", "number", false) &&
                location.latitude
              }
              pinDesc="paradisehub"
              PinComponent={() => (
                <FontAwesomeIcon
                  icon={faMapPin}
                  size="lg"
                  color="dimgrey"
                  style={{ fontSize: "3em" }}
                />
              )}
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </section>
    );
  }
}
