'use client';
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const DatePicker = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  // Example availability data (you can fetch this dynamically later)
  const availableDays = [2, 5, 9, 12, 18, 21, 25];
  const limitedDays = [3, 8, 13, 22];
  const unavailableDays = [6, 10, 16, 19, 27];

  // Helper functions
  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (date >= today) {
      setSelectedDate(date);
    }
  };

  // Generate calendar cells
  const generateCalendar = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const firstDay = firstDayOfMonth(currentYear, currentMonth);
    const cells = [];

    for (let i = 0; i < firstDay; i++) cells.push(<div key={`empty-${i}`}></div>);

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isPast = date < today && date.toDateString() !== today.toDateString();

      // Determine status color
      let statusColor = "";
      if (availableDays.includes(day)) statusColor = "border-[#17B26A] text-[#17B26A]";
      if (limitedDays.includes(day)) statusColor = "border-[#F79009] text-[#F79009]";
      if (unavailableDays.includes(day)) statusColor = "border-[#C0C0C0] text-[#C0C0C0]";
      if (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        statusColor = "bg-[#7E22CE] text-white border-[#7E22CE]";
      }

      cells.push(
        <div
          key={day}
          onClick={() => !isPast && !unavailableDays.includes(day) && handleDateClick(day)}
          className={`w-[52px] h-[52px] flex items-center justify-center rounded-full border-[1px] ${statusColor} ${
            isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {day}
        </div>
      );
    }

    return cells;
  };

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  return (
    <Card className="w-[472px]">
      {/* Header */}
      <div className="p-[20px] border-b border-[#D7D7D7]">
        <h2 className="text-[16px] font-semibold">Select Date</h2>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-2 p-5">
        <button onClick={handlePrevMonth} className="px-2 py-1 rounded border">
          <ArrowLeft className="w-[20px] h-[20px]" />
        </button>
        <span className="font-semibold text-[16px]">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button onClick={handleNextMonth} className="px-2 py-1 rounded border">
          <ArrowRight className="w-[20px] h-[20px]" />
        </button>
      </div>

      {/* Weekday Names */}
      <div className="grid grid-cols-7 gap-1 text-center font-medium px-5 text-[16px] mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-3 rounded-full px-5 py-3">
        {generateCalendar()}
      </div>

      {/* Legend */}
      <div className="p-[20px] flex items-center gap-3 flex-wrap border-t border-[#D7D7D7]">
        {["Available", "Limited", "Unavailable", "Selected"].map((label, i) => {
          const color =
            label === "Available"
              ? "border-[#17B26A] text-[#17B26A]"
              : label === "Limited"
              ? "border-[#F79009] text-[#F79009]"
              : label === "Unavailable"
              ? "border-[#C0C0C0] text-[#C0C0C0]"
              : label === "Selected"
              ? "border-[#7E22CE] text-[#7E22CE]"
              : "";
          return (
            <span
              key={i}
              className={`border-[1px] ${color} text-[14px] font-light rounded-full py-[6px] px-[18px]`}
            >
              {label}
            </span>
          );
        })}
      </div>
    </Card>
  );
};

export default DatePicker;
