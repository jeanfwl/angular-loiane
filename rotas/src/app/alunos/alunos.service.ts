import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable()
export class AlunosService {
  constructor() {}

  private alunos: Array<Aluno> = [
    { id: 1, nome: 'Jean', email: 'jean@email.com' },
    { id: 2, nome: 'Glad', email: 'glad1@email.com' },
    { id: 3, nome: 'Zaito', email: 'zaito@email.com' },
  ];

  getAlunos() {
    return this.alunos;
  }

  getAluno(id: number) {
    return this.getAlunos().find((aluno) => aluno.id === id);
  }
}
