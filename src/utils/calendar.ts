import React, { useState } from "react";
import { format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: any) => void; // Change the type according to your logic
}

const CalendarTimeline: React.FC<CalendarProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const selectionRange = {
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
    key: "selection",
  };

  const handleSelect = (ranges: any) => {
    onChange(ranges.selection);
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Pilih Rentang Tanggal:</h2>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()} // Set minDate to prevent selecting past dates
        scroll={{ enabled: true }} // Enable scroll to navigate through months
      />
    </div>
  );
};

export default CalendarTimeline;
