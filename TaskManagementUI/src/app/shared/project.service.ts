import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Project} from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  selectedProject : Project = new Project();
  projects : Project[];
  readonly baseURL = 'http://localhost:3000/project';

  constructor(private http: HttpClient) { }

  getProjectList(){
    return this.http.get(this.baseURL);
  }

  getSearchProjectList(searchKey: string){
    let params =  new HttpParams().set("searchKey", searchKey);
    //params.append('searchKey', searchKey);
    return this.http.get(this.baseURL, {params: params});
  }
}
