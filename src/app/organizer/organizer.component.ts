import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/interfaces';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css'],
})
export class OrganizerComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  tasks: Task[] = [];

  constructor(
    public dateService: DateService,
    public tasksService: TasksService
  ) {}

  ngAfterViewInit() {
    this.dateService.date
      .pipe(switchMap(async (value) => this.tasksService.load(value)))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      title: new FormControl('', Validators.required),
    });
  }

  submit() {
    const { title } = this.form.value;

    const newTask: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };
    this.tasksService
      .create(newTask)
      .then((task) => {
        console.log('task saved with id: ' + task);
        newTask.objectId = task;
        this.tasks.push(newTask);
        this.form.reset();
      })
      .catch((err) => {
        console.log('Failed because' + err);
      });
  }

  remove(task: Task) {
    this.tasksService
      .remove(task)
      .then(() => {
        // @ts-ignore
        this.tasks = this.tasks.filter((item) => {
          if (item.objectId !== task.objectId) {
            return item.objectId;
          }
        });
      })
      .catch((err) => {
        console.log('Failed because' + err);
      });
  }
}
