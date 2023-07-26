import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/Model/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = []

  constructor(private service: TaskService) { }

  ngOnInit() {
    this.tasks = this.service.getTask()
  }

  deleteTask(task: Task) {
    let res = confirm('Are you sure you want to delete?')
    if (!res) return
    if (this.service.deleteTask(task))
      this.tasks = this.tasks.filter(t => t.id !== task.id)

  }

  clearAllTask() {
    this.service.clearTask()
    this.tasks = []
  }

  onAddNewTask(newTask: Task) {
    this.tasks.unshift(this.service.addItem(newTask))
  }

  toggleReminder(task: Task) {
    if (this.service.updateTask(task))
      task.isCompleted = !task.isCompleted;
    if (task.isCompleted)
      alert(task.text + ' is registered as completed');
    else
      alert(task.text + ' is registered as incompleted');
  }

}
