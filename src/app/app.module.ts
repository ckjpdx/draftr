import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CoreModule } from './core/core.module';


import { AppComponent } from './app.component';
import { NewProjectComponent } from './new-project/new-project.component';

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
    NewProjectComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
