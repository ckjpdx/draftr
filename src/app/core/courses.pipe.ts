import { Pipe, PipeTransform } from '@angular/core';
import { ClassesService } from './classes.service';
import { Project } from './project.model';

@Pipe({
  name: "courses",
  pure: false
})

export class CoursesPipe implements PipeTransform {
  transform(input: Project[], selectedCourse: string){
    let output: Project[] = [];
    for (let i = 0; i < input.length; i++) {
      if (input[i].course === selectedCourse || selectedCourse === ``) {
        output.push(input[i]);
      }
    }
    return output;
  }
}
