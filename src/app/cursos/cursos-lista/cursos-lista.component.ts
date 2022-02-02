import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import {  EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[] | undefined;

  // VARIAVEL COM DOLAR = Adotada pela comunidade para se trabalhar com observable
  cursos$: Observable<Curso[]> | undefined;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return EMPTY;
        })
      );

      this.service.list()
      // .pipe(
      //   catchError(error => EMPTY)  // outra opção
      // )
      .subscribe( // conseguimos colocar tres tipos de lógica.
        // 1 - sucesso 2 - error 3 - completo
        dados => {
          console.log(dados);
        },
        error => console.log(error),
        () => console.log('Observable Completo!')
      );

  }

}


