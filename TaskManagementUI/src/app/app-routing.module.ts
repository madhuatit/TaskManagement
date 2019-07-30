import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent} from './view-task/view-task.component';
import { UserComponent} from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { AddTaskComponent} from './add-task/add-task.component';


const routes: Routes = [
  { path: 'viewTask', component: ViewTaskComponent},
  { path: 'user', component: UserComponent},
  { path: 'project', component: ProjectComponent},
  { path: 'addTask', component: AddTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
