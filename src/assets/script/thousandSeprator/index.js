import { addCommas } from "../../../components/PersianNumber/PersianNumber";
var thousandSeprator = (number, reverseOperation) => {
  number = number
    .toString()
    .split(",")
    .join("");
  if (!reverseOperation) return addCommas(number);
  else return number;
};
export { thousandSeprator };
