import { Component, OnInit, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../shared/services/auth-service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatMenuModule, MatDividerModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  srvAuth = inject(AuthService);


  loggOut() {
    this.srvAuth.loggOut();
  }

  logIn() {
  }

  changePasswForm() {
  }
}
