(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/FlatForm/FlatForm.scss":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./src/components/FlatForm/FlatForm.scss ***!
  \*************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".form-section {\n  background-color: whitesmoke;\n  min-height: calc( 100vh - 320px); }\n\ninput,\nselect,\ntextarea {\n  border-radius: 0 !important;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0; }\n\ninput {\n  border-width: 0 0 1px 0 !important;\n  border-color: #ced4da;\n  display: block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  input:hover {\n    border-color: #6caff7; }\n  input[type=\"number\"]::-webkit-outer-spin-button, input[type=\"number\"]::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0; }\n  input[type=\"number\"] {\n    -moz-appearance: textfield;\n    -webkit-appearance: textfield;\n            appearance: textfield; }\n\ninput:focus {\n  outline: 0px !important;\n  -webkit-appearance: none;\n  box-shadow: none !important; }\n\n.form-card {\n  width: 750px;\n  text-align: left;\n  border: none;\n  box-shadow: 0px 0px 1px 0px lightgrey;\n  border-radius: 8px !important;\n  margin: 80px auto 10px;\n  padding: 20px; }\n  .form-card .show {\n    display: block !important;\n    opacity: 1 !important; }\n  .form-card .wizardForm {\n    display: none;\n    opacity: 0;\n    transition: display 1s, opacity 0.9s linear; }\n  .form-card .card-header {\n    font-weight: bold;\n    color: #333;\n    border-bottom: 1px solid rgba(200, 200, 200, 0.3);\n    background: none;\n    line-height: 3.4; }\n    .form-card .card-header span.icon {\n      background-color: #8ea3e3;\n      border-radius: 50%;\n      padding: 25px;\n      float: left; }\n    .form-card .card-header span.title {\n      margin: auto auto auto 10px; }\n  .form-card .card-footer {\n    background-color: white;\n    border: none; }\n    .form-card .card-footer .navigation-button {\n      border-radius: 0 !important;\n      border: none;\n      padding: 7px 15px;\n      font-weight: bold; }\n      .form-card .card-footer .navigation-button.next {\n        float: right;\n        background-color: #8ea3e3 !important; }\n        .form-card .card-footer .navigation-button.next[disabled] {\n          cursor: not-allowed; }\n      .form-card .card-footer .navigation-button.prev {\n        float: left;\n        background-color: #8ea3e3 !important; }\n      .form-card .card-footer .navigation-button.submit {\n        background-color: #727fdd !important;\n        border-radius: 2px !important;\n        padding: 12px 28px;\n        float: left; }\n        .form-card .card-footer .navigation-button.submit[disabled] {\n          cursor: not-allowed; }\n\n.field-row {\n  margin-bottom: 40px; }\n  .field-row .field-title {\n    font-size: 15px; }\n  .field-row .error-message {\n    color: lightcoral;\n    font-size: 12px;\n    float: left;\n    padding: 3px 10px;\n    font-weight: bold;\n    min-height: 24px; }\n  .field-row .error-input {\n    border-color: lightcoral; }\n  .field-row .input-wrapper {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    align-content: center;\n    min-height: 50px; }\n  .field-row .flatinput-prefix {\n    max-height: calc(1.5em + 0.75rem + 2px);\n    line-height: 1.5;\n    margin-right: -42px;\n    width: auto;\n    max-width: 51px;\n    min-width: 42px;\n    padding: 6px;\n    text-align: center;\n    background-color: #e6e6e6;\n    border-radius: 1px;\n    font-weight: bold;\n    z-index: 1; }\n  .field-row .has-prefix {\n    padding-left: 47px; }\n\nlabel.checkboxContainer {\n  display: block;\n  position: relative;\n  margin-bottom: 12px;\n  padding: 10px;\n  overflow: hidden;\n  border: 2px solid #c8c8c8;\n  cursor: pointer;\n  font-size: 17px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none; }\n  label.checkboxContainer input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n    position: absolute;\n    cursor: pointer; }\n  label.checkboxContainer input:checked {\n    border: 2 solid #a0f6fa; }\n  label.checkboxContainer .checkmark {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: auto;\n    width: auto; }\n    label.checkboxContainer .checkmark:after {\n      content: \"\";\n      position: absolute;\n      display: none; }\n\n.rtl-layout input,\n.rtl-layout select,\n.rtl-layout textarea {\n  direction: rtl; }\n\n.rtl-layout label {\n  float: right; }\n\n.rtl-layout .card {\n  text-align: right !important; }\n  .rtl-layout .card .card-header {\n    text-align: right; }\n    .rtl-layout .card .card-header span.icon {\n      float: right; }\n    .rtl-layout .card .card-header span.title {\n      margin: auto 10px auto auto; }\n  .rtl-layout .card .card-footer .navigation-button.next {\n    float: left; }\n  .rtl-layout .card .card-footer .navigation-button.prev {\n    float: right; }\n\n.rtl-layout .field-row .error-message {\n  float: right !important; }\n\n.customCheckbox {\n  /* Customize the label (the container) */\n  /* Hide the browser's default checkbox */\n  /* Create a custom checkbox */\n  /* On mouse-over, add a grey background color */\n  /* When the checkbox is checked, add a blue background */\n  /* Create the checkmark/indicator (hidden when not checked) */\n  /* Show the checkmark when checked */\n  /* Style the checkmark/indicator */ }\n  .customCheckbox .container {\n    display: block;\n    position: relative;\n    padding-left: 35px;\n    margin-bottom: 12px;\n    cursor: pointer;\n    font-size: 22px;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    user-select: none; }\n  .customCheckbox .container input {\n    position: absolute;\n    opacity: 0;\n    cursor: pointer;\n    height: 0;\n    width: 0; }\n  .customCheckbox .checkmark {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 25px;\n    width: 25px;\n    background-color: #eee; }\n  .customCheckbox .container:hover input ~ .checkmark {\n    background-color: #ccc; }\n  .customCheckbox .container input:checked ~ .checkmark {\n    background-color: #2196f3; }\n  .customCheckbox .checkmark:after {\n    content: \"\";\n    position: absolute;\n    display: none; }\n  .customCheckbox .container input:checked ~ .checkmark:after {\n    display: block; }\n  .customCheckbox .container .checkmark:after {\n    left: 9px;\n    top: 5px;\n    width: 5px;\n    height: 10px;\n    border: solid white;\n    border-width: 0 3px 3px 0;\n    transform: rotate(45deg); }\n\n.hidden-checkbox {\n  display: none; }\n\n.styled-checkbox-wrapper {\n  width: auto;\n  display: inline-block;\n  width: 150px;\n  height: 183px;\n  margin: 10px; }\n  .styled-checkbox-wrapper .styled-checkbox {\n    cursor: pointer;\n    background-color: rgba(232, 232, 232, 0.7);\n    padding: 11px;\n    position: relative;\n    display: inline-block;\n    border-radius: 5px;\n    border: 1px solid lightgrey; }\n    .styled-checkbox-wrapper .styled-checkbox:after {\n      content: \"\";\n      box-sizing: content-box; }\n    .styled-checkbox-wrapper .styled-checkbox .checked-icon {\n      position: absolute;\n      top: -2px;\n      right: -2px;\n      opacity: 0.5;\n      display: none; }\n      .styled-checkbox-wrapper .styled-checkbox .checked-icon #tickSvg {\n        width: 20px;\n        position: absolute;\n        right: 3px; }\n      .styled-checkbox-wrapper .styled-checkbox .checked-icon #polygon {\n        border-radius: 0px 5px;\n        position: absolute;\n        right: 0; }\n    .styled-checkbox-wrapper .styled-checkbox img {\n      width: 120px;\n      border-radius: 10px;\n      position: relative; }\n    .styled-checkbox-wrapper .styled-checkbox .title {\n      font-weight: bold;\n      text-align: center;\n      width: 100%;\n      display: inline-block;\n      margin-top: 10px;\n      line-height: 1; }\n    .styled-checkbox-wrapper .styled-checkbox.checked {\n      box-shadow: 0 0 1px 3px lightgrey; }\n      .styled-checkbox-wrapper .styled-checkbox.checked .checked-icon {\n        display: block; }\n\n.inline-checkbox-wrapper {\n  line-height: 1.9;\n  width: auto;\n  padding: 5px;\n  flex-grow: 1; }\n  .inline-checkbox-wrapper .inline-checkbox {\n    overflow: hidden;\n    flex-grow: 1;\n    cursor: pointer;\n    height: 36px;\n    border-radius: 4px;\n    width: 100%;\n    box-shadow: 0 0 0 1px rgba(46, 91, 150, 0.6);\n    background-color: whitesmoke;\n    display: inline-flex; }\n    .inline-checkbox-wrapper .inline-checkbox .key {\n      width: 35px;\n      display: inline-flex;\n      text-align: center; }\n      .inline-checkbox-wrapper .inline-checkbox .key span {\n        width: 30px;\n        border: 1px solid rgba(46, 91, 150, 0.4);\n        background-color: rgba(142, 163, 227, 0.4);\n        margin: 4px;\n        display: block;\n        border-radius: 2px;\n        font-size: 15px;\n        line-height: 1.95; }\n    .inline-checkbox-wrapper .inline-checkbox .title {\n      width: 100%;\n      display: inline-flex;\n      text-align: center;\n      max-width: auto;\n      overflow: hidden;\n      height: 38px;\n      font-size: 15px;\n      line-height: 2.4; }\n    .inline-checkbox-wrapper .inline-checkbox .checked-icon {\n      width: 22px;\n      min-width: 22px;\n      max-width: 22px;\n      display: inline-flex; }\n      .inline-checkbox-wrapper .inline-checkbox .checked-icon #tickSvg {\n        margin: auto;\n        display: none;\n        width: 13px;\n        margin: auto; }\n    .inline-checkbox-wrapper .inline-checkbox.checked {\n      box-shadow: 0 0 0px 2px rgba(46, 91, 150, 0.7); }\n      .inline-checkbox-wrapper .inline-checkbox.checked .key span {\n        background-color: #2e5b96;\n        color: white; }\n      .inline-checkbox-wrapper .inline-checkbox.checked .checked-icon #tickSvg {\n        display: inline-flex; }\n    .inline-checkbox-wrapper .inline-checkbox:hover {\n      background-color: #e6e6e6; }\n\n.CheckBoxRow {\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n  display: flex;\n  width: 100%;\n  margin-top: 10px; }\n\n@media (max-width: 768px) {\n  .form-section {\n    min-height: calc( 100vh - 89px); }\n  .form-card {\n    margin: 70px 10px 10px;\n    padding: 5px; }\n    .form-card .show {\n      display: block !important;\n      opacity: 1 !important; }\n    .form-card .wizardForm {\n      display: none;\n      opacity: 0;\n      transition: display 1s, opacity 0.9s linear; }\n    .form-card .card-header {\n      font-weight: bold;\n      color: #333;\n      border-bottom: 1px solid rgba(200, 200, 200, 0.3);\n      background: none;\n      line-height: 3.4; }\n      .form-card .card-header span.icon {\n        background-color: #8ea3e3;\n        border-radius: 50%;\n        padding: 25px;\n        float: left; }\n      .form-card .card-header span.title {\n        margin: auto auto auto 10px; }\n    .form-card .card-footer {\n      background-color: white;\n      border: none; }\n      .form-card .card-footer .navigation-button {\n        border-radius: 0 !important;\n        border: none;\n        padding: 7px 15px;\n        font-weight: bold; }\n        .form-card .card-footer .navigation-button.next {\n          float: right;\n          background-color: #8ea3e3 !important; }\n          .form-card .card-footer .navigation-button.next[disabled] {\n            cursor: not-allowed; }\n        .form-card .card-footer .navigation-button.prev {\n          float: left;\n          background-color: #8ea3e3 !important; }\n        .form-card .card-footer .navigation-button.submit {\n          background-color: #727fdd !important;\n          border-radius: 2px !important;\n          padding: 8px 28px;\n          float: left; }\n          .form-card .card-footer .navigation-button.submit[disabled] {\n            cursor: not-allowed; } }\n\n.hidden-checkbox {\n  display: none; }\n\n.styled-checkbox-wrapper {\n  width: auto;\n  display: inline-block;\n  width: 150px;\n  height: 183px;\n  margin: 10px; }\n  .styled-checkbox-wrapper .styled-checkbox {\n    cursor: pointer;\n    background-color: rgba(232, 232, 232, 0.7);\n    padding: 11px;\n    position: relative;\n    display: inline-block;\n    border-radius: 5px;\n    border: 1px solid lightgrey; }\n    .styled-checkbox-wrapper .styled-checkbox:after {\n      content: \"\";\n      box-sizing: content-box; }\n    .styled-checkbox-wrapper .styled-checkbox .checked-icon {\n      position: absolute;\n      top: -2px;\n      right: -2px;\n      opacity: 0.5;\n      display: none; }\n      .styled-checkbox-wrapper .styled-checkbox .checked-icon #tickSvg {\n        width: 20px;\n        position: absolute;\n        right: 3px; }\n      .styled-checkbox-wrapper .styled-checkbox .checked-icon #polygon {\n        border-radius: 0px 5px;\n        position: absolute;\n        right: 0; }\n    .styled-checkbox-wrapper .styled-checkbox img {\n      width: 120px;\n      border-radius: 10px;\n      position: relative; }\n    .styled-checkbox-wrapper .styled-checkbox .title {\n      font-weight: bold;\n      text-align: center;\n      width: 100%;\n      display: inline-block;\n      margin-top: 10px;\n      line-height: 1; }\n    .styled-checkbox-wrapper .styled-checkbox.checked {\n      box-shadow: 0 0 1px 3px lightgrey; }\n      .styled-checkbox-wrapper .styled-checkbox.checked .checked-icon {\n        display: block; }\n\n.inline-checkbox-wrapper {\n  line-height: 1.9;\n  width: auto;\n  padding: 5px;\n  flex-grow: 1; }\n  .inline-checkbox-wrapper .inline-checkbox {\n    overflow: hidden;\n    flex-grow: 1;\n    cursor: pointer;\n    height: 36px;\n    border-radius: 4px;\n    width: 100%;\n    box-shadow: 0 0 0 1px rgba(46, 91, 150, 0.6);\n    background-color: whitesmoke;\n    display: inline-flex; }\n    .inline-checkbox-wrapper .inline-checkbox .key {\n      width: 35px;\n      display: inline-flex;\n      text-align: center; }\n      .inline-checkbox-wrapper .inline-checkbox .key span {\n        width: 30px;\n        border: 1px solid rgba(46, 91, 150, 0.4);\n        background-color: rgba(142, 163, 227, 0.4);\n        margin: 4px;\n        display: block;\n        border-radius: 2px;\n        font-size: 15px;\n        line-height: 1.95; }\n    .inline-checkbox-wrapper .inline-checkbox .title {\n      width: 100%;\n      display: inline-flex;\n      text-align: center;\n      max-width: auto;\n      overflow: hidden;\n      height: 38px;\n      font-size: 15px;\n      line-height: 2.4; }\n    .inline-checkbox-wrapper .inline-checkbox .checked-icon {\n      width: 22px;\n      min-width: 22px;\n      max-width: 22px;\n      display: inline-flex; }\n      .inline-checkbox-wrapper .inline-checkbox .checked-icon #tickSvg {\n        margin: auto;\n        display: none;\n        width: 13px;\n        margin: auto; }\n    .inline-checkbox-wrapper .inline-checkbox.checked {\n      box-shadow: 0 0 0px 2px rgba(46, 91, 150, 0.7); }\n      .inline-checkbox-wrapper .inline-checkbox.checked .key span {\n        background-color: #2e5b96;\n        color: white; }\n      .inline-checkbox-wrapper .inline-checkbox.checked .checked-icon #tickSvg {\n        display: inline-flex; }\n    .inline-checkbox-wrapper .inline-checkbox:hover {\n      background-color: #e6e6e6; }\n\n.CheckBoxRow {\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n  display: flex;\n  width: 100%;\n  margin-top: 10px; }\n\n.number-range-buttons-container {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  flex-wrap: wrap;\n  direction: rtl; }\n  .number-range-buttons-container .sets {\n    appearance: none;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    border-radius: none;\n    border: 1px solid grey !important;\n    background-color: transparent;\n    color: black;\n    padding: 9px 12px 7px;\n    outline: none;\n    width: auto;\n    min-width: 10%; }\n    .number-range-buttons-container .sets:hover {\n      background-color: rgba(20, 20, 20, 0.4);\n      color: white; }\n    .number-range-buttons-container .sets:first-child {\n      border-radius: 0 0.35vw 0.35vw 0 !important; }\n    .number-range-buttons-container .sets:last-child {\n      border-radius: 0.35vw 0 0 0.35vw !important; }\n  .number-range-buttons-container .active {\n    background-color: rgba(20, 20, 20, 0.8) !important;\n    color: white; }\n\n.flatuploader {\n  display: flex;\n  width: 100%;\n  flex-direction: row;\n  align-items: center;\n  align-content: center;\n  justify-content: space-around;\n  padding: 1rem 1rem;\n  border: 2px dashed #5993bf;\n  direction: rtl; }\n  .flatuploader .percentage-number {\n    font-size: 17px;\n    width: 45px;\n    font-weight: bold; }\n  .flatuploader .cloud-icon {\n    cursor: pointer; }\n  .flatuploader .success-icon {\n    display: none; }\n  .flatuploader .file-name-section {\n    direction: ltr;\n    padding: 0 5px;\n    width: 42%;\n    text-align: center;\n    max-width: calc(0.42 * 620px);\n    max-height: 54px;\n    overflow: hidden;\n    font-size: 13px; }\n  .flatuploader .file-select-button {\n    padding: 0.25rem 0.5rem;\n    border: 1px solid black;\n    border-radius: 3px;\n    cursor: pointer; }\n    .flatuploader .file-select-button:hover {\n      background-color: rgba(0, 0, 0, 0.2); }\n    .flatuploader .file-select-button .placeholder {\n      font-size: 0.8rem; }\n\n.success-upload .success-icon {\n  display: block !important; }\n\n.success-upload .cloud-icon {\n  display: none !important; }\n\n.dateWrapper, .timeWrapper {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  background-color: #e6e6e6;\n  border-radius: 6px !important;\n  width: fit-content;\n  padding: 5px;\n  box-shadow: 0 0 0 1px rgba(46, 91, 150, 0.6) !important; }\n  .dateWrapper input, .timeWrapper input {\n    padding: 0;\n    margin: 3px;\n    width: 70px;\n    text-align: center;\n    font-size: 18px;\n    padding: 4px 0 0 0;\n    height: auto;\n    border-radius: 3px !important;\n    border: 1px solid rgba(46, 91, 150, 0.4);\n    background-color: rgba(142, 163, 227, 0.4); }\n    .dateWrapper input .year, .timeWrapper input .year {\n      width: 100px; }\n\n@media (max-width: 320px) {\n  .flatuploader {\n    padding: 1rem 1rem; } }\n\n@media (max-width: 410px) {\n  .flatuploader .file-name-section {\n    display: none; } }\n\n@media (max-width: 576px) {\n  .form-section {\n    min-height: calc(100vh - 49px); } }\n", ""]);



