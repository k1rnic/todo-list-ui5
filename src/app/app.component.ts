import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoTask } from './todo/task/task.component';

@Component({
  selector: 'todo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  completedTasks: TodoTask[];
  inProgressTasks: TodoTask[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  onTaskComplete({ selectedItems }): void {
    selectedItems.forEach((task) => {
      this.todoService.changeTaskStatus(task.key, true);
    });
    this.getTasks();
  }

  onTaskInProgress({ selectedItems, previouslySelectedItems }): void {
    previouslySelectedItems.forEach((task) => {
      const unselected = !selectedItems.some(selected => selected.key === task.key);

      if (unselected) {
        this.todoService.changeTaskStatus(task.key, false);
      }
    });
    this.getTasks();
  }

  onRemoveTask(id: number): void {
    this.todoService.removeTask(id);
    this.getTasks();
  }

  onAddTodo({ title, deadline }: Partial<TodoTask>): void {
    this.todoService.addTask({ title, deadline });
    this.getTasks();
  }

  private getTasks(): void {
    this.inProgressTasks = this.todoService.getTasksInProgress();
    this.completedTasks = this.todoService.getTasksCompleted();
  }
}
