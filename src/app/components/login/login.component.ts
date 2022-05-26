import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div
      class="container h-75 d-flex align-items-center flex-column justify-content-center"
    >
      <div class="row greenContainer">
        <h2 class="text-center">Login</h2>
        <div class="row">
          <form #form="ngForm" (ngSubmit)="login(form)">
            <div>
              <label for="username"></label>
              <input
                type="text"
                name="username"
                id="username"
                class="form-control"
                placeholder="Inserisci il tuo Username"
                ngModel
                required
              />
            </div>
            <div>
              <label for="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-control"
                placeholder="Inserisci la tua password"
                ngModel
                required
              />
            </div>
            <div class="d-flex justify-content-center">
              <button
                type="submit"
                [disabled]="form.invalid"
                class="btn btn-success mt-3 border-dark"
              >
                Accedi
              </button>
              <div class="fs-6 mt-4 ms-3">
                oppure <span [routerLink]="['/signup']">Registrati</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div *ngIf="errorMessage" class="container w-50 containerErrMess ">
        <h4>{{ errorMessage }}</h4>
      </div>
    </div>
  `,
  styles: [
    `
      span:hover {
        text-decoration: underline;
        cursor: pointer;
      }
      .containerErrMess {
        background-color: rgb(247, 51, 51);
        margin-top: 1.2rem;
        border-radius: 20px;
        border: 3px solid red;
        padding: 1.1rem;
        box-shadow: 0 0 20px 10px #000;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async login(form: NgForm) {
    try {
      await this.authSrv.login(form.value).toPromise();
      this.errorMessage = undefined;
      this.router.navigate(['/clienti']);
    } catch (error: any) {
      form.reset();
      this.errorMessage = error;
    }
  }
}
