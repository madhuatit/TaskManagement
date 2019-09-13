import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';


import { ViewTaskComponent} from './view-task/view-task.component';
import { UserComponent} from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { AddTaskComponent} from './add-task/add-task.component';


const routes: Routes = [
  { path: 'viewTask', component: ViewTaskComponent},
  { path: 'user', component: UserComponent},
  { path: 'project', component: ProjectComponent},
  { path: 'addTask', component: AddTaskComponent},
  { path: '', redirectTo: '/user', pathMatch: 'full'},
];

@NgModule({
  imports: [BrowserModule,
    
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    Ng5SliderModule],
    
  exports: [RouterModule]
})
export class AppRoutingModule { }
