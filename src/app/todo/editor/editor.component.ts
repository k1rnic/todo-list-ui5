import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TodoTask } from '../task/task.component';

@Component({
  selector: 'todo-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('dialog') instance: ElementRef;
  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('deadlineInput') deadlineInput: ElementRef;

  @Input() task: TodoTask;

  @Output() submit$ = new EventEmitter<TodoTask>();
  @Output() cancel$ = new EventEmitter();
  @Output() close$ = new EventEmitter();

  constructor() {}

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.instance.nativeElement.open();
  }

  onSubmit(e: any): void {
    this.submit$.emit({
      ...this.task,
      title: this.titleInput.nativeElement.value,
      deadline: new Date(this.deadlineInput.nativeElement.value),
    });
    this.closeDialog();
  }

  onCancel(e: any): void {
    this.cancel$.emit();
    this.closeDialog();
  }

  private closeDialog(): void {
    this.instance.nativeElement.close();
  }
}
