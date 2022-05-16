import { Component, Input, OnInit } from '@angular/core';
import { Launch } from '../../model/launch';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss'],
})
export class LaunchComponent implements OnInit {
  @Input() launch: Launch;
  constructor() { }

  ngOnInit() {}

}
