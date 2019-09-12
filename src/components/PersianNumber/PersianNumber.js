const PersianNumber = num => {
  var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/[0-9]/g, function(w) {
    return id[+w];
  });
};
export default PersianNumber;
