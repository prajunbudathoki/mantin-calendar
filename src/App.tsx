import { Box, Divider, MantineProvider } from "@mantine/core";
import "./index.css";
import Sidebar from "./components/calendar/Sidebar";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { CalendarHeader } from "./components/calendar/CalendarHeader";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CalendarView from "./components/calendar/CalendarView";

type LabelProps = {
  label: ["Day", "Week", "Month"];
};

function App() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [view, setView] = useState<"Day" | "Week" | "Month">("Week");
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
            />
            <CalendarView currentWeekStart={currentMonth.startOf("week")} />
          </Box>
        </Box>
      </MantineProvider>
    </>
  );
}

export default App;
