import React from "react";
import { DatePickerInput } from "react-native-paper-dates";

const Calendar = ({ label = "Date", value, onChange }) => {
  const today = new Date();
  return (
    <DatePickerInput
      locale="en"
      label={label}
      value={value}
      onChange={onChange}
      inputMode="start"
      style={{ marginTop: 10 ,backgroundColor: "#fff", }}
      editable={false}
      showSoftInputOnFocus={false}
      validRange={{ endDate: today }}
    />
  );
};

export default Calendar;
