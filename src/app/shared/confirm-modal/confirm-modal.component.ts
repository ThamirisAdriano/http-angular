import { Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styles: [
  ]
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() msg: string | undefined;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim'

  confirmResult: Subject<boolean> | undefined;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject //classe mãe do subject
  }

  onConfirm(){
    this.confirmAndClose(true)
  }

  onClose(){
    this.confirmAndClose(false)
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult?.next(value);
    this.bsModalRef.hide();
  }

}
