import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from '../core/firestore.service';
import { Project, ProjectId } from '../core/project.model';
import { User } from '../core/user.model';
import { AuthService } from '../core/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [FirestoreService, AuthService]
})
export class ProjectDetailComponent implements OnInit {

  projects: any;
  projectObservable: any;
  projectToDisplay: any;
  id: string;
  canEdit: boolean;
  limitMembers: number;
  comments:any;
  message: string;
  photoUrl: string;

  constructor(
    public fss: FirestoreService,
    public route: ActivatedRoute,
    public auth: AuthService
  ) {

  }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.id = urlParameters['id'];

    });
    this.projectObservable = this.fss.getProject(this.id)
    this.projectObservable.subscribe(project => {
      this.projectToDisplay = project;
      this.auth.user.subscribe(user => {
          if (user.uid === this.projectToDisplay.data.authorId) {
              this.canEdit = true;
          }
          this.photoUrl = user.photoURL;
          //set comments array
          this.comments = this.fss.getComments(this.id)
      })
    });
    }

    postComment(){
        const timestamp = Date.now()
        const timestampformatted = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
        console.log(timestamp)
        this.fss.addComment(this.id, {message: this.message, authorName: this.fss.authorName, photoUrl: this.photoUrl, timeStamp: timestamp, timeStampFormatted:timestampformatted})
    }
}
