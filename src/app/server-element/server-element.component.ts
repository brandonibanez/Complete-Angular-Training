import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css'
})
export class ServerElementComponent {
  @Input({alias:'serverElement',required:true}) element: { type: string; name: string; content: string };
}
