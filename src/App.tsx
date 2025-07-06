import { Box, Divider, MantineProvider } from "@mantine/core";
import "./index.css";
import Sidebar from "./components/calendar/Sidebar";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { CalendarHeader } from "./components/calendar/CalendarHeader";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CalendarView from "./components/calendar/CalendarView";
import DayCalendar from "./components/calendar/DayCalendar";
import MonthlyCalendar from "./components/calendar/MonthlyCalendar";

function App() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [view, setView] = useState<"Day" | "Week" | "Month">("Month");
  return (
    <>
      <MantineProvider>
        <Box display="flex" style={{ height: "100vh" }}>
          <Box style={{ width: 280, minWidth: 220 }}>
            <Sidebar />
          </Box>
          <Divider orientation="vertical" />
          <Box style={{ flex: 1 }}>
            <CalendarHeader
              currentMonth={currentMonth}
              onChangeCurrentMonth={(day) => {
                setCurrentMonth(day);
              }}
              view={view}
              onChangeView={setView}
            />
            {view === "Day" && <DayCalendar date={currentMonth} />}
            {view === "Week" && (
              <CalendarView currentWeekStart={currentMonth.startOf("week")} />
            )}
            {view === "Month" && (
              <MonthlyCalendar currentMonth={currentMonth} />
            )}
          </Box>
        </Box>
      </MantineProvider>
    </>
  );
}

export default App;
