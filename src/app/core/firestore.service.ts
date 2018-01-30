import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Project } from '../core/project.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirestoreService {
  projectsCol: AngularFirestoreCollection <Project>;
  projects: Observable<Project[]>;

  constructor(private afs: AngularFirestore) {

  }
  ngOnInit() {
    this.projectsCol = this.afs.collection('projects');
    this.projects = this.projectsCol.valueChanges();
  }

  addPost() {
    this.afs.collection('projects').add{};
  }
}
