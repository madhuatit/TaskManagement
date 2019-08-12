import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Response} from './response.model';
import { of, Observable } from 'rxjs';
import { User} from './user.model';

import { UserService } from './user.service';

describe('UserService', () => {

  let service: UserService;
  let userservice: UserService;
  let userpostservice: UserService;
  let httpGetSpy: {get: jasmine.Spy};
  let httpPostSpy: {post: jasmine.Spy};

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(UserService);
    httpGetSpy = jasmine.createSpyObj('value', ['get']);
    httpPostSpy = jasmine.createSpyObj('value', ['post']);   
    
    userservice = new UserService(<any>httpGetSpy);
    userpostservice = new UserService(<any>httpPostSpy);
  })

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

   it ('should return expected Users', () => {
    const users: User[] = [{
        User_Id: 1,
        First_Name: 'Madhu Ranjan',
        Last_Name: 'Vannia Rajan',
        Employee_Id: 12345,        
        Project_Id: 1212,
        Task_Id: 0,
        _id: '5d4b781546ec9c1f24548852'

    }];

    httpGetSpy.get.and.returnValue(of(users));
    userservice.getUserList().subscribe(
      data => {expect(users.length).toEqual(1)}
    )
  }); 

  it ('should return expected User in getUserForId', () => {
    const user: User = {
        User_Id: 1,
        First_Name: 'Madhu Ranjan',
        Last_Name: 'Vannia Rajan',
        Employee_Id: 12345,        
        Project_Id: 1212,
        Task_Id: 0,
        _id: '5d4b781546ec9c1f24548852'

    };

    httpGetSpy.get.and.returnValue(of(user));
    userservice.getUserForId(user._id).subscribe(
      data => {expect(user.First_Name).toBe('Madhu Ranjan')}
    )
  }); 

  it ('should add new User', () => {
    const user: User = {
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,        
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'
    };

    httpPostSpy.post.and.returnValue(of(user));
    userpostservice.postUser(user).subscribe(
      data => {expect(user.First_Name).toBe('Madhu Ranjan')
    });
  });

  it ('should return expected search User', () => {
    const users: User[] = [{
        User_Id: 1,
        First_Name: 'Madhu Ranjan',
        Last_Name: 'Vannia Rajan',
        Employee_Id: 12345,        
        Project_Id: 1212,
        Task_Id: 0,
        _id: '5d4b781546ec9c1f24548852'

    }];

    httpGetSpy.get.and.returnValue(of(users));
    userservice.getSearchUserList('Madhu').subscribe(
      data => {expect(users.length).toEqual(1)}
    )
  }); 

  it ('should return expected sort User List', () => {
    const users: User[] = [{
        User_Id: 1,
        First_Name: 'Madhu Ranjan',
        Last_Name: 'Vannia Rajan',
        Employee_Id: 12345,        
        Project_Id: 1212,
        Task_Id: 0,
        _id: '5d4b781546ec9c1f24548852'

    }];

    httpGetSpy.get.and.returnValue(of(users));
    userservice.getSortUserList('First_Name').subscribe(
      data => {expect(users.length).toEqual(1)}
    )
  }); 

  /* it ('should update existing user', () => {
    const user: User = {
      User_Id: 1,
      First_Name: 'Madhu Ranjan',
      Last_Name: 'Vannia Rajan',
      Employee_Id: 12345,        
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'
    };

    httpPostSpy.post.and.returnValue(of(user));
    userpostservice.putUser(user).subscribe(
      data => {expect(user.User_Id).toEqual(1)
    });
  }); */

});