/***/ }),

/***/ "./src/assets/images/spinner.svg":
/*!***************************************!*\
  !*** ./src/assets/images/spinner.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/spinner.30f81804.svg";

/***/ }),

/***/ "./src/components/FlatForm/FlatForm.js":
/*!*********************************************!*\
  !*** ./src/components/FlatForm/FlatForm.js ***!
  \*********************************************/
/*! exports provided: ImageSelect, InlineSelect, FlatInput, FlatTextArea, FlatInlineSelect, FlatImageSelect, FlatNumberSet, FlatUploader, FlatTimePicker, FlatDatePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageSelect", function() { return ImageSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InlineSelect", function() { return InlineSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatInput", function() { return FlatInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatTextArea", function() { return FlatTextArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatInlineSelect", function() { return FlatInlineSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatImageSelect", function() { return FlatImageSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatNumberSet", function() { return FlatNumberSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatUploader", function() { return FlatUploader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatTimePicker", function() { return FlatTimePicker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatDatePicker", function() { return FlatDatePicker; });
/* harmony import */ var _home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _FlatForm_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FlatForm.scss */ "./src/components/FlatForm/FlatForm.scss");
/* harmony import */ var _FlatForm_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_FlatForm_scss__WEBPACK_IMPORTED_MODULE_6__);


