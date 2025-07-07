import { Badge, Button, Menu } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";

const fakeEvents = [
  { id: 1, title: "Team Meeting", color: "blue" },
  { id: 2, title: "Doctor Appointment", color: "red" },
  { id: 3, title: "Project Deadline", color: "green" },
  { id: 4, title: "Birthday Party", color: "yellow" },
];

export default function Sidebar() {
  const [selected, setSelected] = useState<string[]>([]);
  const handleSelect = (date: string) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };
  return (
    <div className="space-y-5 p-4">
      <div className="flex items-center gap-2">
        <img
          width={40}
          src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_14_2x.png"
          alt="Logo"
        />
        <p className="mb-1 text-xl font-bold">Calender</p>
      </div>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="filled">
            <IconPlus />
            Create Event
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Event</Menu.Item>
          <Menu.Item>Task</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Calendar
        getDayProps={(date) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, "date")),
          onClick: () => handleSelect(date),
        })}
      />
      <div>
        <h3 className="mb-2 text-sm font-semibold">All events</h3>
        <div className="space-y-2 ">
          {fakeEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-2">
              <Badge
                color={event.color}
                variant="filled"
                size="xs"
                radius="xs"
              />
              <span>{event.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
