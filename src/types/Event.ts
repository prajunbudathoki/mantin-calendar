export type CalendarEvents = {
  id: string;
  date: string;
  title: string;
  description?: string;
  allDay?: boolean;
  color: string;
  time?: string;
  type?: "event" | "task";
};
