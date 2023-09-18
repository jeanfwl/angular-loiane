import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome" [valor]="valor" estilo="bg-secondary">
    </app-poc-base>
  `,
})
export class PocUnsubComponent implements OnInit, OnDestroy {
  nome = 'Componente com unsubscribe';
  valor!: string;

  constructor(private service: EnviarValorService) {}

  sub!: Subscription;
  ngOnInit() {
    this.sub = this.service
      .getValor()
      .pipe(tap((valor) => console.log(this.nome, valor)))
      .subscribe((valor) => (this.valor = valor));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log('Componente: ' + this.nome + ' foi destruído.');
  }
}
