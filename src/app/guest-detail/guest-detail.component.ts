import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.scss']
})
export class GuestDetailComponent implements OnInit {

  constructor(private _data: DataService) {
  }

  types = ['Friend', 'Family'];

  guestModel = {type: '', name: '', surname: '', table: '', going: false, token: 0};
  guest = [];
  isNew = true;
  lastToken = 0;
  displayedColumns = ['type', 'name', 'surname', 'table', 'actions'];
  dataSource: any;
  loading = false;

  ngOnInit() {
    this._data.guests.subscribe(res => this.dataSource = this.setGuest(res));
  }

  editItem() {
    this._data.updateList('fbRefGuestList', this.guestModel);
    this.guestModel = {type: '', name: '', surname: '', table: '', going: false, token: 0};
    this.isNew = true;
  }

  addGuest() {
    if (this.isNew) {
      this.guestModel.token = (this.lastToken + 1);
      this._data.addToList('fbRefGuestList', this.guestModel);
      this.guestModel = {type: '', name: '', surname: '', table: '', going: false, token: 0};
    } else {
      this.editItem();
    }
  }

  setGuest(res) {
    if (res.length > 0) {
      this.loading = true;
      this.guest = res.reverse();
      this.lastToken = this.guest[0].token;
      return new MatTableDataSource(this.guest);
    }
  }

  updateSelected($event, item) {
    console.log($event);
    item.going = $event.checked;
    this._data.updateList('fbRefGuestList', item);
  }

  removeItem(item) {
    this._data.removeItemFormList('fbRefGuestList', item);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectItem(item) {
    this.isNew = false;
    this.guestModel = item;
  }

  backToDash(page) {
    this._data.navigateTo(page);
  }

}
