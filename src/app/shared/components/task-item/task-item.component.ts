import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoTask } from '@shared/interfaces/todo-task.interface';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})

export class TaskItemComponent implements OnInit {

  @Input()
  toDoTask!: TodoTask;

  @Output() onDeleteTask: EventEmitter<TodoTask> = new EventEmitter();
  @Output() onToggleTask: EventEmitter<TodoTask> = new EventEmitter();

  faTimes = faTimes;
  constructor() { }

  ngOnInit() : void {

  }

  onDelete(task: TodoTask) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: TodoTask) {
    this.onToggleTask.emit(task);
  }
}
