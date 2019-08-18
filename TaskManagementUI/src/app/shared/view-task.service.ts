import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {AddTask} from './add-task.model';
import { ViewTask } from './view-task.model';

@Injectable({
  providedIn: 'root'
})
export class ViewTaskService {

  selectedTask: AddTask;
  tasks: AddTask[];
 
  readonly baseURL = 'http://localhost:3000/task';
  constructor( private http: HttpClient) { }
 
  getTaskList(){
    return this.http.get(this.baseURL);
  }

  getTaskForProjectList(Project: any){
    let params = new HttpParams().set("Project", Project);
    return this.http.get(this.baseURL, { params: params });
  }

  //sort the task list based on key column.
  getSortTaskList(sortKey: string) {
    let params = new HttpParams().set("sortKey", sortKey);
    return this.http.get(this.baseURL, { params: params });
  }

  //update the existing task to completed.
  putTask(task : AddTask) {
    return this.http.put(this.baseURL + '/' + task.Task_Id, task);
  }
}
