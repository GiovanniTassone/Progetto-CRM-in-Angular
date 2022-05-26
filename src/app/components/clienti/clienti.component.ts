import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClientiService } from 'src/app/service/clienti.service';

@Component({
  selector: 'app-clienti',
  template: `
    <div class="container">
      <div>
        <h1 class="text-center mb-2 mt-2">Lista Clienti</h1>
        <div class="d-flex justify-content-between mb-2">
          <button
            class="btn btn-warning mb-3 float-start creaCliente"
            [routerLink]="['/creacliente']"
          >
            Aggiungi Cliente <i class="bi bi-person-plus-fill"></i>
          </button>
          <div class="w-50">
            <form #form="ngForm" (ngSubmit)="search(form)">
              <div class="input-group w-100">
                <input
                  type="text"
                  class="form-control fs-5 ps-4 bg-success text-white rounded-pill bg-opacity-75"
                  placeholder="Ricerca per Ragione Sociale [ricerca Case Sensitive]"
                  ngModel
                  name="ragioneSociale"
                />
                <button
                  type="submit"
                  class="btn bg-info text-white rounded-pill border-white"
                >
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="mx-auto" *ngIf="isLoading">
        <div
          class="spinner-border text-danger "
          style="width: 10rem; height: 10rem; margin-top: 7rem"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div *ngIf="!isLoading">
        <div class="col-4"></div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="fs-5">ID Cliente</th>
              <th scope="col" class="fs-5">Ragione Sociale</th>
              <th scope="col" class="fs-5">Partita IVA</th>
              <th scope="col" class="fs-5">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cliente of listaClienti" class="fs-5">
              <td class="fw-bold">{{ cliente.id }}</td>
              <td>{{ cliente.ragioneSociale }}</td>
              <td>{{ cliente.partitaIva }}</td>
              <td>{{ cliente.email }}</td>
              <td>
                <button
                  class="btn btn-success border-dark mb-2"
                  [routerLink]="['/dettaglicliente', cliente.id]"
                >
                  Dettagli Cliente
                </button>
              </td>
              <td>
                <button
                  class="btn btn-warning border-dark"
                  [routerLink]="['/modificacliente', cliente.id]"
                >
                  Modifica <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger border-dark"
                  (click)="deleteCliente(cliente.id)"
                >
                  Elimina <i class="bi bi-x-lg"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item link-secondary">
              <button
                class="page-link"
                (click)="changePag(currentPage - 1)"
                [disabled]="currentPage <= 0"
                [ngClass]="{ 'text-muted': currentPage <= 0 }"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link link-secondary"
                (click)="changePag(currentPage)"
                [disabled]="currentPage >= pagTot"
                [ngClass]="{ 'text-muted': currentPage >= pagTot }"
              >
                {{ currentPage + 1 }}
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link link-secondary"
                (click)="changePag(currentPage + 1)"
                [disabled]="currentPage + 1 >= pagTot"
                [ngClass]="{ 'text-muted': currentPage + 1 >= pagTot }"
              >
                {{ currentPage + 2 }}
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link link-secondary"
                (click)="changePag(currentPage + 2)"
                [disabled]="currentPage + 2 >= pagTot"
                [ngClass]="{ 'text-muted': currentPage + 2 >= pagTot }"
              >
                {{ currentPage + 3 }}
              </button>
            </li>
            <li class="page-item">
              <button
                [disabled]="currentPage + 3 >= pagTot"
                [ngClass]="{ 'text-muted': currentPage + 3 >= pagTot }"
                class="page-link link-secondary"
                (click)="changePag(currentPage + 3)"
              >
                {{ currentPage + 4 }}
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link link-secondary"
                (click)="changePag(currentPage + 1)"
                [disabled]="currentPage + 1 >= pagTot"
                [ngClass]="{ 'text-muted': currentPage + 1 >= pagTot }"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
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
      li button:hover {
        color: white;
        background-color: green;
      }
      .page-link {
        color: green;
      }
      .pagination a:hover,
      .pagination .active a {
        background-color: rgb(37, 137, 0);
        color: #ffffff;
      }
      h1 {
        text-shadow: 0px 5px 5px black;
      }
      .creaCliente:hover {
        outline: 3px solid white;
      }
      .page-item {
        cursor: pointer;
      }
      ::placeholder {
        color: lightgray;
      }
    `,
  ],
})
export class ClientiComponent implements OnInit {
  currentPage: number = 0;
  numPage: any;
  pagTot!: number;
  listaClienti!: Cliente[];
  isLoading: boolean = true;

  constructor(private clientSrv: ClientiService) {}

  ngOnInit(): void {
    this.getAllClients(this.currentPage);
  }

  getAllClients(pages: number) {
    this.clientSrv.getAll(this.currentPage).subscribe((data) => {
      this.listaClienti = data.content;
      this.pagTot = data.totalPages;
      this.isLoading = false;
    });
  }

  deleteCliente(id: number) {
    this.clientSrv.deleteCliente(id).subscribe(() => {
      this.getAllClients(this.currentPage);
    });
  }

  changePag(pages: number) {
    this.currentPage = pages;
    this.getAllClients(this.currentPage);
  }

  search(form: any) {
    if (form.value.ragioneSociale === '') {
      this.getAllClients(this.currentPage);
    } else {
      this.clientSrv
        .getByRagioneSociale(form.value.ragioneSociale)
        .subscribe((data) => {
          this.listaClienti = data.content;
        });
    }
  }
}
