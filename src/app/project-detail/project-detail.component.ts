import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from '../core/firestore.service';
import { Project, ProjectId } from '../core/project.model';
import { User } from '../core/user.model';
import { AuthService } from '../core/auth.service';

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

  constructor(
    public fss: FirestoreService,
    public route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.id = urlParameters['id'];
      console.log(this.id);
    });
    this.projectObservable = this.fss.getProject(this.id)
    console.table(this.projectObservable);
    this.projectObservable.subscribe(project => {
      console.log(project);
      this.projectToDisplay = project;
      this.auth.user.subscribe(user => {
          if (user.uid === this.projectToDisplay.data.authorId) {
              this.canEdit = true;
          }
      })
    });

    }
    // canJoin() {
      // console.log(projectToDisplay);
//       // console.log(projectToDisplay.limitMembers);
//       // console.log(projectToDisplay.contributors);
// // pseudo code - if there are contributor spaces available, show SignUp Button, else show indicator that project is full
//       if (projectToDisplay.contributors.length <= projectToDisplay.limitMembers) {
//         const signupButton = document.querySelect('.contributors-signup');
//       } else {
//         alert("this project is full");
//       }
    // }

//If spots are available, click SignUp button and runs this function
  // signMeUp(id){
  //   this.user.uid = this.currentProject;
  // }
}
