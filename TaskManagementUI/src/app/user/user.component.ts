import { Component, OnInit } from '@angular/core';
import { UserService} from '../shared/user.service';
import { User} from '../shared/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

    public EditOrAdd: String;

  constructor(private userService: UserService) { 
    this.EditOrAdd = "Add";
    
  }

  ngOnInit() {
    this.EditOrAdd = "Add";
    this.resetForm();
    this.getUserList();
    //this.getProjects();
  }
 
  

  getUserList(){
    this.userService.getUserList().subscribe((res) =>{
      this.userService.users = res as User[];
    });
  }

  resetForm(form?: NgForm){
    console.log('reset function called')
    if(form){
      form.reset();
      this.getUserList();
      /* this.userService.selectedUser = {
        User_Id : null,
        First_Name : "",
        Last_Name : "",
        Employee_Id : null,
        Project_Id : null,
        Task_Id : null
      } */
    }
  }

  onSubmit(form: NgForm){
    /* console.log('Edit saved' + form.value.Employee_Id);
    this.userService.putUser(form.value).subscribe((res) => {
      this.resetForm(form);
      this.getUserList();
    }); */
    console.log('User_Id: ' + form.value.Employee_Id);
     if(!form.value.User_Id){
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getUserList();
      });
      
     }else{
      console.log('Edit saved' + form.value.User_Id);
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getUserList();
        this.EditOrAdd = "Add";
      }); 
      
    } 
  } 

  editUser(usr: User){
    console.log('clicked edit for: ' + usr.User_Id);
    this.userService.selectedUser = usr;
    this.EditOrAdd = 'Update';
  }

  searchUsers(searchKey: string){
    console.log('search value: ' + searchKey);
    this.userService.getSearchUserList(searchKey).subscribe((res) =>{
      this.userService.users = res as User[];
    });
  }

  sortUsers(sortKey: string){
    console.log('sort Key: ' + sortKey);
    this.userService.getSortUserList(sortKey).subscribe((res) => {
      this.userService.users = res as User[];
    })
  }

  deleteUser(usr: User){
    console.log('Delete User: ' + usr.Employee_Id);
    this.userService.removeUser(usr).subscribe((res) => {
     // this.resetForm(usr);
      this.getUserList();
      this.EditOrAdd = "Add";
    });

  }
  
}
