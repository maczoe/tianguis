import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Launch } from '../../model/launch';
import { LaunchService } from '../../services/launch.service';

@Component({
  selector: 'app-detail-undertake',
  templateUrl: './detail-undertake.page.html',
  styleUrls: ['./detail-undertake.page.scss'],
})
export class DetailUndertakePage implements OnInit {
  id = '0';
  launch: Launch = {
    id: '',
    title: '',
    description: '',
    paragraph:'',
    images: [],
  };
  constructor(
    private launchService: LaunchService,
    private router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getLauch(this.id);
  }
  ngOnInit() {}

  getLauch(id) {
    this.launchService.getLaunchId(id).then((data: Launch) => {
      this.launch = data;
    });
  }
}
