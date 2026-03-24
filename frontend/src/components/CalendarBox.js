import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarBox() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-box glass">
      <Calendar onChange={setDate} value={date} />
      <p className="selected-date">Selected: {date.toDateString()}</p>
    </div>
  );
}