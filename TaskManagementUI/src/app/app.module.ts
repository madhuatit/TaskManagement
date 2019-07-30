import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    NgbModule
  ],
  providers: [ProjectService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [ProjectSearchComponent]
})
export class AppModule { }
