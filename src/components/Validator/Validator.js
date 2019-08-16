//TODO:
//    min and max validator bug

const Validator = (value, rules, chars) => {
  let regexPatterns = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phonenumber: /^(\+98|0)?[1-9]\d{9}$/,
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
          if (value.length < parseInt(chars)) {
            validationObj.message = "حداقل ۳ کاراکتر";
            validationObj.valid = false;
            return validationObj;
          }
          break;
        case "maxCharecters":
          value = value.replace(/\s/g, "");
          if (value.length > parseInt(chars)) {
            validationObj.message = "حداقل ۳ کاراکتر";
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
        case "date":
          if (value.length > 0) {
            const currentTime = new Date();
            const day = currentTime.getDate();
            const month = currentTime.getMonth() + 1;
            const year = currentTime.getFullYear();
            const beginningOfToday = new Date(
              `${month}-${day}-${year}`
            ).getTime();
            const incomingDateToTimeStamp = new Date(value).getTime();
            if (
              incomingDateToTimeStamp < beginningOfToday ||
              value === "Invalid date"
            ) {
              validationObj.message = "لطفا تاریخ صحیح وارد کنید";
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
