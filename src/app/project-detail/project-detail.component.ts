import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FirestoreService } from '../core/firestore.service';
import { Project, ProjectId } from '../core/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [FirestoreService]
})
export class ProjectDetailComponent implements OnInit {
  // projects: any;
  // singleProject: any;
  projectId: string;
  projectToDisplay;

  constructor(public fss: FirestoreService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {

  }

}
