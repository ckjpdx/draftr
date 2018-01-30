import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CoreModule } from './core/core.module';
import { routing } from './app.routing';

import { NewProjectComponent } from './new-project/new-project.component';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { LoginComponent } from './login/login.component';

var firebaseConfig = {
  apiKey: "AIzaSyAxMjMn9totpu8iUM55JPOzKnAq7xXGYks",
  authDomain: "draftr-c8408.firebaseapp.com",
  databaseURL: "https://draftr-c8408.firebaseio.com",
  projectId: "draftr-c8408",
  storageBucket: "",
  messagingSenderId: "588970213948"
}
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AllProjectsComponent,
    ProjectDetailComponent,
    LoginComponent,
      NewProjectComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    CoreModule,
    routing,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
