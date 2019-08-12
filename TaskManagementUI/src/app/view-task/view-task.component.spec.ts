import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule, Router,  } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewTaskComponent } from './view-task.component';
import { ViewTaskService} from '../shared/view-task.service';
import { AddTask } from '../shared/add-task.model';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let service: ViewTaskService;

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
});
