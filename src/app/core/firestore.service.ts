import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Project, ProjectId } from '../core/project.model';
import { Observable } from 'rxjs/Observable';
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

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.projectsCollection = this.afs.collection('projects');
    this.projects = this.projectsCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          console.table({id, data});
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
    console.log(id);
    return this.projectDoc.valueChanges();
  }

  deletePost(id) {
    console.log(id)
    this.afs.doc('project/' + id).delete();
  }
}
