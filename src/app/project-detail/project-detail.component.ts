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
  // projectsCollection: AngularFirestoreCollection < Project > ;

  projects: any;
  projectObservable: any;
  projectToDisplay: any;
  id: string;
  currentUser: any;
  canEdit: boolean;
  canJoin: boolean;
  canLeave: boolean;
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
        this.currentUser = user;
          if (user.uid === project.data.authorId) {
              this.canEdit = true;
          }
          this.photoUrl = user.photoURL;
          //set comments array
          this.comments = this.fss.getComments(this.id)
          if (project.data.contributors.length < project.data.limitMembers && !user.currentProject) {
            this.canJoin = true;
          } else {
            this.canJoin = false;
          }
          if (user.currentProject) {
            this.canLeave = true;
          } else {
            this.canLeave = false;
          }
      })
    });
  }


  postComment(){
       const timestamp = Date.now()
       const timestampformatted = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
       this.fss.addComment(this.id, {message: this.message, authorName: this.fss.authorName, photoUrl: this.photoUrl, timeStamp: timestamp, timeStampFormatted: timestampformatted})
   }

//If spots are available, click SignUp button and runs this function
 signMeUp() {
   if (this.canJoin && !this.currentUser.currentProject) {
     const newArray: string[] = this.projectToDisplay.data.contributors;
     newArray.push(this.currentUser.displayName);
     this.fss.updateContributors(this.id, newArray);
     this.auth.updateCurrentUserProject(this.currentUser, this.projectToDisplay);
   }
 }

 deleteMe() {
   if (this.canLeave && this.currentUser.currentProject) {
     const ContributorArray: string[] = this.projectToDisplay.data.contributors;
     const user = this.currentUser.displayName;
     for(let i of ContributorArray){
       if (i === user){
         ContributorArray.splice(ContributorArray[i], 1);
         this.fss.updateContributors(this.id, ContributorArray);
         this.auth.updateCurrentUserProject(this.currentUser, '');
         this.canLeave = false;
       }
     }
   }
 }
}
