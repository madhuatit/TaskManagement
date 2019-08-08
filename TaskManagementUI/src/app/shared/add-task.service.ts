import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AddTask, ParentTask } from './add-task.model';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  selectedTask: AddTask = new AddTask();
  ParentTask = new ParentTask();
  tasks: AddTask[];
  readonly baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  postParentTask(parent: ParentTask) {
    return this.http.post(this.baseURL + 'parent', parent);
  }

  getParentList() {
    return this.http.get(this.baseURL + 'parent');
  }

  getSearchParentList(searchKey: string) {
    let params = new HttpParams().set("searchKey", searchKey);
    return this.http.get(this.baseURL + 'parent', { params: params });
  }

  postNewTask(addTask: AddTask) {
    return this.http.post(this.baseURL + 'task', addTask);
  }
}
