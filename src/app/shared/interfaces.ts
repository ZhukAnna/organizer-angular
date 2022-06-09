import * as moment from 'moment';

export interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

export interface Week {
  days: Day[];
}

export interface Task {
  id?: string;
  title: string;
  date?: string;
  objectId?: string;
}
