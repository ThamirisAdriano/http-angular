import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styles: [
  ]
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted: false | any;

  constructor(private fb: FormBuilder, private service: CursosService,
    private modal: AlertModalService, private location: Location) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
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
