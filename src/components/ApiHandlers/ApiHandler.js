import axios from "axios";
import config from "./config";
let _api = {
  header: {
    "Content-Type": "application/json",
    spaceid: config.SPACEID,
    authorization: config.AUTH
  },
  submitForm: config.BASE_URL_CONTENT + config.submitForm
};

function errorHandler(statusCode) {
  const result = { message: "", code: statusCode };
  switch (statusCode) {
    case 200:
      result.message = "فرم با موفقیت ارسال شد .";
      break;
    case 201:
      result.message = "فرم با موفقیت ساخته شد .";
      break;
    case 404:
      result.message = "نتیجه ای یافت نشد .";
      break;
    case 500:
      result.message = "امکان برقراری ارتباط با سرور وجود ندارد .";
      break;
    case 400:
      result.message =
        "اطلاعات نامناسب ارسال شده . لطفا از صحبت اطلاعات اطمینان حاصل کنید .";
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
      return result;
    })
    .catch(err => {
      return errorHandler(0);
    });
}

export { SubmitForm };
