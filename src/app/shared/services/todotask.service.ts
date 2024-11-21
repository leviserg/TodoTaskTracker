import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';

import { TodoTask } from '@/shared/interfaces/todo-task.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
// import { TASKS } from '@/mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TodotaskService {

  private apiUrl: string = "http://localhost:5000/todos";
  constructor(private http: HttpClient) { }

  getTasks(): Observable<TodoTask[]> {
    /*
    const observableTasks = of(TASKS);
    return observableTasks;
    */
    return this.http.get<TodoTask[]>(this.apiUrl);
  }

  deleteTask(task: TodoTask): Observable<TodoTask> {
    const deleteUrl = `${this.apiUrl}/${task.id}`
    return this.http.delete<TodoTask>(deleteUrl);
  }

  toggleTask(task: TodoTask): Observable<TodoTask> {
    const toggleUrl = `${this.apiUrl}/${task.id}`
    return this.http.put<TodoTask>(toggleUrl, task, httpOptions);
  }

  addTask(task: TodoTask): Observable<TodoTask> {
    return this.http.post<TodoTask>(this.apiUrl, task, httpOptions);
  }
}
