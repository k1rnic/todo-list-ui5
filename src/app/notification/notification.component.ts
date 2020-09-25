import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { NotifyService, Notification } from '../services/notify.service';

@Component({
  selector: 'todo-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.notifications$ = this.notifyService.getNotificationList();
  }

  onClose(e: any): void {
    e.target.parentNode.removeChild(e.target);
  }
}
