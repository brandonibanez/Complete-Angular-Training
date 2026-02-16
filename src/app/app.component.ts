import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs-compat/operator/filter';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {
    http.get<any>('https://api.thecatapi.com/v1/images/search?limit=10').pipe(
      map(response => response.filter(item => item.width > 500)))
      .subscribe((response) => {
        console.log(response);
      });
  }

  ngOnInit() { }
}
