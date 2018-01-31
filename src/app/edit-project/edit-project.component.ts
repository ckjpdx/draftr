import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input() selectedProject;

  constructor() { }

  ngOnInit() {
  }
  doneEditing(){

  }
}
