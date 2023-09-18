import { Component } from '@angular/core';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  urlPortal: string;
  cursos: Array<string>;

  constructor(private cursosService: CursosService) {
    this.urlPortal = 'www.origamid.com.br';
    this.cursos = cursosService.getCursos();
  }
  
}
