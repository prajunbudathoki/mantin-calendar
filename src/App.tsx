import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import { CalendarDetails } from "./components/calendar/CalendarDetail";
import "./index.css";
import { useState } from "react";

function App() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  return (
    <>
      <BrowserRouter>
        <MantineProvider>
          <Routes>
            <Route path="/" element={<AppLayout />} />
            <Route
              path="/event/create"
              element={<CalendarDetails selectedDates={selectedDates} />}
            />
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
