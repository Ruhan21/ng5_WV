import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {MatTableDataSource} from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-expenses-detail',
  templateUrl: './expenses-detail.component.html',
  styleUrls: ['./expenses-detail.component.scss']
})
export class ExpensesDetailComponent implements OnInit {

  constructor(private _data: DataService) {
  }

  types = [];

  expenseModel = {type: '', description: '', price: '', quantity: '', budget: '', selected: false};
  expense = [];
  isNew = true;

  displayedColumns = ['type', 'description', 'price', 'quantity', 'budget', 'actions'];
  dataSource: any;
  loading = false;

  ngOnInit() {
    this._data.expenses.subscribe(res => this.dataSource = this.setExpense(res));
    this._data.lookups.subscribe(res => this.types = res);
  }

  editItem() {
    this._data.updateList('fbRefExpenseList', this.expenseModel);
    this.expenseModel = {type: '', description: '', price: '', quantity: '', budget: '', selected: false};
    this.isNew = true;
  }

  addExpense() {
    if (this.isNew) {
      this._data.addToList('fbRefExpenseList', this.expenseModel);
      this.expenseModel = {type: '', description: '', price: '', quantity: '', budget: '', selected: false};
    } else {
      this.editItem();
    }
  }

  setExpense(res) {
    if (res.length > 0) {
      this.loading = true;
      this.expense = res;
      return new MatTableDataSource(this.expense);
    }
  }

  updateSelected($event, item) {
    console.log($event);
    item.selected = $event.checked;
    this._data.updateList('fbRefExpenseList', item);
  }

  removeItem(item) {
    this._data.removeItemFormList('fbRefExpenseList', item);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectItem(item) {
    this.isNew = false;
    this.expenseModel = item;
  }

  backToDash(page) {
    this._data.navigateTo(page);
  }

}
