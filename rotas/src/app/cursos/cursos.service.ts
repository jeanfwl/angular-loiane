import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor() {}

  getCursos() {
    return [
      {
        id: 1,
        nome: 'Angular',
      },
      {
        id: 2,
        nome: 'Typescript',
      },
    ];
  }

  getCurso(id: number) {
    const cursos = this.getCursos();
    return cursos.find((c) => c.id == id);
  }
}
