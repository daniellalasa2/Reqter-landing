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
import Login from "../components/Login";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faAngleDown,
  faAngleUp,
  faLockOpen,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.jpg";
import { GetCookie } from "../components/CookieHandler/CookieHandler";
import "../assets/styles/Nav.scss";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogin: false,
      dropdownOpen: {
        mobile: false,
        normal: false
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
  openLogin = () => {
    this.setState({
      isUserLogin: GetCookie("SSUSERAUTH") ? true : false
    });
  };
  render() {
    return (
      <React.Fragment>
        <Login isLogin={this.state.isUserLogin} />
        {/* <Login isLogin={false} /> */}
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
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen.normal}
                toggle={() => this.dropDownToggler("normal")}
                className="rtl"
              >
                <DropdownToggle nav caret>
                  همکاری
                </DropdownToggle>
                <DropdownMenu className="rtl">
                  <DropdownItem
                    onClick={() => this.props.history.push("/partnership")}
                  >
                    همکاری تجاری
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link className="nav-link" to="/contactus">
                  تماس با ما
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/faq">
                  سوالات متداول
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/">
                  خانه
                </Link>
              </NavItem>
              <NavItem>
                {this.state.isUserLogin ? (
                  <Link className="nav-link my-request-link" to="/myrequests">
                    درخواستهای من
                  </Link>
                ) : (
                  <button className="nav-link login" onClick={this.openLogin}>
                    ورود
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
                <span onClick={() => (window.location.href = "/")}>خانه</span>
              </li>
              <li>
                <span
                  onClick={() => this.dropDownToggler("mobile")}
                  className="ul-dropdown-header rtl"
                >
                  <span>همکاری</span>
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
                      <Link to="/partnership">همکاری تجاری</Link>
                    </li>
                  </ul>
                </Collapse>
              </li>
              <li>
                <Link className="nav-link" to="/contactus">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/faq">
                  سوالات متداول
                </Link>
              </li>
              <li>
                {this.state.isUserLogin ? (
                  <span className="nav-link login" onClick={this.openLogin}>
                    ورود
                  </span>
                ) : (
                  <Link className="nav-link" to="/myrequests">
                    درخواستهای من
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
