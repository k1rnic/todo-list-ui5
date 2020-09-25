import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoTask } from './todo/task/task.component';

@Component({
  selector: 'todo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allTasks: TodoTask[];
  completedTasks: TodoTask[];
  inProgressTasks: TodoTask[];

  editingTask: TodoTask = null;

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
      const unselected = !selectedItems.some(
        (selected) => selected.key === task.key
      );

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

  onEditingTask(id: number): void {
    this.editingTask = this.allTasks.find((task) => task.id === id);
  }

  onEditingTaskSubmit(updates: TodoTask): void {
    this.todoService.editTask(updates.id, updates);
    this.clearEditingTask();
    this.getTasks();
  }

  onEditingTaskCancel(): void {
    this.clearEditingTask();
  }

  private clearEditingTask(): void {
    this.editingTask = null;
  }

  private getTasks(): void {
    this.allTasks = this.todoService.getAllTasks();
    this.inProgressTasks = this.todoService.getTasksInProgress();
    this.completedTasks = this.todoService.getTasksCompleted();
  }
}
