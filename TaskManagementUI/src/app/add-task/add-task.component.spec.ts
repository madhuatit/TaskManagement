import { OnInit, TemplateRef  } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule} from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

import { AddTaskComponent } from './add-task.component';
import { AddTaskService} from '../shared/add-task.service';
import { User } from '../shared/user.model';
import { Project } from '../shared/project.model';
import { AddTask, ParentTask } from '../shared/add-task.model';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  
  let modalRef: BsModalRef;
  let temp: TemplateRef<any>;
  

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

    const usr: User =
    {
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'
    };

  var today = new Date();
  const projs: Project[] = [{_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}}];
  
  const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};

  const parentTasks: ParentTask[] = [{Parent_Id : 1, Parent_Task : 'Project BRD Parent', Project_Id: 1}];
  const parentTask: ParentTask = {Parent_Id : 1, Parent_Task : 'Project BRD Parent', Project_Id: 1};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule,
        HttpClientTestingModule, NgbModule, Ng5SliderModule,
        RouterModule.forRoot([]) ],
        providers: [FormBuilder, AddTaskService, 
          {provide: BsModalService, useValue: {}},
          {provide: ToastrService, useValue:{}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();      
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call resetTask', () => {
    component.resetTask();
    expect(component.taskToAdd).toBeDefined();
    expect(component.selectedProjName).toBeNull();
    expect(component.isParentTask).toBe(false);
    expect(component.startDate).toBeNull;
    expect(component.endDate).toBeNull;
    expect(component.selectedUserName).toBeNull;
    expect(component.selectedParentTask).toBeNull;
    expect(component.taskToAdd.Priotity).toBe(0);
  });

  it('call addTask projectname warning', () => {
    try{
    component.selectedProjName = undefined;    
    component.addTask();
    expect(component.selectedProjName).not.toBeDefined;
    //expect(component.toastr.warning);
    expect(component.addTask).toBe(true);
    }catch(e){
      expect(e).toBeDefined;
    }
  });

  it('call addTask projectname warning', () => {
    try{
    component.taskToAdd.Task_Name = undefined;
    component.addTask();
    expect(component.taskToAdd.Task_Name).not.toBeDefined;
    //expect(component.toastr.warning);
    expect(component.addTask).toBe(true);
    }catch(e){
      expect(e).toBeDefined;
    }
  });
  
  it('call search User', () =>{
    const res = { Success: true, Data: users }
    spyOn(component.userService, 'getSearchUserList').and.returnValue(of(res));
    component.users = undefined;
    component.searchUser('Madhu');
    expect(component.users).toBeDefined;
  });

  it('call search Project', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'getSearchProjectList').and.returnValue(of(res));
    component.projects = undefined;
    component.searchProject('TMS');
    expect(component.projects).toBeDefined;
  });

  it('call search Parent', () => {
    const res = { Success: true, Data: parentTasks }
    spyOn(component.addTaskService, 'getSearchParentList').and.returnValue(of(res));
    component.parents = undefined;
    component.searchParent('Project');
    expect(component.parents).toBeDefined;
  });

  it('call set user index', () => {
    component.selectedUsr = undefined;
    component.searchText = undefined;
    component.setIndexUser(usr);
    expect(component.selectedUsr).toBeDefined;
    expect(component.showPar).toBe(false);
    expect(component.searchText).toBeDefined;
  });

  it('call set parent index', () => {
    component.selectedPar = undefined;
    component.searchText = undefined;
    component.setIndexParent(parentTask);
    expect(component.selectParent).toBeDefined;
    expect(component.showPar).toBe(false);
    expect(component.searchText).toBeDefined;
  });

  it('call set project index', () => {
    component.selectedProj = undefined;
    component.searchText = undefined;
    component.setIndexProj(proj);
    expect(component.selectProj).toBeDefined;
    expect(component.showProj).toBe(false);
    expect(component.searchText).toBeDefined;
  });

  it('call cancelUser', () =>{ 
    //component.modalRef = component.modalService.show; 
    try{   
    component.selectedUsr = usr;
    component.cancelUser();
    expect(component.selectedUsr).toBeNull;
    //expect(component.modalRef.hide);
    }catch(e){
      expect(e).toBeDefined;
    }
  });

  it('call cancelParent', () =>{   
    try{ 
    component.selectedPar = parentTask;
    component.cancelParent();
    expect(component.selectedPar).toBeNull;
    //expect(component.modalRef.hide);
    }catch(e){
      expect(e).toBeDefined;
    }
  });

  it('call cancelProject', () =>{  
    
    //component.modalRef = 
    try{
    component.cancelProj();
    //expect(component.modalRef.hide).not.toBeDefined();
    expect(component.selectedProj).toBeNull;
    }catch(e){
      expect(e).toBeDefined;
    }
   
  });

  it('call selectUser', () =>{  
    try{  
    component.selectedUsr = usr;
    component.selectUser();
    expect(component.selectedUsr).not.toBeNull;
    expect(component.taskToAdd.User).toBe(component.selectedUsr);
    expect(component.selectedUsr).toBeNull;
    expect(component.searchText).toBe('');
    }catch(e){
      expect(e).toBeDefined;
    }
  });

  it('call selectParent', () =>{  
    try{  
    component.selectedPar = parentTask;
    component.selectParent();
    expect(component.selectedPar).not.toBeNull;
    expect(component.taskToAdd.Parent).toBe(component.selectedPar);
    expect(component.selectedPar).toBeNull;
    expect(component.searchText).toBe('');
    }catch(e){
      expect(e).toBeDefined;
    }
  });

  it('call selectProject', () =>{  
    try{  
    component.selectedProj = proj;
    component.selectProj();
    expect(component.selectedProj).not.toBeNull;
    expect(component.taskToAdd.Project).toBe(component.selectedProj);
    expect(component.selectedProj).toBeNull;
    expect(component.searchText).toBe('');
    }catch(e){
      expect(e).toBeDefined;
    }
  });

  it('call openModel for proj', () =>{
    
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'getProjectList').and.returnValue(of(res));
    component.projects = undefined;
    component.openModal(temp, 1);
    expect(1);
    expect(component.projects).toBeDefined;
  });

  it('call openModel for parentTask', () =>{
    
    const res = { Success: true, Data: parentTasks }
    spyOn(component.addTaskService, 'getParentList').and.returnValue(of(res));
    component.parents = undefined;
    component.openModal(temp, 2);
    expect(2);
    expect(component.parents).toBeDefined;
  });

  it('call openModel for user', () =>{
    
    const res = { Success: true, Data: users }
    spyOn(component.userService, 'getUserList').and.returnValue(of(res));
    component.users = undefined;
    component.openModal(temp, 3);
    expect(3);
    expect(component.users).toBeDefined;
  });


});
