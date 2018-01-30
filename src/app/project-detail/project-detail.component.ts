import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from '../core/firestore.service';
import { Project, ProjectId } from '../core/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [FirestoreService]
})
export class ProjectDetailComponent implements OnInit {
  projects: any;
  projectObservable: any;
  projectToDisplay: any;
  id: string;


  constructor(
    public fss: FirestoreService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.id = urlParameters['id'];
      console.log(this.id);
    });
    this.projectObservable = this.fss.getProject(this.id)
    console.table(this.projectObservable);
    this.projectObservable.subscribe(project => {
      // console.log(project);
      this.projectToDisplay = project;
      // console.log(projectToDisplay);
    });


  }
}
