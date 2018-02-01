import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Project, ProjectId } from '../core/project.model';
import { Comment } from '../core/comment.model';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import 'rxjs/operators/map';

@Injectable()
export class FirestoreService {
  projectsCollection: AngularFirestoreCollection < Project > ;
  projects: any;
  myProjectCollection: AngularFirestoreCollection < Project > ;
  myProjects: any;

  authorName: string;
  authorId: string;

  projectDoc: AngularFirestoreDocument < Project >
  singleProject: Observable < Project >;

  commentsCollection: AngularFirestoreCollection < Comment >

  constructor(private afs: AngularFirestore, private auth: AuthService, private router: Router) {
    this.projectsCollection = this.afs.collection('projects', ref => ref.orderBy('timeStamp'));
    // , ref => ref.orderBy('timeStamp')
    this.projects = this.projectsCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
      //console.log(this.auth.user)
      if (this.auth.user){
        this.auth.user.subscribe(data => {
          this.authorName = data.displayName;
          this.authorId = data.uid;
        });
      }
  }

  getProjects(){
    return this.projects;
  }


  // ngOnInit() {
  //   this.projectsCollection = this.afs.collection('projects');
  //   this.projects = this.projectsCollection.valueChanges();
  // }

  addProject(project) {
    this.afs.collection('projects').add(project);
  }

  getProject(id){
    this.projectDoc = this.afs.doc('projects/' + id);
    return this.projectDoc.snapshotChanges()
      .map(actions => {
          const data = actions.payload.data() as Project;
          const id = actions.payload.id;
          return {id, data};
      });
  }

  deleteProject(project) {
      if (!project.contributors.length) {
          this.afs.doc('projects/' + project.id).delete();
          this.router.navigate(['/']);
      } else {
          alert("Sorry, this project has people in it, you must convince them to leave before deleting it. You may also remove people in the edit function")
      }

  }

  updateProject(id, newProj){
    this.projectsCollection.doc(id).update({
        title:newProj.title,
        description: newProj.description,
        course: newProj.course
    })
    .then(() => {
      console.log('updated');
    })
  }
  changeStage(id, newState){
      this.projectsCollection.doc(id).update({
          stage:newState
      })
      .then(() => {
        console.log('updated');
      })
  }
  //updateContributors(cheese, whiz)
  updateContributors(id, newArray) {
    this.projectsCollection.doc(id).update({
      contributors: newArray
    })
    .then(() => {
      console.log('contrib is updated');
    })
  }

  getComments(id){
      this.commentsCollection = this.projectsCollection.doc(id).collection('comments', ref => ref.orderBy('timeStamp'));
      return this.commentsCollection.valueChanges();
  }

  addComment(projectId, comment){
      this.projectsCollection.doc(projectId).collection('comments').add(comment);
  }
}
