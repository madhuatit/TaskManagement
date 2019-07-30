import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {AddTask} from './add-task.model';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  selectedTask  : AddTask = new AddTask();
  tasks : AddTask[];
  readonly baseURL = 'http://localhost:3000/user';
  
  constructor(private http: HttpClient) { }
}
