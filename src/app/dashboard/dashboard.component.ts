import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _data: DataService) { }

  currPage = 'dashboard';

  ngOnInit() {
    this._data.changeCurPage(this.currPage);
  }

}
