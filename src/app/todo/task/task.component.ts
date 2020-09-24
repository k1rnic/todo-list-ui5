import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export interface TodoTask {
  id: number;
  title: string;
  deadline: Date;
  done: boolean;
}

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() deadline: Date;

  @Output() taskEditClick$: EventEmitter<number> = new EventEmitter();
  @Output() taskRemoveClick$: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEditTaskClick(e: any): void {
    this.taskEditClick$.emit(this.id);
  }

  onRemoveTaskClick(e: any): void {
    this.taskRemoveClick$.emit(this.id);
  }
}
