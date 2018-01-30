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

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
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

  googleLogin() { //this function is activated when google login is selected and sends the google auth provider into the oAuth function
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }


  private oAuthLogin(provider) { //this function can be used to log in with many providers by creating other login methods which send the provider into this parameter
    return this.afAuth.auth.signInWithPopup(provider) //the successful sign in returns an object containing the user data which will be sent into "credential" parameter after it is received
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL,
      currentProject: user.currentProject,
      projects: user.projects,
      ideas: user.ideas,
      isTeacher: user.isTeacher
    }
    return userRef.set(data)
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
