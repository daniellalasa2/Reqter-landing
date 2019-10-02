import React, { Component } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Collapse,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faAngleDown,
  faAngleUp,
  faLockOpen,
  faLock,
  faListAlt,
  faGlobeAsia
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.jpg";
import Login from "../../components/Auth/Login/Login";
import "./Nav.scss";
import ContextApi, {
  ContextConsumer
} from "../../components/ContextApi/ContextApi";
import { SetCookie } from "../../components/CookieHandler/CookieHandler";

class Navigation extends Component {
  static contextType = ContextApi;
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: {
        mobile: false,
        normal: false,
        lang: false
      },
      didBodyScrolled: false,
      isMobileMenuOpen: false
    };
  }
  componentDidMount() {
    if (Boolean(this.props.transform)) {
      window.addEventListener("scroll", this.handleScroll);
    } else {
      const navMainContainer = document.getElementById("nav-main-container");
      navMainContainer.classList.add("scrolledNav");
    }
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = event => {
    let scrollTop = window.scrollY;
    const navMainContainer = document.getElementById("nav-main-container");
    //scroll from top 0 position
    //check if this.props.transform is true then active scrolled navigation behavior
    if (scrollTop > 0 && !this.state.didBodyScrolled) {
      navMainContainer.classList.add("scrolledNav");
      this.setState({
        didBodyScrolled: true
      });
      //scroll to top 0 position
    } else if (scrollTop === 0) {
      navMainContainer.classList.remove("scrolledNav");
      this.setState({
        didBodyScrolled: false
      });
    }
  };
  dropDownToggler = mode => {
    this.setState({
      dropdownOpen: {
        ...this.state.dropdownOpen,
        [mode]: !this.state.dropdownOpen[mode]
      }
    });
  };
  logOut = () => {
    SetCookie("SSUSERAUTH", "", 0);
    this.context.updateAuth(() => this.props.history.push("/"));
  };
  toggleMenu = action => {
    switch (action) {
      case "close":
        this.setState({
          isMobileMenuOpen: false
        });
        break;
      case "open":
        this.setState({
          isMobileMenuOpen: true
        });
        break;
      default:
        break;
    }
  };
  scrollLink = section => {
    switch (section) {
      case "FAQ":
        const target = document.querySelector("#FAQ-accordion");
        window.scrollTo(0, target.offsetTop);
        break;
      default:
        throw new Error("section scroll identifier is not valid");
    }
  };
  toggleLogin = () => {
    this.context.toggleLoginModal();
  };
  render() {
    this.translate = require(`./_locales/${this.context.lang}.json`);
    const { locale } = this.translate;
    return (
      <React.Fragment>
        <ContextConsumer>
          {ctx => (
            <Login
              openModal={ctx.displayLoginModal}
              toggle={this.toggleLogin}
              updateAuth={ctx.updateAuth}
              modalTitle={ctx.loginModalTitle}
              defaultPhoneNumber={ctx.defaultPhoneNumber}
            />
          )}
        </ContextConsumer>
        <Row className="nav-main-container" id="nav-main-container">
          <Col xs="8" lg="2" md="2" className="nav-logo-container-col">
            <img
              src={logo}
              alt=""
              onClick={() => (window.location.href = "/")}
            />
            <span className="logo-text-box">
              <strong className="logo-text">
                Startup <br />
                Space
              </strong>
            </span>
          </Col>
          <Col xs="4" md="10" lg="10" className="nav-links-container-col">
            <FontAwesomeIcon
              className="menu-icon"
              icon={faBars}
              pull="right"
              size="lg"
              color="black"
              onClick={() => this.toggleMenu("open")}
            />
            <Nav className="nav-links-container">
              {this.context.auth.ROLE === "user" && (
                <NavItem>
                  <Link
                    to=""
                    onClick={() => this.logOut()}
                    className="nav-link"
                  >
                    {locale.logout}
                  </Link>
                </NavItem>
              )}
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen.normal}
                toggle={() => this.dropDownToggler("normal")}
                className="rtl"
              >
                <DropdownToggle nav caret>
                  {locale.partnership}
                </DropdownToggle>
                <DropdownMenu className="rtl">
                  <DropdownItem
                    onClick={() => this.props.history.push("/partnership")}
                  >
                    {locale.buisness_partnership}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link className="nav-link" to="/contactus">
                  {locale.contact_us}
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/faq">
                  {locale.faq}
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/">
                  {locale.home}
                </Link>
              </NavItem>
              <NavItem>
                {this.context.auth.ROLE === "user" ? (
                  <button
                    className="nav-link my-requests-link"
                    onClick={() => this.props.history.push("/user/myrequests")}
                  >
                    {locale.myrequests}
                    <FontAwesomeIcon
                      icon={faListAlt}
                      pull="right"
                      color="black"
                      className="icon-myrequests"
                    />
                  </button>
                ) : (
                  <button className="nav-link login" onClick={this.toggleLogin}>
                    {locale.login}
                    <FontAwesomeIcon
                      icon={faLockOpen}
                      pull="right"
                      size="sm"
                      color="black"
                      className="icon-lock-open"
                    />
                    <FontAwesomeIcon
                      icon={faLock}
                      pull="right"
                      size="sm"
                      color="black"
                      className="icon-lock-close"
                    />
                  </button>
                )}
              </NavItem>
              {/* <Dropdown
                nav
                isOpen={this.state.dropdownOpen.lang}
                toggle={() => this.dropDownToggler("lang")}
                className="rtl"
              >
                <DropdownToggle nav caret className="lang">
                  <FontAwesomeIcon
                    icon={faGlobeAsia}
                    pull="right"
                    size="1x"
                    color="black"
                    onClick={() => null}
                  />
                </DropdownToggle>
                <DropdownMenu className="rtl">
                  <DropdownItem onClick={() => this.context.langTrigger("fa")}>
                    فارسی
                  </DropdownItem>
                  <DropdownItem onClick={() => this.context.langTrigger("en")}>
                    English
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
            </Nav>
          </Col>
        </Row>

        <div
          className={classnames(
            "mobile-menu-wrapper",
            this.state.isMobileMenuOpen && "open"
          )}
        >
          <div className="_container">
            <div className="close-icon-box">
              <FontAwesomeIcon
                className="close-icon"
                icon={faTimes}
                pull="right"
                size="lg"
                color="white"
                onClick={() => this.toggleMenu("close")}
              />
            </div>
            <ul className="items-container">
              <li>
                {this.context.auth.ROLE === "user" ? (
                  <span
                    className="nav-link my-requests-link"
                    onClick={() => this.props.history.push("/user/myrequests")}
                  >
                    {locale.myrequests}
                  </span>
                ) : (
                  <span className="nav-link login" onClick={this.toggleLogin}>
                    {locale.login}
                  </span>
                )}
              </li>
              <li>
                <span onClick={() => (window.location.href = "/")}>خانه</span>
              </li>
              <li>
                <span
                  onClick={() => this.dropDownToggler("mobile")}
                  className="ul-dropdown-header rtl"
                >
                  <span>{locale.partnership}</span>
                  {this.state.dropdownOpen.mobile ? (
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      pull="left"
                      size="1x"
                      color="white"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      pull="left"
                      size="1x"
                      color="white"
                    />
                  )}
                </span>
                <Collapse
                  isOpen={this.state.dropdownOpen.mobile}
                  className="rtl "
                >
                  <ul className="rtl ul-dropdown">
                    <li>
                      <Link to="/partnership">
                        {locale.buisness_partnership}
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
              <li>
                <Link className="nav-link" to="/contactus">
                  {locale.contact_us}
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/faq">
                  {locale.faq}
                </Link>
              </li>
              {this.context.auth.ROLE === "user" && (
                <li className="nav-link">
                  <span onClick={() => this.logOut()}>خروج</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
