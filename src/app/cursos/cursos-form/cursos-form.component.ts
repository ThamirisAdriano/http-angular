import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styles: [
  ]
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted: false | any;

  constructor( // parte da injeção de dependência
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) { } // ActivatedRoute - > classe que contem os parametros da rota

  ngOnInit(): void {

    let registro = null;

    // this.route.params.subscribe( //código assíncrono
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const curso$ = this.service.loadByID(id);
    //     curso$.subscribe(curso => {
    //       registro = curso;
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadByID(id)), //switchMap cancela as requisições anteriores e devolve o valor do último pedido
      // switchMap(cursos => obterAulas) -> caso precisássemos pegar as aulas do curso
    )
    .subscribe( curso => this.updateForm(curso)); // nesse exemplo estamos indo ao servidor e buscando dados

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> faz a requisição e obter a resposta antes de partir para segunda tentativa (aula 129) comum em casos de login


    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  hasError(field: string){
    return this.form.get(field)?.enable
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Criado com sucesso');
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao criar curso!'),
        () => console.log('request completo')
      );
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset()
    // console.log('onCancel')
  }

}
