import { TodoTask } from '@/shared/interfaces/todo-task.interface';
import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { UiService } from '@/shared/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<TodoTask> = new EventEmitter();

  taskText!: string;
  taskDay!: string;
  taskReminder: boolean = false;

  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    
    this.subscription = this.uiService
    .onToggle()
    .subscribe((value) => (this.showAddTask = value));

  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if(!this.taskText){
      alert('Please add a task');
      return;
    }

    const newTask : TodoTask = {
      text : this.taskText,
      day : this.taskDay,
      reminder : this.taskReminder
    };

    this.onAddTask.emit(newTask);

    this.clearForm();
  }

  private clearForm(){
    this.taskText = '';
    this.taskDay = '';
    this.taskReminder = false;
  }
}
