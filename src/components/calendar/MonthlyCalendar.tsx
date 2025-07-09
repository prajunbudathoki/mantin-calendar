import {
  Box,
  Grid,
  Text,
  Paper,
  Menu,
  Modal,
  Button,
  Badge,
} from "@mantine/core";
import {
  IconMessageCircle,
  IconPhoto,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import dayjs, { Dayjs } from "dayjs";
import type { CalendarEvents } from "../../types/Event";
import { deleteEvent } from "../../utils/localStorage";
import { useState } from "react";

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
  const [openedMenuIndex, setOpenedMenuIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvents | null>(
    null
  );
  const startOfMonth = currentMonth.startOf("month");
  const startDayIndx = startOfMonth.day();
  const daysInMonth = currentMonth.daysInMonth();
  const prevMonth = currentMonth.subtract(1, "month");
  const daysInPrevMonth = prevMonth.daysInMonth();

  const calendarDays = [];

  for (let i = startDayIndx - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      inMonth: true,
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
      inMonth: true,
      date: nextMonth.date(i),
      selectedDates,
    });
  }
  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        centered
        size={"lg"}
        style={{ maxWidth: 600 }}
      >
        {selectedEvent && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Badge color={selectedEvent.color} size="sm" radius="xs" />
              <h1 className="font-bold">{selectedEvent.title}</h1>
            </div>
            <div>{dayjs(selectedEvent.date).format("MMMM D, YYYY")}</div>
            <div>
              {selectedEvent.description || (
                <span style={{ color: "#888" }}>No description</span>
              )}
            </div>

            <div style={{ marginTop: 12 }}>
              <Button
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => {
                  deleteEvent(selectedEvent.id);
                  setModalOpen(false);
                  window.location.reload();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
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
                  onClick={() => {
                    setSelectedDates([date.toISOString()]);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setOpenedMenuIndex(index);
                  }}
                  style={{
                    opacity: inMonth ? 1 : 0.4,
                    cursor: inMonth ? "pointer" : "not-allowed",
                  }}
                >
                  <Menu
                    shadow="md"
                    width={200}
                    opened={openedMenuIndex === index}
                    onClose={() => setOpenedMenuIndex(null)}
                  >
                    <Menu.Target>
                      <Text
                        size="sm"
                        fw={600}
                        style={{
                          display: "inline-block",
                          padding: "2px 6px",
                          borderRadius: 4,
                          backgroundColor: dayjs().isSame(date, "day")
                            ? "#2E7D32"
                            : selectedDates.some((d) =>
                                dayjs(d).isSame(date, "day")
                              )
                            ? "#01579B"
                            : undefined,
                          color:
                            dayjs().isSame(date, "day") ||
                            selectedDates.some((d) =>
                              dayjs(d).isSame(date, "day")
                            )
                              ? "#fff"
                              : undefined,
                        }}
                      >
                        {day}
                      </Text>
                    </Menu.Target>
                    <Menu.Dropdown>
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
                        className="flex items-center gap-2 rounded-md px-2 py-1 text-xs"
                        title={event.title}
                        style={{ backgroundColor: `${event.color}33` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                          setModalOpen(true);
                        }}
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
    </>
  );
};

export default MonthlyCalendar;
