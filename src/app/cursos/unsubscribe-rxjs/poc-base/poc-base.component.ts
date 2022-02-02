import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poc-base',
  templateUrl: './poc-base.component.html',
  styleUrls: []
})
export class PocBaseComponent implements OnInit {

  @Input() nome?: string | any;
  @Input() valor?: string | any;;
  @Input() estilo?: string | any;
  constructor() { }

  ngOnInit(): void {
  }

}
