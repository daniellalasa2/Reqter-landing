//TODO:
//    min and max validator bug

const Validator = (value, rules, additional) => {
  let regexPatterns = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phonenumber: /^9\d{9}$/,
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  };
  let validationObj = { message: "", valid: true };
  let numberOfValidations = rules ? rules.length : 0;
  if (numberOfValidations !== 0) {
    for (let rule of rules) {
      switch (rule) {
        case "required":
          if (typeof value === "string") value = value.replace(/\s/g, "");
          if (!value.length) {
            validationObj.message = "فیلد الزامی";
            validationObj.valid = false;
            return validationObj;
          }
          break;
        case "minCharecters":
          value = value.replace(/\s/g, "");
          if (value.length < parseInt(additional.charsCount)) {
            validationObj.message = `حداقل ${additional.charsCount} کاراکتر`;
            validationObj.valid = false;
            return validationObj;
          }
          break;
        case "maxCharecters":
          value = value.replace(/\s/g, "");
          if (value.length > parseInt(additional.charsCount)) {
            validationObj.message = `حداقل ${additional.charsCount} کاراکتر`;
            validationObj.valid = false;
            return validationObj;
          }
          break;
        case "email":
          if (value.length > 0) {
            const email = regexPatterns.email.test(String(value).toLowerCase());
            if (!email) {
              validationObj.message = "ایمیل نامعتبر است";
              validationObj.valid = false;
              return validationObj;
            }
          }
          break;
        case "phonenumber":
          if (value.length > 0) {
            if (value[0] === "0") {
              validationObj.message = "شماره نباید با صفر شروع شود";
              validationObj.valid = false;
              return validationObj;
            }
            const phonenumber = regexPatterns.phonenumber.test(
              String(value).toLowerCase()
            );
            if (!phonenumber) {
              validationObj.message = "شماره وارد شده صحیح نیست";
              validationObj.valid = false;
              return validationObj;
            }
          }
          break;
        case "url":
          if (value.length > 0) {
            const url = regexPatterns.url.test(String(value).toLowerCase());
            if (!url) {
              validationObj.message = "فرمت آدرس وبسایت وارد شده نامعتبر است";
              validationObj.valid = false;
              return validationObj;
            }
          }
          break;
        case "number":
          if (value.length > 0) {
            if (isNaN(Number(value))) {
              validationObj.message = "لطفا مقدار عددی صحیح وارد کنید";
              validationObj.valid = false;
              return validationObj;
            }
          }
          break;
        case "upload":
          if (additional && additional.uploading) {
            validationObj.message = "در حال آپلود فایل لطفا منتظر بمانید";
            validationObj.valid = false;
            return validationObj;
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
            const beginningOfToday = new Date(
              `${month}-${day}-${year} ${hour}:${minute}`
            ).getTime();
            //if value is NaN
            if (!Boolean(value)) {
              validationObj.message = "لطفا تاریخ و زمان صحیح وارد کنید";
              validationObj.valid = false;
              return validationObj;
            }
            //if Value is not NaN but is past
            if (value < beginningOfToday) {
              validationObj.message = "تاریخ و زمان نباید از الان به قبل باشد";
              validationObj.valid = false;
              return validationObj;
            }
          }
          break;
        default:
          throw new Error("ّInvalid validation rule");
      }
      //If everythings is valid and the loop is on the last child of array then return validationObj
      if (numberOfValidations === 1 && validationObj.valid) {
        return validationObj;
      }
      --numberOfValidations;
    }
  } else {
    return validationObj;
  }
};

export default Validator;
