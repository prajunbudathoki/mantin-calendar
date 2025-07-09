import { Box, Divider } from "@mantine/core";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Sidebar from "./components/calendar/Sidebar";
import { CalendarHeader } from "./components/calendar/CalendarHeader";
import DayCalendar from "./components/calendar/DayCalendar";
import CalendarView from "./components/calendar/CalendarView";
import MonthlyCalendar from "./components/calendar/MonthlyCalendar";
import { CalendarDetails } from "./components/calendar/CalendarDetail";
import dayjs from "dayjs";
import type { CalendarEvents } from "./types/Event";

export default function AppLayout() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [view, setView] = useState<"Day" | "Week" | "Month">("Day");
  const [events, setEvents] = useState<CalendarEvents[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  return (
    <Box display="flex" style={{ height: "100vh" }}>
      <Box style={{ width: 280, minWidth: 220 }}>
        <Sidebar
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
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
        {view === "Day" && (
          <DayCalendar date={currentMonth} setSelectedTime={setSelectedTime} />
        )}
        {view === "Week" && (
          <CalendarView currentWeekStart={currentMonth.startOf("week")} />
        )}
        {view === "Month" && (
          <MonthlyCalendar
            currentMonth={currentMonth}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            events={events}
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
