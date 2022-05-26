import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClientiService } from 'src/app/service/clienti.service';

@Component({
  selector: 'app-dettagli-cliente',
  template: `
    <div class="container detailsContainer" *ngIf="cliente">
      <div>
        <p routerLink="/clienti">
          <i class="bi bi-arrow-left-circle"></i> Torna alla lista
        </p>
      </div>
      <table class="table text-white">
        <thead>
          <tr>
            <th scope="col"><h2>Dati Aziendali:</h2></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="fw-bold w-25">Nome Azienda:</th>
            <td>{{ cliente.ragioneSociale }}</td>
          </tr>
          <tr>
            <th class="fw-bold">Partita IVA:</th>
            <td>{{ cliente.partitaIva }}</td>
          </tr>
          <tr>
            <th class="fw-bold">Email Aziendale:</th>
            <td>{{ cliente.email }}</td>
          </tr>
          <tr>
            <th class="fw-bold">Email PEC:</th>
            <td>{{ cliente.pec }}</td>
          </tr>
          <tr>
            <th class="fw-bold">Fatturato Annuale:</th>
            <td>{{ cliente.fatturatoAnnuale | currency: 'EUR' }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table text-white">
        <thead>
          <tr>
            <th scope="col"><h2>Contatto</h2></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="cliente.nomeContatto">
            <th class="fw-bold w-25">Nome:</th>
            <td>{{ cliente.nomeContatto }}</td>
          </tr>
          <tr *ngIf="cliente.cognomeContatto">
            <th class="fw-bold">Cognome:</th>
            <td>{{ cliente.cognomeContatto }}</td>
          </tr>
          <tr *ngIf="cliente.telefono">
            <th class="fw-bold">Telefono:</th>
            <td>{{ cliente.telefono }}</td>
          </tr>
          <tr *ngIf="cliente.emailContatto">
            <th class="fw-bold">Email:</th>
            <td>{{ cliente.emailContatto }}</td>
          </tr>
          <tr
            *ngIf="
              cliente.indirizzoSedeLegale && cliente.indirizzoSedeLegale.comune
            "
          >
            <th class="fw-bold">Sede Legale:</th>
            <td>
              {{ cliente.indirizzoSedeLegale.comune.nome }}(
              {{ cliente.indirizzoSedeLegale.comune.provincia.sigla }} ),
              {{ cliente.indirizzoSedeLegale.via }} ,
              {{ cliente.indirizzoSedeLegale.civico }}
            </td>
          </tr>
          <tr
            *ngIf="
              cliente.indirizzoSedeOperativa &&
              cliente.indirizzoSedeOperativa.comune
            "
          >
            <th class="fw-bold">Sede Operativa:</th>
            <td>
              {{ cliente.indirizzoSedeOperativa.comune.nome }}(
              {{ cliente.indirizzoSedeOperativa.comune.provincia.sigla }} ),
              {{ cliente.indirizzoSedeOperativa.via }} ,
              {{ cliente.indirizzoSedeOperativa.civico }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-evenly">
        <button
          class="btn btn-info border-dark border-3 rounded"
          [routerLink]="['fatture', cliente.id]"
        >
          Visualizza Fatture
        </button>
        <button
          class="btn btn-warning border-dark border-3 rounded"
          [routerLink]="['/creafatture', cliente.id]"
        >
          Crea Nuova Fattura
        </button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .detailsContainer {
        background-color: rgb(37, 137, 0);
        padding: 12px 30px;
        border-radius: 20px;
        box-shadow: 0 0 20px 10px #000;
        margin-top: 40px;
        margin-bottom: 40px;
      }
      p {
        text-align: left;
        color: lightgray;
        font-size: 1.3rem;
      }
      p:hover {
        color: white;
        cursor: pointer;
      }
      table {
        text-align: left;
      }
      h1 {
        text-shadow: 0px 5px 5px black;
      }
    `,
  ],
})
export class DettagliClienteComponent implements OnInit {
  cliente!: Cliente;
  idCliente!: number;
  constructor(
    private clientSrv: ClientiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.params['id'];
    this.clientSrv.getById(this.idCliente).subscribe((res) => {
      this.cliente = res;
    });
  }
}
