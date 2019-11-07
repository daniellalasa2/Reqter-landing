(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/App.scss":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./src/App.scss ***!
  \************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "* {\n  box-sizing: border-box; }\n\n.row {\n  margin: auto 0; }\n\n.App {\n  text-align: center;\n  font-family: \"Samim\", sans-serif;\n  overflow: hidden; }\n\n.App-logo {\n  animation: App-logo-spin infinite 20s linear;\n  height: 40vmin;\n  pointer-events: none; }\n\n.App-header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white; }\n\n.App-link {\n  color: #61dafb; }\n\nbody {\n  overflow-x: hidden; }\n\n@keyframes App-logo-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n.rtl {\n  text-align: right;\n  direction: rtl; }\n\n.preloader {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9999;\n  background-color: #ffffff; }\n  .preloader .loading-text {\n    position: relative;\n    display: block;\n    width: auto;\n    text-align: center;\n    color: grey;\n    margin-top: 58vh;\n    margin-left: 5px; }\n  .preloader .ball-rotate {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin: auto;\n    width: 15px;\n    height: 15px; }\n    .preloader .ball-rotate > div {\n      position: relative;\n      margin: 2px;\n      width: 15px;\n      height: 15px;\n      background: #3264f5;\n      border-radius: 100%;\n      animation-fill-mode: both; }\n      .preloader .ball-rotate > div:after, .preloader .ball-rotate > div:before {\n        background-color: #3264f5;\n        width: 15px;\n        height: 15px;\n        border-radius: 100%;\n        margin: 0 2px;\n        content: \"\";\n        position: absolute;\n        opacity: 0.8; }\n      .preloader .ball-rotate > div:before {\n        top: 0;\n        left: -28px; }\n      .preloader .ball-rotate > div:after {\n        top: 0;\n        left: 25px; }\n      .preloader .ball-rotate > div:first-child {\n        animation: rotate 1s 0s cubic-bezier(0.7, -0.13, 0.22, 0.86) infinite; }\n\n@keyframes rotate {\n  0% {\n    transform: rotate(0); }\n  50% {\n    transform: rotate(180deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n@keyframes preloader {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/index.scss":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./src/index.scss ***!
  \**************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "html {\n  scroll-behavior: smooth; }\n\nbody {\n  margin: 0;\n  font-family: \"Samim\", sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/layout/Main.scss":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./src/layout/Main.scss ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".pageWrapper {\n  min-height: calc(100vh - 297px);\n  background-color: white; }\n\n@media (max-width: 768px) {\n  .pageWrapper {\n    min-height: calc(100vh - 89px); } }\n", ""]);



/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.scss */ "./src/App.scss");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_App_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _layout_Main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout/Main */ "./src/layout/Main.js");
/* harmony import */ var samim_font_dist_font_face_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! samim-font/dist/font-face.css */ "./node_modules/samim-font/dist/font-face.css");
/* harmony import */ var samim_font_dist_font_face_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(samim_font_dist_font_face_css__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/daniel/projects/reqter/reqter-landing/src/App.js";






class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(...args) {
    super(...args);

    this.loading = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "preloader",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ball-rotate",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "loading-text",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, "Startup Space")));
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "App",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["HashRouter"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Suspense, {
      fallback: this.loading(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
      path: "/",
      name: "Home",
      render: props => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_Main__WEBPACK_IMPORTED_MODULE_3__["default"], Object.assign({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      })),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    })))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/App.scss":
/*!**********************!*\
  !*** ./src/App.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../node_modules/postcss-loader/src??postcss!../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/App.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../node_modules/postcss-loader/src??postcss!../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/App.scss", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../node_modules/postcss-loader/src??postcss!../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/App.scss");

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

/***/ "./src/Routes.js":
/*!***********************!*\
  !*** ./src/Routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Home = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, /*! ./components/Home */ "./src/components/Home.js")));
