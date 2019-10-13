//TODO:
//    min and max validator bug

const Validator = (value, rules, additional) => {
  let regexPatterns = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phonenumber: /^9\d{9}$/,
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    birthyear_shamsi: /([1][3][0-9][0-9])/,
    birthyear_gregorian: /((19|20)\\d\\d)/
  };
  let validationObj = { message: "", valid: true };
  rules =
    rules &&
    rules.filter(val => {
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
            validationObj.message = `حداقل ${additional.charsCount} کاراکتر`;
            validationObj.valid = false;
          }
          break;
        case "maxCharecters":
          value = value.replace(/\s/g, "");
          if (value.length > parseInt(additional.charsCount)) {
            validationObj.message = `حداقل ${additional.charsCount} کاراکتر`;
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
            const phonenumber = regexPatterns.phonenumber.test(
              String(value).toLowerCase()
            );
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
            const beginningOfToday = new Date(
              `${month}-${day}-${year} ${hour}:${minute}`
            ).getTime();
            //if value is NaN
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
