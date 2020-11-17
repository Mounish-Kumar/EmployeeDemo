import { Component, OnInit } from '@angular/core';
import { AppService } from '../core/app.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public app:AppService) { }

  ngOnInit(): void {
  }

}
