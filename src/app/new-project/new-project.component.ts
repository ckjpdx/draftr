import { Component, OnInit } from '@angular/core';
import { Project } from '../core/project.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  constructor() { }
//submitForm does not match the project model;
  submitForm(title: string, author: string, course: string, description: string){
    // let newProject; need to use fire store to do this;
    //will need a service to send the new project to the list;
  }

  ngOnInit() {
  }

}
