import axios from "axios";
import Configuration from "./Configuration";
var Config = Configuration;
let _api = {
  header: {
    "Content-Type": "application/json"
  },
  SubmitForm: Config.BASE_URL_CONTENT + Config.URLs.submit_form,
  Upload: Config.BASE_URL_UPLOAD + Config.URLs.upload,
  FilterContents: Config.BASE_URL_CONTENT + Config.URLs.filter_contents,
  Login: Config.BASE_URL_PANEL + Config.URLs.login,
  VerifyCode: Config.BASE_URL_PANEL + Config.URLs.verify_code,
  GetRequestsList: Config.BASE_URL_PANEL + Config.URLs.all_requests,
  GetOfferList: Config.BASE_URL_PANEL + Config.URLs.all_offers
};
var errorHandler = statusCode => {
  const result = { message: "", code: statusCode, success: false };
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
      result.message =
        "اطلاعات نامناسب ارسال شده . لطفا از صحت اطلاعات اطمینان حاصل کنید .";
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
    axios({
      url: _api.SubmitForm,
      method: "POST",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        contentType: Config.CONTENT_TYPE_ID[formName],
        fields: data
      }
    })
      .then(res => {
        const result = errorHandler(res.status);
        return callback(result);
      })
      .catch(err => {
        const result = errorHandler(err.response.status);
        return callback({ success_result: result, data: err.response.data });
      });
  });
};

//Get list of special contents by sending specific arguments
// Accepted types: 1- partnership_working_fields
//                 2- list_of_countries
//                 3- list_of_cities
var FilterContents = (type, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.FilterContents + `/${Config.CONTENT_TYPE_ID[type]}`,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        callback({
          success_result: result,
          data: SafeValue(res, "data", "object", [])
        });
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        callback({
          success_result: result,
          data: []
        });
      });
  });
};

//Upload file
var Upload = (file, callback, progress) => {
  Config.Auth().then(token => {
    const form = new FormData();
    form.append("file", file);
    axios({
      url: _api.Upload,
      method: "POST",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: form,
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        let progressPercentage = 0;
        if (totalLength !== null) {
          progressPercentage = Math.round(
            (progressEvent.loaded * 100) / totalLength
          );
          return progress({
            totalLength: totalLength,
            uploadedLength: progressEvent.loaded,
            progress: progressPercentage
          });
        }
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        return callback({
          success_result: result,
          data: SafeValue(res, "data", "object", {})
        });
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        return callback({
          success_result: result,
          data: []
        });
      });
  });
};

//User Login
var LoginRequest = (phoneNumber, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.Login,
      method: "POST",
      headers: {
        ..._api.header,
        authorization: token,
        clientid: Config.CLIENT_ID
      },
      data: {
        phoneNumber: phoneNumber
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        return callback({
          success_result: result,
          data: SafeValue(res, "data", "object", {})
        });
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        return callback({
          success_result: result,
          data: []
        });
      });
  });
};

//User Verify Code
var VerifyCode = (data, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.VerifyCode,
      method: "POST",
      headers: {
        ..._api.header,
        authorization: token,
        clientid: Config.CLIENT_ID
      },
      data: data
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        return callback({
          success_result: result,
          data: SafeValue(res, "data", "object", [])
        });
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        return callback({
          success_result: result,
          data: []
        });
      });
  });
};
var GetRequestsList = callback => {
  Config.Auth().then(token => {
    axios({
      url: _api.GetRequestsList,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        return callback({
          success_result: result,
          data: SafeValue(res, "data", "object", [])
        });
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        return callback({
          success_result: result,
          data: []
        });
      });
  });
};

var GetOfferList = (requestId, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.GetOfferList,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      },
      params: {
        contentType: Config.CONTENT_TYPE_ID.get_offer,
        requestId: requestId
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        return callback({
          success_result: result,
          data: SafeValue(res, "data", "object", [])
        });
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        return callback({
          success_result: result,
          data: []
        });
      });
  });
};

//return safe value
//data: the data which you are going to search field through it
//field: specific index inside data that you need it or pass set of indexes that seprates via dot exp: "index1.index2.index3" = ["index1"]["index2"]["index3"]
//
var SafeValue = (data, index, type, defaultValue) => {
  try {
    if (!Boolean(data)) {
      return defaultValue;
    }
    index = index.toString().replace(" ", "");
    index = parseInt(index) == index ? parseInt(index) : index;
    //if index was empty string then just check validation of data
    if (index === "") {
      if (
        data !== null &&
        data !== undefined &&
        !isNaN(data) &&
        typeof data === type
      ) {
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
export {
  SubmitForm,
  FilterContents,
  Upload,
  SafeValue,
  LoginRequest,
  VerifyCode,
  GetRequestsList,
  GetOfferList,
  Config
};
