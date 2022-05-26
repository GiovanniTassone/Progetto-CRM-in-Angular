import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fattura } from 'src/app/model/fattura';
import { FattureService } from 'src/app/service/fatture.service';

@Component({
  selector: 'app-fatture',
  template: `
    <div class="container ">
      <h1 *ngIf="!clienteCorrente" class="text-center">Lista Fatture</h1>
      <div
        class="container-fluid d-flex flex-wrap justify-content-around mt-3"
        [ngClass]="clienteCorrente ? 'contFatt2' : 'contFatt'"
      >
        <div class="card grid-item mt-4" *ngFor="let fattura of listaFatture">
          <div class="card-body text-dark">
            <h5 class="card-title fw-bold">
              {{ fattura.cliente.ragioneSociale }}
            </h5>
            <p class="card-text ">
              Importo:<span> {{ fattura.importo | currency: 'EUR' }}</span>
            </p>
            <p class="card-text">
              Stato Fattura :
              <span
                [ngClass]="
                  fattura.stato.nome === 'PAGATA'
                    ? 'text-success'
                    : 'text-danger'
                "
                >{{ fattura.stato.nome }}</span
              >
            </p>
            <p class="card-text">
              ID Cliente: <span>{{ fattura.cliente.id }}</span>
            </p>
            <p class="card-text">
              Data : <span>{{ fattura.data | date: 'd/M/yy, h:mm a' }}</span>
            </p>
            <hr />
            <button
              class="btn btn-success"
              [routerLink]="['/fatture', fattura.id]"
            >
              Dettagli fattura
            </button>
          </div>
        </div>
      </div>
      <nav class="mt-3" *ngIf="!clienteCorrente">
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
              class="p-2 bg-white text-success border border-success border-4 rounded-pill"
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
  `,
  styles: [
    `
      h1 {
        text-shadow: 0px 5px 5px black;
      }
      p {
        font-weight: bold;
      }
      .contFatt {
        height: 75vh;
        overflow: auto;
      }
      .contFatt2 {
        height: 50vh;
        overflow: auto;
      }
      .card {
        min-width: 280px;
        max-width: 280px;
      }
      .card:hover {
        transform: scale(1.07);
        box-shadow: 0 0 20px 10px #000;
      }
      .page-link {
        cursor: pointer;
      }
      .page-link:hover {
        transform: scale(1.05);
        box-shadow: 0 0 17px 3px #000;
      }
      ::-webkit-scrollbar {
        width: 25px;
      }

      ::-webkit-scrollbar-track {
        background-color: lightgray;
        border-radius: 20px;
        box-shadow: 0 0 17px 3px #000;
      }

      ::-webkit-scrollbar-thumb {
        background-color: rgb(37, 137, 0);
        border-radius: 20px;
        border: 5px solid black;
        background-clip: content-box;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: rgb(25, 135, 84);
      }
      .creaFattura:hover {
        outline: 3px solid white;
      }
      .nascondiScrollbar {
        overflow: hidden;
      }
    `,
  ],
})
export class FattureComponent implements OnInit {
  currentPage: number = 0;
  numPage: any;
  response: any;
  listaFatture!: Fattura[];
  sub!: Subscription;
  clienteCorrente: boolean = false;

  constructor(
    private fatturaSrv: FattureService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onGetPath();
  }

  onGetPath() {
    this.sub = this.router.params.subscribe((params: Params) => {
      if (this.router.snapshot.url[1]) {
        const id = +params['id'];
        this.getFattureCliente(id);
        this.clienteCorrente = true;
        return;
      }
      this.getFatture();
    });
  }

  getFatture() {
    this.fatturaSrv.getAll(this.currentPage).subscribe((res) => {
      this.response = res;
      this.listaFatture = this.response.content;
    });
  }

  getFattureCliente(id: number) {
    this.sub = this.fatturaSrv.getFattureByCliente(id).subscribe((data) => {
      this.listaFatture = data.content;
    });
  }

  nextPage() {
    this.currentPage++;
    this.getFatture();
  }

  previousPage() {
    this.currentPage--;
    this.getFatture();
  }
}