const AboutUs = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => __webpack_require__.e(/*! import() */ 27).then(__webpack_require__.bind(null, /*! ./components/AboutUs */ "./src/components/AboutUs.js")));
const Login = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, /*! ./components/Login */ "./src/components/Login.js")));
const PrivateDesk = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(6), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, /*! ./components/PrivateDesk */ "./src/components/PrivateDesk.js")));
const SharedDesk = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(6), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(15)]).then(__webpack_require__.bind(null, /*! ./components/SharedDesk */ "./src/components/SharedDesk.js")));
const DedicatedOffice = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(6), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! ./components/DedicatedOffice */ "./src/components/DedicatedOffice.js")));
const SessionRoom = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(18), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(19)]).then(__webpack_require__.bind(null, /*! ./components/SessionRoom */ "./src/components/SessionRoom.js")));
const PrivacyPolicy = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => __webpack_require__.e(/*! import() */ 31).then(__webpack_require__.t.bind(null, /*! ./components/PrivacyPolicy */ "./src/components/PrivacyPolicy.js", 7)));
const TermsOfUse = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => __webpack_require__.e(/*! import() */ 33).then(__webpack_require__.t.bind(null, /*! ./components/TermsOfUse */ "./src/components/TermsOfUse.js", 7)));
const Blog = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => __webpack_require__.e(/*! import() */ 29).then(__webpack_require__.t.bind(null, /*! ./components/Blog */ "./src/components/Blog.js", 7)));
const FAQ = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(23), __webpack_require__.e(24)]).then(__webpack_require__.bind(null, /*! ./components/FAQ */ "./src/components/FAQ.js")));
const ContactUs = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(3), __webpack_require__.e(9), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(17)]).then(__webpack_require__.bind(null, /*! ./components/ContactUs */ "./src/components/ContactUs.js")));
const Careers = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => __webpack_require__.e(/*! import() */ 30).then(__webpack_require__.t.bind(null, /*! ./components/Careers */ "./src/components/Careers.js", 7)));
const PartnerShip = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(6), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, /*! ./components/PartnerShip */ "./src/components/PartnerShip.js")));
const Security = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => __webpack_require__.e(/*! import() */ 32).then(__webpack_require__.t.bind(null, /*! ./components/Security */ "./src/components/Security.js", 7)));
const MyRequests = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(7), __webpack_require__.e(4), __webpack_require__.e(20)]).then(__webpack_require__.bind(null, /*! ./components/User/MyRequests */ "./src/components/User/MyRequests.js")));
const OfferList = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(4), __webpack_require__.e(21)]).then(__webpack_require__.bind(null, /*! ./components/User/OfferList */ "./src/components/User/OfferList.js")));
const NotFound = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => __webpack_require__.e(/*! import() */ 28).then(__webpack_require__.t.bind(null, /*! ./components/Auth/NotFound */ "./src/components/Auth/NotFound.js", 7))); //temporary

const ComingSoon = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => __webpack_require__.e(/*! import() */ 26).then(__webpack_require__.bind(null, /*! ./components/DefaultInnerLinks */ "./src/components/DefaultInnerLinks.js")));
const routes = [{
  path: "/",
  exact: true,
  name: "Home",
  component: Home,
  navTransform: true
}, {
  path: "/auth/404",
  exact: true,
  name: "Not Found",
  component: NotFound
}, {
  path: "/comingsoon",
  exact: true,
  name: "Coming Soon",
  component: ComingSoon,
  navTransform: true
}, {
  path: "/aboutus",
  exact: true,
  name: "About Us",
  component: AboutUs
}, {
  path: "/login",
  exact: true,
  name: "Login",
  component: Login
}, {
  path: "/apply/sessionroom",
  name: "Session Room",
  component: SessionRoom
}, {
  path: "/apply/dedicatedoffice",
  name: "Dedicated Office",
  component: DedicatedOffice
}, {
  path: "/apply/privatedesk",
  name: "Private Desk",
  component: PrivateDesk
}, {
  path: "/apply/shareddesk",
  name: "Shared Desk",
  exact: true,
  component: SharedDesk
}, {
  path: "/privacypolicy",
  exact: true,
  name: "Privacy Policy",
  component: PrivacyPolicy
}, {
  path: "/termsofuse",
  exact: true,
  name: "Terms Of Use",
  component: TermsOfUse
}, {
  path: "/blog",
  exact: true,
  name: "Blog",
  component: Blog
}, {
  path: "/faq",
  exact: true,
  name: "FAQ",
  component: FAQ
}, {
  path: "/contactus",
  exact: true,
  name: "Contact Us",
  component: ContactUs
}, {
  path: "/careers",
  exact: true,
  name: "Careers",
  component: Careers
}, {
  path: "/partnership",
  exact: true,
  name: "Partner Ship",
  component: PartnerShip
}, {
  path: "/security",
  exact: true,
  name: "Security",
  component: Security
}, {
  path: "/user/myrequests",
  exact: true,
  name: "My Requests",
  component: MyRequests,
  auth: "user"
}, {
  path: "/user/offerlist",
  name: "Offer List",
  component: OfferList,
  auth: "user"
}];
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./src/components/ContextApi/ContextApi.js":
/*!*************************************************!*\
  !*** ./src/components/ContextApi/ContextApi.js ***!
  \*************************************************/
