import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser : User = new User();
  users : User[];
  readonly baseURL = 'http://localhost:3000/user';
  
  constructor(private http: HttpClient) { }

  getUserList(){
    console.log('getUserList called');
    return this.http.get(this.baseURL);
  }

  postUser(usr : User){
    console.log(usr);
    return this.http.post(this.baseURL, usr);
  }

  putUser(usr: User){
    console.log('in user service : ' + usr.User_Id);
    return this.http.put(this.baseURL + '/' + usr.User_Id, usr);
  }

  getSearchUserList(searchKey: string){
    let params =  new HttpParams().set("searchKey", searchKey);
    //params.append('searchKey', searchKey);
    return this.http.get(this.baseURL, {params: params});
  }

  getSortUserList(sortKey: string){
    let params = new HttpParams().set("sortKey", sortKey);
    return this.http.get(this.baseURL, {params: params});
  }

  getUserForId(id: any){
    let parms = new HttpParams().set("_id", id);
    return this.http.get(this.baseURL, {params: parms});
  }

  removeUser(usr: User){
    return this.http.delete(this.baseURL + '/' + usr.Employee_Id);
  }
}
