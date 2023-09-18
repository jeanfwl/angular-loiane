import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-poc-take',
  template: `
    <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-info">
    </app-poc-base>
  `,
})
export class PocTakeComponent implements OnInit, OnDestroy {
  nome = 'Componente com take';
  valor!: string;

  constructor(private service: EnviarValorService) {}

  ngOnInit() {
    this.service
      .getValor()
      .pipe(
        tap((valor) => console.log(this.nome, valor)),
        take(1)
      )
      .subscribe((valor) => (this.valor = valor));
  }

  ngOnDestroy() {
    console.log('Componente: ' + this.nome + ' foi destruído.');
  }
}
