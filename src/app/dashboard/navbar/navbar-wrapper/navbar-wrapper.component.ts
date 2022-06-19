import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-wrapper',
  templateUrl: './navbar-wrapper.component.html',
  styleUrls: ['./navbar-wrapper.component.scss']
})
export class NavbarWrapperComponent implements OnInit {

  isExpanded: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
