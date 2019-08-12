import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule, Router } from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";
import { Ng5SliderModule } from 'ng5-slider';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';

import { AddTaskComponent } from './add-task.component';
import { AddTaskService} from '../shared/add-task.service';
import { ProjectService} from '../shared/project.service';
import { UserService} from '../shared/user.service';
import { AddTask, ParentTask} from '../shared/add-task.model';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let service: AddTaskService;

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
});
