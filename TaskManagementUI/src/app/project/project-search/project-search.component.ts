import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {Project} from '../../shared/project.model';
import {ProjectService} from '../../shared/project.service';


@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {

  @Input() name: string;
  @Output() selectedProject= new EventEmitter<Project>();
  Projects : Project[];
  SelectedPrjId: number;
  searchName: string;

  constructor(private projectService: ProjectService) { }

  
  ngOnInit() {
    console.log('hi madhu');
    this.getProjects();
  }

  getProjects(){
    this.projectService.getSearchProjectList(this.searchName).subscribe((res) => {
      this.Projects = res as Project[];
    })
  }
}
