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
import { BrowserView, MobileView } from "react-device-detect";
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
  faTwitter,
  faInstagram,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import {
  SafeValue,
  GetPartnerInfo,
  GetPartnerProducts,
  Config,
  DownloadAsset
} from "../ApiHandlers/ApiHandler";
import PersianNumber, { addCommas } from "../PersianNumber/PersianNumber";
import ContextApi from "../ContextApi/ContextApi";
import classnames from "classnames";
import PageSuspense from "../PageSuspense";
import MapWithMarker from "../SimpleMap/SimpleMap.js";
export default class PartnerProfile extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props, context);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
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
        <img src={DownloadAsset(item.src)} alt={item.altText} />
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
      if (
        partner.success_result.success &&
        SafeValue(partner, "data.0.fields.logo", "object", false).length > 0
      ) {
        const { _id, fields } = partner.data[0];
        fields.workinghours =
          SafeValue(fields, "workinghours", "jsonArray", null) &&
          JSON.parse(fields.workinghours).map((item, key) => (
            <li key={key}>
              <strong>{item.header}</strong>
              <br />
              <span>{item.body}</span>
            </li>
          ));
        fields.amenities =
          SafeValue(fields, "amenities", "object", null) &&
          fields.amenities.map((item, idx) => (
            <li key={idx}>
              <FontAwesomeIcon icon={faCheckCircle} size="lg" color="#58d37b" />
              {SafeValue(
                item,
                `fields.name.${this.lang}`,
                "string",
                " - ",
                "fields.name"
              )}
            </li>
          ));
        fields.images.forEach(image => {
          images.push({
            src: DownloadAsset(
              SafeValue(image, this.lang, "string", null, " ")
            ),
            altText: "",
            caption: ""
          });
        });
        this.fetchPartnerProducts(_id);
        this.setState({
          partnerInfo: {
            ...fields
          },
          slideItems: images,
          pageLoaded: true
        });
      } else {
        this.props.history.push(`/${this.lang}/auth/notfound`);
      }
    });
  };
  fetchPartnerProducts = partnerid => {
    const { locale } = this.translate;
    const generatedProducts = [];
    GetPartnerProducts({ "fields.partnerid": partnerid }, products => {
      if (products.success_result.success) {
        const productsArr = products.data;
        const product_ids = [
          { name: "sessionroom", id: Config.PRODUCT_TYPE_ID.session_room },
          {
            name: "dedicatedoffice",
            id: Config.PRODUCT_TYPE_ID.dedicated_office
          },
          { name: "privatedesk", id: Config.PRODUCT_TYPE_ID.private_desk },
          { name: "shareddesk", id: Config.PRODUCT_TYPE_ID.shared_desk }
        ];
        productsArr.forEach((product, index) => {
          const { _id } = product;
          const {
            name,
            count,
            perhourprice,
            dailyprice,
            weeklyprice,
            monthlyprice,
            producttype
          } = product.fields;

          if (product.status === "published") {
            let productName = null;
            for (let i = 0; i < product_ids.length; i++) {
              if (
                product_ids[i].id ===
                SafeValue(producttype, "_id", "string", " ")
              ) {
                productName = product_ids[i].name;
              }
            }
            generatedProducts.push(
              <tr key={index}>
                <th scope="row">
                  {SafeValue(name, this.lang, "string", locale.unknown, " ")}
                </th>
                <td>
                  {PersianNumber(
                    addCommas(
                      SafeValue(count, "", "string", locale.unknown, " ")
                    ),
                    this.lang
                  )}
                </td>
                <td>
                  {PersianNumber(
                    addCommas(
                      SafeValue(perhourprice, "", "string", locale.null)
                    ),
                    this.lang
                  )}
                </td>
                <td>
                  {PersianNumber(
                    addCommas(SafeValue(dailyprice, "", "string", locale.null)),
                    this.lang
                  )}
                </td>
                <td>
                  {PersianNumber(
                    addCommas(
                      SafeValue(weeklyprice, "", "string", locale.null)
                    ),
                    this.lang
                  )}
                </td>
                <td>
                  {PersianNumber(
                    addCommas(
                      SafeValue(monthlyprice, "", "string", locale.null)
                    ),
                    this.lang
                  )}
                </td>
                {this.context.auth.ROLE !== "user" && (
                  <td>
                    <button
                      className="reserve-button"
                      onClick={() =>
                        this.props.history.push(
                          `/${this.lang}/apply/${productName}?src=${partnerid}&product_id=${_id}`
                        )
                      }
                    >
                      {locale.products_table.request}
                    </button>
                  </td>
                )}
              </tr>
            );
          }
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
      locationpic,
      location,
      workinghours,
      amenities,
      linkedin,
      twitter,
      instagram
    } = this.state.partnerInfo;
    const { locale, direction } = this.translate;
    if (pageLoaded) {
      return (
        <section className={classnames("partner-profile", `_${direction}`)}>
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
            <div className="title">
              {SafeValue(name, this.lang, "string", false, " ")}
            </div>

            {SafeValue(verified, "", "boolean", false) && (
              <div className="verified">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  pull={direction === "rtl" ? "right" : "left"}
                  size="lg"
                  color="#58d37b"
                />{" "}
                {locale.verified}
              </div>
            )}
            {SafeValue(address, this.lang, "string", false, " ") && (
              <div className="address">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  pull={direction === "rtl" ? "right" : "left"}
                  size="lg"
                  color="black"
                />{" "}
                {SafeValue(address, this.lang, "string", false, " ")}
              </div>
            )}
            <br />
            <div className="social-networks">
              {instagram && (
                <a
                  href={instagram}
                  className="instagram"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    color="dimgray"
                    size="2x"
                  />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  className="linkedin"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    color="dimgray"
                    size="2x"
                  />
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  className="twitter"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faTwitter} color="dimgray" size="2x" />
                </a>
              )}
            </div>
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
                {locale.overview}
              </div>
              {SafeValue(partnerProducts, "", "object", []).length > 0 && (
                <div
                  className="tab hoverable"
                  id="products-section-navigator"
                  onClick={this.scrollToSection}
                  onTouchStart={this.doTouchJob}
                  onMouseDown={this.doMouseJob}
                >
                  {locale.products}
                </div>
              )}

              <div
                className="tab hoverable"
                id="facilities-section-navigator"
                onClick={this.scrollToSection}
                onTouchStart={this.doTouchJob}
                onMouseDown={this.doMouseJob}
              >
                {locale.facilities}
              </div>
              <div
                className="tab hoverable"
                id="map-section-navigator"
                onClick={this.scrollToSection}
                onTouchStart={this.doTouchJob}
                onMouseDown={this.doMouseJob}
              >
                {locale.map}
              </div>
              <div
                className="tab hoverable"
                id="reviews-section-navigator"
                onClick={this.scrollToSection}
                onTouchStart={this.doTouchJob}
                onMouseDown={this.doMouseJob}
              >
                {locale.reviews}
              </div>
            </div>
          </section>
          <div className="overview nav-section" id="overview-section">
            <p>
              {SafeValue(
                overview,
                this.lang,
                "string",
                locale.empty_overview,
                " "
              )}
            </p>
            {SafeValue(workinghours, "", "object", []).length > 0 && (
              <div className="working-hours">
                <ul>
                  <li className="title">
                    <FontAwesomeIcon
                      icon={faClock}
                      pull={direction === "rtl" ? "right" : "left"}
                      size="lg"
                      color="dimgrey"
                    />{" "}
                    {locale.working_hours}
                  </li>
                  {workinghours}
                </ul>
              </div>
            )}
          </div>

          {SafeValue(partnerProducts, "", "object", []).length > 0 && (
            <div className="partner-products nav-section" id="products-section">
              <div className="section-title">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  pull={direction === "rtl" ? "right" : "left"}
                  size="lg"
                  color="dimgrey"
                />{" "}
                {locale.products}
              </div>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>{locale.products_table.products_name}</th>
                    <th>{locale.products_table.quantity}</th>
                    <th>{locale.products_table.hourly_price}</th>
                    <th>{locale.products_table.daily_price}</th>
                    <th>{locale.products_table.weekly_price}</th>
                    <th>{locale.products_table.monthly_price}</th>
                    {/* {this.context.auth.ROLE !== "user" && (
                      <th>{locale.products_table.reserve}</th>
                    )} */}
                  </tr>
                </thead>
                <tbody>{partnerProducts}</tbody>
              </Table>
            </div>
          )}

          <div
            className="partner-facilities nav-section"
            id="facilities-section"
          >
            <div className="section-title">
              <FontAwesomeIcon icon={faHeart} size="lg" color="dimgrey" />
              {locale.facilities}
            </div>
            {SafeValue(amenities, this.lang, "object", false, " ") ? (
              <div className="facilities-detail">
                <ul>{amenities}</ul>
              </div>
            ) : (
              <span className="textelement-placeholder">
                {locale.no_amenities}
              </span>
            )}
          </div>

          <div className="partner-address nav-section" id="address-section">
            <div className="section-title">
              <FontAwesomeIcon icon={faMapPin} size="lg" color="dimgrey" />
              <span>
                <strong>{locale.address}</strong>
                <p>{SafeValue(address, this.lang, "string", null, " ")}</p>
              </span>
            </div>
            <div className="map">
              <BrowserView>
                <MapWithMarker
                  center={{
                    lat: SafeValue(location, "latitude", "all", 32.4279),
                    lng: SafeValue(location, "longitude", "all", 53.688)
                  }}
                  defaultCenter={{ lat: 32.4279, lng: 53.688 }}
                  className="mapWithMarker"
                  defaultMarkerPosition={{ lat: 32.4279, lng: 53.688 }}
                  zoom={13}
                  markerPosition={{
                    lat: SafeValue(location, "latitude", "all", 32.4279),
                    lng: SafeValue(location, "longitude", "all", 53.688)
                  }}
                  draggable={false}
                  static={true}
                  // locationName={this.state.form.fields.name.value}
                />
                {/* {SafeValue(location, "latitude", "number", false) &&
                  SafeValue(location, "longitude", "number", false) && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${SafeValue(
                        location,
                        "latitude",
                        "number",
                        0
                      )},${SafeValue(location, "longitude", "number", 0)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  )} */}
              </BrowserView>
              <MobileView>
                <MapWithMarker
                  center={{
                    lat: SafeValue(location, "latitude", "all", 32.4279),
                    lng: SafeValue(location, "longitude", "all", 53.688)
                  }}
                  defaultCenter={{ lat: 32.4279, lng: 53.688 }}
                  className="mapWithMarker"
                  defaultMarkerPosition={{ lat: 32.4279, lng: 53.688 }}
                  zoom={13}
                  markerPosition={{
                    lat: SafeValue(location, "latitude", "all", 32.4279),
                    lng: SafeValue(location, "longitude", "all", 53.688)
                  }}
                  draggable={false}
                  static={true}
                  // locationName={this.state.form.fields.name.value}
                />
                {/* {SafeValue(location, "latitude", "number", false) &&
                SafeValue(location, "longitude", "number", false) ? (
                  <a
                    href={`geo:${SafeValue(
                      location,
                      "latitude",
                      "number",
                      0
                    )},${SafeValue(location, "longitude", "number", 0)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    مسیریابی
                   <a/>)} */}
              </MobileView>
            </div>
          </div>
        </section>
      );
    } else {
      return <PageSuspense />;
    }
  }
}
