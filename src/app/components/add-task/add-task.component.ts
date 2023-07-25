import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/Model/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  date!: Date | null;
  showAddTask !: boolean

  subscription!: Subscription
  title: string = 'Task Manager'

  constructor(private service: UiService) {
    this.subscription = service.onToggle()
      .subscribe(value => this.showAddTask = value);
  }


  onSubmit() {
    if (this.text && this.date) {
      const newTask = {
        text: this.text,
        date: this.date,
        isCompleted: false
      }

      this.onAddTask.emit(newTask)

      this.text = ''
      this.date = null

    } else alert('Please fill the details')
  }
}
