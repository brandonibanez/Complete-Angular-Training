import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  // selector: '[app-server]',
  // selector: '.app-server',
  templateUrl: './server.component.html',
  // template: '<p>server works!</p>',
  // styleUrl: './server.component.css',
  styles: [
    `
      p {
        color: blue;
      }
    `,
  ],
})
export class ServerComponent {

  allowNewServer: boolean = true;
  serverId: number = 10;
  serverStatus: string = 'offline';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = false;
    }, 2000)
  }

  displayStatus() {
    console.log(`Server status: ${this.serverStatus}`);
  }

}
