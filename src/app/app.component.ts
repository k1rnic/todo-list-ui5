import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from './todo.service';
import { TodoTask } from './todo/task/task.component';

@Component({
  selector: 'todo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allTasks$: Observable<TodoTask[]>;
  completedTasks$: Observable<TodoTask[]>;
  inProgressTasks$: Observable<TodoTask[]>;

  editingTask$: Observable<TodoTask> = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  onTaskComplete({ selectedItems }): void {
    selectedItems.forEach((task) => {
      this.todoService.changeTaskStatus(task.key, true);
    });
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
  }

  onRemoveTask(id: number): void {
    this.todoService.removeTask(id);
  }

  onAddTodo({ title, deadline }: Partial<TodoTask>): void {
    this.todoService.addTask({ title, deadline });
  }

  onEditingTask(id: number): void {
    this.editingTask$ = this.todoService.getTaskById(id);
  }

  onEditingTaskSubmit(updates: TodoTask): void {
    this.todoService.editTask(updates.id, updates);
    this.clearEditingTask();
  }

  onEditingTaskCancel(): void {
    this.clearEditingTask();
  }

  private clearEditingTask(): void {
    this.editingTask$ = null;
  }

  private getTasks(): void {
    this.allTasks$ = this.todoService.getAllTasks();
    this.inProgressTasks$ = this.todoService.getTasksInProgress();
    this.completedTasks$ = this.todoService.getTasksCompleted();
  }
}
