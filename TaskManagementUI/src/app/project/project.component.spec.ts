import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectService} from '../shared/project.service';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { Routes, RouterModule, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let service: ProjectService;

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
});
