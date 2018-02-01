import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../core/firestore.service';
import { ClassesService } from '../core/classes.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input() selectedProject;

  constructor(private fss: FirestoreService, public classes: ClassesService ) { }

  ngOnInit() {
  }

  doneEditing(){
      this.fss.updateProject(this.selectedProject.id, this.selectedProject.data)
  }
}
