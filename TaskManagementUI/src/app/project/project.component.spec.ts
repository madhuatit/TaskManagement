import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OnInit, TemplateRef  } from '@angular/core';
import { ProjectService} from '../shared/project.service';

import { FormsModule, ReactiveFormsModule, NgModel  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { Routes, RouterModule, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


import { ProjectComponent } from './project.component';
import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let service: ProjectService;
  let modalRef: BsModalRef;
  let temp: TemplateRef<any>;

  var today = new Date();
  const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};

  const projs: Project[] = [{_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}}];

    const users: User[] =
    [{
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'
    }];

    const user: User =
    {
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent ],
      imports: [
        FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule,
         NgbModule, Ng5SliderModule, RouterModule.forRoot([])
      ],
      providers: [FormBuilder, ProjectService,
        {provide: BsModalService, useValue: {}},
        {provide: ToastrService, useValue:{}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('call resetUserForm', () => {
    component.resetForm();
    expect(component.isEdit).toBe(false);
  });

  it('call setIndexUser', () => {
    component.setIndexUser(user);
    expect(component.selectedUser);
  });

  it('call sortProject', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'getSortProjectList').and.returnValue(of(res));
    component.projectService.projects = undefined;
    component.sortProject('Proejct_Name');
    expect(component.projectService.projects).toBeDefined;
  });

  it('call searchProject', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'getSearchProjectList').and.returnValue(of(res));
    component.projectService.projects = undefined;
    component.searchProject('TMS');
    expect(component.projectService.projects).toBeDefined;
  });

  it('call suspendProject', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'removeProject').and.returnValue(of(res));
    
    component.suspendProject(proj);
    expect(component.resetForm);
    expect(component.getProjectList);
  });

  it('call getProjects', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'getProjectList').and.returnValue(of(res));
    component.projectService.projects = undefined;
    component.getProjectList();
    expect(component.projectService.projects).toBeDefined;
  });

  it('call openModel for proj', () =>{
    
    const res = { Success: true, Data: users }
    spyOn(component.userService, 'getUserList').and.returnValue(of(res));
    component.users = undefined;
    component.openModal(temp, 1);
    expect(1);
    expect(component.users).toBeDefined;
  });

  it('call editProject', () =>{
    component.projectToAdd = undefined;
    component.users = undefined;
    const res = { Success: true, Data: users }
    spyOn(component.userService, 'getUserList').and.returnValue(of(res));
    component.editProject(proj);
    expect(component.EditOrAdd).toBe('Update');
    expect(component.projectToAdd).toBeDefined;
    expect(component.users).toBeDefined;
  });

  it('call cancel user', () =>{
    try{
    component.cancelUser();
    //expect(component.modalRef.hide);
    expect(component.selectedUser).toBeNull;
    }catch(e)
{
  expect(e).toBeDefined;
}  });

  it('call select user', ()=>{
    component.searchText=undefined
    component.selectedUser = user;
    component.selectUser();
    expect(component.selectedUser).not.toBeNull;
    expect(component.projectToAdd.User).toBeDefined;
    expect(component.searchText).toBeDefined;
    expect(component.selectedUsr).toBeNull;

  })

});
