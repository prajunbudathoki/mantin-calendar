import {
  Badge,
  Button,
  ColorInput,
  Menu,
  Modal,
  TextInput,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { v4 as uuid } from "uuid";
import type { CalendarEvents } from "../../types/Event";

const fakeEvents: CalendarEvents[] = [
  {
    id: "1",
    title: "Team Meeting",
    color: "blue",
    type: "event",
    date: "2023-10-01",
  },
  {
    id: "2",
    title: "Doctor Appointment",
    color: "red",
    type: "event",
    date: "2023-10-02",
  },
  {
    id: "3",
    title: "Project Deadline",
    color: "green",
    type: "event",
    date: "2023-10-03",
  },
  {
    id: "4",
    title: "Birthday Party",
    color: "yellow",
    type: "event",
    date: "2023-10-04",
  },
];

export default function Sidebar({
  selectedDates,
  setSelectedDates,
}: {
  selectedDates: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"event" | "task" | null>(null);

  const [events, setEvents] = useState<typeof fakeEvents>(() => {
    const stored = localStorage.getItem("events");
    return stored ? JSON.parse(stored) : fakeEvents;
  });

  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const alreadySelected = selectedDates.some((d) =>
      dayjs(d).isSame(today, "date")
    );
    if (!alreadySelected) {
      setSelectedDates((current) => [...current, today]);
    }
  }, [selectedDates, setSelectedDates]);

  const form = useForm({
    initialValues: { title: "", color: "blue" },
  });

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

  const handleFormSubmit = (values: { title: string; color: string }) => {
    setEvents((prev) => [
      ...prev,
      {
        id: uuid(),
        title: values.title,
        color: values.color,
        date:
          selectedDates[selectedDates.length - 1] ||
          dayjs().format("YYYY-MM-DD"),
        type: modalType ?? "event",
      },
    ]);
    setModalOpen(false);
    setModalType(null);
    form.reset();
  };
  return (
    <div className="space-y-5 p-4 fixed">
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
          {events.map((event) => (
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
          form.reset();
        }}
        centered
        title={modalType === "task" ? "Create Task" : "Create Event"}
      >
        {modalType === "event" && (
          <form
            onSubmit={form.onSubmit(handleFormSubmit)}
            className="space-y-3"
          >
            <TextInput
              label="Title"
              placeholder="Event title"
              {...form.getInputProps("title")}
            />
            <ColorInput
              label="Select the color label"
              {...form.getInputProps("color")}
            />
            <Button type="submit" fullWidth>
              save
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
