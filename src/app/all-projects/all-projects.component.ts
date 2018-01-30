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

    projects: any;
    singleProject: any;

  constructor(public fss: FirestoreService) { }

  ngOnInit() {
    this.projects = this.fss.getProjects()
    console.log(this.projects)
  }

  getSingleProject(id) {
    console.log(id);
    alert('thiis!');
    this.singleProject = this.fss.getProject(id);
  }

}
