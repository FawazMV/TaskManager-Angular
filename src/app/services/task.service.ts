import { Injectable } from '@angular/core';
import { TASKS } from 'src/Model/mock';
import { Task } from 'src/Model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  getTask(): Task[] {
    let task = window.localStorage.getItem('tasks')
    if (task)
      return JSON.parse(task)
    return TASKS
  }

  deleteTask(task: Task): boolean {
    let tasks = this.getTask();

    let isAvailable = tasks.find((x) => x.id === task.id)

    if (isAvailable) {
      this.setItem(tasks.filter(t => task.id !== t.id))
      return true
    }
    return false
  }

  clearTask() {
    window.localStorage.removeItem('tasks')
  }

  addItem(task: Task): Task {
    let tasks: Task[] = this.getTask()
    task.id = this.idGenrator()
    tasks.unshift(task)
    this.setItem(tasks)
    return task
  }
  updateTask(task: Task) {
    let tasks = this.getTask();

    let item = tasks.find((x) => x.id === task.id)

    if (item) {
      item.isCompleted = !item.isCompleted
      this.setItem(tasks)
      return true
    }
    return false
  }

  private setItem(tasks: Task[]) {
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  private idGenrator(): number {
    let str = ''
    for (let i = 1; i < 5; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return Number(str)
  }
}
