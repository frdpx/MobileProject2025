import React from "react";
import { DatePickerInput } from "react-native-paper-dates";

const Calendar = ({ label = "Date", value, onChange }) => {
  return (
    <DatePickerInput
      locale="en"
      label={label}
      value={value}
      onChange={onChange}
      inputMode="start"
      style={{ marginTop: 10 }}
      editable={false}
      showSoftInputOnFocus={false}
    />
  );
};

export default Calendar;