var _jsxFileName = "/home/daniel/projects/reqter/reqter-landing/src/components/FlatForm/FlatForm.js";





/*
  Todo:
    1- CustomCheckBox must return data as the last or the first arguments toward onChange function
    2- CheckBoxRow radio mode has an error while a radio element is selected have not deselect by clicking again.
    3- Alphabetic value box for image and inline select components
    4- set proptypes for props of each component
    5- make an appropriate behavior for Flat date and time picker components it must behave as a normal input
    6- Use input with radio and checkbox type to handle inlineCheckbox component behavior
*/
//HOC select wrapper

class SelectRow extends react__WEBPACK_IMPORTED_MODULE_2___default.a.Component {
  constructor(props) {
    super(props);

    this.removeObjByKey = (array, object, indexName) => {
      array.forEach((val, key) => {
        if (val[indexName] === object[indexName]) {
          array.splice(key, 1);
        }
      });
      return array;
    };

    this.selectionHandler = (...restArgs) => {
      let name = restArgs[0];
      let data = restArgs[1];
      const type = this.props.type || "checkbox";
      let arr = [];
      let stateGoingToUpdate = {};

      switch (type) {
        case "checkbox":
          arr = this.state.checkedElements;

          if (data.checked) {
            arr.push(data);
          } else {
            //if value checkbox unchecked then remove unchecked item from list
            arr = this.removeObjByKey(arr, data, "value");
          }

          stateGoingToUpdate = {
            checkedElements: arr
          };
          break;

        case "radio":
          const newChilds = react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.map(this.state.renderedChildren, child => {
            return react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(child, {
              width: "".concat(this.childWidth, "px"),
              onChange: this.selectionHandler,
              checked: child.props.val === data.value
            });
          });
          stateGoingToUpdate = {
            checkedElements: data,
            renderedChildren: newChilds
          };
          break;

        default:
          console.error('CheckBoxRow component expected a "type" property !');
          break;
      }

      this.setState(Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, stateGoingToUpdate), () => {
        this.props.onChange(name, this.state.checkedElements);
      });
    };

