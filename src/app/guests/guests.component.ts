import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {

  currPage = 'Guests';

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.changeCurPage(this.currPage);
  }

}
