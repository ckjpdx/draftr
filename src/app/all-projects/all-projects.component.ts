import { Component, OnInit } from '@angular/core';
import { Project, ProjectId } from '../core/project.model';
import { FirestoreService } from '../core/firestore.service';
// import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ClassesService } from '../core/classes.service';
import { CoursesPipe } from './../core/courses.pipe';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
  providers: [FirestoreService]
})
export class AllProjectsComponent implements OnInit {

    projects: any;
    singleProject: any;
    selectedClass: string;
    selectedStage: string;
    showAvailable: boolean;
    coursesFilter: string = `all`;

  constructor(
    public fss: FirestoreService,
    public classes: ClassesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.projects = this.fss.getProjects();
    console.log(this.projects)
  }

  getSingleProject(id) {
    this.fss.getProject(id);
    // console.log(this.singleProject);
    this.router.navigate(['project-detail/', id]);
  }
  setCoursesFilter(course){
    this.coursesFilter = course;
  }

}
