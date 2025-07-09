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
  IconEdit,
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
        size="lg"
        radius="md"
        withCloseButton={false}
      >
        {selectedEvent && (
          <Box p="md" style={{ borderRadius: 12 }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <div className="flex items-center gap-2">
                <Badge
                  color={selectedEvent.color}
                  variant="filled"
                  size="xs"
                  radius="xs"
                />
                <Text fw={500} fz="lg" c="dark">
                  {selectedEvent.title}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="subtle" color="gray" size="xs">
                  <IconEdit size={16} />
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  size="xs"
                  onClick={() => {
                    deleteEvent(selectedEvent.id);
                    setModalOpen(false);
                    window.location.reload();
                  }}
                >
                  <IconTrash size={16} />
                </Button>
                <Button variant="subtle" color="gray" size="xs">
                  <IconMessageCircle size={16} />
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  size="xs"
                  onClick={() => setModalOpen(false)}
                >
                  X
                </Button>
              </div>
            </Box>
            <Text c="gray" size="sm" mb={4}>
              {dayjs(selectedEvent.date).format("dddd, MMMM D")} • 12:00 –
              12:30am
            </Text>
            <Box mt="sm" mb="xs">
              <Text size="sm" c="dimmed">
                ⏰ 30 minutes before
              </Text>
            </Box>
            <Box mt="xs">
              <Text size="sm" c="dimmed">
                📅 Prajun Budhathoki
              </Text>
            </Box>
          </Box>
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
