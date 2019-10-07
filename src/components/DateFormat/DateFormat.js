import moment from "jalali-moment";

var dateFormat = function(date) {
  this.isValidDate = moment(date)._isValid;
  this.date = date;
};

dateFormat.prototype.time = function(locale, dafaultValue) {
  if (this.isValidDate) {
    return moment(this.date)
      .locale(locale)
      .format("YYYY/MM/DD");
  } else {
    return dafaultValue;
  }
};
dateFormat.prototype.timeWithHour = function(locale, dafaultValue) {
  if (this.isValidDate) {
    return moment(this.date)
      .locale(locale)
      .format("YYYY/MM/DD HH:mm");
  } else {
    return dafaultValue;
  }
};

var DateFormat = function(date) {
  return new dateFormat(date);
};
export default DateFormat;
