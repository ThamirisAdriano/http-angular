import { CursosService } from './../cursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import {  empty, EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[] | undefined;

 // bsModalRef!: BsModalRef;

 deleteModalRef!: BsModalRef;
 @ViewChild('deleteModal') deleteModal: any;

  // VARIAVEL COM DOLAR = Adotada pela comunidade para se trabalhar com observable
  cursos$: Observable<Curso[]> | undefined;
  error$ = new Subject<boolean>();

  cursoSelecionado!: Curso;


  constructor(private service: CursosService,
    private modalService: BsModalService,
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

  onDelete(curso: any) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'}); //mostra que é uma pequena popup

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem ctz que deseja remover esse curso?');
    result$?.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ?  this.service.remove(curso.id): EMPTY) //caso seja falso retorna o empty e a cadeia do subscribe não é executada
      )
      .subscribe( // só vai ser executado se o result acima for verdadeiro
        success => {
          this.onRefresh();
        },
          error => {
            this.alertService.showAlertDanger('Erro ao remover cursos. Tente novamente.');
          }
      )
  }


  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
      this.onRefresh();
      this.deleteModalRef.hide();
    },
      error => {
        this.alertService.showAlertDanger('Erro ao remover cursos. Tente novamente.'),
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide(); // método hide que apenas fecha a popup
  }

}


