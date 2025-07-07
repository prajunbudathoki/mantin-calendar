import type { CalendarEvents } from "../types/Event";

export function getEvents(): CalendarEvents[] {
  const data = localStorage.getItem("events");
  return data ? JSON.parse(data) : [];
}

export function addEvents(events: CalendarEvents[]) {
  localStorage.setItem("events", JSON.stringify(events));
}
