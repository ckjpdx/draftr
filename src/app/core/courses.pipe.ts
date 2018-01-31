import { Pipe, PipeTransform } from '@angular/core';
import { ClassesService } from './classes.service';
import { Project } from './project.model';

@Pipe({
  name: "courses",
  pure: false
})

export class CoursesPipe implements PipeTransform {
  transform(input: any[], selectedCourse) {
    if (input) {
      const output: any[] = [];
      if (selectedCourse !== `all`){
        for (let i = 0; i < input.length; i++) {
          if (input[i].data.course === selectedCourse) {
            output.push(input[i]);
          }
        }
        return output;
      } else {
        return input;
      }
    }
  }
}
