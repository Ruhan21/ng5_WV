import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';


@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {

  currPage = 'Guests';

  tables = [];
  guestList = [];
  currTable: number;
  showTables = false;

  imgList = ['m1.jpeg', 'm2.jpeg', 'm3.jpeg', 'm4.jpeg', 'm5.jpeg', 'w1.jpeg', 'w2.jpeg', 'w3.jpeg', 'w4.jpeg', 'w5.jpeg'];

  constructor(private _data: DataService) {
    this._data.guests.subscribe(res => this.setupGuests(res));
  }

  ngOnInit() {
    this._data.changeCurPage(this.currPage);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  setupGuests(res) {
    const vm = this;
    let guestCopy = [...res];
    let teller = -1;
    guestCopy = this._data.OrderArray(guestCopy, 'table');

    if (guestCopy.length > 0) {

      guestCopy.forEach(function (value) {
        if (value.going) {
          if (vm.tables.length === 0) {
            vm.tables.push({table: value.table, guests: [{name: value.name + ' ' + value.surname}]});
            teller++;
          } else {
            if (vm.tables[teller].table === value.table) {
              vm.tables[teller].guests.push({name: value.name + ' ' + value.surname});
            } else {
              vm.tables.push({table: value.table, guests: [{name: value.name + ' ' + value.surname}]});
              teller++;
            }
          }
        }
      });
    }

    console.log(vm.tables);

  }

  selectTable(item) {
    this.currTable = item.table;
    this.guestList = [];
    this.guestList = [...item.guests];
    console.log(this.guestList);
  }
}
