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
import {
  SafeValue,
  GetPartnerInfo,
  GetPartnerProducts
} from "../../ApiHandlers/ApiHandler";
import PersianNumber, { addCommas } from "../../PersianNumber/PersianNumber";
import SimpleMap from "../../SimpleMap/SimpleMap";
import ContextApi from "../../ContextApi/ContextApi";
function Loading() {
  return (
    <div className="preloader">
      <div className="ball-rotate">
        <div />
      </div>
      <span className="loading-text">
        <strong>Startup Space</strong>
      </span>
    </div>
  );
}
export default class PartnerProfile extends React.Component {
  static contextType = ContextApi;
  constructor(props) {
    super(props);
    this.partnerKey = props.match.params.slug;
    this.state = {
      activeSlideIndex: 0,
      isContentNavigatorFixed: false,
      partnerInfo: {},
      partnerProducts: [],
      slideItems: [],
      pageLoaded: false
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
    try {
      const sectionPositions = this.generateSectionPositions();
      const windowY = window.scrollY;
      const websiteNavHeight = document.getElementById("items-wrapper")
        .clientHeight;
      const contentNavigator = document.getElementById("content-navigator");
      const contentNavigatorItemsWrapper = document.getElementById(
        "items-wrapper"
      );
      const pixelsFromTop = contentNavigator.offsetTop - websiteNavHeight;
      const windowSectionPositionName = sectionPositions.filter(
        item =>
          item.scrollPosition.from <= windowY &&
          windowY < item.scrollPosition.to
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
    } catch (err) {
      return null;
    }
  };

  generateSectionPositions = () => {
    const default_obj = { from: 0, to: 0 };
    const getElementOffest = elementId => {
      //try to get element by id else return a default scroll behaviour object
      try {
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
      } catch (err) {
        return default_obj;
      }
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
    const params = { "fields.partnerkey": _this.partnerKey };
    const images = [];
    GetPartnerInfo(params, partner => {
      if (partner.success_result.success) {
        const { fields } = partner.data[0];
        fields.workinghours =
          SafeValue(fields, "workinghours", "json", null) &&
          JSON.parse(fields.workinghours).map((item, key) => (
            <li key={key}>
              <strong>{item.header}</strong>
              <br />
              <span>{item.body}</span>
            </li>
          ));
        fields.amenities =
          SafeValue(fields, "amenities", "object", null) &&
          fields.amenities.map(item => (
            <li>
              <FontAwesomeIcon icon={faCheckCircle} size="lg" color="#58d37b" />
              {SafeValue(item, "fields.name.fa", "string", " - ")}
            </li>
          ));
        fields.images.forEach(image => {
          images.push({
            src: image.en,
            altText: "",
            caption: ""
          });
        });

        this.fetchPartnerProducts(fields._id);
        this.setState({
          partnerInfo: {
            ...fields
          },
          slideItems: images,
          pageLoaded: true
        });
      } else {
        this.props.history.push("/");
      }
    });
  };
  fetchPartnerProducts = partnerid => {
    const generatedProducts = [];
    GetPartnerProducts({ "fields.partnerid": partnerid }, products => {
      if (products.success_result.success) {
        const productsArr = products.data;
        productsArr.forEach((product, index) => {
          const {
            name,
            count,
            perhourprice,
            dailyprice,
            weeklyprice,
            monthlyprice
          } = product.fields;
          generatedProducts.push(
            <tr key={index}>
              <th scope="row">{SafeValue(name, "fa", "string", "نامشخص")}</th>
              <td>
                {PersianNumber(
                  addCommas(SafeValue(count, "", "string", "نامشخص"))
                )}
              </td>
              <td>
                {PersianNumber(
                  addCommas(SafeValue(perhourprice, "", "string", "ندارد"))
                )}
              </td>
              <td>
                {PersianNumber(
                  addCommas(SafeValue(dailyprice, "", "string", "ندارد"))
                )}
              </td>
              <td>
                {PersianNumber(
                  addCommas(SafeValue(weeklyprice, "", "string", "ندارد"))
                )}
              </td>
              <td>
                {PersianNumber(
                  addCommas(SafeValue(monthlyprice, "", "string", "ندارد"))
                )}
              </td>
              {this.context.auth.ROLE !== "user" && (
                <td>
                  <button className="reserve-button">درخواست</button>
                </td>
              )}
            </tr>
          );
        });
        this.setState({
          partnerProducts: generatedProducts
        });
      }
    });
  };
  scrollToSection = e => {
    e.preventDefault();
    const sectionPositions = this.generateSectionPositions().filter(
      item => e.target.id === item.linkedNavId
    );
    if (sectionPositions.length > 0) {
      window.scrollTo({
        top: sectionPositions[0].scrollPosition.from
      });
    }
  };
  doTouchJob = e => {
    e.target.classList.remove("touchable");
  };
  doMouseJob = e => {
    e.target.classList.add("touchable");
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
    const {
      activeSlideIndex,
      slideItems,
      partnerProducts,
      pageLoaded
    } = this.state;
    const {
      name,
      verified,
      address,
      overview,
      location,
      workinghours,
      amenities
    } = this.state.partnerInfo;
    if (pageLoaded) {
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
                className="tab hoverable"
                id="overview-section-navigator"
                onClick={this.scrollToSection}
                onTouchStart={this.doTouchJob}
                onMouseDown={this.doMouseJob}
              >
                معرفی
              </div>
              {partnerProducts.length > 0 && (
                <div
                  className="tab hoverable"
                  id="products-section-navigator"
                  onClick={this.scrollToSection}
                  onTouchStart={this.doTouchJob}
                  onMouseDown={this.doMouseJob}
                >
                  محصولات
                </div>
              )}
              <div
                className="tab hoverable"
                id="facilities-section-navigator"
                onClick={this.scrollToSection}
                onTouchStart={this.doTouchJob}
                onMouseDown={this.doMouseJob}
              >
                امکانات
              </div>
              <div
                className="tab hoverable"
                id="map-section-navigator"
                onClick={this.scrollToSection}
                onTouchStart={this.doTouchJob}
                onMouseDown={this.doMouseJob}
              >
                نقشه
              </div>
              <div
                className="tab hoverable"
                id="reviews-section-navigator"
                onClick={this.scrollToSection}
                onTouchStart={this.doTouchJob}
                onMouseDown={this.doMouseJob}
              >
                نظرات (بزودی)
              </div>
            </div>
          </section>
          <div className="overview nav-section" id="overview-section">
            {SafeValue(overview, "fa", "string", true) && (
              <p>{SafeValue(overview, "fa", "string", "متن معرفی خالیست")}</p>
            )}
            {workinghours && (
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
                  {workinghours}
                </ul>
              </div>
            )}
          </div>

          {partnerProducts.length > 0 && (
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
                    <th>قیمت روزانه</th>
                    <th>قیمت هفتگی</th>
                    <th>قیمت ماهانه</th>
                    {this.context.auth.ROLE !== "user" && <th>رزرو</th>}
                  </tr>
                </thead>
                <tbody>{partnerProducts}</tbody>
              </Table>
            </div>
          )}
          {amenities && (
            <div
              className="partner-facilities nav-section"
              id="facilities-section"
            >
              <div className="section-title">
                <FontAwesomeIcon icon={faHeart} size="lg" color="dimgrey" />
                امکانات رفاهی
              </div>
              <div className="facilities-detail">
                <ul>{amenities}</ul>
              </div>
            </div>
          )}
          <div className="partner-address nav-section" id="address-section">
            <div className="section-title">
              <FontAwesomeIcon icon={faMapPin} size="lg" color="dimgrey" />
              <span>
                <strong> آدرس</strong>
                {SafeValue(address, "fa", "string", false) && (
                  <p>{address.fa}</p>
                )}
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
    } else {
      return <Loading />;
    }
  }
}
