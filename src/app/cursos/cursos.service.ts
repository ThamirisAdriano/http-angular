import { environment } from './../../environments/environment';
import { Curso } from './curso';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API  = `${environment.API}cursos`;
  // update: any;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }

  loadByID(id: any) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1)); //api pega API/cursos - como vamos pegar apenas uma vez utilizamos o pipe take 1 - queremos ir no servidor apenas uma vez e voltar e finalizar o observable para não precisar do unsubscribe, não repetir o request caso dê errado (por isso o take(1))
  }

  create(curso: any) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  update(curso: any) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1)); //com take 1 a ida e volta ao servidor finaliza o Observable
  }

  save(curso: any) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso)
  }

  remove(id: any) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1)); //api / id / take 1 ir no servidor fazer o request
  }


}
