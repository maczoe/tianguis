import { Component, Input, OnInit } from '@angular/core';
import { Launch } from '../../model/launch';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss'],
})
export class LaunchListComponent implements OnInit {
  @Input() launchs: Launch[]= [];
  constructor() {

  }

  ngOnInit() {

  }

}
