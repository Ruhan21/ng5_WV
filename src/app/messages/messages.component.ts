import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  currPage = 'Messages';
  tiles = [];
  constructor(private _data:DataService) { }

  ngOnInit() {
    this._data.changeCurPage(this.currPage);

    this.tiles = [
      {text: 'One', cols: 2, rows: 4, color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 2, color: 'lightpink'},
      {text: 'Four', cols: 1, rows: 2, color: '#DDBDF1'},
      {text: 'Five', cols: 1, rows: 2, color: '#DDBDF1'},
    ];
  }

}
