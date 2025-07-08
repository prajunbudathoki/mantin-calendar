import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Box, Button, TextInput, ColorInput, Title } from "@mantine/core";
import dayjs from "dayjs";
import { addEvents } from "../utils/localStorage";

export default function EventCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialDate = params.get("date") || dayjs().toISOString();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(initialDate);
  const [color, setColor] = useState("#228be6");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvents({
      id,
      title,
      date,
      color,
      type: "event",
    });
    navigate("/");
  };
  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={3} mb="md">
        Create Event
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Date"
          value={dayjs(date).format("YYYY-MM-DD")}
          onChange={(e) => setDate(dayjs(e.target.value).toISOString())}
          type="date"
          required
          mb="sm"
        />
        <ColorInput label="Color" value={color} onChange={setColor} mb="sm" />
        <Button type="submit" fullWidth>
          Create
        </Button>
      </form>
    </Box>
  );
}
