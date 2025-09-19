import { Months } from "../constants/months";
import Dropdown from "./Dropdown";

const MonthDropdown = ({ value, onChange, width }) => {
  return (
    <Dropdown
      options={Months}
      selectedValue={value}
      onChange={onChange}
      placeHolder="Month"
      width={width}
    />
  );
};

export default MonthDropdown;
