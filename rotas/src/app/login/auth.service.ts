import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  usuarioAutenticado: boolean = false;

  mostrarMenuEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  fazerLogin(usuario: Usuario) {
    if (usuario.login === 'jean.talar' && usuario.senha === '123') {
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);
    } else {
      this.mostrarMenuEmitter.emit(false);
      this.usuarioAutenticado = false;
    }
  }

  isUsuarioAutenticado() {
    return this.usuarioAutenticado;
  }
}
