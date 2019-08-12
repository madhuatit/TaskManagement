import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Response} from './response.model';
import { of, Observable } from 'rxjs';

import { AddTaskService } from './add-task.service';
import { AddTask, ParentTask} from './add-task.model';
import {Project} from './project.model';
import * as moment from 'moment'; 

describe('AddTaskService', () => {

  let service: AddTaskService;
  let addTaskService: AddTaskService;
  let userpostservice: AddTaskService;
  let httpGetSpy: {get: jasmine.Spy};
  let httpPostSpy: {post: jasmine.Spy};


  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [AddTaskService]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(AddTaskService);
    httpGetSpy = jasmine.createSpyObj('value', ['get']);
    httpPostSpy = jasmine.createSpyObj('value', ['post']);   
    
    addTaskService = new AddTaskService(<any>httpGetSpy);
    userpostservice = new AddTaskService(<any>httpPostSpy);
  })

  it('should be created', () => {
    const service: AddTaskService = TestBed.get(AddTaskService);
    expect(service).toBeTruthy();
  });

  it ('should add new Task', () => {
    var today = new Date();
    const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};

    const parentTask: ParentTask = {Parent_Id : 1, Parent_Task : 'Project BRD Parent', Project_Id: 1};

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

    httpPostSpy.post.and.returnValue(of(addTask));
    userpostservice.postNewTask(addTask).subscribe(
      data => {expect(addTask.Task_Name).toBe('Create BRD');
    });
  });

  it ('should add new ParentTask', () => {
    var today = new Date();
    const parentTask: ParentTask = {Parent_Id : 1, Parent_Task : 'Project BRD Parent', Project_Id: 1};
  

    httpPostSpy.post.and.returnValue(of(parentTask));
    userpostservice.postParentTask(parentTask).subscribe(
      data => {expect(parentTask.Parent_Task).toBe('Project BRD Parent');
    });
  });

  it ('should return all Parent Tasks', () => {
    var today = new Date();    
    const parentTasks: ParentTask[] = [{Parent_Id : 1, Parent_Task : 'Project BRD Parent', Project_Id: 1}];  

    httpGetSpy.get.and.returnValue(of(parentTasks));
    addTaskService.getParentList().subscribe(
      data => {expect(parentTasks.length).toEqual(1)}
    )
  });

  it ('should return searched Parent Tasks', () => {
    var today = new Date();    
    const parentTasks: ParentTask[] = [{Parent_Id : 1, Parent_Task : 'Project BRD Parent', Project_Id: 1}];  

    httpGetSpy.get.and.returnValue(of(parentTasks));
    addTaskService.getSearchParentList('Parent_Task').subscribe(
      data => {expect(parentTasks[0].Parent_Task).toBe('Project BRD Parent')}
    )
  });

  it ('should add new Task', () => {
    var today = new Date();
    const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};

    const parentTask: ParentTask = {Parent_Id : 1, Parent_Task : 'Project BRD Parent', Project_Id: 1};

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
  

    httpPostSpy.post.and.returnValue(of(addTask));
    userpostservice.postNewTask(addTask).subscribe(
      data => {expect(addTask.Task_Name).toBe('Create BRD');
    });
  });

});
