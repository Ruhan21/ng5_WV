import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import {MatTableDataSource} from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(private _data:DataService) {
  }

  types = ['Monthly','Once off'];

  incomeModel = {type: '',description: '',amount: '',date: ''};
  income = [];

  ngOnInit() {
    this._data.income.subscribe(res => this.dataSource = this.setIncome(res));
  }

  addIncome() {
    this.incomeModel.date = moment(this.incomeModel.date).format('DD-MM-YYYY');
    this._data.addToList('fbRefIncomeList',this.incomeModel)
    this.incomeModel = {type: '',description: '',amount: '',date: ''};
  }

  displayedColumns = ['type', 'description', 'amount', 'date'];
  dataSource :any;
  loading = false;

  setIncome(res){
    if(res.length > 0){
      this.loading = true;
      this.income = res;
      return new MatTableDataSource(this.income);
    }
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
