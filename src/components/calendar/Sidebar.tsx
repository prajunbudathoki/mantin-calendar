import { Badge, Button, Menu, Modal } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const fakeEvents = [
  { id: 1, title: "Team Meeting", color: "blue" },
  { id: 2, title: "Doctor Appointment", color: "red" },
  { id: 3, title: "Project Deadline", color: "green" },
  { id: 4, title: "Birthday Party", color: "yellow" },
];

export default function Sidebar({
  selectedDates,
  setSelectedDates,
}: {
  selectedDates: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"event" | "task" | null>(null);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const alreadySelected = selectedDates.some((d) =>
      dayjs(d).isSame(today, "date")
    );
    if (!alreadySelected) {
      setSelectedDates((current) => [...current, today]);
    }
  }, [selectedDates, setSelectedDates]);

  const handleSelect = (date: string) => {
    const isSelected = selectedDates.some((s) => dayjs(date).isSame(s, "date"));
    // console.log(isSelected);
    if (isSelected) {
      setSelectedDates((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    } else if (selectedDates.length < 3) {
      setSelectedDates((current) => [...current, date]);
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
          <Menu.Item
            onClick={() => {
              setModalType("event");
              setModalOpen(true);
            }}
          >
            Event
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setModalType("task");
              setModalOpen(true);
            }}
          >
            Task
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Calendar
        getDayProps={(date) => ({
          selected: selectedDates.some((s) => dayjs(date).isSame(s, "date")),
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
      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalType(null);
        }}
        centered
        title={modalType === "event" ? "Create Event" : "Create Task"}
      >
        <p>{`placeholder for the ${modalType} form`}</p>
      </Modal>
    </div>
  );
}
