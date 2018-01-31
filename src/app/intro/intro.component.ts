import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from "@angular/router"; //This is when you send through variables through url

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const btn = document.getElementById('btn');

    btn.addEventListener('click', function () {
      alert('hello');
    });
  }

}
