import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import moment from 'moment'
export default function MonthPickerComponent({ startDate, SetStartDate, endDate, SetEndDate }) {

  const [pickerValue, setPickerValue] = useState(moment(startDate, "YYYY-MM").format("YYYY-MM-DDTHH:mm:ss"))
  function setValue(value) {
    setPickerValue(moment(value, "YYYY-MM").format("YYYY-MM-DD"))
    SetStartDate(moment(value, "YYYY-MM").add(0, 'days').format("YYYY-MM-DD"))

    SetEndDate(moment(value, "YYYY-MM").endOf('month').format('YYYY-MM-DD'))

  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box m={2}>
        <DatePicker
          inputFormat="yyyy-MM"
          views={["year", "month"]}
          format="YYYY-MM"
          label="Choose a Month"
          value={pickerValue}
          onChange={(newValue) => {
            setValue(moment(newValue).format("YYYY-MM"))
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
