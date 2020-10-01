import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum NotificationLevel {
  Info = 'Information',
  Success = 'Positive',
  Warning = 'Warning',
  Error = 'Negative',
}

export interface Notification {
  text: string;
  level: NotificationLevel;
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor() { }

  notify(...messages: Notification[]): void {
    this.notifications$.next(messages);
  }

  getNotificationList(): Observable<Notification[]> {
    return this.notifications$;
  }
}
