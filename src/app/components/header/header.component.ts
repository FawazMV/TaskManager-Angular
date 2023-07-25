import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showAddTask : boolean =true
  subscription!: Subscription
  title: string = 'Task Manager'

  constructor(private service: UiService) {
    this.subscription = service.onToggle()
      .subscribe(value => this.showAddTask = value);
  }

  toggleAddTask() {
    console.log(this.showAddTask)

    this.service.toggleAddTask()
    this.showAddTask = !this.showAddTask
  }
}
