import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { User } from './user.model';

import 'rxjs/add/operator/switchMap'; // loops thru observable ?

@Injectable()
export class AuthService {
  user: Observable<User>;
  twinkie:boolean;
  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.afAuth.authState.subscribe((auth) => { //returns true if logged in
        this.authState = auth;
    });

    this.user = afAuth.authState.switchMap(user => { // authState checks for existance of user & if true then user is passed as param
      if (user) {
      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
      return Observable.of(null)
      }
    });
  }

  // creamyCenter(cream){
  //   this.twinkie.inject(cream);
  // }
  get authenticated(): boolean {
  return this.authState !== null;
}
  normalLogin(email, pw){
	  console.log(email)
	  console.log(pw)
	  firebase.auth().createUserWithEmailAndPassword(email, pw)
	  	.then((user) => {
			this.updateUserData(user);
		})
	  	.catch(function(error){
			console.log(error.message)
		});
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }


  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  public updateCurrentUserProject(user, project) {
    // Sets user data to firestore on login
    console.log(user)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    if(project){
      return userRef.update({currentProject: project.id})

    }else{
      return userRef.update({currentProject: project})
    }
  }

  public updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL,
      currentProject: user.currentProject ? user.currentProject : "",
      projects: user.projects ? user.projects : [],
      ideas: user.ideas ? user.ideas : [],
      isTeacher: user.isTeacher ? user.isTeacher : false
    }
    return userRef.set(data)
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
