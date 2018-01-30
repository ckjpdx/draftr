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

  constructor(public auth: AuthService, public fss: FirestoreService, public afs: AngularFirestore) { }
  myProjects: any;
  myProjectsCollection: AngularFirestoreCollection < Project >;

  ngOnInit() {
    this.auth.user.subscribe(author => {
      console.log(author);
        this.myProjectsCollection = this.afs.collection('projects', ref => ref.where('authorId', '==', `${author.uid}`));
        this.myProjects = this.myProjectsCollection.valueChanges()
        this.myProjects.subscribe(projects => {
          console.table(projects)
        })
    });
  }

}
