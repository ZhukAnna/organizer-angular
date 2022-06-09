import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Week} from "../shared/interfaces";
import {DateService} from "../shared/date.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar!: Week[]
  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }
  generate(now: moment.Moment ) {
    const startDate = now.clone().startOf('month').startOf('week')
    const endDate = now.clone().endOf('month').endOf('week')
    const date = startDate.clone().subtract(1, 'day')
    this.calendar= []
    while (date.isBefore(endDate, 'day')) {
      this.calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date')

            return {
              value, active, disabled, selected
            }
          })
      })
    }
    //console.log(this.calendar)
  }
  select(day: moment.Moment) {
  this.dateService.changeDate(day)
}
}
