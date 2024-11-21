import { Component, OnInit } from '@angular/core';
import { TodoTask } from '@/shared/interfaces/todo-task.interface';
import { TodotaskService } from '@shared/services/todotask.service';
import { UiService } from '@shared/services/ui.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  toDoTasks: TodoTask[] = [];
  constructor(private taskService: TodotaskService, private uiService: UiService) {
    
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => this.toDoTasks = tasks
    );
  }

  deleteTask(taskToDelete: TodoTask) {
    this.taskService
      .deleteTask(taskToDelete)
      .subscribe(
        () => (this.toDoTasks = this.toDoTasks.filter((t) => t.id !== taskToDelete.id))
      );
  }

  addTask(taskToAdd: TodoTask) {
    // taskToAdd.id = (Number(this.getMaxIdItem(this.toDoTasks)?.id ?? 1) + 1);
    this.taskService
      .addTask(taskToAdd)
      .subscribe(
        (task) => this.toDoTasks.push(task)
      );
    this.uiService.toggleAddTaskForm();
  }

  toggleTask(taskToUpdate: TodoTask) {
    taskToUpdate.reminder = !taskToUpdate.reminder;
    this.taskService
      .toggleTask(taskToUpdate)
      .subscribe();
  }

  private getMaxIdItem(items: TodoTask[]): TodoTask | undefined {
    return items.reduce((prev, current) => {
      if (current.id == null) {
        return prev;
      }
      if (prev.id == null) {
        return current;
      }
      return (prev.id > current.id) ? prev : current;
    }, items[0]);
  }

}