    this.childRenderer = newProps => {
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.map(this.props.children, child => react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(child, {
        width: "".concat(this.childWidth, "px"),
        onChange: this.selectionHandler,
        dir: this.props.dir
      }));
    };

    this.state = {
      checkedElements: [],
      renderedChildren: null
    };
    this.thisRef = react__WEBPACK_IMPORTED_MODULE_2___default.a.createRef();
  }

  componentDidMount() {
    //get width from props or style !!!!
    this.width = this.thisRef.current.clientWidth;
    this.childWidth = this.width / this.props.rowitems;
    this.setState({
      renderedChildren: this.childRenderer()
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      ref: this.thisRef,
      style: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.props.style, {
        boxSizing: "content-box",
        direction: this.props.dir
      }),
      className: "CheckBoxRow",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }, this.state.renderedChildren);
  }

} //Image check box comopnent


const ImageSelect = ({
  onChange,
  checked,
  className,
  title,
  style,
  boxValue,
  width,
  key,
  val,
  dir,
  imgSrc,
  imgAlt,
  name
}) => {
  const checkbox = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();

  const toggleCheckbox = () => {
    checked = !checked;
    if (checked) checkbox.current.classList.add("checked");else checkbox.current.classList.remove("checked");
    onChange(name, {
      title: title,
      value: val,
      checked: checked,
      name: name
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "styled-checkbox-wrapper",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "styled-checkbox",
    ref: checkbox,
    onClick: toggleCheckbox,
    style: style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: imgSrc,
    alt: imgAlt,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "checked-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", {
    height: "40",
    width: "40",
    id: "polygon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 153
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("polygon", {
    points: "0,0 40,0 40,40",
    style: {
      fill: "grey",
      stroke: "purple",
      strokeWidth: 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154
    },
    __self: undefined
  }), "Sorry, your browser does not support inline SVG."), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", {
    id: "tickSvg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("g", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("g", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", {
    d: "M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163
    },
    __self: undefined
  }))))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172
    },
    __self: undefined
  }, title))));
}; //Inline checkbox component


