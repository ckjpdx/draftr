import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../core/firestore.service';
import { ClassesService } from '../core/classes.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input() selectedProject;

  constructor(private fss: FirestoreService, public classes: ClassesService, private auth: AuthService ) { }

  ngOnInit() {
  }

  adminRemoveUser(id){
      this.auth.user.subscribe(currentUser => {
          const ContributorArray: any[] = this.selectedProject.data.contributors;
          const user = id;
          for(let i of ContributorArray){
            if (i.id === user){
              ContributorArray.splice(ContributorArray[i], 1);
              this.fss.updateContributors(this.selectedProject.id, ContributorArray);
              this.auth.updateCurrentUserProject(currentUser, '');
            }
          }
          if (!ContributorArray.length) {
              this.fss.changeStage(this.selectedProject.id, 'idea');
          }
      });
  }

  doneEditing(){
      this.fss.updateProject(this.selectedProject.id, this.selectedProject.data)
  }
}
