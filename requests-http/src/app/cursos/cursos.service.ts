import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { environment } from 'src/environments/environment';
import { ICrud } from '../shared/ICrud';

@Injectable({
  providedIn: 'root',
})
export class CursosService extends ICrud<Curso> {
  constructor(http: HttpClient) {
    super(http, `${environment.API}/cursos`);
  }
}
