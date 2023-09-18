import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent {
  //Two-way data binding
  nome: string = 'jean';
  pessoa: {
    nome: string;
    idade: number;
  } = {
    nome: 'jean',
    idade: 21
  };

}
