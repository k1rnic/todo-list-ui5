import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TodoTask } from '../task/task.component';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() tasks: TodoTask[] = [];

  @Output() selectionChange$: EventEmitter<{
    selectedItems: { key: number }[];
    previouslySelectedItems: { key: number }[];
  }> = new EventEmitter();

  @Output() taskEditClick$: EventEmitter<number> = new EventEmitter();
  @Output() taskRemoveClick$: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSelectTask({
    detail,
  }: {
    detail: {
      selectedItems: { key: number }[];
      previouslySelectedItems: { key: number }[];
    };
  }): void {
    this.selectionChange$.emit(detail);
  }

  onEditTaskClick(id: number): void {
    this.taskEditClick$.emit(id);
  }

  onRemoveTaskClick(id: number): void {
    this.taskRemoveClick$.emit(id);
  }
}
