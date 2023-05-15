import parseISO from "date-fns/parseISO";

/**
 * new Date(string) works inconsistently, thus use date-fns to parse the passed date.
 */
export function parseDate(date: string) {
  return parseISO(date);
}
