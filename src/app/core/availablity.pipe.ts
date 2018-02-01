import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availablity'
})
export class AvailablityPipe implements PipeTransform {

  transform(input: any, showAvailable?: boolean): any {
      if (input) {
        const output: any[] = [];
        if (showAvailable){
          for (let i = 0; i < input.length; i++) {
            if (input[i].data.contributors.length < input[i].data.limitMembers) {
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
