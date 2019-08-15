import axios from "axios";
import config from "./config";
let _api = {
  header: {
    "Content-Type": "application/json",
    spaceid: config.SPACEID,
    authorization: config.AUTH
  },
  submitForm: config.BASE_URL_CONTENT + config.URLS.submit_form,
  Upload: config.BASE_URL_UPLOAD + config.URLS.upload,
  FilterContents: config.BASE_URL_CONTENT + config.URLS.filter_contents
};

function errorHandler(statusCode) {
  const result = { message: "", code: statusCode };
  switch (statusCode) {
    case 200:
      result.message = " با موفقیت انجام شد .";
      break;
    case 201:
      result.message = " با موفقیت ساخته شد .";
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
    default:
      result.message = "مشکل ناشناخته ای رخ داده است .";
      break;
  }
  return result;
}

function SubmitForm(formName, data, callback) {
  axios({
    url: _api.submitForm,
    method: "POST",
    headers: _api.header,
    data: {
      contentType: config.CONTENT_TYPE_ID[formName],
      fields: data
    }
  })
    .then(res => {
      const result = errorHandler(res.status);
      callback(result);
      return 0;
    })
    .catch(err => {
      return errorHandler(0);
    });
}

//Get list of special contents by sending specific arguments
// Accepted types: 1- partnership_working_fields
//                 2- list_of_countries
//                 3- list_of_cities
function FilterContents(type, callback) {
  axios({
    url: _api.FilterContents,
    method: "GET",
    headers: _api.header,
    params: {
      contentType: config.CONTENT_TYPE_ID[type]
    }
  })
    .then(res => {
      const result = errorHandler(res.status);
      return callback({ success_result: result, data: res.data });
    })
    .catch(err => {
      return errorHandler(0);
    });
}

//Upload file
function Upload(file, callback, progress) {
  const form = new FormData();
  form.append("file", file);
  axios({
    url: _api.Upload,
    method: "POST",
    headers: _api.header,
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
      const result = errorHandler(res.status);
      callback({ success_result: result, data: res.data });
      return 0;
    })
    .catch(err => {
      return errorHandler(0);
    });
}
export { SubmitForm, FilterContents, Upload };
