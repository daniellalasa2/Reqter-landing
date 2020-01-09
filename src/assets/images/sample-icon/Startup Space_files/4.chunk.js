(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./src/components/ApiHandlers/ApiHandler.js":
/*!**************************************************!*\
  !*** ./src/components/ApiHandlers/ApiHandler.js ***!
  \**************************************************/
/*! exports provided: SubmitForm, FilterContents, Upload, SafeValue, LoginRequest, VerifyCode, GetRequestsList, GetOfferList, SelectOfferStage, AddContent, Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmitForm", function() { return SubmitForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterContents", function() { return FilterContents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Upload", function() { return Upload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeValue", function() { return SafeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRequest", function() { return LoginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyCode", function() { return VerifyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetRequestsList", function() { return GetRequestsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetOfferList", function() { return GetOfferList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectOfferStage", function() { return SelectOfferStage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContent", function() { return AddContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
/* harmony import */ var _home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Configuration */ "./src/components/ApiHandlers/Configuration.js");



var Config = _Configuration__WEBPACK_IMPORTED_MODULE_2__["default"];
let _api = {
  header: {
    "Content-Type": "application/json"
  },
  SubmitForm: Config.BASE_URL_REQTER + Config.URLs.submit_form,
  AddContent: Config.BASE_URL_CASEER + Config.URLs.add_content,
  Upload: Config.BASE_URL_UPLOAD + Config.URLs.upload,
  FilterContents: Config.BASE_URL_REQTER + Config.URLs.filter_contents,
  Login: Config.BASE_URL_REQTER + Config.URLs.login,
  VerifyCode: Config.BASE_URL_REQTER + Config.URLs.verify_code,
  GetRequestsList: Config.BASE_URL_REQTER + Config.URLs.all_requests,
  GetOfferList: Config.BASE_URL_REQTER + Config.URLs.all_offers,
  SelectOfferStage: Config.BASE_URL_REQTER + Config.URLs.select_offer_stage
};

var errorHandler = statusCode => {
  const result = {
    message: "",
    code: statusCode,
    success: false
  };

  switch (statusCode) {
    case 200:
      result.message = " با موفقیت انجام شد .";
      result.success = true;
      break;

    case 201:
      result.message = " با موفقیت ساخته شد .";
      result.success = true;
      break;

    case 204:
      result.message = " با موفقیت انجام شد .";
      result.success = true;
      break;

    case 404:
      result.message = "نتیجه ای یافت نشد .";
      break;

    case 500:
      result.message = "امکان برقراری ارتباط با سرور وجود ندارد .";
      break;

    case 400:
      result.message = "اطلاعات نامناسب ارسال شده . لطفا از صحت اطلاعات اطمینان حاصل کنید .";
      break;

    case 401:
      result.message = "مشکل امنیتی رخ داده است . لطفا بعدا امتحان کنید";
      break;

    case 403:
      result.message = "توکن منقضی شده";
      break;

    default:
      result.message = "مشکل ناشناخته ای رخ داده است .";
      break;
  }

  return result;
};

var SubmitForm = (formName, data, callback) => {
  Config.Auth().then(token => {
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.SubmitForm,
      method: "POST",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token
      }),
      data: {
        contentType: Config.CONTENT_TYPE_ID[formName],
        fields: data
      }
    }).then(res => {
      const result = errorHandler(res.status);
      return callback(result);
    }).catch(err => {
      const result = errorHandler(err.response.status);
      return callback({
        success_result: result,
        data: err.response.data
      });
    });
  });
}; //Get list of special contents by sending specific arguments
// Accepted types: 1- partnership_working_fields
//                 2- list_of_countries
//                 3- list_of_cities


var FilterContents = (type, callback) => {
  Config.Auth().then(token => {
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.FilterContents + "/".concat(Config.CONTENT_TYPE_ID[type]),
      method: "GET",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token
      })
    }).then(res => {
      const result = errorHandler(SafeValue(res, "status", "number", null));
      callback({
        success_result: result,
        data: SafeValue(res, "data", "object", [])
      });
    }).catch(err => {
      const result = errorHandler(SafeValue(err.response, "status", "number", 0));
      callback({
        success_result: result,
        data: []
      });
    });
  });
}; //Upload file


