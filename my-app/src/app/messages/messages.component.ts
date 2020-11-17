import { Component, OnInit } from '@angular/core';
import { AppService } from '../core/app.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public app:AppService) { }

  ngOnInit(): void {
  }

}
