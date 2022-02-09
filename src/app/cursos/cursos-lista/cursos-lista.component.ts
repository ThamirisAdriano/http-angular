import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import {  EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[] | undefined;

 // bsModalRef!: BsModalRef;

  // VARIAVEL COM DOLAR = Adotada pela comunidade para se trabalhar com observable
  cursos$: Observable<Curso[]> | undefined;
  error$ = new Subject<boolean>();


  constructor(private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) { }

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
          // this.error$.next(true);
          this.handleError();
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

  handleError(){

    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente.';

  }

  onEdit(id: any){
    this.router.navigate(['editar', id], { relativeTo: this.route })
  }

}


