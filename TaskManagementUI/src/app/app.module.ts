import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ProjectSearchComponent } from './project/project-search/project-search.component';
import { ProjectService } from './shared/project.service';
import { UserService } from './shared/user.service';
import { AddTaskService } from './shared/add-task.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    UserComponent,
    ProjectComponent,
    AddTaskComponent,
    ProjectSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    Ng5SliderModule
    
  ],
  providers: [ProjectService, UserService, AddTaskService],
  bootstrap: [AppComponent],
  entryComponents: [ProjectSearchComponent]
})
export class AppModule { }
