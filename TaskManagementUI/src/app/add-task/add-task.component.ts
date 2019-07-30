import { Component, OnInit } from '@angular/core';
import { AddTaskService} from '../shared/add-task.service';
import { AddTask} from '../shared/add-task.model';
import { NgForm } from '@angular/forms';
import { Project } from '../shared/project.model';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectComponent } from '../project/project.component';
import { ProjectSearchComponent } from '../project/project-search/project-search.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [AddTaskService]
})
export class AddTaskComponent implements OnInit {

  constructor(private addTaskService: AddTaskService) { 
    
  }

  ngOnInit() {
    //this.activeModal.close(ProjectSearchComponent);
  }

  onSearchProject(){
    
    
  }

}
