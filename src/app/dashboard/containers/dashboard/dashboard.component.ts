import { DashBoardService } from './../../services/dashboard-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataList: Array<number>[]
  loaded: boolean = false

  constructor(
    private service: DashBoardService,
  ) { 
    this.refreashData()
  }

  ngOnInit() {
    this.refreashData();
  }

  refreashData() {
    this.service.getData().subscribe(res => {
      this.dataList = res
      this.loaded = true
    })
  }

}
