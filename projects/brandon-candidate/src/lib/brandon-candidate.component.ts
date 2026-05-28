import { Component } from '@angular/core';

@Component({
  selector: 'lib-brandon-candidate',
  standalone: true,
  imports: [],
  template: `
    <ng-content select="[header]"><p>no content 1st</p></ng-content>
    <p>
      brandon-candidate works!
    </p>
    <ng-content><p>no content 2nd</p></ng-content>
  `,
  styles: ``
})
export class BrandonCandidateComponent {

}