import { Box, Grid, Text, Paper, Menu } from "@mantine/core";
import {
  IconMessageCircle,
  IconPhoto,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import type { CalendarEvents } from "../../types/Event";
import { deleteEvent } from "../../utils/localStorage";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthlyCalendar = ({
  currentMonth,
  selectedDates,
  setSelectedDates,
  events,
}: {
  currentMonth: Dayjs;
  selectedDates: string[];
  setSelectedDates: (dates: string[]) => void;
  events: CalendarEvents[];
}) => {
  const navigate = useNavigate();
  const startOfMonth = currentMonth.startOf("month");
  const startDayIndx = startOfMonth.day();
  const daysInMonth = currentMonth.daysInMonth();
  const prevMonth = currentMonth.subtract(1, "month");
  const daysInPrevMonth = prevMonth.daysInMonth();

  const calendarDays = [];

  for (let i = startDayIndx - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      inMonth: false,
      date: prevMonth.date(daysInPrevMonth - i),
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      inMonth: true,
      date: currentMonth.date(i),
    });
  }

  const nextMonth = currentMonth.add(1, "month");
  const remaining = 62 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({
      day: i,
      inMonth: false,
      date: nextMonth.date(i),
      selectedDates,
    });
  }
  return (
    <Box>
      <Grid columns={7} gutter="xs" mb="lg">
        {weekdays.map((day) => (
          <Grid.Col span={1} key={day}>
            <Text ta="center" fw={500} c="dimmed">
              {day}
            </Text>
          </Grid.Col>
        ))}
      </Grid>
      <Grid columns={7} gutter="xs">
        {calendarDays.map(({ day, inMonth, date }, index) => {
          const dayEvents = events.filter((event) =>
            dayjs(event.date).isSame(date, "day")
          );
          return (
            <Grid.Col key={index} span={1}>
              <Paper
                p="xs"
                h={120}
                withBorder
                radius="sm"
                bg={
                  dayjs().isSame(date, "day")
                    ? "#1971c2"
                    : selectedDates.some((d) => dayjs(d).isSame(date, "date"))
                    ? "#004a77"
                    : undefined
                }
                onClick={() => {
                  if (inMonth) {
                    setSelectedDates([date.toISOString()]);
                  }
                }}
                style={{
                  opacity: inMonth ? 1 : 0.4,
                  cursor: inMonth ? "pointer" : "not-allowed",
                }}
              >
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Text size="sm" fw={600}>
                      {day}
                    </Text>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconPlus size={14} />}
                      onClick={() => navigate("/create/event")}
                    >
                      Create event
                    </Menu.Item>
                    <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                      Messages
                    </Menu.Item>
                    <Menu.Item leftSection={<IconPhoto size={14} />}>
                      Gallery
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>Danger Zone</Menu.Label>
                    <Menu.Item
                      color="red"
                      leftSection={<IconTrash size={14} />}
                      disabled={dayEvents.length === 0}
                      onClick={() => {
                        if (dayEvents.length === 0) {
                          return;
                        }
                        deleteEvent(dayEvents[0].id);
                        window.location.reload();
                      }}
                    >
                      Delete Event
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <div style={{ marginTop: 8 }}>
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-2 rounded-md px-2"
                      title={event.title}
                      style={{ backgroundColor: `${event.color}33` }}
                    >
                      <div
                        className="h-2 w-2 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: event.color }}
                      ></div>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {event.title}
                      </span>
                    </div>
                  ))}
                </div>
              </Paper>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MonthlyCalendar;
