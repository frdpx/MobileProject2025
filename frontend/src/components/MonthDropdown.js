import { Months } from "../constants/months";
import Dropdown from "./DropDown";

const MonthDropdown = ({ value, onChange, width }) => {
  return (
    <Dropdown
      options={Months}
      selectedValue={value}
      onChange={onChange}
      placeHolder="Month"
      width={width}
      maxHeight={220}
    />
  );
};

export default MonthDropdown;
