import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ClassesService } from './classes.service';
import { AuthGuard } from './authguard.service';
import { CoursesPipe } from './courses.pipe';
@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [CoursesPipe],
  providers: [AuthService, ClassesService, AuthGuard, CoursesPipe]
})
export class CoreModule { }
