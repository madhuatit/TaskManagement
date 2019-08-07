import { Component, OnInit, TemplateRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AddTaskService} from '../shared/add-task.service';
import { UserService } from '../shared/user.service';
import { NgForm, FormGroup } from '@angular/forms';
import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';
import { ProjectService} from '../shared/project.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {

  modalRef: BsModalRef;
  EditOrAdd: String;
  projectToAdd: Project;
  isStartEndDate: boolean;
  selectedUserName: string;
  selectedUser: User;
  searchText: string;
  selectedUsr: User;
  users: Array<User>;
  startDate: Date;
  endDate: Date;
  isEdit: boolean;
  editProjectId: number;
  userObjId: string;


  constructor(private projectService: ProjectService, private modelService: BsModalService,
    private userService: UserService) { 
    this.EditOrAdd = "Add";
    this.projectToAdd = new Project();
  }

  ngOnInit() {
    this.EditOrAdd = "Add";
    this.getProjectList();
    this.isEdit = false;
  }
  openModal(template: TemplateRef<any>, type: number) {
    
    if (type === 1) {
            
      this.userService.getUserList().subscribe((res) => {
        console.log(res);
        this.users = res as User[];
        this.modalRef = this.modelService.show(template);
        
      },
        (error) => {
          console.log(error);
        });

    }
    
  }

  selectUser(){
    if(this.selectedUsr != null)
    {
      console.log(this.selectedUsr.User_Id);
    this.projectToAdd.User = this.selectedUsr;
      
    this.selectedUserName = this.selectedUsr.First_Name + ' ' + this.selectedUsr.Last_Name;
    this.selectedUsr = null;
    this.searchText ='';
    this.modalRef.hide();
    }
  }

  cancelUser(){
    this.modalRef.hide();
    this.selectedUsr=null;
    
  }

  setIndexUser(usr: User) {
    this.selectedUsr = usr;
    this.searchText = usr.First_Name + ' ' + usr.Last_Name;
    
  }

  getProjectList(){
    this.projectService.getProjectList().subscribe((res) =>{
      console.log('received project rec. : ' + res);
      this.projectService.projects = res as Project[];
    });
  }

  addUpdateProject(){

    if(!this.isEdit){
      this.projectToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.projectToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();
      console.log('project Start Date: ' + this.projectToAdd.Project_Name);
      this.projectService.postNewProject(this.projectToAdd).subscribe((res) => {
        console.log('add Project completed');
      });
      this.getProjectList();
      this.resetForm();
    }else{
      this.projectToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.projectToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();
      console.log('project Start Date: ' + this.projectToAdd.Project_Name);
      this.projectToAdd.Project_Id = this.editProjectId;
      this.projectService.putProject(this.projectToAdd).subscribe((res) => {
        console.log('add Project completed');
      });
      this.getProjectList();
      this.resetForm();
    }  
  }

  searchProject(searchKey: string){
    console.log('search value: ' + searchKey);
    this.projectService.getSearchProjectList(searchKey).subscribe((res) =>{
      this.projectService.projects = res as Project[];
    });
  }

  sortProject(sortKey: string){
    console.log('sort Key: ' + sortKey);
    this.projectService.getSortProjectList(sortKey).subscribe((res) => {
      this.projectService.projects = res as Project[];
    })
  }

  editProject(project: Project){
    this.EditOrAdd = "Update";
    this.projectToAdd = project;
    this.userService.getUserList().subscribe((res)=>{
      this.users = res as User[];
      //console.log(this.users[0].User_Id);
      this.selectedUserName = this.users.find(
        x=> x._id === project.User.toString()).First_Name;
        console.log(this.selectedUserName);
    });
    
    //this.userService.getSearchUserList();
    this.selectedUserName = project.User.First_Name + '' + project.User.Last_Name;
    this.isStartEndDate = true;
    let newStartDate = new Date(this.projectToAdd.Start_Date);
    var projstartDate, projendDate;

    projstartDate = <NgbDateStruct>{ year  : newStartDate.getFullYear(), month : newStartDate.getMonth() + 1,day   : newStartDate.getDate()  };
    this.startDate = projstartDate;
    projendDate = <NgbDateStruct>{ year  : newStartDate.getFullYear(), month : newStartDate.getMonth() + 1,day   : newStartDate.getDate()  };
    this.endDate = projendDate;
    this.isEdit = true;
    this.editProjectId = project.Project_Id;
    
    
  }

  suspendProject(project: Project){
    this.projectService.removeProject(project).subscribe((res) => {
      console.log('deleted');
      this.resetForm();
      this.getProjectList();
    });
  }

  resetForm(){
    this.projectToAdd = new Project();
    this.isEdit = false;
    this.EditOrAdd = "Add";
    this.selectedUserName="";
    this.isStartEndDate=false;
    this.projectToAdd.Priority=0;
    this.startDate = new Date();
    this.endDate = new Date();
    this.getProjectList();
  }

}
