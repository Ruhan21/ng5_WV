import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service'
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(private _data: DataService) { }

  currPage = 'dashboard';
  expenses = [];
  guests = [];
  totalExpense = 0;
  totalIncome = 0;
  totalGuests = 0;
  endDate = moment('07-04-2019').format('DD-MM-YYYY');
  currentDate = moment().format('DD-MM-YYYY');


  ngOnInit() {
    this._data.changeCurPage(this.currPage);
    this._data.expenses.subscribe(res => this.setExpenses(res));
    this._data.income.subscribe(res => this.setIncome(res));
    this._data.guests.subscribe(res => this.setGuests(res));
  }

  navigateTo(page){
   this._data.navigateTo(page)
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // Pie
  pieChartLabels:string[] = [];
  pieChartData:number[] = [];
  pieChartType:string = 'pie';
  pieChartOptions:any = {
    responsive: true,
    legend:{position:'right'}
  };

  setExpensesPie() {
    let vm = this;
    let dataLabel = [];
    let dataValue = [];

    if(vm.expenses.length > 0){

      vm.expenses.forEach(function (value) {
        if(value.paid){
          dataLabel.push(value.description);
          dataValue.push(value.price * value.quantity);
        }
      });

      vm.pieChartLabels = dataLabel;
      vm.pieChartData = dataValue;

      console.log(vm.pieChartLabels);
      console.log(vm.pieChartData);
    }
  }

  // Doughnut
  public doughnutExpenseLabels:string[] = [];
  public doughnutExpenseData:number[] = [];
  public doughnutExpenseType:string = 'doughnut';

  setExpensesOverview() {
    let vm = this;
    let dataLabel: string;
    let budget = 0;
    let spend = 0;

    if(vm.expenses.length > 0){

      vm.expenses.forEach(function (value) {
        if(value.selected){
          budget += value.budget;
          if(value.paid){
            spend += value.price * value.quantity;
            budget -= value.price * value.quantity;
          }
        }
      });

      if(budget > spend){
        dataLabel = 'remaining';
        vm.totalExpense = budget + spend;
      } else {
        dataLabel = 'over by';
        vm.totalExpense = spend;
      }

      budget = Math.abs(budget);



      vm.doughnutExpenseLabels = [dataLabel,'Spend'];
      vm.doughnutExpenseData = [budget,spend];
      this.doneLoading = true;
    }
  }

  doneLoading = false;
  selectedExpenses = [];

  setSelecetedExpenses() {
    let tempArray = [];

    this.expenses.forEach(function (value) {
      if(value.selected){
        tempArray.push(value);
      }
    });

    this.selectedExpenses = tempArray;
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [];

  setBarChart() {
    let vm = this;
    let categories = [];
    let dataSpend =[];
    let dataBudget =[];
    let expensesCopy = [...this.expenses];
    let teller = -1;

    expensesCopy.sort(function compare(a,b) {
      if (a.type < b.type)
        return -1;
      if (a.type > b.type)
        return 1;
      return 0;
    });

    if(expensesCopy.length > 0){

      expensesCopy.forEach(function (value) {
        if(value.selected){
          if(categories.length === 0){
            categories.push(value.type);
            dataSpend.push((value.price * value.quantity));
            dataBudget.push(value.budget);
            teller++;
          } else {
            if(categories[teller] === value.type){
              dataSpend[teller] += (value.price * value.quantity);
              dataBudget[teller] += value.budget;
            } else {
              categories.push(value.type);
              dataSpend.push((value.price * value.quantity));
              dataBudget.push(value.budget);
              teller++;
            }
          }
        }
      });

      vm.barChartLabels = categories;
      vm.barChartData.push({data: dataSpend, label: 'Spend'});
      vm.barChartData.push({data: dataBudget, label: 'Budget'});
    }
  }

  setExpenses(res){
    this.doneLoading = false;
    console.log(res);
    this.expenses = res;

    this.setSelecetedExpenses();
    this.setExpensesPie();
    this.setExpensesOverview();
    this.setBarChart()
  }

  public doughnutIncomeLabels:string[] = [];
  public doughnutIncomeData:number[] = [];
  public doughnutIncomeType:string = 'doughnut';

  setIncome(res) {

    let vm = this;
    let incomeRecieved = 0;
    let futureIncome = 0;
    res.forEach(function (value) {
      let numOfMonthsToGo = moment(vm.endDate,'DD-MM-YYYY').diff(vm.currentDate,'months');
      let numOfMonthsPast = moment(vm.currentDate,'DD-MM-YYYY').diff(moment(value.date,'DD-MM-YYYY') ,'months');

      if(value.type === 'Monthly'){
        incomeRecieved += numOfMonthsPast * value.amount;
        futureIncome += numOfMonthsToGo * value.amount;
      } else {
        if( moment(vm.currentDate,'DD-MM-YYYY').diff(moment(value.date,'DD-MM-YYYY'),'days') < 0){
          futureIncome += value.amount
        } else {
          incomeRecieved += value.amount
        }
      }
    });

    vm.totalIncome = incomeRecieved + futureIncome;

    vm.doughnutIncomeLabels = ['Received', 'Future income'];
    vm.doughnutIncomeData = [incomeRecieved, futureIncome];

  }

  // Doughnut
  public doughnutGuestLabels:string[] = [];
  public doughnutGuestData:number[] = [];
  public doughnutGuestType:string = 'doughnut';

  setGuests(res) {
    let vm = this;
    let guestsGoing = 0;
    let guestsInvited = 0;
    let totalGuests = 0;

    res.forEach(function (value) {
      if(value.going){
        vm.guests.push(value);
        guestsGoing += 1;
      } else {
        guestsInvited += 1;
      }
    });

    totalGuests = guestsInvited + guestsGoing;

    vm.totalGuests = (guestsGoing / totalGuests) * 100;

    this.doughnutGuestLabels = ['Accepted', 'Rejected'];
    this.doughnutGuestData = [guestsGoing, guestsInvited]
  }

  paidItemChange(item) {
    item.paid = !item.paid;
    this._data.updateList('fbRefExpenseList',item);
  }

  // lineChart

  getMonthsBetween(startDate,endDate){
    let currentDate = startDate.clone();
    let result = [];

    while (startDate.isBefore(endDate)) {
      result.push(currentDate.format("YYYY-MM-01"));
      startDate.add(1, 'month');
    }

    return result
  }


  panelOpenState: boolean = false;

}