const InlineSelect = ({
  onChange,
  checked,
  className,
  title,
  style,
  val,
  boxValue,
  width,
  key,
  dir,
  name
}) => {
  const checkbox = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();

  const toggleCheckbox = () => {
    checked = !checked;
    if (checked) checkbox.current.classList.add("checked");else checkbox.current.classList.remove("checked");
    onChange(name, {
      title: title,
      value: val,
      checked: checked,
      name: name
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "inline-checkbox-wrapper",
    style: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({
      width: width
    }, style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 202
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "inline-checkbox" + (checked ? " checked" : ""),
    ref: checkbox,
    onClick: toggleCheckbox,
    style: {
      direction: dir
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "key",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213
    },
    __self: undefined
  }, boxValue)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215
    },
    __self: undefined
  }, title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "checked-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", {
    id: "tickSvg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 217
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("g", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 218
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("g", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 219
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", {
    d: "M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220
    },
    __self: undefined
  }))))))));
};

const FlatNumberSet = ({
  onClick,
  onChange,
  label,
  range,
  error,
  name,
  defaultValue,
  id
}) => {
  const _wrapperRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();

  const _activated = e => {
    const childs = _wrapperRef.current.children;
    const childCount = childs.length;

    for (let i = 0; i < childCount; i++) {
      childs[i].classList.remove("active");
    }

    e.target.classList.add("active");
    onChange(e);
  };

  let numberRangeButtons = [];

  for (let i = range[0]; i <= range[1]; i++) {
    numberRangeButtons.push(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
      onClick: _activated,
      type: "button",
      name: name,
      key: "flatFormNumberSetButton".concat(i),
      className: "sets" + (parseInt(defaultValue) === i || i === range[1] && defaultValue > range[1] ? " active" : ""),
      value: i === range[1] ? "+".concat(i) : i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 258
      },
      __self: undefined
    }));
  }

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "field-row",
    id: id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 276
    },
    __self: undefined
  }, label), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    ref: _wrapperRef,
    className: "number-range-buttons-container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 277
    },
    __self: undefined
  }, numberRangeButtons), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "error-message",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 280
    },
    __self: undefined
  }, error));
}; //All components show the error property if it has value


