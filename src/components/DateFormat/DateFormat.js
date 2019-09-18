import moment from "jalali-moment";

var dateFormat = function(date) {
  this.isValidDate = moment(date)._isValid;
  this.date = date;
};

dateFormat.prototype.toPersian = function() {
  if (this.isValidDate) {
    return moment(this.date).format("jYYYY/jMM/jDD");
  } else {
    return "مشخص نیست";
  }
};

dateFormat.prototype.toEnglish = function() {
  if (this.isValidDate) {
    return moment(this.date).format("YYYY/MM/DD");
  } else {
    return "Not Defined";
  }
};

dateFormat.prototype.toPersianWithHour = function() {
  if (this.isValidDate) {
    return moment(this.date).format("jYYYY/jMM/jDD ساعت HH:mm");
  } else {
    return "مشخص نیست";
  }
};

dateFormat.prototype.toEnglishWithHour = function() {
  if (this.isValidDate) {
    return moment(this.date).format("YYYY/MM/DD time HH:mm");
  } else {
    return "Not Defined";
  }
};

var DateFormat = function(date) {
  return new dateFormat(date);
};
export default DateFormat;
