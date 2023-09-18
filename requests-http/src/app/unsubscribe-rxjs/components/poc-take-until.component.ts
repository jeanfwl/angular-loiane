import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-primary">
    </app-poc-base>
  `,
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {
  nome = 'Componente com takeUntil';
  valor!: string;

  constructor(private service: EnviarValorService) {}

  unsub$ = new Subject();

  ngOnInit() {
    this.service
      .getValor()
      .pipe(
        tap((valor) => console.log(this.nome, valor)),
        takeUntil(this.unsub$)
      )
      .subscribe((valor) => (this.valor = valor));
  }

  ngOnDestroy() {
    this.unsub$.next(this.valor);
    this.unsub$.complete();
    console.log('Componente: ' + this.nome + ' foi destruído.');
  }
}
