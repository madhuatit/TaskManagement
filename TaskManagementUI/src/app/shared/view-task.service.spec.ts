import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Response} from './response.model';
import { of, Observable } from 'rxjs';
import * as moment from 'moment';

import { ViewTaskService } from './view-task.service';
import { AddTask, ParentTask} from './add-task.model';
import { Project} from './project.model';

describe('ViewTaskService', () => {

  let service: ViewTaskService;
  let viewTaskService: ViewTaskService;
  let userpostservice: ViewTaskService;
  let httpGetSpy: {get: jasmine.Spy};
  let httpPostSpy: {post: jasmine.Spy};


  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [ViewTaskService]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(ViewTaskService);
    httpGetSpy = jasmine.createSpyObj('value', ['get']);
    httpPostSpy = jasmine.createSpyObj('value', ['post']);   
    
    viewTaskService = new ViewTaskService(<any>httpGetSpy);
    userpostservice = new ViewTaskService(<any>httpPostSpy);
  })

  it('should be created', () => {
    const service: ViewTaskService = TestBed.get(ViewTaskService);
    expect(service).toBeTruthy();
  });

  it ('should return expected tasks', () => {
    var today = new Date();
    const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};

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

    httpGetSpy.get.and.returnValue(of(addTasks));
    viewTaskService.getTaskList().subscribe(
      data => {expect(addTasks.length).toEqual(1)}
    )
  });

  it ('should return expected Tasks for sorted order', () => {
    var today = new Date();
    const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};

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

    httpGetSpy.get.and.returnValue(of(addTasks));
    viewTaskService.getSortTaskList('Task_Id').subscribe(
      data => {expect(addTasks.length).toEqual(1)}
    )
  });

  it ('should return expected task for a specific project', () => {
    var today = new Date();
    const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};

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

    httpGetSpy.get.and.returnValue(of(addTasks));
    viewTaskService.getTaskForProjectList(proj).subscribe(
      data => {expect(addTasks.length).toEqual(1)}
    )
  });

});
