import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../models/estado';
import { Cidade } from '../models/cidade';
import { map } from 'rxjs';

@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBR() {
    return this.http.get<Estado[]>('assets/estadosbr.json');
  }

  getCidades(estadoId: number) {
    return this.http
      .get<Cidade[]>('assets/cidades.json')
      .pipe(
        map((cidades: Cidade[]) => cidades.filter((c) => c.estado == estadoId))
      );
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Júnior', desc: 'Dev Jr.' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl.' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr.' },
    ];
  }

  getTecnologias() {
    return [
      { nome: 'csharp', desc: 'C#' },
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'html', desc: 'HTML' },
      { nome: 'flutter', desc: 'Flutter' },
    ];
  }

  getNewsletterOptions() {
    return [
      { valor: true, desc: 'Sim' },
      { valor: false, desc: 'Não' },
    ];
  }
}
