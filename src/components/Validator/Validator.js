const Validator = (value, rules) => {
  let regexPatterns = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phonenumber: /^(\+98|0)?9\d{9}$/,
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  };
  let validationObj = { message: "", valid: true };
  let numberOfValidations = rules.length;
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
          if (value.length < 3) {
            validationObj.message = "حداقل ۳ کاراکتر";
            validationObj.valid = false;
            return validationObj;
          }
          break;
        case "email":
          const email = regexPatterns.email.test(String(value).toLowerCase());
          if (!email) {
            validationObj.message = "ایمیل نامعتبر است";
            validationObj.valid = false;
            return validationObj;
          }
          break;
        case "phonenumber":
          const phonenumber = regexPatterns.phonenumber.test(
            String(value).toLowerCase()
          );
          if (!phonenumber) {
            validationObj.message = "شماره وارد شده صحیح نیست";
            validationObj.valid = false;
            return validationObj;
          }
          break;
        case "url":
          const url = regexPatterns.url.test(String(value).toLowerCase());
          if (!url) {
            validationObj.message = "فرمت آدرس وبسایت وارد شده نامعتبر است";
            validationObj.valid = false;
            return validationObj;
          }
          break;
        case "number":
          if (isNaN(Number(value))) {
            validationObj.message = "لطفا مقدار عددی صحیح وارد کنید";
            validationObj.valid = false;
            return validationObj;
          }
          break;
        default:
          break;
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
