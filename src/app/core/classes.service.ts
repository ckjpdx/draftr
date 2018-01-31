import { Injectable } from '@angular/core';

@Injectable()
export class ClassesService {
    classList: string[];
  constructor() {
      this.classList = [
          "Intro to Programming",
          "CSS",
          "C#",
          "Java",
          "PHP",
          "Ruby",
          "JavaScript",
          "Android",
          "Design",
          "Drupal",
          ".NET",
          "Rails",
          "React",
          "Ember.js"
      ]
  }

}
