import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { LoginsComponent } from '../logins/logins.component';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, AfterViewInit {

  @ViewChild(LoginsComponent ) refer : LoginsComponent;
  public todolist;

  public todoarray = [];

  public itemchecked = false;

  public show = false;

  public display = false;

  public date = new Date();
  mydata;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    var a = this.refer.ar;
    console.log(a);
  }
  pushit() {
    this.todoarray.push(this.todolist);
    console.log('before the checknox ', this.itemchecked);
    this.todolist = '';
    console.log(this.todoarray);
    this.display = true;
    this.mydata = JSON.stringify(this.todoarray);
    localStorage.setItem('key', this.mydata);
  }

  popit(f) {
    console.log(this.todoarray[f], 'index of array' + f);
  }
  
}
