import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'todo-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}