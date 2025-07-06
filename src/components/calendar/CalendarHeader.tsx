import { ActionIcon, Button, Group, Select, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs, { Dayjs } from "dayjs";

interface CalendarHeaderProps {
  currentMonth: Dayjs;
  onChangeCurrentMonth: (day: Dayjs) => void;
  view: "Day" | "Week" | "Month";
  onChangeView: (view: "Day" | "Week" | "Month") => void;
}

export function CalendarHeader({
  currentMonth,
  onChangeCurrentMonth,
  view,
  onChangeView,
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
      <Select
        placeholder="Select"
        value={view}
        onChange={(value) => {
          if (value === "Day" || value === "Week" || value === "Month") {
            onChangeView(value);
          }
        }}
        data={["Day", "Week", "Month"]}
      ></Select>
      <Button variant="default" size="sm" onClick={goToToday}>
        Today
      </Button>
      <ActionIcon variant="default" size="lg" radius="xl" onClick={prevMonth}>
        <IconChevronLeft size={18} />
      </ActionIcon>
      <ActionIcon variant="default" size="lg" radius="xl" onClick={nextMonth}>
        <IconChevronRight size={18} />
      </ActionIcon>
    </Group>
  );
}
