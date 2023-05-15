import format from "date-fns/format";
import { parseDate } from "./parseDate";

export const DATE_PATTERN_MONTH = "MMMM";
export const DATE_PATTERN_SHORT = "LLLL d, yyyy";
export const DATE_PATTERN_STANDARD = "LLL d, yyyy h:mm aaa";

export function formatDate(
  date: string | Date,
  pattern = DATE_PATTERN_STANDARD,
) {
  const dateObj = typeof date === "string" ? parseDate(date) : date;
  return format(dateObj, pattern, { weekStartsOn: 1 });
}
