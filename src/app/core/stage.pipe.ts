import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stage'
})
export class StagePipe implements PipeTransform {

  transform(projectIn: any, selectedStage?: any): any {
      if (projectIn) {
        const projectOut: any[] = [];
        if (selectedStage !== `all`){
          for (let i = 0; i < projectIn.length; i++) {
            if (projectIn[i].data.stage === selectedStage) {
              projectOut.push(projectIn[i]);
            }
          }
          return projectOut;
        } else {
          return projectIn;
        }
      }
  }

}
