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

  getSortProjectList(sortKey: string){
    let params = new HttpParams().set("sortKey", sortKey);
    return this.http.get(this.baseURL, {params: params});
  }

  postNewProject(project: Project){
    return this.http.post(this.baseURL, project);
  }

  putProject(project: Project){
    console.log('in user service : ' + project.Project_Id);
    return this.http.put(this.baseURL + '/' + project.Project_Id, project);
  }

  removeProject(project: Project){
    return this.http.delete(this.baseURL + '/' + project.Project_Id);
  }

}
