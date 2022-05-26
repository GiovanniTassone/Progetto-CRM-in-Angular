import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fattura } from 'src/app/model/fattura';
import { StatoFattura } from 'src/app/model/stato-fattura';
import { FattureService } from 'src/app/service/fatture.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dettagli-fatture',
  template: `
    <div class="container">
      <div class="containerModif mx-auto ">
        <div class="row mt-4">
          <div class="col text-dark d-flex align-items-center">
            <p (click)="turnBack()">
              <i class="bi bi-arrow-left-circle"></i> Torna alla lista fatture
            </p>
          </div>
        </div>
        <div class="mx-auto">
          <div
            class="spinner-border text-danger "
            style="width: 10rem; height: 10rem;"
            role="status"
            *ngIf="isLoading"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="row" *ngIf="fattura">
          <div class="col">
            <h1>Dettagli fattura n°{{ fattura.id }}</h1>
          </div>
        </div>
        <div
          *ngIf="fattura"
          class="card w-50 text-dark mx-auto text-start roudered border border-3 border-dark"
        >
          <div class="card-body">
            <h5 class="card-title fw-bold text-success fs-3">
              {{ fattura.cliente.ragioneSociale }}
            </h5>
            <h5 class="card-subtitle text-muted fs-4">
              {{ fattura.cliente.nomeContatto }}
              {{ fattura.cliente.cognomeContatto }}
            </h5>
            <p class="card-text fs-4 mt-3">
              <span class="fw-bold me-3">Importo:</span>
              <span class="text-success fw-bold">{{
                fattura.importo | currency: 'EUR'
              }}</span>
            </p>
            <p class="card-text fs-4">
              <span class="fw-bold me-3">Stato Fattura:</span>
              <select
                name="stato"
                id="stato"
                class="form-select rounded text-center w-50 d-inline"
                (change)="onChangeStatus($event)"
              >
                <option value="{{ fattura.stato.id }}" selected>
                  {{ fattura.stato.nome }}
                </option>
                <option *ngIf="fattura.stato.nome === 'PAGATA'" value="2">
                  NON PAGATA
                </option>
                <option *ngIf="fattura.stato.nome === 'NON PAGATA'" value="1">
                  PAGATA
                </option>
              </select>
            </p>
            <p class="card-text fs-4">
              <span class="fw-bold">ID Unico:</span> {{ fattura.id }}
            </p>
            <p class="card-text fs-4">
              <span class="fw-bold">Data: </span
              >{{ fattura.data | date: 'd/M/yy, h:m a' }}
            </p>
            <div class="row">
              <div class="d-flex justify-content-center">
                <button
                  class="btn btn-success btn-lg me-4"
                  (click)="inviaModifica(); modificaEffettuata = true"
                >
                  Salva
                </button>
                <button
                  class="btn btn-danger btn-lg"
                  [routerLink]="['/fatture']"
                  (click)="eliminaFattura()"
                >
                  Elimina
                </button>
              </div>
            </div>
            <div
              class="alert alert-success mt-3 mx-auto fw-bold fs-4 text-center"
              role="alert"
              *ngIf="modificaEffettuata"
            >
              Modifica apportata con Successo!
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      h1 {
        text-shadow: 0px 5px 5px black;
      }
      .containerModif {
        background-color: rgb(37, 137, 0);
        width: 80%;
        height: 80%;
        padding: 20px 10px 70px;
        margin-top: 10rem;
        border-radius: 20px;
        box-shadow: 0 0 20px 10px #000;
      }
      .align-items-center p {
        text-align: left;
        color: lightgray;
        font-size: 1.4rem;
        margin-left: 20px;
        margin-top: -25px;
      }
      .align-items-center p:hover {
        color: white;
        cursor: pointer;
      }
    `,
  ],
})
export class DettagliFattureComponent implements OnInit {
  fattura!: Fattura;
  idFattura!: number;
  modifica!: boolean;
  valueModifica!: number;
  nuovoStato!: StatoFattura;
  modificaEffettuata: boolean = false;
  isLoading: boolean = true;
  constructor(
    private fatturaSrv: FattureService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.idFattura = this.route.snapshot.params['id'];
    this.fatturaSrv.getFatturaByCliente(this.idFattura).subscribe((res) => {
      this.fattura = res;
      this.isLoading = false;
    });
  }

  onChangeStatus(change: any) {
    this.modifica = true;
    this.valueModifica = change.target.value;
    if (this.valueModifica == 2) {
      this.nuovoStato = {
        id: 2,
        nome: 'PAGATA',
      };
    } else {
      this.nuovoStato = {
        id: 1,
        nome: 'NON PAGATA',
      };
    }
    this.fattura.stato = this.nuovoStato;
  }

  inviaModifica() {
    this.fatturaSrv.changeStatus(this.fattura).subscribe((res) => {
      this.modifica = false;
    });
    setTimeout(() => {
      this.turnBack();
    }, 1800);
  }

  eliminaFattura() {
    this.fatturaSrv.onDelete(this.fattura.id).subscribe(() => {});
  }

  turnBack() {
    this.location.back();
  }
}
