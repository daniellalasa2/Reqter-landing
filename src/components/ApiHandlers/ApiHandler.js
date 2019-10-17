import axios from "axios";
import Configuration from "./Configuration";
var Config = Configuration;
let _api = {
  header: {
    "Content-Type": "application/json"
  },
  SubmitForm: Config.BASE_URL_REQTER + Config.URLs.submit_form,
  AddContent: Config.BASE_URL_CASEER + Config.URLs.add_content,
  Upload: Config.BASE_URL_UPLOAD + Config.URLs.upload,
  FilterContents: Config.BASE_URL_REQTER + Config.URLs.filter_contents,
  FilterContentsFullQuery:
    Config.BASE_URL_REQTER + Config.URLs.filter_contents_get_fullquery,
  Login: Config.BASE_URL_REQTER + Config.URLs.login,
  VerifyCode: Config.BASE_URL_REQTER + Config.URLs.verify_code,
  GetRequestsList: Config.BASE_URL_REQTER + Config.URLs.all_requests,
  GetOfferList: Config.BASE_URL_REQTER + Config.URLs.all_offers,
  AcceptOffer: Config.BASE_URL_REQTER + Config.URLs.accept_offer,
  RejectOffer: Config.BASE_URL_REQTER + Config.URLs.reject_offer,
  GetPartnerInfo: Config.BASE_URL_REQTER + Config.URLs.get_partner_info,
  GetPartnerpanelRequests:
    Config.BASE_URL_REQTER + Config.URLs.get_partnerpanel_requests
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
        "fields.requestid": requestId
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

var RejectOffer = (offerId, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.RejectOffer + offerId,
      method: "PUT",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        fields: { stage: "5d7b96a018a6400017ee1516" }
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
var AcceptOffer = (offerId, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.AcceptOffer + offerId,
      method: "PUT",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        fields: { stage: "5d7b969c18a6400017ee1515" }
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
var GetPartnerInfo = (params, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.GetPartnerInfo,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token,
        spaceId: Config.SPACE_ID
      },
      params: {
        contentType: Config.CONTENT_TYPE_ID.get_partner_info,
        ...params
      }
    })
      .then(res => {
        const result = errorHandler(res.status);
        if (
          res.data.length === 0 ||
          res.data[0].length === 0 ||
          res.data[0].status !== "published"
        ) {
          result.success = false;
        }
        return callback({
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
var AddContent = (formName, data, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.AddContent,
      method: "POST",
      headers: {
        ..._api.header,
        authorization: token,
        spaceId: Config.SPACE_ID
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
var GetPartnerProducts = (params, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.FilterContentsFullQuery,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      },
      params: {
        contentType: Config.CONTENT_TYPE_ID.get_partner_products,
        ...params
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
//Partner profile APIs
var GetPartnerpanelRequests = (partnerId, stage, callback) => {
  const params = {
    "fields.partnerid": partnerId,
    "fields.stage": stage
  };
  Config.Auth().then(token => {
    axios({
      url: _api.GetPartnerpanelRequests,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      },
      params: {
        contentType: Config.CONTENT_TYPE_ID.get_partnerpanel_requests,
        ...params
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
//return safe value
//data: the data which you are going to search field through it
//field: specific index inside data that you need it or pass set of indexes that seprates via dot exp: "index1.index2.index3" = ["index1"]["index2"]["index3"]
//
var SafeValue = (data, index, type, defaultValue, alternativeIndex) => {
  let correctReturn;
  try {
    const parimaryData = data;
    correctReturn = () => {
      if (alternativeIndex && alternativeIndex.length) {
        return SafeValue(
          parimaryData,
          alternativeIndex,
          type,
          defaultValue,
          false
        );
      } else {
        return defaultValue;
      }
    };
    if (!Boolean(data) || data === null) {
      return defaultValue;
    }
    index = index.toString().replace(" ", "");
    index = parseInt(index) === index ? parseInt(index) : index;
    //if index was empty string then just check validation of data
    if (index === "") {
      if (data !== null && data !== undefined && typeof data === type) {
        return data;
      } else {
        return correctReturn();
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
        if (data !== null && data !== undefined) {
          //special type checkings mention here
          switch (type) {
            case typeof data:
              return data;
            case "json":
              type = typeof JSON.parse(data);
              if (type === "object") return data;
              else return correctReturn();
            default:
              return correctReturn();
          }
        } else {
          // console.warn(`index ${val} is not valid.`, `${val} : ${data}`);
          return correctReturn();
        }
      }
    }
  } catch (err) {
    return correctReturn();
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
  AcceptOffer,
  RejectOffer,
  AddContent,
  GetPartnerInfo,
  GetPartnerProducts,
  GetPartnerpanelRequests,
  Config
};
