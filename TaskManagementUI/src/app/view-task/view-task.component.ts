import { Component, OnInit } from '@angular/core';
import {ViewTaskService} from '../shared/view-task.service';
import {ViewTask} from '../shared/view-task.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [ViewTaskService]
})
export class ViewTaskComponent implements OnInit {

  constructor(private viewTaskService: ViewTaskService) { }

  ngOnInit() {
    this.refreshTaskList();
    //this.getProjects();
  }
 
  

  refreshTaskList(){
    this.viewTaskService.getTaskList().subscribe((res) =>{
      this.viewTaskService.tasks = res as ViewTask[];
    });
  }
}
