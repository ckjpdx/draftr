import { Component, OnInit } from '@angular/core';
import { Project } from '../core/project.model';


@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  constructor() { }
  //onInit will run getProject function
  ngOnInit() {
  }

}