const FlatInput = ({
  type,
  placeholder,
  onClick,
  onChange,
  label,
  error,
  defaultValue,
  minLength,
  maxLength,
  pattern,
  min,
  max,
  name,
  id,
  className,
  style,
  autoFocus,
  prefix
}) => {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "field-row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 306
    },
    __self: undefined
  }, label && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "field-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 307
    },
    __self: undefined
  }, label), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "input-wrapper",
    style: {
      direction: "ltr"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 308
    },
    __self: undefined
  }, prefix && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "flatinput-prefix",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 309
    },
    __self: undefined
  }, prefix), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    type: type,
    placeholder: placeholder,
    onClick: onClick,
    onChange: onChange,
    name: name,
    defaultValue: defaultValue,
    min: min,
    max: max,
    pattern: pattern,
    minLength: minLength,
    maxLength: maxLength,
    id: id,
    style: style,
    autoFocus: autoFocus,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, error && "error-input", prefix && "has-prefix"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 310
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "error-message",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 332
    },
    __self: undefined
  }, error));
};

const FlatTextArea = ({
  placeholder,
  onClick,
  onChange,
  label,
  error,
  name,
  props
}) => {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "field-row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 346
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "field-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 347
    },
    __self: undefined
  }, label), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("textarea", Object.assign({
    placeholder: placeholder,
    onClick: onClick,
    onChange: onChange
  }, props, {
    name: name,
    className: error && "error-input",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 348
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "error-message",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 356
    },
    __self: undefined
  }, error));
};
/*************************
    *** Flat Inline Select component ***
    Accepted array of object:
    example = [{
                checked = true || false
                title   = "select 1"
                key     = "A unique react child key :)"
                boxValue= "1"
                dir     = "rtl || ltr"
                value    = "select1"  value of select box
                },...]
***************************/


const FlatInlineSelect = ({
  items,
  onChange,
  dir,
  type,
  name
}) => {
  const _options = items.map((val, index) => {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(InlineSelect, {
      checked: val.defaultChecked,
      title: val.title,
      val: val.value,
      boxValue: index + 1,
      dir: dir,
      key: val.key,
      name: name,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 376
      },
      __self: undefined
    });
  });

  const _select = items.length > 0 ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SelectRow, {
    onChange: onChange,
    dir: dir,
    type: type,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 389
    },
    __self: undefined
  }, _options) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 394
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 395
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", {
    style: {
      color: "grey"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 396
    },
    __self: undefined
  }, ".\u06AF\u0632\u06CC\u0646\u0647 \u0627\u06CC \u0645\u0648\u062C\u0648\u062F \u0646\u06CC\u0633\u062A"));

  return _select;
};
/*************************
    *** Flat Image Select component ***
    Accepted array of object:
    example = [{
                checked = true || false
                title= "select 1"
                key = "A unique react child key :)"
                boxValue= "1"
                dir= "rtl || ltr"
                value = "select1"  value of select box
                imgSrc = "http://example.com/example.jpg" //image source of each select
                imgAlt = "Image Exampe"  //alt attr for img  
                },...]
***************************/


