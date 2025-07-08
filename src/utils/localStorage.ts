import type { CalendarEvents } from "../types/Event";

export function getEvents(): CalendarEvents[] {
  const data = localStorage.getItem("events");
  return data ? JSON.parse(data) : [];
}

export function addEvents(events: CalendarEvents[]) {
  localStorage.setItem("events", JSON.stringify(events));
}

export function deleteEvent(eventId: string) {
  const events = getEvents();
  const updatedEvents = events.filter((event) => event.id !== eventId);
  localStorage.setItem("events", JSON.stringify(updatedEvents));
}
