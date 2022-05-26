import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuloFattura } from 'src/app/model/modulo-fattura';
import { FattureService } from 'src/app/service/fatture.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crea-fattura',
  template: `
    <div class="container">
      <div class="containerModif mx-auto container">
        <div class="row mt-4">
          <div class="col text-dark d-flex align-items-center">
            <p (click)="turnBack()">
              <i class="bi bi-arrow-left-circle"></i> Torna alla lista fatture
            </p>
          </div>
        </div>
        <div
          class="card w-50 text-dark mx-auto text-start roudered border border-3 border-dark"
        >
          <div class="card-header">
            <h4 class="card-title text-center mt-2 fw-bold text-success">
              Nuova fattura
            </h4>
          </div>
          <div class="card-body">
            <form #form="ngForm" (ngSubmit)="onSubmit(form)">
              <div class="form-group fs-5">
                <label for="importo">Importo</label>
                <input
                  ngModel
                  name="importo"
                  class="form-control"
                  type="number"
                  id="importo"
                />
              </div>
              <div class="form-group fs-5">
                <label for="numero">Numero fattura</label>
                <input
                  ngModel
                  name="numero"
                  class="form-control"
                  type="number"
                  id="numero"
                />
              </div>
              <div class="form-group fs-5">
                <label for="anno">Anno</label>
                <input
                  ngModel
                  name="anno"
                  class="form-control"
                  type="number"
                  id="anno"
                />
              </div>
              <div class="form-group fs-5">
                <label for="numero">Stato</label><br />
                <select ngModel class="form-control" name="stato" id="stato">
                  <option value="2">PAGATA</option>
                  <option value="1">NON PAGATA</option>
                </select>
              </div>
              <div
                class="card-footer d-flex justify-content-center gap-3 mt-3 rounded"
              >
                <button type="buttons" class="btn btn-danger btn-lg">
                  Annulla
                </button>
                <button
                  type="submit"
                  class="btn btn-success btn-lg"
                  (click)="modificaEffettuata = true; turnBackSuccess()"
                >
                  Crea Fattura
                </button>
              </div>
            </form>
          </div>
          <div
            class="alert alert-success mt-3 mx-auto fw-bold fs-4 text-center"
            role="alert"
            *ngIf="modificaEffettuata"
          >
            Fattura creata con Successo!<!-- Finire di fare il window history -->
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
        margin-top: 2rem;
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
export class CreaFatturaComponent implements OnInit {
  idCliente!: number;
  metodoFattura!: ModuloFattura;
  currentDate!: string;
  modificaEffettuata: boolean = false;
  constructor(
    private fatturaSrv: FattureService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.params['id'];
  }

  onSubmit(submittedForm: any) {
    this.metodoFattura = {
      numero: 0,
      anno: 0,
      data: '',
      importo: 0,
      stato: {
        id: 0,
        nome: '',
      },
      cliente: {
        id: 0,
      },
    };
    this.currentDate = new Date().toISOString();
    this.metodoFattura.data = this.currentDate;
    this.metodoFattura.importo = +submittedForm.value.importo;
    this.metodoFattura.numero = +submittedForm.value.numero;
    this.metodoFattura.anno = +submittedForm.value.anno;
    this.metodoFattura.cliente.id = this.idCliente;
    this.metodoFattura.stato.id = +submittedForm.value.stato;
    if (this.metodoFattura.stato.id == 1) {
      this.metodoFattura.stato.nome = 'PAGATA';
    } else {
      this.metodoFattura.stato.nome = 'NON PAGATA';
    }
    this.fatturaSrv.creaFattura(this.metodoFattura).subscribe();
  }

  turnBackSuccess() {
    setTimeout(() => {
      this.location.back();
    }, 1800);
  }

  turnBack() {
    this.location.back();
  }
}