var Upload = (file, callback, progress) => {
  Config.Auth().then(token => {
    const form = new FormData();
    form.append("file", file);
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.Upload,
      method: "POST",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token
      }),
      data: form,
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader("content-length") || progressEvent.target.getResponseHeader("x-decompressed-content-length");
        let progressPercentage = 0;

        if (totalLength !== null) {
          progressPercentage = Math.round(progressEvent.loaded * 100 / totalLength);
          return progress({
            totalLength: totalLength,
            uploadedLength: progressEvent.loaded,
            progress: progressPercentage
          });
        }
      }
    }).then(res => {
      const result = errorHandler(SafeValue(res, "status", "number", null));
      return callback({
        success_result: result,
        data: SafeValue(res, "data", "object", {})
      });
    }).catch(err => {
      const result = errorHandler(SafeValue(err.response, "status", "number", 0));
      return callback({
        success_result: result,
        data: []
      });
    });
  });
}; //User Login


var LoginRequest = (phoneNumber, callback) => {
  Config.Auth().then(token => {
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.Login,
      method: "POST",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token,
        clientid: Config.CLIENT_ID
      }),
      data: {
        phoneNumber: phoneNumber
      }
    }).then(res => {
      const result = errorHandler(SafeValue(res, "status", "number", null));
      return callback({
        success_result: result,
        data: SafeValue(res, "data", "object", {})
      });
    }).catch(err => {
      const result = errorHandler(SafeValue(err.response, "status", "number", 0));
      return callback({
        success_result: result,
        data: []
      });
    });
  });
}; //User Verify Code


var VerifyCode = (data, callback) => {
  Config.Auth().then(token => {
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.VerifyCode,
      method: "POST",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token,
        clientid: Config.CLIENT_ID
      }),
      data: data
    }).then(res => {
      const result = errorHandler(SafeValue(res, "status", "number", null));
      return callback({
        success_result: result,
        data: SafeValue(res, "data", "object", [])
      });
    }).catch(err => {
      const result = errorHandler(SafeValue(err.response, "status", "number", 0));
      return callback({
        success_result: result,
        data: []
      });
    });
  });
};

var GetRequestsList = callback => {
  Config.Auth().then(token => {
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.GetRequestsList,
      method: "GET",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token
      })
    }).then(res => {
      const result = errorHandler(SafeValue(res, "status", "number", null));
      return callback({
        success_result: result,
        data: SafeValue(res, "data", "object", [])
      });
    }).catch(err => {
      const result = errorHandler(SafeValue(err.response, "status", "number", 0));
      return callback({
        success_result: result,
        data: []
      });
    });
  });
};

var GetOfferList = (requestId, callback) => {
  Config.Auth().then(token => {
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.GetOfferList,
      method: "GET",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token
      }),
      params: {
        contentType: Config.CONTENT_TYPE_ID.get_offer,
        "fields.requestid": requestId
      }
    }).then(res => {
      const result = errorHandler(SafeValue(res, "status", "number", null));
      return callback({
        success_result: result,
        data: SafeValue(res, "data", "object", [])
      });
    }).catch(err => {
      const result = errorHandler(SafeValue(err.response, "status", "number", 0));
      return callback({
        success_result: result,
        data: []
      });
    });
  });
};

var SelectOfferStage = (stage, callback) => {
  const stageIds = {
    accept: "5d7b969c18a6400017ee1515",
    reject: "5d7b96a018a6400017ee1516"
  };
  Config.Auth().then(token => {
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.SelectOfferStage + Config.CONTENT_TYPE_ID.select_offer_stage,
      method: "PUT",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token
      }),
      body: {
        fields: {
          stage: stageIds[stage]
        }
      }
    }).then(res => {
      const result = errorHandler(SafeValue(res, "status", "number", null));
      return callback({
        success_result: result,
        data: SafeValue(res, "data", "object", [])
      });
    }).catch(err => {
      const result = errorHandler(SafeValue(err.response, "status", "number", 0));
      return callback({
        success_result: result,
        data: []
      });
    });
  });
}; //return safe value
//data: the data which you are going to search field through it
//field: specific index inside data that you need it or pass set of indexes that seprates via dot exp: "index1.index2.index3" = ["index1"]["index2"]["index3"]
//


var SafeValue = (data, index, type, defaultValue) => {
  try {
    if (!Boolean(data)) {
      return defaultValue;
    }

    index = index.toString().replace(" ", "");
    index = parseInt(index) == index ? parseInt(index) : index; //if index was empty string then just check validation of data

    if (index === "") {
      if (data !== null && data !== undefined && typeof data === type) {
        return data;
      } else {
        return defaultValue;
      }
    }

    let indexArr = typeof index === "string" ? index.split(".") : index;
    const cnt = indexArr.length;
    let val = "";

    for (let i = 0; i <= cnt - 1; i++) {
      val = indexArr[i];

      if (!Boolean(data)) {
        return defaultValue;
      }

      data = data[val];

      if (i === cnt - 1) {
        if (data !== null && data !== undefined && typeof data === type) {
          return data;
        } else {
          // console.warn(`index ${val} is not valid.`, `${val} : ${data}`);
          return defaultValue;
        }
      }
    }
  } catch (err) {
    console.warn("Value is not safe: ", err);
    return defaultValue;
  }
};

