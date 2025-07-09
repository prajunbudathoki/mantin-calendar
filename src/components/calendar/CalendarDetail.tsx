import {
  Badge,
  Box,
  Paper,
  Stack,
  Text,
  Title,
  TextInput,
  Textarea,
  Divider,
  ColorInput,
} from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { CalendarEvents } from "../../types/Event";
import { addEvents, getEvents } from "../../utils/localStorage";
import { v4 as uuid } from "uuid";

interface CalendarDetailsProps {
  selectedDates: string[];
}

export function CalendarDetails({ selectedDates }: CalendarDetailsProps) {
  const [events, setEvents] = useState<CalendarEvents[]>([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleFieldChange = (
    id: string,
    field: keyof CalendarEvents,
    value: string
  ) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, [field]: value } : event
    );
    setEvents(updatedEvents);
    addEvents(updatedEvents);
  };

  const handleAddEvent = (date: string, color: string) => {
    const newEvent: CalendarEvents = {
      id: uuid(),
      title: "",
      date,
      color: color,
      type: "event",
      description: "",
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    addEvents(updatedEvents);
    return newEvent;
  };

  const filteredEvents =
    selectedDates.length > 0
      ? events.filter((event) =>
          selectedDates.some((date) => dayjs(event.date).isSame(date, "day"))
        )
      : events.filter((event) =>
          dayjs(event.date).isAfter(dayjs().subtract(1, "day"))
        );

  const showEmptyForm =
    selectedDates.length === 1 && filteredEvents.length === 0;

  if (showEmptyForm) {
    const newEvent = handleAddEvent(selectedDates[0], "");
    return (
      <Box p="xl" style={{ position: "sticky", top: 0 }}>
        <Title order={4} mb="md">
          Create Event on {dayjs(newEvent.date).format("MMMM D, YYYY")}
        </Title>
        <Paper withBorder p="md" radius="md">
          <Stack gap="sm">
            <TextInput
              label="Title"
              value={newEvent.title}
              onChange={(e) =>
                handleFieldChange(newEvent.id, "title", e.target.value)
              }
              variant="filled"
            />
            <Divider />
            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Date
              </Text>
              <Text>{dayjs(newEvent.date).format("dddd, MMMM D, YYYY")}</Text>
            </Stack>
            <Divider />
            <Textarea
              label="Description"
              value={newEvent.description || ""}
              variant="filled"
              onChange={(e) =>
                handleFieldChange(newEvent.id, "description", e.target.value)
              }
            />
            <ColorInput
              label="Select the color label"
              value={newEvent.color || ""}
              onChange={(color) =>
                handleFieldChange(newEvent.id, "color", color)
              }
            />
            <Badge color={newEvent.color || "gray"} size="sm" mt="xs">
              {newEvent.type ?? "event"}
            </Badge>
          </Stack>
        </Paper>
      </Box>
    );
  }
  return (
    <Box p="xl" style={{ position: "sticky", top: 0 }}>
      <Title order={4} mb="md">
        {selectedDates.length > 0
          ? "Events on Selected Date"
          : "Upcoming Events"}
      </Title>

      {filteredEvents.length === 0 ? (
        <Text c="dimmed">No upcoming events</Text>
      ) : (
        <Stack gap="md">
          {filteredEvents.map((event) => (
            <Paper key={event.id} withBorder p="md" radius="md">
              <Stack gap="sm">
                <TextInput
                  label="Title"
                  value={event.title}
                  onChange={(e) =>
                    handleFieldChange(event.id, "title", e.target.value)
                  }
                  variant="filled"
                />
                <Divider />
                <Stack gap={4}>
                  <Text size="sm" c="dimmed">
                    Date
                  </Text>
                  <Text>{dayjs(event.date).format("dddd, MMMM D, YYYY")}</Text>
                </Stack>
                <Divider />
                <Textarea
                  label="Description"
                  value={event.description || ""}
                  variant="filled"
                  onChange={(e) =>
                    handleFieldChange(event.id, "description", e.target.value)
                  }
                />
                <ColorInput
                  label="Select the color label"
                  value={event.color || ""}
                  onChange={(color) =>
                    handleFieldChange(event.id, "color", color)
                  }
                />
                <Badge color={event.color || "gray"} size="sm" mt="xs">
                  {event.type ?? "event"}
                </Badge>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
