import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IFormCanDeactivate } from '../../guards/form-can-deactivate';

@Injectable()
export class AlunosDeactivateGuard
  implements CanDeactivate<IFormCanDeactivate>
{
  constructor() {}

  canDeactivate(
    component: IFormCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (component.podeDesativar()) {
      return confirm(
        'Tem certeza que deseja sair? Seus dados não serão salvos.'
      );
    }

    return true;
  }
}
