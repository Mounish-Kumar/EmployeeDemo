import { Injectable } from '@angular/core';
import DateFormat from './date-format.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  dateToString(date:Date, format:DateFormat = DateFormat.DATE):string {
    let dateString = "";
    if(date) {
      let day = this.prependZeros(date.getDate());
      let month = this.prependZeros(date.getMonth() + 1);
      let year = `${date.getFullYear()}`;
      
      let hours = this.prependZeros(date.getHours());
      let minutes = this.prependZeros(date.getMinutes());
      let seconds = this.prependZeros(date.getSeconds());

      switch(format) {
        case DateFormat.DATE:
          dateString = [day, month, year].join("/");
          break;
        case DateFormat.TIME:
          dateString = [hours, minutes, seconds].join(":");
          break;
        case DateFormat.DATE_TIME:
          dateString = [day, month, year].join("/") + " " + [hours, minutes, seconds].join(":");
          break;
      }
    }
    return dateString;
  }

  stringToDate(dateString:string, format = "dd/mm/yyyy"):Date {
    let date = null, dateArr = null, timeArr = null;
    let day = null, month = null, year = null, hours = null, minutes = null, seconds = null;
    if(dateString) {
      switch(format) {
        case DateFormat.DATE:
          dateArr = dateString.split("/");
          break;
          case DateFormat.TIME:
          timeArr = dateString.split(":");
          break;
          case DateFormat.DATE_TIME:
          let dateTimeArr = dateString.split(" ");
          dateArr = dateTimeArr[0].split("/");
          timeArr = dateTimeArr[1].split(":");
          break;
      }

      if(dateArr) {
        day = Number(dateArr[0]);
        month = Number(dateArr[1]) - 1;
        year = Number(dateArr[2]);
      } else {
        let currentDate = new Date();
        day = currentDate.getDate();
        month = currentDate.getMonth();
        year = currentDate.getFullYear();
      }

      if(timeArr) {
        hours = Number(timeArr[0]);
        minutes = Number(timeArr[1]);
        seconds = Number(timeArr[2]);
      }

      if(timeArr) {
        date = new Date(year, month, day, hours, minutes, seconds);
      } else {
        date = new Date(year, month, day);
      }
    }
    return date;
  }

  prependZeros(value, length = 2):string {
    let prefix = "";
    for(let i=0; i < length; i++) {
      prefix = prefix + "0";
    }
    return (prefix + value).slice(0 - length);
  }

  isNumeric(value):boolean {
    return !isNaN(value);
  }

  stringToNumber(str):number {
    let num = 0;
    if(str && this.isNumeric(str)) {
      num = Number(str);
    }
    return num;
  }

  isPositiveNumber(value):boolean {
    let num = this.stringToNumber(value);
    return num > 0;
  }

  toFixedNumber(value, length = 2):number {
    let num = this.stringToNumber(value).toFixed(length);
    return this.stringToNumber(num);
  }
}
