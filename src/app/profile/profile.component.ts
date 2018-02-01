import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/auth.service'; // user.uid
import { FirestoreService } from './../core/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Project, ProjectId } from './../core/project.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AuthService, FirestoreService]
})
export class ProfileComponent implements OnInit {
  myProjects: any;
  myProjectsCollection: AngularFirestoreCollection < Project >;
  projectList: string[] = [];
  ideaList: string[] = [];

  constructor(public auth: AuthService, public fss: FirestoreService, public afs: AngularFirestore) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.myProjectsCollection = this.afs.collection('projects', ref => ref.where('authorId', '==', `${user.uid}`));
      this.myProjects = this.myProjectsCollection.valueChanges();
      this.myProjects.subscribe(projects => {
          console.table(projects)
        projects.forEach((project) => {
          if (project.stage === 'active'){
            this.projectList.push(project.title);
        } else if (project.stage === 'idea') {
            this.ideaList.push(project.title);
          }
          //else completed project
        });
      });
    });
  }

}
