import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Project} from '../shared/project.model';
import { ProjectService} from '../shared/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {

  public EditOrAdd: String;

  constructor(private projectService: ProjectService) { 
    this.EditOrAdd = "Add";
  }

  ngOnInit() {
    this.EditOrAdd = "Add";
    this.getProjectList();
  }

  getProjectList(){
    this.projectService.getProjectList().subscribe((res) =>{
      console.log('received project rec. : ' + res);
      this.projectService.projects = res as Project[];
    });
  }

}
