import { getEvents } from "../../utils/localStorage";
import { Box, Text, Title, Stack, Badge, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { CalendarEvents } from "../../types/Event";

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
    <Box
      p="xl"
      style={{
        position: "sticky",
        top: 0,
      }}
    >
      <Title order={4} mb="md">
        {selectedDates.length > 0
          ? "Events on Selected Date"
          : "Upcoming Events"}
      </Title>
      {filteredEvents.length === 0 ? (
        <Text c="dimmed">No upcoming events</Text>
      ) : (
        <Stack gap="sm">
          {filteredEvents.map((event) => (
            <Paper key={event.id} withBorder p="sm" radius="md">
              <Text fw={500}>{event.title}</Text>
              <Text size="xs" c="dimmed">
                {dayjs(event.date).format("MMMM D, YYYY")}
              </Text>
              <Badge color={event.color || "gray"} size="xs" mt={4}>
                {event.type ?? "event"}
              </Badge>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
