import { Component, OnInit } from '@angular/core';
import { Launch } from '../markteplace/model/launch';
import { LaunchService } from '../markteplace/services/launch.service';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.page.html',
  styleUrls: ['./launch.page.scss'],
})
export class LaunchPage implements OnInit {
  launchs=[];

  constructor(private launchService: LaunchService) { }

  ngOnInit() {
    this.launchService.getLaunch().then((data: any) => {
      this.launchs.push(data);
    });
  }

}
