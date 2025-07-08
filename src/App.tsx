import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import "./index.css";
import EventCreate from "./pages/EventCreate";

function App() {
  return (
    <>
      <BrowserRouter>
        <MantineProvider>
          <Routes>
            <Route path="/" element={<AppLayout />} />
            {/* <Route path="/event/create" element={<EventCreate />} /> */}
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
