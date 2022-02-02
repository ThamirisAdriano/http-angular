import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {
  private emissor$ = new Subject<string>() // emissor do rxjs - Subject e o básico


  emitirValor(valor: string) {
    this.emissor$.next(valor); //para emitir um novo valor (usamos o next)
  }

  getValor() {
    return this.emissor$.asObservable(); // como é uma variável privada, usamos o get para retornar o emissor como Observable
  }
}
