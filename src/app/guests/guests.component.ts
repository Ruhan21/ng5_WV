import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {

  currPage = 'Guests';

  tables = [1,2,3,4,5,6,7,8,9,10];
  guestList = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.changeCurPage(this.currPage);
  }

  selectTable(item) {
    this.guestList = [];
    this.guestList.push(item);
  }
}
