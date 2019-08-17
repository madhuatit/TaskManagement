import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '../shared/user.service';
import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';
import { ProjectService} from '../shared/project.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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


  constructor(public projectService: ProjectService, public modelService: BsModalService,
    public userService: UserService, public toastr: ToastrService) { 
    this.EditOrAdd = "Add";
    this.projectToAdd = new Project();
  }

  ngOnInit() {
    this.EditOrAdd = "Add";
    this.getProjectList();
    this.isEdit = false;
    this.projectToAdd.Priority=0;    
  }

  //open the User Pop-Up to select User.
  openModal(template: TemplateRef<any>, type: number) {    
    if (type === 1) {            
      this.userService.getUserList().subscribe((res) => {
        this.users = res.Data as User[];
        this.modalRef = this.modelService.show(template);        
      },
        (error) => {
          this.toastr.error(error);
        });
    }    
  }

  //selected user name displayed with FirstName + LastName together.
  selectUser(){
    if(this.selectedUsr != null)
    {      
    this.projectToAdd.User = this.selectedUsr;      
    this.selectedUserName = this.selectedUsr.First_Name + ' ' + this.selectedUsr.Last_Name;
    this.selectedUsr = null;
    this.searchText ='';
    this.modalRef.hide();
    }
  }

  //cancel pop-up of selecting user.
  cancelUser(){
    this.modalRef.hide();
    this.selectedUsr=null;    
  }

  //selecting the User object index.
  setIndexUser(usr: User) {
    this.selectedUsr = usr;
    this.searchText = usr.First_Name + ' ' + usr.Last_Name;    
  }

  //retrieve all the project list.
  getProjectList(){
    this.projectService.getProjectList().subscribe((res) =>{      
      this.projectService.projects = res as Project[];
    });
  }

  //Add or Update a Project.
  addUpdateProject(){

    if((!this.projectToAdd.Project_Name) || (this.projectToAdd.Project_Name === '')){
      this.toastr.warning('Project Name cannot be empty');
      return;
    }

    if(this.isStartEndDate){
      if((!this.startDate) || (!this.endDate)){
        this.toastr.warning('Kindly Provide StartDate/EndDate');
        return;
      }
    }

    if(!this.selectedUserName){
      this.toastr.warning('Kindly select User for the Project');
      return;
    }

    var strDt = moment(this.startDate).add(-1, 'months').toDate();
    var endDt = moment(this.endDate).add(-1, 'months').toDate();

    if(strDt > endDt){
      this.toastr.warning('Start Date should be less than End Date');
      return;
    }
    if(!this.isEdit){
      this.projectToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.projectToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();
      
      this.projectService.postNewProject(this.projectToAdd).subscribe(res => {
        this.toastr.success('Project Added Successfully');
        
      });
      this.getProjectList();
      this.resetForm();
      return;
      
      
    }else if(this.isEdit){
      this.projectToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.projectToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();
      
      this.projectToAdd.Project_Id = this.editProjectId;
      this.projectService.putProject(this.projectToAdd).subscribe((res) => {
        this.toastr.success('Project Updated Successfully');
      });
      this.getProjectList();
      this.resetForm();
    }  
  }

  //Search Projects based on input key.
  searchProject(searchKey: string){
    this.projectService.getSearchProjectList(searchKey).subscribe((res) =>{
      if((res as Project[]).length == 0){
        this.toastr.warning('No Projects found for search criteria');
      }
      this.projectService.projects = res as Project[];
    });
  }

  //sort the Project
  sortProject(sortKey: string){
    this.projectService.getSortProjectList(sortKey).subscribe((res) => {
      this.projectService.projects = res as Project[];
    });
  }

  //Update the selected project.
  editProject(project: Project){
    this.EditOrAdd = "Update";
    this.projectToAdd = project;
    this.userService.getUserList().subscribe((res)=>{
      this.users = res.Data as User[];
      this.selectedUserName = this.users.find(
        x=> x._id === project.User.toString()).First_Name;        
    });
    
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

  //suspend the project permenantly
  suspendProject(project: Project){
    this.projectService.removeProject(project).subscribe((res) => {
      this.toastr.success('Project Suspended Successfully.');      
    });
    this.resetForm();
    this.getProjectList();
  }

  //reset the Add Project Form.
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
