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
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  buttonName: string;


  constructor(public projectService: ProjectService, public addTaskService: AddTaskService,
    public modalService: BsModalService, private route: ActivatedRoute,
    public userService: UserService, public toastr: ToastrService) {
    this.taskToAdd = new AddTask();
    this.isParentTask = false;
    

    if (route.snapshot.params['task']) {
      this.taskToAdd = JSON.parse(route.snapshot.params['task']);
      let updStrtDt = new Date(this.taskToAdd.Start_Date);
      let updEndDt = new Date(this.taskToAdd.End_Date);
      var tskStrtDate, tskEndDate;

      tskStrtDate = <NgbDateStruct>{ year  : updStrtDt.getFullYear(), month : updStrtDt.getMonth() + 1,day   : updStrtDt.getDate()  };
      this.startDate = tskStrtDate;
      tskEndDate = <NgbDateStruct>{ year  : updEndDt.getFullYear(), month : updEndDt.getMonth() + 1,day   : updEndDt.getDate()  };
      this.endDate = tskEndDate;

      this.selectedParentTask = this.taskToAdd.Parent.Parent_Task;

      this.userService.getUserList().subscribe((res)=>{
        this.users = res.Data as User[];
        this.selectedUserName = this.users.find(
          x=> x._id === this.taskToAdd.User.toString()).First_Name;        
      });

      this.projectService.getProjectList().subscribe((res) =>{
        this.projects = res as Project[];
        this.selectedProjName = this.projects.find(
          x=> x._id === this.taskToAdd.Project.toString()).Project_Name;
        
      });

      this.buttonName = 'Update';

    }else{
      this.buttonName = 'AddTask';
    }
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
    this.buttonName = 'AddTask';
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
        this.projects = res as Project[];
        this.modalRef = this.modalService.show(template);

      },
        (error) => {
        });

    } else if (type == 2) {

      this.addTaskService.getParentList().subscribe((res) => {
        this.parents = res as ParentTask[];
        this.modalRef = this.modalService.show(template);
      });
    } else if (type == 3) {

      this.userService.getUserList().subscribe((res) => {
        this.users = res.Data as User[];
        this.modalRef = this.modalService.show(template);
      });
    }

  }

  //searching the list of users.
  searchUser(searchKey: string) {

    this.userService.getSearchUserList(searchKey).subscribe((res) => {
      this.users = res.Data as User[];
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
      this.taskToAdd.Parent = this.selectedPar;

      this.selectedParentTask = this.selectedPar.Parent_Task;
      this.selectedPar = null;
      this.searchText = '';
      this.modalRef.hide();
    }
  }

  //searching the projects.
  searchProject(searchKey: string) {

    this.projectService.getSearchProjectList(searchKey).subscribe((res) => {

      this.projects = res as Project[];

    });
  }

  //cancel the project model.
  cancelProj() {
    
    this.selectedProj = null;
    this.modalRef.hide();

  }

  //selecting the project object.
  selectProj() {
    if (this.selectedProj != null) {
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
