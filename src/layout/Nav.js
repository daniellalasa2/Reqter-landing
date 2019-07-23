import React, { Component } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";

import logo from "../assets/images/logo.jpg";
import "../assets/styles/Nav.scss";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      didBodyScrolled: false
    };
    console.log("nav props : ", this.props.transform);
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
    console.log(Boolean(this.props.transform));
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

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  render() {
    return (
      <Row className="nav-main-container" id="nav-main-container">
        <Col lg="6" className="nav-logo-container-col">
          <img
            src={logo}
            alt=""
            onClick={() => {
              window.location.href = "/";
            }}
          />
          <span className="logo-text-box">
            <strong className="logo-text">
              Startup <br />
              Space
            </strong>
          </span>
        </Col>
        <Col lg="6" className="nav-links-container-col">
          <Nav className="nav-links-container">
            <Dropdown
              nav
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
              className="rtl"
            >
              <DropdownToggle nav caret>
                همکاری
              </DropdownToggle>
              <DropdownMenu className="rtl">
                <DropdownItem
                  onClick={() => (window.location.href = "/comingsoon")}
                >
                  فرصت های شغلی
                </DropdownItem>
                <DropdownItem
                  onClick={() => (window.location.href = "/comingsoon")}
                >
                  همکاری تجاری
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink href="/comingsoon">درباره ما</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/comingsoon">سوالات متداول</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/comingsoon">ورود</NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    );
  }
}

export default Navigation;
