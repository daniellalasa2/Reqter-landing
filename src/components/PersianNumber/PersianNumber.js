const PersianNumber = (num, locale) => {
  if (locale === "fa") {
    var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  } else {
    return num;
  }
};
function addCommas(nStr) {
  const persianArr = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9"
  };
  let convertedString = "";
  for (let i = 0; i < nStr.length; i++) {
    if (persianArr[nStr[i]]) {
      convertedString += persianArr[nStr[i]];
    } else {
      convertedString = nStr;
      break;
    }
  }
  nStr = convertedString;
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}
export { addCommas };
export default PersianNumber;
