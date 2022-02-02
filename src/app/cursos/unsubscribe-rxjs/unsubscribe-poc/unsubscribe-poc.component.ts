import { Component, OnInit } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';

@Component({
  selector: 'app-unsubscribe-poc',
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: [],
  preserveWhitespaces: true
})
export class UnsubscribePocComponent implements OnInit {

  mostrarComponentes = true;

  constructor(private service: EnviarValorService) { }

  ngOnInit(): void {
  }

  emitirValor(valor: string){
    this.service.emitirValor(valor)
  }

  destruirComponentes(){
    this.mostrarComponentes = !this.mostrarComponentes
  }
}
