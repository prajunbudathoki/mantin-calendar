import { Box, Text } from "@mantine/core";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { CalendarEvents } from "../../types/Event";
import { getEvents } from "../../utils/localStorage";

const hours: string[] = Array.from({ length: 24 }, (_, i) =>
  dayjs().hour(i).format("hh A")
);

const DayCalendar = ({ date }: { date: Dayjs }) => {
  const [events, setEvents] = useState<CalendarEvents[]>([]);

  useEffect(() => {
    const data = getEvents();
    setEvents(data);
  }, []);

  const eventsForDay = events.filter((event) =>
    dayjs(event.date).isSame(date, "day")
  );

  return (
    <Box style={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}>
      {hours.map((hour, index) => {
        const slotTime = `${String(index).padStart(2, "0")}:00`;
        const slotEvents = eventsForDay.filter((event) =>
          event.time?.startsWith(slotTime)
        );

        return (
          <Box
            key={hour}
            p="xs"
            h={60}
            style={{
              borderBottom: "1px solid #2b2b2b",
              position: "relative",
              backgroundColor:
                dayjs().isSame(date, "day") && dayjs().hour() === index
                  ? "#e0f7fa"
                  : undefined,
            }}
          >
            <Text size="xs" c="dimmed" mb={4}>
              {hour}
            </Text>

            {slotEvents.map((event) => (
              <Box
                key={event.id}
                style={{
                  backgroundColor: `${event.color}33`,
                  color: "#000",
                  borderLeft: `4px solid ${event.color}`,
                  padding: "4px 8px",
                  borderRadius: 4,
                  marginBottom: 4,
                }}
              >
                <Text size="sm" fw={500}>
                  {event.title}
                </Text>
                {event.time && (
                  <Text size="xs" c="dimmed">
                    {event.time}
                  </Text>
                )}
              </Box>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default DayCalendar;
