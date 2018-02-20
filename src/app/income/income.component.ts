import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(private fb: FormBuilder) {

    this.rForm = fb.group({
      'name':[null, Validators.required],
      'description':[null, Validators.compose([Validators.required, Validators.minLength(30),Validators.maxLength(100)]) ],
      'validate': ''
    })
  }

  addPost(post){
    this.description = post.description;
    this.name = post.name;
  }

  types = ['Monthly','Once off'];

  incomeModel = {};

  ngOnInit() {
  }

  rForm: FormGroup;
  post:any;
  description:string = '';
  name:string = ''

}
