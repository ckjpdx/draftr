import { Component, OnInit } from '@angular/core';
import { Project } from '../core/project.model';
import { FirestoreService } from '../core/firestore.service';
import { AuthService } from '../core/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
  providers: [AuthService, FirestoreService]
})
export class NewProjectComponent implements OnInit {

  title: string;
  course: string;
  description: string;

  constructor(private fss: FirestoreService, private auth: AuthService) { }
//submitForm does not match the project model;
  submitForm(title: string, author: string, course: string, description: string){
    // let newProject; need to use fire store to do this;
    //will need a service to send the new project to the list;
  }
 //doAdd
  ngOnInit() {

  }

  doAddProject(){
      const timestamp = Date.now();
      const timestampformatted = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    this.fss.addProject({title: this.title, authorName: this.fss.authorName, authorId: this.fss.authorId, course: this.course, ideaState: true, description: this.description, timeStamp: timestamp, timeStampFormatted: timestampformatted})
  }
}
