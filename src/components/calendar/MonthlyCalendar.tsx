import { Box, Grid, Text, Paper } from "@mantine/core";
import dayjs, { Dayjs } from "dayjs";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthlyCalendar = ({ currentMonth }: { currentMonth: Dayjs }) => {
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
        {calendarDays.map(({ day, inMonth, date }, index) => (
          <Grid.Col key={index} span={1}>
            <Paper
              p="xs"
              h={80}
              withBorder
              radius="sm"
              bg={dayjs().isSame(date, "day") ? "#1971c2" : undefined}
              style={{
                opacity: inMonth ? 1 : 0.4,
              }}
            >
              <Text size="sm" fw={500}>
                {day}
              </Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default MonthlyCalendar;
