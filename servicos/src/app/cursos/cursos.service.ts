import { Injectable, EventEmitter } from '@angular/core';

import { LogService } from '../shared/log.service';

@Injectable()
export class CursosService {
  constructor(private logService: LogService) {
    this.emitirCursoCriado = new EventEmitter<string>();
    console.log('CursosService instanciado.');
  }

  emitirCursoCriado: EventEmitter<string>;
  static criouNovoCurso: EventEmitter<string> = new EventEmitter<string>();
  cursos: Array<string> = ['Angular', 'Typescript', 'UI Design'];

  getCursos() {
    this.logService.consoleLog('Obtendo lista de cursos.');
    return this.cursos;
  }

  addCurso(curso: string) {
    this.logService.consoleLog('Adicionando novo curso.');
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
    CursosService.criouNovoCurso.emit(curso);
  }
}
