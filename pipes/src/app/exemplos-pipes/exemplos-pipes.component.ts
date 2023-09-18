import { Component, NgModule } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css'],
})
export class ExemplosPipesComponent {
  livro: any = {
    titulo: 'Capitão Cueca',
    rating: 4.5321,
    numeroPaginas: 150,
    preco: 35.99,
    dataLancamento: new Date(2023, 0, 24),
    url: 'https://a.co/d/dzLAfMF',
  };

  livros: Array<string> = ['Angular', 'ASP.NET', 'Typescript'];

  filtro: string = '';

  addLivro(nome: string) {
    this.livros.push(nome);
  }

  obterLivros() {
    if (this.livros.length > 0 && this.filtro.trim()) {
      const filter = this.filtro.toLowerCase();
      return this.livros.filter(
        (l: string) => l.toLowerCase().indexOf(filter) != -1
      );
    }

    return this.livros;
  }

  // async
  valorAsyncPromise: any = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Valor async via promise.');
    }, 2000);
  });

  valorAsyncObservable: any = interval(2000).pipe(
    map((_) => 'Valor async via Observable')
  );
}
