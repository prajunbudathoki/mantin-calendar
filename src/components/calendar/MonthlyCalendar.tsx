import React from "react";
import { Box, Grid, Text, Paper } from "@mantine/core";
import dayjs, { Dayjs } from "dayjs";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthlyCalendar = ({ currentMonth }: { currentMonth: Dayjs }) => {
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
    
  return <div>MonthlyCalendar</div>;
};

export default MonthlyCalendar;
