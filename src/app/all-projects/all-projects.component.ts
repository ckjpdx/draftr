import { Component, OnInit } from '@angular/core';
import { Project, ProjectId } from '../core/project.model';
import { FirestoreService } from '../core/firestore.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
  providers: [FirestoreService]
})
export class AllProjectsComponent implements OnInit {

  constructor(public fss: FirestoreService) { }
    projects: any;
    singleProject: any;

  //onInit will run getProject function
  ngOnInit() {
    this.projects = this.fss.getProjects()
    console.log(this.projects)
  }

}
