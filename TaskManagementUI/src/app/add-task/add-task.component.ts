import { Component, OnInit, TemplateRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AddTaskService} from '../shared/add-task.service';
import { ProjectService} from '../shared/project.service';
import { UserService } from '../shared/user.service';
import { AddTask, ParentTask} from '../shared/add-task.model';
import { NgForm } from '@angular/forms';
import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';

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
  selectedProj :Project;
  searchText: string;
  selectedParentTask: string;
  selectedPar: ParentTask;
  showProj : boolean;
  showPar: boolean;
  showUsr: boolean;
  selectedUserName: string;
  selectedUsr: User;
  taskToAdd : AddTask;
  isParentTask : boolean;
  startDate: Date;
  endDate: Date;
  

  constructor(private projectService: ProjectService, private addTaskService: AddTaskService, 
    private modalService: BsModalService, private route: ActivatedRoute, 
    private userService: UserService) { 
    this.taskToAdd = new AddTask();
    this.isParentTask = false;
    
  }

  ngOnInit() {
    //this.activeModal.close(ProjectSearchComponent);
  }
  addTask(){
    if(this.isParentTask){
      console.log(this.taskToAdd.Task_Name);
      const newParent = <ParentTask>{
        Parent_Task  : this.taskToAdd.Task_Name,
        Project_Id   : this.taskToAdd.Project.Project_Id
      };
      this.addTaskService.postParentTask(newParent).subscribe((res) => {
        console.log('add parent');
      });
    }else{
      console.log(this.isParentTask);
      console.log('Dates: ' + this.startDate.toString);
      this.taskToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.taskToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();
      this.addTaskService.postNewTask(this.taskToAdd).subscribe((res) => {
        console.log('add Task completed');
      });
    }
  }

  isParTaskChange($event){
    console.log('parent task changed to '+ this.isParentTask);
  }

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

    }else if(type == 2){

      this.addTaskService.getParentList().subscribe((res) => {
        this.parents = res as ParentTask[];
        this.modalRef = this.modalService.show(template);
      });
    }else if(type == 3){

      this.userService.getUserList().subscribe((res) => {
        this.users = res as User[];
        this.modalRef = this.modalService.show(template);
      });
    }
    
  }

  searchUser(searchKey: string){

    this.userService.getSearchUserList(searchKey).subscribe((res) =>{
      this.users = res as User[];
    })
  }

  setIndexUser(usr: User) {
    this.selectedUsr = usr;
    this.searchText = usr.First_Name + ' ' + usr.Last_Name;
    this.showPar = false;
  }

  cancelUser(){
    this.modalRef.hide();
    this.selectedUsr=null;
    
  }

  selectUser() {
    if(this.selectedUsr != null)
    {
      console.log(this.selectedUsr.User_Id);
    this.taskToAdd.User = this.selectedUsr;
      
    this.selectedUserName = this.selectedUsr.First_Name + ' ' + this.selectedUsr.Last_Name;
    this.selectedUsr = null;
    this.searchText ='';
    this.modalRef.hide();
    }
  }

  searchParent(searchKey: string){

    this.addTaskService.getSearchParentList(searchKey).subscribe((res) =>{
      this.parents = res as ParentTask[];
    })
  }

  setIndexParent(par: ParentTask) {
    this.selectedPar = par;
    this.searchText = par.Parent_Task;
    this.showPar = false;
  }

  cancelParent(){
    this.modalRef.hide();
    this.selectedPar=null;
    
  }

  selectParent() {
    if(this.selectedPar != null)
    {
      console.log(this.selectedPar.Parent_Id);
    this.taskToAdd.Parent = this.selectedPar;
      
    this.selectedParentTask = this.selectedPar.Parent_Task;
    this.selectedPar = null;
    this.searchText ='';
    this.modalRef.hide();
    }
  }

  searchProject(searchKey: string){
    console.log('search value: ' + searchKey);
    
    this.projectService.getSearchProjectList(searchKey).subscribe((res) =>{
      
      this.projects = res as Project[];
      
    });
  }

  cancelProj(){
    this.modalRef.hide();
    this.selectedProj=null;
    
  }

  selectProj() {
    if(this.selectedProj != null)
    {
      console.log(this.selectedProj.Project_Id);
    this.taskToAdd.Project = this.selectedProj;
      
    this.selectedProjName = this.selectedProj.Project_Name;
    this.selectedProj = null;
    this.searchText ='';
    this.modalRef.hide();
    }
  }

  setIndexProj(proj: Project) {
    this.selectedProj = proj;
    this.searchText = proj.Project_Name;
    this.showProj = false;
  }

  

}
