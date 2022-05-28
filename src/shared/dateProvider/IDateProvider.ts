type DateTypes = {
  unit?:
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "month"
    | "year"
    | "date";
  quantity?: number;
  startDate?: Date;
  endDate?: Date;
  date?: Date;
  format?: string;
};

export interface IDateProvider {
  compare({ startDate, endDate, unit }: DateTypes): number;
  add({ date, quantity, unit }: DateTypes): Date;
  format({ date, format }: DateTypes): string;
  dateNow(): Date;
  convertToUTC(date: Date): string;
}
