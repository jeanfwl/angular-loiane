import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriarCursoComponent } from './criar-curso.component';
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';
// import { CursosService } from '../cursos/cursos.service';

@NgModule({
  declarations: [CriarCursoComponent, ReceberCursoCriadoComponent],
  imports: [CommonModule],
  exports: [CriarCursoComponent],
  // providers: [CursosService],
})
export class CriarCursoModule {}
