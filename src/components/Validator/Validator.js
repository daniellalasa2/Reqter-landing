//TODO:
//    min and max validator bug

const Validator = (value, rules, locale = "fa", additional) => {
  const translate = require(`./_locales/${locale}.json`);
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
            validationObj.message = translate.locale.required_field;
            validationObj.valid = false;
          }
          break;
        // case "minCharecters":
        //   value = value.replace(/\s/g, "");
        //   if (value.length < parseInt(additional.charsCount)) {
        //     validationObj.message = `حداقل ${additional.charsCount} کاراکتر`;
        //     validationObj.valid = false;
        //   }
        //   break;
        // case "maxCharecters":
        //   value = value.replace(/\s/g, "");
        //   if (value.length > parseInt(additional.charsCount)) {
        //     validationObj.message = `حداقل ${additional.charsCount} کاراکتر`;
        //     validationObj.valid = false;
        //   }
        //   break;
        case "email":
          if (value.length > 0) {
            const email = regexPatterns.email.test(String(value).toLowerCase());
            if (!email) {
              validationObj.message = translate.locale.email.invalid;
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
              validationObj.message = translate.locale.phonenumber.without_zero;
              validationObj.valid = false;
            } else if (!phonenumber) {
              validationObj.message =
                translate.locale.phonenumber.incorrect_phonenumber;
              validationObj.valid = false;
            }
          }
          break;
        case "url":
          if (value.length > 0) {
            const url = regexPatterns.url.test(String(value).toLowerCase());
            if (!url) {
              validationObj.message = translate.locale.website.invalid_format;
              validationObj.valid = false;
            }
          }
          break;
        case "number":
          if (value.length > 0) {
            if (isNaN(Number(value))) {
              validationObj.message = translate.locale.number.invalid_number;
              validationObj.valid = false;
            }
          }
          break;
        case "birthyear_shamsi":
          if (value.length > 0) {
            value = String(value);
            const birthyear = regexPatterns.birthyear_shamsi.test(value);
            if (!birthyear || value.length > 4) {
              validationObj.message =
                translate.locale.birthyear.invalid_birthyear;
              validationObj.valid = false;
            }
          }
          break;
        case "upload":
          if (additional && additional.uploading) {
            validationObj.message = translate.locale.upload.wait_for_upload;
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
              validationObj.message = translate.locale.date.invalid_date;
              validationObj.valid = false;
            } else if (value < beginningOfToday) {
              //if Value is not NaN but is past
              validationObj.message = translate.locale.date.past_date;
              validationObj.valid = false;
            }
          }
          break;
        default:
        
          //throw new Error("Invalid validation rule");
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
