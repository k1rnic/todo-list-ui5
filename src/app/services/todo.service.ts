import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { TodoTask } from '../todo/task/task.component';
import { NotificationLevel, NotifyService } from './notify.service';

let data: TodoTask[] = [
  {
    id: 1,
    title: 'Get some carrots',
    deadline: new Date('2018/7/27'),
    done: false,
  },
  {
    id: 2,
    title: 'Do some magic',
    deadline: new Date('2018/7/22'),
    done: false,
  },
  {
    id: 3,
    title: 'Go to the gym',
    deadline: new Date('2018/7/24'),
    done: true,
  },
  {
    id: 4,
    title: 'Buy milk',
    deadline: new Date('2018/7/30'),
    done: false,
  },
  {
    id: 5,
    title: 'Eat some fruits',
    deadline: new Date('2018/7/29'),
    done: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private tasks$: BehaviorSubject<TodoTask[]> = new BehaviorSubject(data);

  constructor(private notifyService: NotifyService) {}

  getAllTasks(): Observable<TodoTask[]> {
    return this.tasks$.asObservable();
  }

  getTaskById(id: number): Observable<TodoTask> {
    return this.tasks$.pipe(
      map(tasks => tasks.find(task => task.id === id))
    );
  }

  getTasksInProgress(): Observable<TodoTask[]> {
    return this.tasks$.pipe(
      map((tasks) =>
        tasks
          .filter((task) => !task.done)
          .sort((a, b) => a.deadline?.getTime() - b.deadline?.getTime())
      )
    );
  }

  getTasksCompleted(): Observable<TodoTask[]> {
    return this.tasks$.pipe(
      map((tasks) =>
        tasks
          .filter((task) => task.done)
          .sort((a, b) => a.deadline?.getTime() - b.deadline?.getTime())
      )
    );
  }

  addTask(task: Partial<TodoTask>): void {
    data.push({
      ...task,
        id: data[data.length - 1]?.id + 1 || 0,
        done: false,
      } as TodoTask
    );

    this.tasks$.next(data);

    this.notifyService.notify({
      text: `New task '${task.title}' created`,
      level: NotificationLevel.Info,
    });
  }

  editTask(id: number, updates: Partial<TodoTask>): void {
    const target = data.find((task) => task.id === id);

    if (target) {
      Object.keys(updates).forEach((prop) => {
        target[prop] = updates[prop];
      });
    }

    this.tasks$.next(data);
  }

  removeTask(id: number): void {
    data = data.filter((task) => task.id !== id);
    this.tasks$.next(data);

    this.notifyService.notify({
      text: `Task with id: ${id} removed`,
      level: NotificationLevel.Error
    });
  }

  changeTaskStatus(id: number, done: boolean): void {
    const target = data.find((task) => task.id === id);
    target.done = done;

    this.tasks$.next(data);

    if (done) {
      this.notifyService.notify({
        text: `Task '${target.title}' was completed`,
        level: NotificationLevel.Success,
      });
    }
  }
}