const FlatImageSelect = ({
  items,
  onChange,
  dir,
  type,
  name
}) => {
  const _options = items.map((val, index) => {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ImageSelect, {
      checked: val.defaultChecked,
      title: val.title,
      key: val.key,
      boxValue: index + 1,
      dir: dir,
      imgSrc: val.imgSrc,
      imgAlt: val.imgAlt | "Flat Image Select",
      val: val.value,
      name: name,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 419
      },
      __self: undefined
    });
  });

  const _select = items.length > 0 ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SelectRow, {
    onChange: onChange,
    dir: dir,
    type: type,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 434
    },
    __self: undefined
  }, _options) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 438
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 439
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 440
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", {
    style: {
      color: "grey"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 441
    },
    __self: undefined
  }, ".\u06AF\u0632\u06CC\u0646\u0647 \u0627\u06CC \u0645\u0648\u062C\u0648\u062F \u0646\u06CC\u0633\u062A"));

  return _select;
}; //Uploader Component


const FlatUploader = ({
  style,
  progress,
  progresscolor,
  label,
  placeholder,
  buttonValue,
  onChange,
  id,
  error
}) => {
  let input = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();

  const _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(placeholder),
        _useState2 = Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
        fileName = _useState2[0],
        setFileName = _useState2[1];

  const changeFileName = e => {
    setFileName(e.target.files[0].name);
  };

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "field-row",
    id: id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 465
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 466
    },
    __self: undefined
  }, label), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()("flatuploader", progress === 100 ? "success-upload" : null),
    style: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 467
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "percentage-number",
    style: {
      display: progress ? "block" : "none"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 474
    },
    __self: undefined
  }, progress ? "%".concat(progress) : null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], {
    className: "cloud-icon",
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faCloud"],
    size: "3x",
    color: progresscolor,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 480
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], {
    className: "success-icon",
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faCheck"],
    size: "3x",
    color: "green",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 486
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "file-name-section",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 492
    },
    __self: undefined
  }, fileName), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "file-select-button",
    onClick: () => input.current.click(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 493
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", {
    className: "placeholder",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 497
    },
    __self: undefined
  }, buttonValue || "انتخاب فایل")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    type: "file",
    onChange: e => {
      changeFileName(e);
      if (typeof onChange === "function") return onChange(e);
    },
    ref: input,
    style: {
      display: "none"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 502
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "error-message",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 512
    },
    __self: undefined
  }, error));
}; // Flat Time


const FlatTimePicker = ({
  onChange,
  name
}) => {
  const _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    hour: {
      amount: "",
      valid: false
    },
    minute: {
      amount: "",
      valid: false
    }
  }),
        _useState4 = Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
        time = _useState4[0],
        setTime = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
    let isValid = true;

    for (let detail in time) {
      isValid *= time[detail].valid;
    }

    if (isValid) {
      onChange("".concat(time.hour.amount, "/").concat(time.minute.amount));
    }
  });

  const StateHandler = e => {
    const name = e.target.name,
          value = e.target.value,
          isValid = Boolean(parseInt(e.target.value));
    setTime(Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, time, {
      [name]: {
        amount: value,
        valid: isValid
      }
    }));
  };

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "timeWrapper",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 544
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    type: "number",
    className: "hour",
    placeholder: "\u0633\u0627\u0639\u062A",
    min: "00",
    max: "23",
    name: "hour",
    onChange: StateHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 545
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    min: "00",
    max: "59",
    type: "number",
    name: "minute",
    placeholder: "\u062F\u0642\u06CC\u0642\u0647",
    className: "minute",
    onChange: StateHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 554
    },
    __self: undefined
  }));
};

const FlatDatePicker = ({
  onChange,
  name
}) => {
  // define states
  const _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    year: {
      amount: "",
      valid: false
    },
    month: {
      amount: "",
      valid: false
    },
    day: {
      amount: "",
      valid: false
    }
  }),
        _useState6 = Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
        date = _useState6[0],
        setDate = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
    let isValid = true;

    for (let detail in date) {
      isValid *= date[detail].valid;
    }

    if (isValid) {
      onChange("".concat(date.year.amount, "/").concat(date.month.amount, "/").concat(date.day.amount));
    }
  }); // hanle state changes

  const StateHandler = e => {
    const name = e.target.name,
          value = e.target.value,
          isValid = Boolean(parseInt(e.target.value));
    setDate(Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, date, {
      [name]: {
        amount: value,
        valid: isValid
      }
    }));
  };

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "dateWrapper",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 593
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    type: "number",
    className: "year",
    placeholder: "\u0633\u0627\u0644",
    min: "1398",
    max: "1400",
    name: "year",
    onChange: StateHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 594
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    min: "1",
    max: "12",
    type: "number",
    name: "month",
    placeholder: "\u0645\u0627\u0647",
    className: "month",
    onChange: StateHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 603
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    min: "1",
    max: "31",
    name: "day",
    type: "number",
    placeholder: "\u0631\u0648\u0632",
    className: "day",
    onChange: StateHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 612
    },
    __self: undefined
  }));
}; // Helper Functions
// const removeClass = (e, nameOfClass) => {
//   e.target.classList.remove(nameOfClass);
// };
// const addClass = (e, nameOfClass) => {
//   e.target.classList.add(nameOfClass);
// };




/***/ }),