/*! exports provided: ContextProvider, ContextConsumer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextProvider", function() { return ContextProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextConsumer", function() { return ContextConsumer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ContextApi = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});
const ContextProvider = ContextApi.Provider;
const ContextConsumer = ContextApi.Consumer;
/* harmony default export */ __webpack_exports__["default"] = (ContextApi);

/***/ }),

/***/ "./src/components/CookieHandler/CookieHandler.js":
/*!*******************************************************!*\
  !*** ./src/components/CookieHandler/CookieHandler.js ***!
  \*******************************************************/
/*! exports provided: SetCookie, GetCookie, SetSession, GetSession, JsonToString, JsonParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetCookie", function() { return SetCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetCookie", function() { return GetCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetSession", function() { return SetSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetSession", function() { return GetSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonToString", function() { return JsonToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonParser", function() { return JsonParser; });
function SetCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function GetCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function SetSession(sname, svalue) {
  const extacted = sessionStorage.setItem(sname, svalue);
  return extacted;
}

function GetSession(sname) {
  const extacted = sessionStorage.getItem(sname);
  return extacted;
}

function JsonToString(obj) {
  try {
    return JSON.stringify(obj);
  } catch (err) {
    return '{TOKEN:"",ID:"",ROLE:"newcomer"}';
  }
}

function JsonParser(JSONstring) {
  try {
    return JSON.parse(JSONstring);
  } catch (err) {
    return {
      TOKEN: "",
      ROLE: "newcomer",
      ID: ""
    };
  }
}



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_app_polyfill_ie9__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-app-polyfill/ie9 */ "./node_modules/react-app-polyfill/ie9.js");
/* harmony import */ var react_app_polyfill_ie9__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_app_polyfill_ie9__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_app_polyfill_ie11__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-app-polyfill/ie11 */ "./node_modules/react-app-polyfill/ie11.js");
/* harmony import */ var react_app_polyfill_ie11__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_app_polyfill_ie11__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_app_polyfill_stable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-app-polyfill/stable */ "./node_modules/react-app-polyfill/stable.js");
/* harmony import */ var react_app_polyfill_stable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_app_polyfill_stable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(normalize_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _serviceWorker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./serviceWorker */ "./src/serviceWorker.js");
var _jsxFileName = "/home/daniel/projects/reqter/reqter-landing/src/index.js";










react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_8__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 12
  },
  __self: undefined
}), document.getElementById("root")); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

_serviceWorker__WEBPACK_IMPORTED_MODULE_9__["unregister"]();

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../node_modules/postcss-loader/src??postcss!../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../node_modules/postcss-loader/src??postcss!../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/index.scss", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../node_modules/postcss-loader/src??postcss!../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/index.scss");

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

/***/ "./src/layout/Main.js":
/*!****************************!*\
  !*** ./src/layout/Main.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Routes */ "./src/Routes.js");
/* harmony import */ var _Main_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Main.scss */ "./src/layout/Main.scss");
/* harmony import */ var _Main_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Main_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ContextApi_ContextApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ContextApi/ContextApi */ "./src/components/ContextApi/ContextApi.js");
/* harmony import */ var _components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/CookieHandler/CookieHandler */ "./src/components/CookieHandler/CookieHandler.js");
var _jsxFileName = "/home/daniel/projects/reqter/reqter-landing/src/layout/Main.js";







const Navigation = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(8), __webpack_require__.e(22)]).then(__webpack_require__.bind(null, /*! ./Nav */ "./src/layout/Nav.js")));
const Footer = react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(9), __webpack_require__.e(25)]).then(__webpack_require__.bind(null, /*! ./Footer */ "./src/layout/Footer.js")));

class Main extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    this.urlParser = url => {
      let regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match;

      while (match = regex.exec(url)) {
        params[match[1]] = match[2];
      }

