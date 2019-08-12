import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../shared/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Response } from '../shared/response.model';
import { ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';


import { UserComponent } from './user.component';
import { ToastrService } from 'ngx-toastr';
import { User} from '../shared/user.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let service: UserService;
  let toastr: ToastrService;
  const USERS : any = 
    { User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,        
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule ],
      providers: [FormBuilder, UserService,
        {provide: BsModalService, useValue: {}}, 
        {provide: ActivatedRoute, useValue: {}},
        {provide: ToastrService, useValue:{}},
        {provide: Router, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('call resetUserForm',() => {
    component.resetForm;
    expect (component.EditOrAdd).toEqual('Add');
    
  })

  /*it ('retriveUserList component show user details', () => {
    const user: User[] = [{
      User_Id: 1,
      First_Name: 'Abdul',
      Last_Name: 'Kalam',
      Employee_Id: 12345,
      Project_Id: 1,
      Task_Id:1,
      _id: 'xcv'
    }];
    
    component.ngOnInit();
    component.getUserList();
    fixture.detectChanges();

    fixture.whenStable().then( ()=> {
      const idelement: HTMLInputElement = fixture.debugElement.query(By.css('#employeeId')).nativeElement;
      const firstnameelement: HTMLInputElement = fixture.debugElement.query(By.css('#firstName')).nativeElement;
      const lastnameelement: HTMLInputElement = fixture.debugElement.query(By.css('#lastName')).nativeElement;
            
      expect(firstnameelement.value).toContain(user[0].First_Name);
      expect(lastnameelement.value).toContain(user[0].Last_Name);
    })
  })

   it('call deleteUser when an User is deleted', () => {
    const spy = spyOn(service, 'postUser').and.returnValues(Observable.of(USERS));
    
    const user: User = {
      User_Id: 1,
      First_Name: 'Abdul',
      Last_Name: 'Kalam',
      Employee_Id: 12345,
      Project_Id: 1,
      Task_Id:1,
      _id: 'xcv'
    };

    const User_Id=1;
    component.deleteUser(user)
    expect(spy).toHaveBeenCalledWith(user);
  }); 

  it('call addUser when a new User is added', () => {
    const spy = spyOn(service, 'postUser').and.returnValues(Observable.of(USERS));
    
    component.EditOrAdd = 'Add';
    expect(spy).toHaveBeenCalled();
    component.getUserList();
  }); */

  it('call deleteUser when an User is deleted', () => {
    const user: User = {
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,
      Project_Id: 1,
      Task_Id:1,
      _id: 'xcv'
    };

    component.deleteUser(user);
    spyOn(service, 'removeUser').and.returnValue(of({Success: true, Data: user}));
    
    component.EditOrAdd="Add";
  });

  it('call deleteUser when an User is deleted', () => {
    const user: User = {
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,
      Project_Id: 1,
      Task_Id:1,
      _id: 'xcv'
    };

    component.deleteUser(user);
    spyOn(service, 'removeUser').and.returnValue(of({Success: false, Data: user, Message: ''}));
    
    component.EditOrAdd="Add";
  });

  it('call sortUser when users are sorted', () => {
    const users: User[] = [{
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,
      Project_Id: 1,
      Task_Id:1,
      _id: 'xcv'
    }];

    component.sortUsers('First_Name');
    spyOn(service, 'getSortUserList').and.returnValue(of({Success: true, Data: users}));
    //component.EditOrAdd="Add";
    expect(component.EditOrAdd).toBe('Add');
  });

  it('call search Users when users are searched', () => {
    const users: User[] = [{
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,
      Project_Id: 1,
      Task_Id:1,
      _id: 'xcv'
    }];

    component.searchUsers('First_Name');
    spyOn(service, 'getSearchUserList').and.returnValue(of({Success: true, Data: users}));
    expect({Success: true});
    //component.EditOrAdd="Add";
    expect(component.EditOrAdd).toBe('Add');
  });

});
