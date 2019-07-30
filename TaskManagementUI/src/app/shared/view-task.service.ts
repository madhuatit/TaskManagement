import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {ViewTask} from './view-task.model';

@Injectable({
  providedIn: 'root'
})
export class ViewTaskService {

  selectedTask: ViewTask;
  tasks: ViewTask[];
 
  readonly baseURL = 'http://localhost:3000/task';
  constructor( private http: HttpClient) { }
 
  getTaskList(){
    return this.http.get(this.baseURL);
  }
}
