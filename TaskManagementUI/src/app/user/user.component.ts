import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  public EditOrAdd: String;

  constructor(private userService: UserService,
    private toastr: ToastrService) {
    this.EditOrAdd = "Add";

  }

  ngOnInit() {
    this.EditOrAdd = "Add";
    this.resetForm();
    this.getUserList();
  }


  //retrieve all the user details.
  getUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

  //reset the form.
  resetForm(form?: NgForm) {
    console.log('reset function called')
    if (form) {
      form.reset();
      this.getUserList();
      this.EditOrAdd = "Add";
    }
  }

  //add or update the user.
  onSubmit(form: NgForm) {
    /* console.log('Edit saved' + form.value.Employee_Id);
    this.userService.putUser(form.value).subscribe((res) => {
      this.resetForm(form);
      this.getUserList();
    }); */
    console.log('User_Id: ' + form.value.Employee_Id);
    if(!this.userService.selectedUser.First_Name){
      this.toastr.warning('Enter the User First Name');
      return;
    }

    if(!this.userService.selectedUser.Last_Name){
      this.toastr.warning('Enter the User Last Name');
      return;
    }

    if(!this.userService.selectedUser.Employee_Id){
      this.toastr.warning('Enter the User Employee Id');
      return;
    }
    if (!form.value.User_Id) {
      this.userService.postUser(form.value).subscribe((res) => {
        this.toastr.success('User Added successfully');
      });
      this.resetForm(form);
      this.getUserList();
      return;

    } else {
      
      this.userService.putUser(form.value).subscribe((res) => {
        this.toastr.success('User details updated successfully');
      });
      this.resetForm(form);
      this.getUserList();
      this.EditOrAdd = "Add";

    }
  }

  //to edit the existing user details.
  editUser(usr: User) {
    this.userService.selectedUser = usr;
    this.EditOrAdd = 'Update';
  }

  //search users based on input key.
  searchUsers(searchKey: string) {
    this.userService.getSearchUserList(searchKey).subscribe((res) => {
      if ((res as User[]).length == 0) {
        this.toastr.warning('No Users found for search criteria');
      }
      this.userService.users = res as User[];
    });
  }

  //sort user details.
  sortUsers(sortKey: string) {
    this.userService.getSortUserList(sortKey).subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

  //delete existing user.
  deleteUser(usr: User) {
    this.userService.removeUser(usr).subscribe((res) => {
      this.toastr.success('User deleted Successfully');
    });
    this.getUserList();
    this.EditOrAdd = "Add";
  }

}