var AddContent = (formName, data, callback) => {
  Config.Auth().then(token => {
    axios__WEBPACK_IMPORTED_MODULE_1___default()({
      url: _api.AddContent,
      method: "POST",
      headers: Object(_home_daniel_projects_reqter_reqter_landing_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _api.header, {
        authorization: token,
        spaceId: Config.SPACE_ID
      }),
      data: {
        contentType: Config.CONTENT_TYPE_ID[formName],
        fields: data
      }
    }).then(res => {
      const result = errorHandler(res.status);
      return callback(result);
    }).catch(err => {
      const result = errorHandler(err.response.status);
      return callback({
        success_result: result,
        data: err.response.data
      });
    });
  });
};



/***/ }),

/***/ "./src/components/ApiHandlers/Configuration.js":
/*!*****************************************************!*\
  !*** ./src/components/ApiHandlers/Configuration.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CookieHandler/CookieHandler */ "./src/components/CookieHandler/CookieHandler.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


var Configuration = {
  BASE_URL_CASEER: "https://requester.reqter.com/",
  BASE_URL_REQTER: "https://requester.reqter.com/",
  BASE_URL_UPLOAD: "https://assets.reqter.com/",
  CLIENT_ID: "1d42c55e-0f44-4613-adba-a5bbbca878e1",
  SPACE_ID: "5cf3883dcce4de00174d48cf",
  Auth: CheckAuthToken,
  URLs: {
    submit_form: "api/v1/requests/submit",
    filter_contents: "api/v1/lists",
    upload: "asset/upload",
    login: "api/v1/customers/requestcode",
    verify_code: "api/v1/customers/verifycode",
    all_requests: "api/v1/requests/all",
    all_offers: "api/v1/requests/offers/all",
    get_initial_token: "api/v1/auth/token",
    select_offer_stage: "api/v1/quotes/accept/",
    add_content: "contents/add"
  },
  CONTENT_TYPE_ID: {
    partnership: "5d358ebc8e6e9a0017c28fc9",
    coworking: "5cfc95472606810017dca194",
    dedicated_office: "5cf7e7449916860017805408",
    session_room: "5cf7e7289916860017805407",
    private_desk: "5d36a9d78e6e9a0017c28fd9",
    shared_desk: "5d5027842039ce674338a500",
    partnership_working_fields: "5d4169c642afbf00179b0569",
    coworking_working_field: "5d3af3a1a9602900177a5056",
    list_of_countries: "5d35e6e68e6e9a0017c28fcd",
    list_of_cities: "5d35e6fa8e6e9a0017c28fce",
    sessionroom_equipments: "5d5bcb6eed9a82001737c751",
    contact_us: "5d3e97363a65540017a90f11",
    request_stages: "5d6b5d205b60dc0017c95118",
    get_offer: "5d35adc68e6e9a0017c28fcb",
    select_offer_stage: "5d791a0a1a2cda0017099c63"
  }
};

function CheckAuthToken() {
  return new Promise((resolve, reject) => {
    if (Object(_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__["GetCookie"])("SSUSERAUTH")) {
      resolve(Object(_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__["JsonParser"])(Object(_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__["GetCookie"])("SSUSERAUTH")).TOKEN);
    } else if (Object(_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__["GetCookie"])("SSGUESTAUTH")) {
      resolve(Object(_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__["JsonParser"])(Object(_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__["GetCookie"])("SSGUESTAUTH")).TOKEN);
    } else {
      GetInitialToken(token => {
        if (token) {
          resolve(token);
        } else {
          reject("Error Occured!");
        }
      });
    }
  });
}

function GetInitialToken(callback) {
  return axios__WEBPACK_IMPORTED_MODULE_1___default()({
    url: Configuration.BASE_URL_REQTER + Configuration.URLs.get_initial_token,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      clientid: Configuration.CLIENT_ID
    }
  }).then(res => {
    if (res.data.success) {
      Object(_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__["SetCookie"])("SSGUESTAUTH", Object(_CookieHandler_CookieHandler__WEBPACK_IMPORTED_MODULE_0__["JsonToString"])({
        ROLE: "guest",
        TOKEN: res.data.access_token,
        ID: ""
      }), res.data.expiresIn / (1000 * 60 * 60 * 24));
      callback(res.data.access_token);
    }
  }).catch(err => {
    callback("");
    console.error("get initial token error: ", err);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Configuration);

/***/ })

}]);
//# sourceMappingURL=4.chunk.js.map