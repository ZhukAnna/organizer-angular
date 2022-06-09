import { Injectable } from '@angular/core';
import { Task } from './interfaces';
import * as Parse from 'parse';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(public databaseService: DatabaseService) {}

  load(date: moment.Moment) {
    const Tasks = this.databaseService.getClassExtend('Tasks');
    const query = this.databaseService.query(Tasks);
    query.equalTo('date', date.format('DD-MM-YYYY'));
    let arr: Task[] | any;
    return new Promise<Task[]>((resolve, reject) => {
      query.findAll().then((res) => {
        arr = res.map((item) => {
          let object: Task | any;
          object = item.toJSON();
          return object;
        });
        resolve(arr);
      });
    });
  }

  create(task: Task) {
    const Tasks = Parse.Object.extend('Tasks');
    const tasks = new Tasks();

    tasks.set('title', task.title);
    tasks.set('date', task.date);

    return new Promise<string>((resolve, reject) => {
      tasks.save().then(
        (tasks: any) => {
          resolve(tasks.id);
        },
        (error: any) => {
          reject(error.message);
        }
      );
    });
  }

  remove(task: Task) {
    const Tasks = this.databaseService.getClassExtend('Tasks');
    const query = this.databaseService.query(Tasks);

    return new Promise((resolve, reject) => {
      if (task.objectId) {
        query.get(task.objectId).then((object) => {
          object.destroy().then(
            (task) => {
              console.log(task.toJSON()['title'], 'was delete from database');
              resolve(task.toJSON()['title']);
            },
            (error: any) => {
              reject(error.message);
            }
          );
        });
      } else {
        console.log('task haven`t objectID', task);
      }
    });
  }
}
