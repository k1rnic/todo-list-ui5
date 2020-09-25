import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, ElementRef, ViewChild, Output } from '@angular/core';

@Component({
  selector: 'todo-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('deadlineInput') deadlineInput: ElementRef;

  @Output() inputSubmitting = new EventEmitter<{ title: string, deadline: Date }>();

  constructor() {}

  ngOnInit(): void {}

  addTodo(e: any): void {
    this.inputSubmitting.emit({
      title: this.titleInput.nativeElement.value,
      deadline: new Date(this.deadlineInput.nativeElement.value),
    });
  }
}
