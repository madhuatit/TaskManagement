import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AddTaskService } from '../shared/add-task.service';
import { ProjectService } from '../shared/project.service';
import { UserService } from '../shared/user.service';
import { AddTask, ParentTask } from '../shared/add-task.model';
import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';
import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [AddTaskService]
})

export class AddTaskComponent implements OnInit {

  modalRef: BsModalRef;
  projects: Array<Project>;
  parents: Array<ParentTask>;
  users: Array<User>;
  selectedProjId: number;
  selectedProjName: string;
  selectedProj: Project;
  searchText: string;
  selectedParentTask: string;
  selectedPar: ParentTask;
  showProj: boolean;
  showPar: boolean;
  showUsr: boolean;
  selectedUserName: string;
  selectedUsr: User;
  taskToAdd: AddTask;
  isParentTask: boolean;
  startDate: Date;
  endDate: Date;


  constructor(private projectService: ProjectService, private addTaskService: AddTaskService,
    private modalService: BsModalService, private route: ActivatedRoute,
    private userService: UserService, private toastr: ToastrService) {
    this.taskToAdd = new AddTask();
    this.isParentTask = false;
  }

  ngOnInit() {
    this.taskToAdd.Priotity = 0;
  }

  //reset the form
  resetTask() {
    this.taskToAdd = new AddTask();
    this.selectedProjName = null;
    this.isParentTask = false;
    this.startDate = null;
    this.endDate = null;
    this.selectedUserName = null;
    this.selectedParentTask = null;
    this.taskToAdd.Priotity = 0;
  }

  //adding a new task/Parent task.
  addTask() {
    if (!this.selectedProjName) {
      this.toastr.warning('Kindly select a project');
      return;
    }

    if (!this.taskToAdd.Task_Name) {
      this.toastr.warning('Kindly enter the Task Name');
      return;
    }

    if (!this.isParentTask) {
      if (!this.selectedParentTask) {
        this.toastr.warning('Kindly select the Parent Task');
        return;
      }

      if ((!this.startDate) || (!this.endDate)) {
        this.toastr.warning('Kindly select the StartDate & EndDate');
        return;
      }

      var strDt = moment(this.startDate).add(-1, 'months').toDate();
      var endDt = moment(this.endDate).add(-1, 'months').toDate();

      if (strDt > endDt) {
        this.toastr.warning('StartDate should be less than EndDate');
        return;
      }

      if (!this.selectedUserName) {
        this.toastr.warning('Kindly select the User');
        return;
      }

    }

    if (this.isParentTask) {
      console.log(this.taskToAdd.Task_Name);
      const newParent = <ParentTask>{
        Parent_Task: this.taskToAdd.Task_Name,
        Project_Id: this.taskToAdd.Project.Project_Id
      };
      this.addTaskService.postParentTask(newParent).subscribe((res) => {
        this.toastr.success('Parent Task Added successfully');
      });
      return;
    } else {

      this.taskToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.taskToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();
      this.addTaskService.postNewTask(this.taskToAdd).subscribe((res) => {
        this.toastr.success('Task Added successfully');
      });
      return;
    }
  }

  //if parent task checkbox selected.
  isParTaskChange($event) {

  }

  //search model of Users, Projects, Parenttasks.
  openModal(template: TemplateRef<any>, type: number) {

    if (type === 1) {

      this.projectService.getProjectList().subscribe((res) => {
        console.log(res);
        this.projects = res as Project[];
        this.modalRef = this.modalService.show(template);

      },
        (error) => {
          console.log(error);
        });

    } else if (type == 2) {

      this.addTaskService.getParentList().subscribe((res) => {
        this.parents = res as ParentTask[];
        this.modalRef = this.modalService.show(template);
      });
    } else if (type == 3) {

      this.userService.getUserList().subscribe((res) => {
        this.users = res as User[];
        this.modalRef = this.modalService.show(template);
      });
    }

  }

  //searching the list of users.
  searchUser(searchKey: string) {

    this.userService.getSearchUserList(searchKey).subscribe((res) => {
      this.users = res as User[];
    })
  }

  //setting user object.
  setIndexUser(usr: User) {
    this.selectedUsr = usr;
    this.searchText = usr.First_Name + ' ' + usr.Last_Name;
    this.showPar = false;
  }

  //cancel the user model
  cancelUser() {
    this.modalRef.hide();
    this.selectedUsr = null;

  }

  //select a user object.
  selectUser() {
    if (this.selectedUsr != null) {
      console.log(this.selectedUsr.User_Id);
      this.taskToAdd.User = this.selectedUsr;

      this.selectedUserName = this.selectedUsr.First_Name + ' ' + this.selectedUsr.Last_Name;
      this.selectedUsr = null;
      this.searchText = '';
      this.modalRef.hide();
    }
  }

  //searching the parent tasks.
  searchParent(searchKey: string) {

    this.addTaskService.getSearchParentList(searchKey).subscribe((res) => {
      this.parents = res as ParentTask[];
    })
  }

  //setting the parent task object.
  setIndexParent(par: ParentTask) {
    this.selectedPar = par;
    this.searchText = par.Parent_Task;
    this.showPar = false;
  }

  //cancel the parent model.
  cancelParent() {
    this.modalRef.hide();
    this.selectedPar = null;

  }

  //selecting the parent object.
  selectParent() {
    if (this.selectedPar != null) {
      console.log(this.selectedPar.Parent_Id);
      this.taskToAdd.Parent = this.selectedPar;

      this.selectedParentTask = this.selectedPar.Parent_Task;
      this.selectedPar = null;
      this.searchText = '';
      this.modalRef.hide();
    }
  }

  //searching the projects.
  searchProject(searchKey: string) {
    console.log('search value: ' + searchKey);

    this.projectService.getSearchProjectList(searchKey).subscribe((res) => {

      this.projects = res as Project[];

    });
  }

  //cancel the project model.
  cancelProj() {
    this.modalRef.hide();
    this.selectedProj = null;

  }

  //selecting the project object.
  selectProj() {
    if (this.selectedProj != null) {
      console.log(this.selectedProj.Project_Id);
      this.taskToAdd.Project = this.selectedProj;

      this.selectedProjName = this.selectedProj.Project_Name;
      this.selectedProj = null;
      this.searchText = '';
      this.modalRef.hide();
    }
  }

  //setting the project object.
  setIndexProj(proj: Project) {
    this.selectedProj = proj;
    this.searchText = proj.Project_Name;
    this.showProj = false;
  }
}
