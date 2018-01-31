import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
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
  projectsCollection: AngularFirestoreCollection < Project > ;

  projects: any;
  projectObservable: any;
  projectToDisplay: any;
  id: string;
  currentUser: any;
  canEdit: boolean;
  canJoin: boolean;
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
    console.table(this.projectObservable);
    this.projectObservable.subscribe(project => {
      console.log(project);
      this.projectToDisplay = project;
      this.auth.user.subscribe(user => {
        this.currentUser = user;
          if (user.uid === project.data.authorId) {
              this.canEdit = true;
          }
          this.photoUrl = user.photoURL;
          //set comments array
          console.log(this.id);
          this.comments = this.fss.getComments(this.id)
          console.log(project);
          console.log(project.data.limitMembers);
          console.log(project.data.contributors.length);
          console.log(this.projectToDisplay.data.contributors);
          if (project.data.contributors.length <= project.data.limitMembers) {
            alert('this fires');
            this.canJoin = true;
            alert(this.canJoin);
          } else {
            alert("this project is full");
          }
      })
    });
  }




    postComment(){
        const timestamp = Date.now();
        this.fss.addComment(this.id, {message: this.message, authorName: this.fss.authorName, photoUrl: this.photoUrl, timeStamp: timestamp})
    }

//If spots are available, click SignUp button and runs this function
  signMeUp() {
    alert('buuu-iinn werks');
    console.log(this.currentUser.displayName);
    const newArray: string[] = this.projectToDisplay.data.contributors;
     newArray.push(this.currentUser.displayName);
    console.log(newArray);
    this.fss.updateContributers(this.id, newArray);

  }

}
