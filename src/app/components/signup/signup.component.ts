import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrazioneUser } from 'src/app/model/registrazione-user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container h-75 d-flex align-items-center">
      <div class="row greenContainer">
        <h2 class="text-center">Registrati</h2>
        <div class="row">
          <form #form="ngForm" (ngSubmit)="onSignup(form)">
            <div>
              <label for="username"></label>
              <input
                type="text"
                name="username"
                id="username"
                class="form-control"
                placeholder="Inserisci il tuo Username"
                [(ngModel)]="form.value.username"
                required
                #username="ngModel"
                pattern="^[a-zA-Z]*$"
              />
              <p
                *ngIf="username.invalid && username.touched"
                class="errorMessage"
              >
                <i class="bi bi-x-octagon-fill"></i> Inserisci un Username
                valido
              </p>
              <p *ngIf="username.valid" class="correctInput">
                <i class="bi bi-check-circle-fill"></i> Campo Valido
              </p>
            </div>
            <div>
              <label for="email"></label>
              <input
                type="email"
                name="email"
                id="email"
                class="form-control"
                placeholder="Inserisci la tua Email"
                [(ngModel)]="form.value.email"
                required
                #email="ngModel"
                pattern="[a-zA-Z0-9]+@[a-zA-Z]+.(com|edu|net|it)"
              />
              <p *ngIf="email.invalid && email.touched" class="errorMessage">
                <i class="bi bi-x-octagon-fill"></i> Inserisci una Email valida
              </p>
              <p *ngIf="email.valid" class="correctInput">
                <i class="bi bi-check-circle-fill"></i> Campo Valido
              </p>
            </div>
            <div>
              <label for="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-control"
                placeholder="inserisci una password con almeno 6 caratteri"
                [(ngModel)]="form.value.password"
                required
                #password="ngModel"
                minlength="6"
              />
              <p
                *ngIf="password.invalid && password.touched"
                class="errorMessage"
              >
                <i class="bi bi-x-octagon-fill"></i> Inserisci una Password
                valida
              </p>
              <p *ngIf="password.valid" class="correctInput">
                <i class="bi bi-check-circle-fill"></i> Campo Valido
              </p>
            </div>
            <div class="form-group w-100 fs-4">
              <h4 class="mt-2">Seleziona il tuo ruolo:</h4>
              <select
                [(ngModel)]="form.value.role"
                required
                name="role"
                class="form-select mb-3 p-2"
              >
                <option>...</option>
                <option value="user">Utente</option>
                <option value="admin">Amministratore</option>
              </select>
            </div>
            <div class="d-flex justify-content-center">
              <button
                type="submit"
                [disabled]="form.invalid"
                class="btn btn-success mt-3 border-dark"
              >
                Registrati
              </button>
            </div>
            <p class="mt-3">
              Sei già registrato?
              <span [routerLink]="['/login']">Effettua l'accesso</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      span:hover {
        text-decoration: underline;
        cursor: pointer;
      }
      .correctInput {
        color: rgb(28, 202, 254);
        margin: 0;
        font-size: 1.1rem;
        text-align: right;
        font-weight: bold;
        text-shadow: 1px 1px 6px black;
      }
      .errorMessage {
        color: rgb(247, 48, 49);
        margin-bottom: 0;
        font-size: 1.1rem;
        text-align: right;
        font-weight: bold;
        text-shadow: 1px 1px 3px white;
      }
    `,
  ],
})
export class SignupComponent implements OnInit {
  newRegistrazione = {
    username: '',
    email: '',
    password: '',
    role: [''],
  };

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSignup(form: NgForm) {
    try {
      this.newRegistrazione.username = form.value.username;
      this.newRegistrazione.email = form.value.email;
      this.newRegistrazione.password = form.value.password;
      this.newRegistrazione.role.splice(0, 1);
      this.newRegistrazione.role.push(form.value.role);
      await this.authSrv.signup(this.newRegistrazione).toPromise();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      alert(error);
      form.reset();
    }
  }
}
