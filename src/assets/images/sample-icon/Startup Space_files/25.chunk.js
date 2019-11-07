(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/assets/styles/Footer.scss":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./src/assets/styles/Footer.scss ***!
  \*****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "footer {\n  background-size: contain;\n  width: 100%;\n  direction: rtl;\n  display: flex;\n  background-color: #6d8ae0;\n  justify-content: space-between;\n  flex-direction: column; }\n  footer .contact-info-box {\n    width: 100%; }\n  footer .footer-links {\n    display: flex;\n    height: auto;\n    padding-top: 2em;\n    padding-bottom: 5em; }\n    footer .footer-links h6 {\n      font-weight: bold; }\n  footer ul {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    font-size: 13px !important; }\n  footer .column {\n    flex-grow: 1;\n    padding-right: 30px;\n    text-align: right; }\n    footer .column a {\n      padding-right: 10px;\n      color: white !important; }\n    footer .column h6 {\n      font-size: 14px;\n      color: white; }\n  footer .copyright {\n    padding: 25px 25px;\n    margin-bottom: 0;\n    color: lightgrey;\n    font-size: 13px; }\n    footer .copyright a {\n      color: white; }\n  footer .footer-social-links {\n    justify-content: center;\n    display: inline-flex; }\n    footer .footer-social-links a {\n      border: 1px solid white;\n      border-radius: 50%;\n      box-sizing: content-box;\n      font-size: 14px;\n      min-width: 25px;\n      width: 25px;\n      height: 26px;\n      min-height: 26px;\n      display: flex;\n      position: relative;\n      align-items: center;\n      justify-content: center;\n      margin: 0 7px; }\n\n@media (max-width: 768px) {\n  footer .footer-links {\n    display: none; } }\n\n@media (max-width: 576px) {\n  footer .copyright .followus-text {\n    display: none; } }\n\n.example-enter {\n  opacity: 0.01; }\n\n.example-enter.example-enter-active {\n  opacity: 1;\n  transition: opacity 1500ms ease-in; }\n\n.example-leave {\n  opacity: 1; }\n\n.example-leave.example-leave-active {\n  opacity: 0.01;\n  transition: opacity 300ms ease-in; }\n", ""]);



/***/ }),

/***/ "./src/assets/styles/Footer.scss":
/*!***************************************!*\
  !*** ./src/assets/styles/Footer.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./Footer.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/assets/styles/Footer.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./Footer.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/assets/styles/Footer.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./Footer.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/assets/styles/Footer.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/layout/Footer.js":
/*!******************************!*\
  !*** ./src/layout/Footer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_styles_Footer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/styles/Footer.scss */ "./src/assets/styles/Footer.scss");
/* harmony import */ var _assets_styles_Footer_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_Footer_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");
var _jsxFileName = "/home/daniel/projects/reqter/reqter-landing/src/layout/Footer.js";






class Footer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
      className: "contact-info-box",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
      className: "footer-links",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "column",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, "\u0645\u062D\u0635\u0648\u0644\u0627\u062A"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/apply/sessionroom",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }, "\u0633\u0627\u0644\u0646 \u062C\u0644\u0633\u0627\u062A")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/apply/shareddesk",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }, "\u0645\u06CC\u0632\u06A9\u0627\u0631 \u0627\u0634\u062A\u0631\u0627\u06A9\u06CC")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/apply/privatedesk",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    }, "\u0645\u06CC\u0632\u06A9\u0627\u0631 \u0627\u062E\u062A\u0635\u0627\u0635\u06CC")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/apply/dedicatedoffice",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, "\u0627\u062A\u0627\u0642 \u06A9\u0627\u0631 \u062E\u0635\u0648\u0635\u06CC")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "column",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: this
    }, "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/faq",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, "\u0633\u0648\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/comingsoon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, "\u0627\u0645\u0646\u06CC\u062A")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "column",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      },
      __self: this
    }, "\u0634\u0631\u06A9\u062A"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/comingsoon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      },
      __self: this
    }, "\u0628\u0644\u0627\u06AF")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/comingsoon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, "\u0641\u0631\u0635\u062A \u0647\u0627\u06CC \u0634\u063A\u0644\u06CC")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/comingsoon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, "\u0627\u062E\u0628\u0627\u0631")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "column",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      },
      __self: this
    }, "\u0647\u0645\u06A9\u0627\u0631\u0627\u0646 \u062A\u062C\u0627\u0631\u06CC"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/partnership",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }, "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0647\u0645\u06A9\u0627\u0631\u06CC")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "column",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }, "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u062C\u0648\u0632 \u0647\u0627"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/comingsoon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: this
    }, "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/comingsoon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      },
      __self: this
    }, "\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
      className: "copyright",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        float: "right"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      },
      __self: this
    }, "\xA9 2019 Startup Space"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        float: "left",
        marginTop: "-15px"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "followus-text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80
      },
      __self: this
    }, " \u0645\u0627 \u0631\u0627 \u062F\u0646\u0628\u0627\u0644 \u06A9\u0646\u06CC\u062F: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "footer-social-links",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "https://www.instagram.com/startupspace2020/",
      rel: "noopener noreferrer",
      target: "_blank",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
      icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faInstagram"],
      color: "white",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "https://www.linkedin.com/company/startup-space/",
      rel: "noopener noreferrer",
      target: "_blank",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
      icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faLinkedinIn"],
      color: "white",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94
      },
      __self: this
    })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      style: {
        margin: 0,
        borderColor: "lightgrey"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        float: "right"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, "\u062D\u0642 \u06A9\u067E\u06CC \u0631\u0627\u06CC\u062A \u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0627\u0631\u062A \u0622\u067E \u0627\u0633\u067E\u06CC\u0633 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A.")));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ })

}]);
//# sourceMappingURL=25.chunk.js.map