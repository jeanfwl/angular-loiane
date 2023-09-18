import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

import { CursosService } from '../cursos/cursos.service';

type CursoCreateOrEdit = {
  id: number | null;
  nome: string | null;
};

export const CursoResolverGuard: ResolveFn<CursoCreateOrEdit> = (route, _) => {
  if (route.params && route.params['id']) {
    const id = route.params['id'];
    return inject(CursosService).getById(id);
  }

  return of({
    id: null,
    nome: null,
  });
};
