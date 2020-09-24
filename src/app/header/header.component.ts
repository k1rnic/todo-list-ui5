import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  title = 'UI5 Web Components Angular Sample Application';

  constructor() {}

  ngOnInit(): void {}
}
