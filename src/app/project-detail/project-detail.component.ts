import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from '../core/firestore.service';
import { Project, ProjectId } from '../core/project.model';
import { User } from '../core/user.model';

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
  limitMembers: number;

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
      console.log(project);
      this.projectToDisplay = project;
    });

    canJoin() {
      // console.log(projectToDisplay);
//       // console.log(projectToDisplay.limitMembers);
//       // console.log(projectToDisplay.contributors);
// // pseudo code - if there are contributor spaces available, show SignUp Button, else show indicator that project is full
//       if (projectToDisplay.contributors.length <= projectToDisplay.limitMembers) {
//         const signupButton = document.querySelect('.contributors-signup');
//       } else {
//         alert("this project is full");
//       }
//     }

  }
//If spots are available, click SignUp button and runs this function
  // signMeUp(id){
  //   this.user.uid = this.currentProject;
  // }
}
