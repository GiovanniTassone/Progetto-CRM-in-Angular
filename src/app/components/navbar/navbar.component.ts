import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav
      class="navbar navbar-expand navbar-dark"
      aria-label="Fifth navbar example"
    >
      <div class="container">
        <a class="navbar-brand"
          ><img
            src="https://www.intesasanpaolo.com/etc/designs/vetrina/images/logo-intesasanpaolo.png"
            alt="Logo Intesa SanPaolo"
        /></a>

        <div class="collapse navbar-collapse" id="navbarsExample05">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
            <li class="nav-item">
              <a
                *ngIf="!user"
                class="nav-link"
                [routerLink]="['/']"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                *ngIf="!user"
                class="nav-link"
                [routerLink]="['/login']"
                routerLinkActive="active"
                >Login</a
              >
            </li>
            <li class="nav-item">
              <a
                *ngIf="!user"
                class="nav-link"
                [routerLink]="['/signup']"
                routerLinkActive="active"
                >Registrati</a
              >
            </li>
            <li class="nav-item">
              <a
                *ngIf="user"
                class="nav-link"
                routerLinkActive="active"
                [routerLink]="['/users']"
                >Utenti</a
              >
            </li>
            <li class="nav-item">
              <a
                *ngIf="user"
                class="nav-link"
                [routerLink]="['/clienti']"
                routerLinkActive="active"
                >Clienti</a
              >
            </li>
            <li class="nav-item">
              <a
                *ngIf="user"
                class="nav-link"
                [routerLink]="['/fatture']"
                routerLinkActive="active"
                >Fatture</a
              >
            </li>
          </ul>
          <div *ngIf="user" class="d-flex">
            <h5 class="align-self-end me-3">Benvenuto {{ user.username }}</h5>
            <button class="btn btn-danger" (click)="logout()">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      nav {
        background-color: rgb(37, 137, 0);
        color: white;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  user!: User | null;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      localStorage.getItem('user');
      this.user = user;
    });
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/']);
  }
}
