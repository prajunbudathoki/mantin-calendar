import { ActionIcon, Button, Group, Select, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs, { Dayjs } from "dayjs";

interface CalendarHeaderProps {
  currentMonth: Dayjs;
  onChangeCurrentMonth: (day: Dayjs) => void;
}

export function CalendarHeader({
  currentMonth,
  onChangeCurrentMonth,
}: CalendarHeaderProps) {
  const nextMonth = () => {
    onChangeCurrentMonth(currentMonth.add(1, "month"));
  };

  const prevMonth = () => {
    onChangeCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToToday = () => {
    onChangeCurrentMonth(dayjs());
  };

  return (
      <Group px="md" py="sm" style={{ borderBottom: "1px solid #e9ecef" }}>
          <Group>
            <Text size="xl" fw={700}>
              {currentMonth.format("MMMM")}
            </Text>
            <Text size="xl" fw={500}>
              {currentMonth.format("YYYY")}
            </Text>
          </Group>
          <Select placeholder="Select" data={["Day", "Week", "Month"]} />
          <Button variant="default" size="sm" onClick={goToToday}>
            Today
          </Button>
          <ActionIcon
            variant="default"
            size="lg"
            radius="xl"
            onClick={prevMonth}
          >
            <IconChevronLeft size={18} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            size="lg"
            radius="xl"
            onClick={nextMonth}
          >
            <IconChevronRight size={18} />
          </ActionIcon>
      </Group>
  );
}
