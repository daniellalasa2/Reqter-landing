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
import logo from "../assets/images/logo.jpg";
import "../assets/styles/Nav.scss";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      didBodyScrolled: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    let scrollTop = window.scrollY;
    const navMainContainer = document.getElementById("nav-main-container");
    //scroll from top 0 position
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
    console.log(this.updater);
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  render() {
    return (
      <Row className="nav-main-container" id="nav-main-container">
        <Col lg="3" className="nav-logo-container-col">
          <img src={logo} alt="" width="45" />
          <strong className="logo-text">eqter</strong>
        </Col>
        <Col lg="9" className="nav-links-container-col">
          <Nav className="nav-links-container">
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle nav caret>
                Compare
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>compare 1</DropdownItem>
                <DropdownItem>compare 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">FAQs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Login</NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    );
  }
}

export default Navigation;
