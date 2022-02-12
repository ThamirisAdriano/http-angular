import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> { // <tipo do dado que o resolve vai devolver
  constructor(private cursoService: CursosService) { } //injetando o serviço
  resolve(
    route: ActivatedRouteSnapshot, // fotografia da rota (quais são os parametros)
    state: RouterStateSnapshot
  ): Curso | Observable<any> | Promise<Curso> {
    if (route.params && route.params['id']) { //lógica => se o objeto existe, vamos buscar o curso que está no servidor
      return this.cursoService.loadByID(route.params['id']);
    }
    return of({ // se não temos vamos criar um curso novo com informações inicias 'null'
      id: null,
      nome: null,
    });
  }
}
