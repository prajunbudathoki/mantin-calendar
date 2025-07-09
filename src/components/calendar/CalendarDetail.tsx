import {
  Badge,
  Box,
  Paper,
  Stack,
  Text,
  Title,
  TextInput,
  Textarea,
  Checkbox,
  Select,
  Divider,
} from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { CalendarEvents } from "../../types/Event";
import { getEvents } from "../../utils/localStorage";

interface CalendarDetailsProps {
  selectedDates: string[];
}

export function CalendarDetails({ selectedDates }: CalendarDetailsProps) {
  const [events, setEvents] = useState<CalendarEvents[]>([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const filteredEvents =
    selectedDates.length > 0
      ? events.filter((event) =>
          selectedDates.some((date) => dayjs(event.date).isSame(date, "day"))
        )
      : events.filter((event) =>
          dayjs(event.date).isAfter(dayjs().subtract(1, "day"))
        );

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
                  readOnly
                  variant="filled"
                />
                <Divider />

                <Stack gap={4}>
                  <Text size="sm" c="dimmed">
                    Date
                  </Text>
                  <Text>{dayjs(event.date).format("dddd, MMMM D, YYYY")}</Text>
                  {/* <Checkbox label="All-day" checked={event.allDay} readOnly /> */}
                </Stack>

                <Divider />

                <Textarea
                  label="Description"
                  // value={event.description || ""}
                  readOnly
                  variant="filled"
                />

                <Text size="sm" c="dimmed" mt="sm">
                  Organizer
                </Text>
                {/* <Text>{event.organizer ?? "N/A"}</Text> */}

                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Availability
                  </Text>
                  {/* <Text>{event.availability ?? "Free"}</Text> */}
                </Stack>

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
