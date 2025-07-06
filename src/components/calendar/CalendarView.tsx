import { Box, Grid, ScrollArea, Text } from "@mantine/core";
import dayjs from "dayjs";

const hours: string[] = [];

for (let i = 0; i < 24; i++) {
  let hour = i % 12 === 0 ? 12 : i % 12;
  let period = i < 12 ? "AM" : "PM";
  hours.push(`${hour}${period}`);
}

export default function CalendarView({
  currentWeekStart,
}: {
  currentWeekStart: dayjs.Dayjs;
}) {
  const days = Array.from({ length: 7 }, (_, i) =>
    currentWeekStart.add(i, "day")
  );

  return (
    <Box>
      <Grid gutter={0} columns={8} bg="dark.8">
        <Grid.Col span={1}>
          <Box h={40}></Box>
        </Grid.Col>
        {days.map((day) => (
          <Grid.Col key={day.toString()} span={1}>
            <Box h={40} px="xs" py={4}>
              <Text size="sm" c="gray.4" className="text-center">
                {day.format("ddd D")}
              </Text>
            </Box>
          </Grid.Col>
        ))}
      </Grid>

      <ScrollArea h="calc(100vh - 100px)">
        <Grid gutter={0} columns={8}>
          <Grid.Col span={1}>
            {hours.map((hour) => (
              <Box key={hour} h={60} px="xs">
                <Text size="xs" c="gray.5">
                  {hour}
                </Text>
              </Box>
            ))}
          </Grid.Col>

          {days.map((day, colIdx) => (
            <Grid.Col
              span={1}
              key={day.toString()}
              style={{ borderLeft: "1px solid #333" }}
            >
              {hours.map((_, rowIdx) => (
                <Box
                  key={`${colIdx}-${rowIdx}`}
                  h={60}
                  style={{
                    position: "relative",
                    border: "1px solid"
                  }}
                ></Box>
              ))}
            </Grid.Col>
          ))}
        </Grid>
      </ScrollArea>
    </Box>
  );
}
