import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from './response.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = new User();
  users: User[];
  readonly baseURL = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  //retrieve all the users.
  getUserList() {
    console.log('getUserList called');
    return this.http.get<Response<User[]>>(this.baseURL);
  }

  //add a new user.
  postUser(usr: User) {
    console.log(usr);
    return this.http.post<Response<User>>(this.baseURL+'/add', usr);
  }

  //update the existing user.
  putUser(usr: User) {
    console.log('in user service : ' + usr.User_Id);
    return this.http.post<Response<User>>(this.baseURL + '/edit/' + usr.User_Id, usr);
  }

  //search for users.
  getSearchUserList(searchKey: string) {
    let params = new HttpParams().set("searchKey", searchKey);
    //params.append('searchKey', searchKey);
    return this.http.get<Response<User[]>>(this.baseURL, { params: params });
  }

  //sort the user list based on column key.
  getSortUserList(sortKey: string) {
    let params = new HttpParams().set("sortKey", sortKey);
    return this.http.get<Response<User[]>>(this.baseURL, { params: params });
  }

  //get the specific user details.
  getUserForId(id: any) {
    let parms = new HttpParams().set("_id", id);
    return this.http.get<Response<User>>(this.baseURL, { params: parms });
  }

  //delete the user data.
  removeUser(usr: User) {
    return this.http.get<Response<User>>(this.baseURL + '/delete/' + usr.Employee_Id);
  }
}
