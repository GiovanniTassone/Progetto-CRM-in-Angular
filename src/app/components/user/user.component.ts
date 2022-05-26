import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user',
  template: `
    <div class="container">
      <h1 class="text-center mb-2 mt-3">Lista Utenti</h1>
      <div>
        <div class="mx-auto" *ngIf="isLoading">
          <div
            class="spinner-border text-danger "
            style="width: 10rem; height: 10rem; margin-top: 7rem"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <table class="table mt-4" *ngIf="!isLoading">
          <thead>
            <tr>
              <th scope="col" class="fs-5">Username</th>
              <th scope="col" class="fs-5">Email</th>
              <th scope="col" class="fs-5">Ruolo</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users" class="fs-5">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span
                  *ngFor="let ruolo of user.roles"
                  [ngClass]="
                    ruolo.roleName === 'ROLE_USER'
                      ? 'text-warning fw-bold mx-3'
                      : 'text-danger fw-bold'
                  "
                  >{{ ruolo.roleName | slice: 5:10 }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="mt-3" *ngIf="!isLoading">
          <ul class="pagination justify-content-evenly">
            <li class="page-item">
              <a
                class="page-link text-success border-success border-4 rounded-pill"
                (click)="previousPage()"
              >
                <span aria-hidden="true"
                  ><i class="bi bi-caret-left-fill"></i> Previous</span
                >
              </a>
            </li>
            <li class="page-item me-5">
              <p
                class="p-2 bg-white text-success border border-success border-4 rounded-pill fw-bold"
              >
                Pagina {{ currentPage + 1 }}
              </p>
            </li>
            <li class="page-item">
              <a
                class="page-link text-success border-success border-4 rounded-pill"
                (click)="nextPage()"
              >
                <span aria-hidden="true"
                  >Next <i class="bi bi-caret-right-fill"></i
                ></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [
    `
      table {
        border-radius: 20px;
        box-shadow: 0 0 20px 10px #000;
        background-color: white;
        contain: content;
      }
      th {
        color: rgb(37, 137, 0);
        vertical-align: middle;
        font-weight: bold;
      }
      td {
        vertical-align: middle;
      }
      tbody {
        background-color: rgb(37, 137, 0);
        color: white;
      }
      button:hover {
        transform: scale(1.15);
      }
      li a {
        color: green;
      }
      h1 {
        text-shadow: 0px 5px 5px black;
      }
      .page-link {
        cursor: pointer;
      }
      .page-link:hover {
        transform: scale(1.05);
        box-shadow: 0 0 17px 3px #000;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  numPage: any;
  currentPage: number = 0;
  response: any;
  users!: User[];
  isLoading: boolean = true;

  constructor(private userSrv: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userSrv.getAll(this.currentPage).subscribe((data) => {
      this.users = data.content;
      this.isLoading = false;
    });
  }

  nextPage() {
    this.currentPage++;
    this.getUsers();
  }

  previousPage() {
    this.currentPage--;
    this.getUsers();
  }
}
