import type { Dayjs } from "dayjs";

const DayCalendar = ({ date }: { date: Dayjs }) => {
  return <div>Day View for {date.format("MMMM D, YYYY")}</div>;
};

export default DayCalendar;
