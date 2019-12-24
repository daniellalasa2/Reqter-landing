import axios from "axios";
import Configuration, { GetInitialToken } from "./Configuration";
import { SetCookie, JsonToString } from "../CookieHandler/CookieHandler";
var Config = Configuration;
let _api = {
  header: {
    "Content-Type": "application/json"
  },
  GetContentTypeById:Config.BASE_URL_CASEER + Config.URLs.get_contenttype_by_id,
  SubmitForm: Config.BASE_URL_REQTER + Config.URLs.submit_form,
  AddContent: Config.BASE_URL_CASEER + Config.URLs.add_content,
  Upload: Config.BASE_URL_UPLOAD + Config.URLs.upload,
  Download: Config.BASE_URL_UPLOAD + Config.URLs.download,
  FilterContents: Config.BASE_URL_REQTER + Config.URLs.filter_contents,
  FilterContentsFullQuery:
    Config.BASE_URL_REQTER + Config.URLs.filter_contents_get_fullquery,
  Login: Config.BASE_URL_REQTER + Config.URLs.login,
  VerifyCode: Config.BASE_URL_REQTER + Config.URLs.verify_code,
  PartnerLogin: Config.BASE_URL_REQTER + Config.URLs.partner_login,
  PartnerVerifyCode: Config.BASE_URL_REQTER + Config.URLs.partner_verify_code,
  GetRequestsList: Config.BASE_URL_REQTER + Config.URLs.all_requests,
  GetOfferList: Config.BASE_URL_REQTER + Config.URLs.all_offers,
  AcceptOffer: Config.BASE_URL_REQTER + Config.URLs.accept_offer,
  RejectOffer: Config.BASE_URL_REQTER + Config.URLs.reject_offer,
  GetPartnerInfo: Config.BASE_URL_REQTER + Config.URLs.get_partner_info,
  GetPartnerAllRequests:
    Config.BASE_URL_REQTER + Config.URLs.get_partnerpanel_all_requests,
  GetPartnerOpenRequests:
    Config.BASE_URL_REQTER + Config.URLs.get_partnerpanel_open_requests,
  PartnerpanelRejectRequest:
    Config.BASE_URL_REQTER + Config.URLs.partnerpanel_reject_request,
  PartnerpanelOpenRequest:
    Config.BASE_URL_REQTER + Config.URLs.partnerpanel_open_request,
  QueryContent: Config.BASE_URL_REQTER + Config.URLs.query_content,
  PartnerpanelIssueOffer: Config.BASE_URL_REQTER + Config.URLs.issue_offer,
  PartnerpanelAddProduct:
    Config.BASE_URL_REQTER + Config.URLs.partner_panel_add_product,
  PartnerpanelDeleteProduct:
    Config.BASE_URL_REQTER + Config.URLs.partner_panel_delete_product,
  PartnerpanelEditProduct:
    Config.BASE_URL_REQTER + Config.URLs.partner_panel_edit_product,
  GetPartnerAllOffers:
    Config.BASE_URL_REQTER + Config.URLs.get_partner_all_offers,
  GetPartnerAcceptedOffers:
    Config.BASE_URL_REQTER + Config.URLs.get_partner_accepted_offers,
  GetPartnerLostOffers:
    Config.BASE_URL_REQTER + Config.URLs.get_partner_lost_offers,
  CancelIssuedOffer: Config.BASE_URL_REQTER + Config.URLs.cancel_issued_offer,
  PartnerPanelUpdateSetting:
    Config.BASE_URL_REQTER + Config.URLs.partner_panel_update_setting
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
      SetCookie("SSGUESTAUTH", "", -1);
      SetCookie("SSUSERAUTH", "", -1);
      window.location.href = "/";
      result.message = "توکن منقضی شده";
      break;
    default:
      result.message = "مشکل ناشناخته ای رخ داده است .";
      break;
  }
  return result;
};
var GetContentTypeById = (type,callback)=>{
 Config.Auth().then(token => {
    axios({
      url: _api.GetContentTypeById,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      },
      params: {
        id: type
      }
    })
      .then(res => {
        const result = errorHandler(res.status);
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
}
var DownloadAsset = fileUrl => {
  if (fileUrl && fileUrl.length > 0) {
    if (fileUrl.startsWith("http")) {
      fileUrl = _api.Download + fileUrl.slice(fileUrl.lastIndexOf("/") + 1);
    } else {
      fileUrl = _api.Download + fileUrl;
    }
  }
  return fileUrl;
};
var UploadAsset = fileUrl => {
  return _api.Upload + fileUrl;
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
        if (typeof callback === "function") {
          return callback(result);
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};

//Get list of special contents by sending specific arguments
// Accepted types: 1- partnership_working_fields
//                 2- list_of_countries
//                 3- list_of_cities
var FilterContents = (type, callback) => {
  let _url = "";
  //If regex match then type is a mongoId
  if(new RegExp(/^[a-f\d]{24}$/).test(type)){
    _url = _api.FilterContents + `/${type}`
  }else{
    _url = _api.FilterContents + `/${Config.CONTENT_TYPE_ID[type]}`
  }
  Config.Auth().then(token => {
    axios({
      url: _url,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", {})
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", {})
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
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
        let result;
        if (
          !res.data ||
          res.data.length === 0 ||
          res.data[0].status !== "published"
        ) {
          result = errorHandler(404);
        } else {
          result = errorHandler(SafeValue(res, "status", "number", null));
        }
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        console.error(err);
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          return callback(result);
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
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
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var QueryContent = (contentTypesArr, callback) => {
  let contentTypesString = "";
  if (Array.isArray(contentTypesArr)) {
    contentTypesString = contentTypesArr.reduce(
      (acc, curr) => acc + "," + curr
    );
  }
  Config.Auth().then(token => {
    axios({
      url: _api.QueryContent,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      },
      params: { contentTypes: contentTypesString }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
//Partner profile APIs
var PartnerLoginRequest = (phoneNumber, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerLogin,
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", {})
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};

var PartnerVerifyCode = (data, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerVerifyCode,
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
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          return callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var GetPartnerAllRequests = (partnerId, stage, callback) => {
  const params = {
    "fields.partnerid": partnerId,
    "fields.stage": stage
  };
  Config.Auth().then(token => {
    axios({
      url: _api.GetPartnerAllRequests,
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
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var GetPartnerOpenRequests = (partnerId, callback) => {
  const params = {
    "fields.partnerid": partnerId,
    "fields.stage": "opened"
  };
  Config.Auth().then(token => {
    axios({
      url: _api.GetPartnerOpenRequests,
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
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};

var GetPartnerLostOffers = (partnerId, callback) => {
  const params = {
    "fields.partnerid": partnerId,
    "fields.stage": "5d7b96a018a6400017ee1516"
  };
  Config.Auth().then(token => {
    axios({
      url: _api.GetPartnerLostOffers,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      },
      params: {
        contentType: Config.CONTENT_TYPE_ID.get_partner_all_offers,
        ...params
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var GetPartnerAcceptedOffers = (partnerId, callback) => {
  const params = {
    "fields.partnerid": partnerId,
    "fields.stage": "5d7b969c18a6400017ee1515"
  };
  Config.Auth().then(token => {
    axios({
      url: _api.GetPartnerAcceptedOffers,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      },
      params: {
        contentType: Config.CONTENT_TYPE_ID.get_partner_all_offers,
        ...params
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var GetPartnerAllOffers = (partnerId, callback) => {
  const params = {
    "fields.partnerid": partnerId,
    "fields.stage": "5d7b968918a6400017ee1513"
  };
  Config.Auth().then(token => {
    axios({
      url: _api.GetPartnerAllOffers,
      method: "GET",
      headers: {
        ..._api.header,
        authorization: token
      },
      params: {
        contentType: Config.CONTENT_TYPE_ID.get_partner_all_offers,
        ...params
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var PartnerpanelRejectRequest = (id, data, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerpanelRejectRequest + id,
      method: "PUT",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        fields: {
          ...data,
          stage: "closed"
        }
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var PartnerpanelOpenRequest = (id, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerpanelOpenRequest + id,
      method: "PUT",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        fields: {
          stage: "opened"
        }
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var CancelIssuedOffer = (offerId, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.CancelIssuedOffer + offerId,
      method: "PUT",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        fields: { stage: "5d7b96b218a6400017ee1518" }
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var PartnerpanelIssueOffer = (data, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerpanelIssueOffer,
      method: "POST",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        contentType: Config.CONTENT_TYPE_ID.issue_offer,
        fields: data
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var PartnerpanelAddProduct = (data, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerpanelAddProduct,
      method: "POST",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        contentType: Config.CONTENT_TYPE_ID.get_partner_products,
        fields: data
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var PartnerpanelDeleteProduct = (productid, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerpanelDeleteProduct,
      method: "DELETE",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        contentType: Config.CONTENT_TYPE_ID.get_partner_products,
        id: productid
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
var PartnerpanelEditProduct = (productid, data, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerpanelEditProduct,
      method: "PUT",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        contentType: Config.CONTENT_TYPE_ID.get_partner_products,
        id: productid,
        fields: data
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};

var PartnerpanelUpdateSetting = (partnerid, data, callback) => {
  Config.Auth().then(token => {
    axios({
      url: _api.PartnerPanelUpdateSetting,
      method: "PUT",
      headers: {
        ..._api.header,
        authorization: token
      },
      data: {
        id: partnerid,
        fields: data
      }
    })
      .then(res => {
        const result = errorHandler(SafeValue(res, "status", "number", null));
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: SafeValue(res, "data", "object", [])
          });
        }
      })
      .catch(err => {
        const result = errorHandler(
          SafeValue(err.response, "status", "number", 0)
        );
        if (typeof callback === "function") {
          callback({
            success_result: result,
            data: []
          });
        }
      });
  });
};
//return safe value
//data: the data which you are going to search field through it
//field: specific index inside data that you need it or pass set of indexes that seprates via dot exp: "index1.index2.index3" = ["index1"]["index2"]["index3"]
//TODO: SafeValue needs data conversion if type checking is passed
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
      if (
        data !== null &&
        data !== undefined &&
        (type === "all" || typeof data === type)
      ) {
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
            case "all":
            case typeof data:
              return data;
            case "json":
              type = typeof JSON.parse(data);
              if (type === "object") return data;
              else return correctReturn();
            case "jsonArray":
              const parsedData = JSON.parse(data);
              type = typeof parsedData;
              if (type === "object" && parsedData.length) return data;
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
  GetContentTypeById,
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
  PartnerVerifyCode,
  PartnerLoginRequest,
  GetPartnerInfo,
  GetPartnerProducts,
  PartnerpanelRejectRequest,
  PartnerpanelOpenRequest,
  GetPartnerAllRequests,
  GetPartnerOpenRequests,
  PartnerpanelIssueOffer,
  PartnerpanelAddProduct,
  PartnerpanelDeleteProduct,
  PartnerpanelEditProduct,
  QueryContent,
  GetPartnerAllOffers,
  GetPartnerAcceptedOffers,
  GetPartnerLostOffers,
  CancelIssuedOffer,
  Config,
  DownloadAsset,
  UploadAsset,
  PartnerpanelUpdateSetting,
  _api as APIAddresses
};
