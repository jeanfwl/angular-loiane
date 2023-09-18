import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {
  //Interpolation
  url: string = 'www.origamid.com.br'
  urlImagem: string = 'http://lorempixel.com.br/300/200/?1';
  getValor() {
    return 1;
  }

  //Event binding
  valorSalvo: string = '';
  valorAtual: string = '';
  isMouseOver: boolean = false;

  //Input/Output properties
  nomeCurso: string = 'Angular 14';
  valorInicial: number = 15;
  handleMudouValor(event: Event) {
    console.log(event);
  }
  
  
  handleClick() {
    alert('clicado')
  }

  handleSaveValue(value: string) {
    this.valorSalvo = value;
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.valorAtual = event.target.value;
    }
  }

  handleMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }
}
