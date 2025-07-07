import { Box, Divider } from "@mantine/core";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import Sidebar from "./components/calendar/Sidebar";
import { CalendarHeader } from "./components/calendar/CalendarHeader";
import DayCalendar from "./components/calendar/DayCalendar";
import CalendarView from "./components/calendar/CalendarView";
import MonthlyCalendar from "./components/calendar/MonthlyCalendar";
import { CalendarDetails } from "./components/calendar/CalendarDetail";
import dayjs from "dayjs";

export default function AppLayout() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [view, setView] = useState<"Day" | "Week" | "Month">("Month");

  return (
    <Box display="flex" style={{ height: "100vh" }}>
      <Box style={{ width: 280, minWidth: 220 }}>
        <Sidebar
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      </Box>
      <Divider orientation="vertical" />
      <Box style={{ flex: 1 }}>
        <CalendarHeader
          currentMonth={currentMonth}
          onChangeCurrentMonth={setCurrentMonth}
          view={view}
          onChangeView={setView}
        />
        {view === "Day" && <DayCalendar date={currentMonth} />}
        {view === "Week" && (
          <CalendarView currentWeekStart={currentMonth.startOf("week")} />
        )}
        {view === "Month" && (
          <MonthlyCalendar
            currentMonth={currentMonth}
            selectedDates={selectedDates}
          />
        )}
      </Box>
      <Divider orientation="vertical" />
      <Box>
        <CalendarDetails selectedDates={selectedDates} />
      </Box>
    </Box>
  );
}