      return params;
    };

    this.gtagUpdater = (location, pageName) => {
      if (window.gtag) {
        window.gtag("config", "UA-145850270-1", {
          page_title: pageName,
          page_path: location.pathname,
          page_search: location.search
        });
      }
    };

    this.authObj = Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["GetCookie"])("SSUSERAUTH") ? Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["JsonParser"])(Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["GetCookie"])("SSUSERAUTH")) : Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["GetCookie"])("SSGUESTAUTH") ? Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["JsonParser"])(Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["GetCookie"])("SSGUESTAUTH")) : {};
    this.parsedUrlObject = this.urlParser(props.location.search);
    this.src = Boolean(Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["GetSession"])("src")) ? Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["GetSession"])("src") : Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["SetSession"])("src", Boolean(this.parsedUrlObject.src) ? this.parsedUrlObject.src : "direct");
    window.src = Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["GetSession"])("src");
    this.state = {
      userAuth: {
        ROLE: this.authObj ? this.authObj.ROLE : "newcomer",
        ID: this.authObj.ID ? this.authObj.ID : "",
        TOKEN: this.authObj ? this.authObj.TOKEN : ""
      },
      displayLoginModal: false,
      loginModalTitle: "ورود",
      defaultPhoneNumber: this.authObj ? this.authObj.ID : ""
    };

    this.toggleLoginModal = (status, modalTitle, defaultPhoneNumber) => {
      this.setState({
        displayLoginModal: typeof status === "boolean" ? status : !this.state.displayLoginModal,
        loginModalTitle: modalTitle ? modalTitle : "ورود",
        defaultPhoneNumber: defaultPhoneNumber
      });
    }; //if any argument sent then set incoming argument else update user authentication based on set cookie


    this.updateAuth = callback => {
      this.setState({
        userAuth: Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["JsonParser"])(Object(_components_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_5__["GetCookie"])("SSUSERAUTH")),
        //DO NOT REPLACE THIS WITH this.authObj
        displayLoginModal: false
      }, () => {
        callback && typeof callback === "function" && callback(this.state.userAuth);
      });
    };
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      window.scrollTo({
        top: 0
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102
      },
      __self: this
    }, _Routes__WEBPACK_IMPORTED_MODULE_2__["default"].map((route, idx) => {
      return route.component ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        key: idx,
        path: route.path,
        exact: route.exact,
        name: route.name,
        render: props => !route.auth || route.auth === this.state.userAuth.ROLE ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 112
          },
          __self: this
        }, this.gtagUpdater(this.props.history, route.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ContextApi_ContextApi__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
          value: {
            auth: this.state.userAuth,
            updateAuth: this.updateAuth,
            displayLoginModal: this.state.displayLoginModal,
            toggleLoginModal: this.toggleLoginModal,
            loginModalTitle: this.state.loginModalTitle,
            defaultPhoneNumber: this.state.defaultPhoneNumber
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 114
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Navigation, Object.assign({
          transform: route.navTransform
        }, props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(route.component, Object.assign({}, props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 129
          },
          __self: this
        }))))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
          to: "/",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 134
          },
          __self: this
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }) : null;
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 142
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Footer, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 143
      },
      __self: this
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./src/layout/Main.scss":
/*!******************************!*\
  !*** ./src/layout/Main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./Main.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/layout/Main.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./Main.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/layout/Main.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./Main.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/layout/Main.scss");

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

/***/ "./src/serviceWorker.js":
/*!******************************!*\
  !*** ./src/serviceWorker.js ***!
  \******************************/
/*! exports provided: register, unregister */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregister", function() { return unregister; });
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
const isLocalhost = Boolean(window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
window.location.hostname === '[::1]' || // 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
function register(config) {
  if (false) {}
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker.register(swUrl).then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      if (installingWorker == null) {
        return;
      }

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // At this point, the updated precached content has been fetched,
            // but the previous service worker will still serve the older
            // content until all client tabs are closed.
            console.log('New content is available and will be used when all ' + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.'); // Execute callback

            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.log('Content is cached for offline use.'); // Execute callback

            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };
    };
  }).catch(error => {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl).then(response => {
    // Ensure service worker exists, and that we really are getting a JS file.
    const contentType = response.headers.get('content-type');

    if (response.status === 404 || contentType != null && contentType.indexOf('javascript') === -1) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl, config);
    }
  }).catch(() => {
    console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

/***/ }),

/***/ 0:
/*!**********************************************************************************!*\
  !*** multi ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/daniel/projects/reqter/reqter-landing/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /home/daniel/projects/reqter/reqter-landing/src/index.js */"./src/index.js");


/***/ })

},[[0,"runtime~main",10]]]);
//# sourceMappingURL=main.chunk.js.map