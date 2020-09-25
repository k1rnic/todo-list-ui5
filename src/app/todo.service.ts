import { Injectable } from '@angular/core';
import { TodoTask } from './todo/task/task.component';

let tasks: TodoTask[] = [
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
  constructor() {}

  getAllTasks(): TodoTask[] {
    return tasks;
  }

  getTasksInProgress(): TodoTask[] {
    return tasks
      .filter((task) => !task.done)
      .sort((a, b) => a.deadline?.getTime() - b.deadline?.getTime());
  }

  getTasksCompleted(): TodoTask[] {
    return tasks
      .filter((task) => task.done)
      .sort((a, b) => a.deadline?.getTime() - b.deadline?.getTime());
  }

  addTask(task: Partial<TodoTask>): void {
    tasks.push({
      ...task,
      id: tasks[tasks.length - 1]?.id + 1 || 0,
      done: false,
    } as TodoTask);
  }

  editTask(id: number, updates: Partial<TodoTask>): TodoTask {
    const target = tasks.find(task => task.id === id);

    if (target) {
      Object.keys(updates).forEach(prop => {
        target[prop] = updates[prop];
      });
    }

    return target;
  }

  removeTask(id: number): void {
    tasks = tasks.filter((task) => task.id !== id);
  }

  changeTaskStatus(id: number, done: boolean): void {
    const target = tasks.find((task) => task.id === id);
    target.done = done;
  }
}
