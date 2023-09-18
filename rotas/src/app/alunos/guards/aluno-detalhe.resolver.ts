import { AlunosService } from './../alunos.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Aluno } from '../aluno';
import { Observable } from 'rxjs';

@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno> {
  constructor(private alunosService: AlunosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Aluno | Observable<Aluno> | Promise<Aluno> {
    console.log('Resolve obtendo Aluno');
    const id = +route.params['id'];
    return this.alunosService.getAluno(id) ?? new Aluno();
  }
}
