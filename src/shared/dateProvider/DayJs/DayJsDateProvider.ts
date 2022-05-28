import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

type DateTypes = {
  unit?:
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "month"
    | "year";

  quantity?: number;
  startDate?: Date;
  endDate?: Date;
  date?: Date;
  format?: string;
};

export class DayJsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }
  compare({ startDate, endDate, unit }: DateTypes): number {
    return dayjs(endDate).diff(startDate, unit);
  }

  add({ date, quantity, unit }: DateTypes): Date {
    return dayjs(date).add(quantity, unit).toDate();
  }

  format({ date, format }: DateTypes): string {
    return dayjs(date).format(format);
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}
