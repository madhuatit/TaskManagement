import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router,  } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Project} from '../shared/project.model';
import { Observable, of } from 'rxjs';
import { Component, OnInit, TemplateRef  } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewTaskComponent } from './view-task.component';
import { ViewTaskService} from '../shared/view-task.service';
import { AddTask, ParentTask } from '../shared/add-task.model';
import { NgTemplateOutlet } from '@angular/common';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let service: ViewTaskService;
  

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

    const parentTask: ParentTask = {Parent_Id : 1, Parent_Task : 'Project BRD Parent', Project_Id: 1};

    const addTasks: AddTask[] = [{
      Status : 0,
      Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
      End_Date: moment(today.getDate()+25).add(-1, 'months').toDate(),
      Priotity: 2,
      Project: proj,
      Task_Id: 1,
      Parent: parentTask,
      Task_Name: 'Create BRD',
      User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
        Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}
    }];

    const addTask: AddTask = {
      Status : 0,
      Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
      End_Date: moment(today.getDate()+25).add(-1, 'months').toDate(),
      Priotity: 2,
      Project: proj,
      Task_Id: 1,
      Parent: parentTask,
      Task_Name: 'Create BRD',
      User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
        Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}
    };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent ],
      imports: [
        FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule
      ],
      providers: [FormBuilder, ViewTaskService,
      {provide: BsModalService, useValue: {}}, 
      {provide: ActivatedRoute, useValue: {}},
      {provide: ToastrService, useValue:{}},
      {provide: Router, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ViewTaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call editTask success', () => {
    //spyOn(component,'editTask').arguments(addTask);
    component.editTask(addTask);
  });

  it('call complete success', () => {
    component.completeTask(addTask);
    expect(component.updTask).toBeDefined();
    expect(component.updTask.Status).toBe(1);
    spyOn(component.viewTaskService, 'putTask');
    //component.completeTask(addTask);
    expect(component.refreshTaskList);
  });

  it('call sortTask with success', () => {

    const res = { Success: true, Data: addTasks }
    spyOn(component.viewTaskService, 'getSortTaskList').and.returnValue(of(res));
    //expect(component.toastr.success);
    component.viewTaskService.tasks = undefined;
    component.sortTask('Task_Name');
    expect(component.viewTaskService.tasks).toBeDefined();
  });

  it('call setIndex with success', () => {

    const res = { Success: true, Data: proj }
    //spyOn(component.viewTaskService, 'getSortTaskList').and.returnValue(of(res));
    //expect(component.toastr.success);
    //component.viewTaskService.tasks = undefined;
    component.setIndexProj(proj);
    expect(component.selectProj).toBeDefined();
    expect(component.searchText).toEqual(proj.Project_Name);
  });

  it('call selectProj with success', () => {

    const res = { Success: true, Data: proj }
    //spyOn(component.viewTaskService, 'getSortTaskList').and.returnValue(of(res));
    //expect(component.toastr.success);
    //component.viewTaskService.tasks = undefined;
    component.selectedProj = proj;
    component.selectProj();
    expect(component.selectedProj).not.toBeNull;
    //expect(component.modalRef.hide);
    //expect(component.searchText).toEqual(proj.Project_Name);
  });

  it('call cancelProj', () => {
    component.cancelProj();
    //component.modalRef.hide();
    component.selectedProj = null;
    expect(component.selectedProj).toBeNull;
    //expect(component.searchText).toEqual(proj.Project_Name);
  });

  it('call refereshTaskList', () => {
    const res = addTasks;
    spyOn(component.viewTaskService, "getTaskList").and.returnValue(of(res));
    component.viewTaskService.tasks = undefined;
    component.refreshTaskList();
    expect(component.viewTaskService.tasks).toBeDefined();
  });

  it('call OpenModel', () => {
    var tem: TemplateRef<void>;
   // tem = new NgTemplate(null);
   const res = { Success: true, Data: projs }
    component.openModal(tem, 1);
    spyOn(component.projectService, 'getProjectList').and.returnValue(of(res));
    expect(component.projects).toBeDefined();
  });  

});
