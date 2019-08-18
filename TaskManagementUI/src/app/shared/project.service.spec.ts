import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Response} from './response.model';
import { of, Observable } from 'rxjs';

import { ProjectService } from './project.service';
import { Project} from './project.model';
import * as moment from 'moment'; 

describe('ProjectService', () => {

  let service: ProjectService;
  let projectService: ProjectService;
  let userpostservice: ProjectService;
  let httpGetSpy: {get: jasmine.Spy};
  let httpPostSpy: {post: jasmine.Spy};
  let httpPutSpy: {put: jasmine.Spy};


  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [ProjectService]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(ProjectService);
    httpGetSpy = jasmine.createSpyObj('value', ['get']);
    httpPostSpy = jasmine.createSpyObj('value', ['post']);   
    
    projectService = new ProjectService(<any>httpGetSpy);
    userpostservice = new ProjectService(<any>httpPostSpy);
  })

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it ('should return all Projects', () => {
    var today = new Date();    
    const projs: Project[] = [{_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}}];  

    httpGetSpy.get.and.returnValue(of(projs));
    projectService.getProjectList().subscribe(
      data => {expect(projs.length).toEqual(1)}
    )
  });

  it ('should return searched Projects', () => {
    var today = new Date();    
    const projs: Project[] = [{_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}}];  

    httpGetSpy.get.and.returnValue(of(projs));
    projectService.getSearchProjectList('Project_Name').subscribe(
      data => {expect(projs[0].Project_Name).toBe('TMS')}
    )
  });

  it ('should return sorted Projects', () => {
    var today = new Date();    
    const projs: Project[] = [{_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}}];  

    httpGetSpy.get.and.returnValue(of(projs));
    projectService.getSortProjectList('Project_Name').subscribe(
      data => {expect(projs[0].Project_Name).toBe('TMS')}
    )
  });

  it ('should add a new project', () => {
    var today = new Date();    
    const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};  

    httpPostSpy.post.and.returnValue(of(proj));
    userpostservice.postNewProject(proj).subscribe(
      data => {expect(proj.Project_Name).toBe('TMS')}
    )
  });

  it ('should update a project', () => {
    var today = new Date();    
    const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};  

    httpPostSpy.post.and.returnValue(of(proj));
    userpostservice.putProject(proj).subscribe(
      data => {expect(proj.Project_Name).toBe('TMS')}
    )
  });

  it ('should remove a project', () => {
    var today = new Date();    
    const proj: Project = {_id: '5d4b781546ec9c1f24548853', Project_Id: 1, Project_Name: 'TMS',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'Madhu Ranjan', Last_Name: 'Vannia Rajan', Employee_Id: 12345,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};  

    httpGetSpy.get.and.returnValue(of(proj));
    projectService.removeProject(proj).subscribe(
      data => {expect(proj.Project_Name).toBe('TMS')}
    )
  });

});