/***/ "./src/components/FlatForm/FlatForm.scss":
/*!***********************************************!*\
  !*** ./src/components/FlatForm/FlatForm.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./FlatForm.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/FlatForm/FlatForm.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./FlatForm.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/FlatForm/FlatForm.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-3!./FlatForm.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/components/FlatForm/FlatForm.scss");

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

/***/ "./src/components/Validator/Validator.js":
/*!***********************************************!*\
  !*** ./src/components/Validator/Validator.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//TODO:
//    min and max validator bug
const Validator = (value, rules, additional) => {
  let regexPatterns = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phonenumber: /^9\d{9}$/,
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    birthyear_shamsi: /([1][3][0-9][0-9])/
  };
  let validationObj = {
    message: "",
    valid: true
  };
  rules = rules && rules.filter(val => {
    return val !== null && val.length > 0 && val !== undefined;
  });
  let numberOfValidations = rules ? rules.length : 0;

  if (numberOfValidations !== 0) {
    let ruleSplitter = "";
    let property = "";

    for (let rule of rules) {
      ruleSplitter = rule.split(".");
      rule = ruleSplitter[0];
      property = Boolean(ruleSplitter[1]) && ruleSplitter[1];

      switch (rule) {
        case "required":
          if (typeof value === "string") value = value.replace(/\s/g, "");

          if (!value.length) {
            validationObj.message = "فیلد الزامی";
            validationObj.valid = false;
          }

          break;

        case "minCharecters":
          value = value.replace(/\s/g, "");

          if (value.length < parseInt(additional.charsCount)) {
            validationObj.message = "\u062D\u062F\u0627\u0642\u0644 ".concat(additional.charsCount, " \u06A9\u0627\u0631\u0627\u06A9\u062A\u0631");
            validationObj.valid = false;
          }

          break;

        case "maxCharecters":
          value = value.replace(/\s/g, "");

          if (value.length > parseInt(additional.charsCount)) {
            validationObj.message = "\u062D\u062F\u0627\u0642\u0644 ".concat(additional.charsCount, " \u06A9\u0627\u0631\u0627\u06A9\u062A\u0631");
            validationObj.valid = false;
          }

          break;

        case "email":
          if (value.length > 0) {
            const email = regexPatterns.email.test(String(value).toLowerCase());

            if (!email) {
              validationObj.message = "ایمیل نامعتبر است";
              validationObj.valid = false;
            }
          }

          break;

        case "phonenumber":
          if (value.length > 0) {
            const phonenumber = regexPatterns.phonenumber.test(String(value).toLowerCase());

            if (value[0] === "0") {
              validationObj.message = "شماره نباید با صفر شروع شود";
              validationObj.valid = false;
            } else if (!phonenumber) {
              validationObj.message = "شماره وارد شده صحیح نیست";
              validationObj.valid = false;
            }
          }

          break;

        case "url":
          if (value.length > 0) {
            const url = regexPatterns.url.test(String(value).toLowerCase());

            if (!url) {
              validationObj.message = "فرمت آدرس وبسایت وارد شده نامعتبر است";
              validationObj.valid = false;
            }
          }

          break;

        case "number":
          if (value.length > 0) {
            if (isNaN(Number(value))) {
              validationObj.message = "لطفا مقدار عددی صحیح وارد کنید";
              validationObj.valid = false;
            }
          }

          break;

        case "birthyear_shamsi":
          if (value.length > 0) {
            value = String(value);
            const birthyear = regexPatterns.birthyear_shamsi.test(value);

            if (!birthyear || value.length > 4) {
              validationObj.message = "تاریخ تولد صحیح نیست";
              validationObj.valid = false;
            }
          }

          break;

        case "upload":
          if (additional && additional.uploading) {
            validationObj.message = "در حال آپلود فایل لطفا منتظر بمانید";
            validationObj.valid = false;
          }

          break;

        case "date":
          if (value.toString().length > 0) {
            const currentTime = new Date();
            const day = currentTime.getDate();
            const month = currentTime.getMonth() + 1;
            const year = currentTime.getFullYear();
            const hour = currentTime.getHours();
            const minute = currentTime.getMinutes();
            const beginningOfToday = new Date("".concat(month, "-").concat(day, "-").concat(year, " ").concat(hour, ":").concat(minute)).getTime(); //if value is NaN

            if (!Boolean(value)) {
              validationObj.message = "لطفا تاریخ و زمان صحیح وارد کنید";
              validationObj.valid = false;
            } else if (value < beginningOfToday) {
              //if Value is not NaN but is past
              validationObj.message = "تاریخ و زمان نباید از الان به قبل باشد";
              validationObj.valid = false;
            }
          }

          break;

        default:
          throw new Error("Invalid validation rule");
      }

      if (!validationObj.valid) {
        switch (property) {
          case "NOMESSAGE":
            validationObj.message = "";
            return validationObj;

          default:
            return validationObj;
        }
      } //If everythings is valid and the loop is on the last child of array then return validationObj


      if (numberOfValidations === 1 && validationObj.valid) {
        return validationObj;
      }

      --numberOfValidations;
    }
  } else {
    return validationObj;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Validator);

/***/ })

}]);
//# sourceMappingURL=5.chunk.js.map