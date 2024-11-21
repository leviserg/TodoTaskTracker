import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddTaskForm: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  // set action to btn
  toggleAddTaskForm(): void {
    this.showAddTaskForm = !this.showAddTaskForm;
    this.subject.next(this.showAddTaskForm);
  }

  // apply to UI
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
