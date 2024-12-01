export type TTodo = {
  id: number;
  content: string;
  done: boolean;
  week_id: number;
};

export type TEvent = {
  id: number;
  name: string;
  start_time: Date;
  end_time: Date;
  weekday: number;
  location: string;
};

export type TStundenplan = {
  times: Date[];
  events: (TEvent & { time_slot?: number })[];
};
