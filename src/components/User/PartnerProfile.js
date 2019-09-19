import React from "react";
import "./PartnerProfile.scss";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
export default class PartnerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
      slideItems: [
        {
          src:
            "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          altText: "Slide 1",
          caption: "Slide 1"
        },
        {
          src:
            "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
          altText: "Slide 2",
          caption: "Slide 2"
        }
      ]
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
    const slides = slideItems.map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
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

  render() {
    const { activeSlideIndex, slideItems } = this.state;
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
          <div className="title">پارادایس هاب</div>
          <div className="verified">
            <FontAwesomeIcon
              icon={faCheckCircle}
              pull="right"
              size="lg"
              color="#58d37b"
            />{" "}
            تایید شده
          </div>
          <div className="address">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              pull="right"
              size="lg"
              color="black"
            />{" "}
            تهران - آجودانیه - باغ بهشت
          </div>
        </section>
        <section className="content-navigator">
          <div className="tab">خلاصه</div>
          <div className="tab">محصولات</div>
          <div className="tab">امکانات</div>
          <div className="tab">ساعات کاری</div>
          <div className="tab">نقشه</div>
        </section>
        <div className="overview">
          فضای کار اشتراکی (coworking space) به مجموعه‌ای گفته می‌شود که یک فضای
          کاری را به طور مشترک و اختصاصی دراختیار فریلنسرها و تیم‌های مختلف قرار
          می‌دهد. به تازگی شرکت‌های بزرگی همچون Apple , Microsoft , Alibaba بخشی
          از کارکنان خود را در فضاهای کار اشتراکی مستقر کرده‌اند.
        </div>
      </section>
    );
  }
}
