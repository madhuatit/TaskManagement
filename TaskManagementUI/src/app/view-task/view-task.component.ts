import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router';
import {ViewTaskService} from '../shared/view-task.service';
import {ProjectService} from '../shared/project.service';
import {AddTaskService} from '../shared/add-task.service';
import {AddTask, ParentTask} from '../shared/add-task.model';
import {Project} from '../shared/project.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [ViewTaskService]
})
export class ViewTaskComponent implements OnInit {

  constructor(private viewTaskService: ViewTaskService, private projectService: ProjectService,
    private modalService: BsModalService, private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router,
    private addTaskService: AddTaskService) { }

  modalRef: BsModalRef;
  projects: Array<Project>;
  selectedProjId: number;
  selectedProjName: string;
  selectedProj: Project;
  searchText: string;
  taskProj: string;
  updTask: AddTask;
  selectedParent: ParentTask;
  

  ngOnInit() {
    this.refreshTaskList();
    //this.getProjects();
  }
 
  

  refreshTaskList(){
    this.viewTaskService.getTaskList().subscribe((res) =>{
      this.viewTaskService.tasks = res as AddTask[];
      for(var n=0; n< this.viewTaskService.tasks.length; n++){
        this.addTaskService.getParentForId(this.viewTaskService.tasks[n]).subscribe((res) => {
          this.selectedParent = res as ParentTask;
          this.addTaskService.tasks[n].Parent = this.selectedParent;
        })
      }
    });
  }

  //search model of Projects.
  openModal(template: TemplateRef<any>, type: number) {
    if (type === 1) {
      this.projectService.getProjectList().subscribe((res) => {
        console.log(res);
        this.projects = res as Project[];
        this.modalRef = this.modalService.show(template);
      },
        (error) => {
          console.log(error);
        });
    } 
  }

  //cancel the project model.
  cancelProj() {
    this.modalRef.hide();
    this.selectedProj = null;

  }

  //selecting the project object.
  selectProj() {
    if (this.selectedProj != null) {
      console.log(this.selectedProj.Project_Name);
      this.selectedProjName = this.selectedProj.Project_Name;
      this.taskProj = this.selectedProj._id;
      this.selectedProj = null;
      this.searchText = '';
      this.modalRef.hide();

      this.viewTaskService.getTaskForProjectList(this.taskProj).subscribe((res) =>{
        this.viewTaskService.tasks = res as AddTask[];
      });

    }
  }

  //setting the project object.
  setIndexProj(proj: Project) {
    this.selectedProj = proj;
    this.searchText = proj.Project_Name;
  }
  //sort the Project
  sortTask(sortKey: string){
    this.viewTaskService.getSortTaskList(sortKey).subscribe((res) => {
      this.viewTaskService.tasks = res as AddTask[];
    });
  }

  completeTask(task: AddTask){
    this.updTask = task;
    this.updTask.Status = 1;
    this.viewTaskService.putTask(this.updTask).subscribe((res) => {
      this.refreshTaskList();
    })
  }

  editTask(task: AddTask){
    this.router.navigate(['/addTask', { task: JSON.stringify(task) }]);
  }
}
