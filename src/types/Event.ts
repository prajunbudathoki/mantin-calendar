export type CalendarEvents = {
  id: string;
  date: string;
  title: string;
  color: string;
  time?: string; 
  type?: "event" | "task";
};
