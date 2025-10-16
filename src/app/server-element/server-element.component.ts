import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css'
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input({alias:'serverElement',required:true}) elements: { type: string; name: string; content: string };

  constructor() {
    console.log('constructor called');
  }

  ngOnChanges() {
    console.log('ngOnChanges called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  } 

  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }
  
}
