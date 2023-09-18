import { Component } from '@angular/core';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  usuario: Usuario = new Usuario();

  fazerLogin() {
    this.authService.fazerLogin(this.usuario);
  }
}
