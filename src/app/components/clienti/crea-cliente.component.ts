import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClientiService } from 'src/app/service/clienti.service';

interface NuovoCliente {
  ragioneSociale: string;
  partitaIva: string;
  tipoCliente: string;
  email: string;
  pec: string;
  telefono: string;
  nomeContatto: string;
  cognomeContatto: string;
  telefonoContatto: string;
  emailContatto: string;
  indirizzoSedeOperativa: {
    via: string;
    civico: string;
    cap: string;
    località: string;
    comune: {
      id: 1;
      nome: string;
      provincia: {
        id: 1;
        nome: string;
        sigla: string;
      };
    };
  };
  indirizzoSedeLegale: {
    via: string;
    civico: string;
    cap: string;
    località: string;
    comune: {
      id: 1;
      nome: string;
      provincia: {
        id: 1;
        nome: string;
        sigla: string;
      };
    };
  };
  dataInserimento: string;
  dataUltimoContatto: string;
}

@Component({
  selector: 'app-crea-cliente',
  template: `
    <form
      class="mt-3 container text-white text-start fs-5 detailsContainer"
      [formGroup]="validateForm"
      (ngSubmit)="onSubmit()"
    >
      <div>
        <p
          class="float-left mb-1"
          [routerLink]="['/clienti']"
          routerLinkActive="router-link-active"
        >
          <i class="bi bi-arrow-left-circle"></i> Torna alla lista clienti
        </p>
      </div>
      <h1 class="text-center">Nuovo Cliente</h1>
      <hr class="mb-0" />
      <div class="form-row">
        <div class="form-group col">
          <label>Ragione Sociale</label>
          <input
            type="text"
            name="ragioneSociale"
            id="ragioneSociale"
            class="form-control"
            formControlName="ragioneSociale"
          />
        </div>
        <div class="form-group col">
          <label>Partita IVA</label>
          <input
            type="number"
            name="partitaIva"
            id="partitaIva"
            class="form-control"
            formControlName="partitaIva"
          />
        </div>
      </div>
      <div class="form-row d-flex gap-2 containerInput">
        <div class="form-group col-6">
          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            formControlName="email"
          />
        </div>
        <div class="form-group col-6">
          <label>Email PEC</label>
          <input
            type="email"
            name="pec"
            id="pec"
            class="form-control"
            formControlName="pec"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="containerInput d-flex gap-2">
          <div class="form-group col-6">
            <label>Nome Contatto</label>
            <input
              type="text"
              name="nomeContatto"
              id="nomeContatto"
              class="form-control"
              formControlName="nomeContatto"
            />
          </div>
          <div class="form-group col-6">
            <label>Cognome Contatto</label>
            <input
              type="text"
              name="cognomeContatto"
              id="cognomeContatto"
              class="form-control"
              formControlName="cognomeContatto"
            />
          </div>
        </div>
        <div class="containerInput d-flex gap-2">
          <div class="form-group col">
            <label>Telefono Contatto</label>
            <input
              type="text"
              class="form-control"
              id="telContatto"
              name="telContatto"
              formControlName="telContatto"
            />
          </div>
          <div class="form-group col">
            <label>Email Contatto</label>
            <input
              type="email"
              class="form-control"
              name="emailContatto"
              id="emailContatto"
              formControlName="emailContatto"
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Telefono</label>
          <input
            type="text"
            name="telefono"
            id="telefono"
            class="form-control"
            formControlName="telefono"
          />
        </div>
        <div class="form-group col">
          <label>Tipo Cliente</label>
          <select
            class="form-control"
            name="tipoCliente"
            id="tipoCliente"
            required
            formControlName="tipoCliente"
          >
            <option selected>...</option>
            <option value="SRL">SRL</option>
            <option value="SPA">SPA</option>
            <option value="SAS">SAS</option>
            <option value="PA">PA</option>
          </select>
        </div>
      </div>
      <hr />
      <!-- operativo -->
      <div class="form-row">
        <h3>Info Sede Operativa</h3>
        <div class="containerInput d-flex gap-2">
          <div class="form-group col-5">
            <label>Via</label>
            <input
              type="text"
              name="viaSedeOper"
              id="viaSedeOper"
              class="form-control"
              formControlName="viaSedeOper"
            />
          </div>
          <div class="form-group col">
            <label>N° Civico</label>
            <input
              type="text"
              name="civicoSedeOper"
              id="civicoSedeOper"
              class="form-control"
              formControlName="civicoSedeOper"
            />
          </div>
          <div class="form-group col">
            <label>Cap</label>
            <input
              type="text"
              class="form-control"
              name="capSedeOper"
              id="capSedeOper"
              formControlName="capSedeOper"
            />
          </div>
          <div class="form-group col-3">
            <label>Località</label>
            <input
              type="text"
              class="form-control"
              name="localitaSedeOper"
              id="localitaSedeOper"
              formControlName="localitaSedeOper"
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="containerInput d-flex gap-2">
          <div class="form-group col-5">
            <label>Comune</label>
            <input
              type="text"
              name="nomeComuneSedeOper"
              id="nomeComuneSedeOper"
              class="form-control"
              formControlName="nomeComuneSedeOper"
            />
          </div>
          <div class="form-group col-5">
            <label>Provincia</label>
            <input
              type="text"
              name="nomeProvinciaSedeOper"
              id="nomeProvinciaSedeOper"
              class="form-control"
              formControlName="nomeProvinciaSedeOper"
            />
          </div>
          <div class="form-group col-2">
            <label>Sigla</label>
            <input
              type="text"
              name="siglaProvinciaSedeOper"
              id="siglaProvinciaSedeOper"
              class="form-control"
              formControlName="siglaProvinciaSedeOper"
            />
          </div>
        </div>
      </div>
      <hr />
      <!-- Legale -->
      <div class="form-row">
        <h3>Info Sede Operativa</h3>
        <div class="containerInput d-flex gap-2">
          <div class="form-group col-5">
            <label>Via</label>
            <input
              type="text"
              name="viaSedeLeg"
              id="viaSedeLeg"
              class="form-control"
              formControlName="viaSedeLeg"
            />
          </div>
          <div class="form-group col">
            <label>Civico</label>
            <input
              type="text"
              name="civicoSedeLeg"
              id="civicoSedeLeg"
              class="form-control"
              formControlName="civicoSedeLeg"
            />
          </div>
          <div class="form-group col">
            <label>Cap</label>
            <input
              type="text"
              class="form-control"
              name="capSedeLeg"
              id="capSedeLeg"
              formControlName="capSedeLeg"
            />
          </div>
          <div class="form-group col-3">
            <label>Località</label>
            <input
              type="text"
              class="form-control"
              name="localitaSedeLeg"
              id="localitaSedeLeg"
              formControlName="localitaSedeLeg"
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="containerInput d-flex gap-2">
          <div class="form-group col-5">
            <label>Comune</label>
            <input
              type="text"
              name="comuneNomeSedeLegale"
              id="comuneNomeSedeLegale"
              class="form-control"
              formControlName="nomeComuneSedeLegale"
            />
          </div>
          <div class="form-group col-5">
            <label>Provincia</label>
            <input
              type="text"
              name="provinciaNomeSedeLegale"
              id="provinciaNomeSedeLegale"
              class="form-control"
              formControlName="provinciaNomeSedeLegale"
            />
          </div>
          <div class="form-group col-2">
            <label>Sigla</label>
            <input
              type="text"
              name="provinciaSiglaSedeLegale"
              id="provinciaSiglaSedeLegale"
              class="form-control"
              formControlName="provinciaSiglaSedeLegale"
            />
          </div>
        </div>
      </div>
      <hr />
      <div class="form-row">
        <div class="form-group col">
          <label>Data Inserimento Utente</label>
          <input
            name="dataInserimentoUtente"
            id="dataInserimentoUtente"
            class="form-control"
            readonly
            value="{{ dataAttuale }}"
          />
        </div>
        <div class="form-group col">
          <label>Data Ultimo Contatto</label>
          <input
            name="dataUltimoContatto"
            id="dataUltimoContatto"
            class="form-control"
            readonly
            value="{{ dataAttuale }}"
          />
        </div>
      </div>
      <div class="text-center">
        <button
          class="btn btn-success mt-2 border-dark"
          type="submit"
          [disabled]="!validateForm.valid"
        >
          Crea Cliente
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .detailsContainer {
        background-color: rgb(37, 137, 0);
        padding: 12px 30px;
        border-radius: 20px;
        box-shadow: 0 0 20px 10px #000;
        margin-top: 40px;
        overflow: auto;
        height: 90%;
      }
      .containerInput {
        contain: content;
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
      input,
      select {
        border-left: 10px solid lightblue;
      }
      input.ng-invalid,
      select.ng-invalid {
        border-left: 10px solid red;
      }
    `,
  ],
})
export class CreaClienteComponent implements OnInit {
  validateForm!: FormGroup;
  cliente!: Cliente[];
  dataAttuale = new Date().toISOString();
  nuovoCliente: NuovoCliente = {
    ragioneSociale: '',
    partitaIva: '',
    tipoCliente: '',
    email: '',
    pec: '',
    telefono: '',
    nomeContatto: '',
    cognomeContatto: '',
    telefonoContatto: '',
    emailContatto: '',
    indirizzoSedeOperativa: {
      via: '',
      civico: '',
      cap: '',
      località: '',
      comune: {
        id: 1,
        nome: '',
        provincia: {
          id: 1,
          nome: '',
          sigla: '',
        },
      },
    },
    indirizzoSedeLegale: {
      via: '',
      civico: '',
      cap: '',
      località: '',
      comune: {
        id: 1,
        nome: '',
        provincia: {
          id: 1,
          nome: '',
          sigla: '',
        },
      },
    },
    dataInserimento: '',
    dataUltimoContatto: '',
  };

  constructor(
    private clienteSrv: ClientiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    this.nuovoCliente.ragioneSociale = this.validateForm.value.ragioneSociale;
    this.nuovoCliente.partitaIva = this.validateForm.value.partitaIva;
    this.nuovoCliente.email = this.validateForm.value.email;
    this.nuovoCliente.pec = this.validateForm.value.pec;
    this.nuovoCliente.nomeContatto = this.validateForm.value.nomeContatto;
    this.nuovoCliente.cognomeContatto = this.validateForm.value.cognomeContatto;
    this.nuovoCliente.telefono = this.validateForm.value.telefono;
    this.nuovoCliente.tipoCliente = this.validateForm.value.tipoCliente;
    this.nuovoCliente.emailContatto = this.validateForm.value.emailContatto;
    this.nuovoCliente.telefonoContatto = this.validateForm.value.telContatto;
    /* Sede Operativa (7)*/
    this.nuovoCliente.indirizzoSedeOperativa.via =
      this.validateForm.value.viaSedeOper;

    this.nuovoCliente.indirizzoSedeOperativa.civico =
      this.validateForm.value.civicoSedeOper;

    this.nuovoCliente.indirizzoSedeOperativa.cap =
      this.validateForm.value.capSedeLeg;

    this.nuovoCliente.indirizzoSedeOperativa.località =
      this.validateForm.value.localitaSedeOper;

    this.nuovoCliente.indirizzoSedeOperativa.comune.nome =
      this.validateForm.value.nomeComuneSedeOper;

    this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.nome =
      this.validateForm.value.nomeProvinciaSedeOper;

    this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.sigla =
      this.validateForm.value.siglaProvinciaSedeOper;

    /* Sede Legale (7) */
    this.nuovoCliente.indirizzoSedeLegale.via =
      this.validateForm.value.viaSedeLeg;

    this.nuovoCliente.indirizzoSedeLegale.civico =
      this.validateForm.value.civicoSedeLeg;

    this.nuovoCliente.indirizzoSedeLegale.cap =
      this.validateForm.value.capSedeLeg;

    this.nuovoCliente.indirizzoSedeLegale.località =
      this.validateForm.value.localitaSedeLeg;

    this.nuovoCliente.indirizzoSedeLegale.comune.nome =
      this.validateForm.value.nomeComuneSedeLegale;

    this.nuovoCliente.indirizzoSedeLegale.comune.provincia.nome =
      this.validateForm.value.provinciaNomeSedeLegale;

    this.nuovoCliente.indirizzoSedeLegale.comune.provincia.sigla =
      this.validateForm.value.provinciaSiglaSedeLegale;

    /* ------------ */
    this.nuovoCliente.dataInserimento =
      this.validateForm.value.dataInserimentoUtente;

    this.nuovoCliente.dataUltimoContatto =
      this.validateForm.value.dataUltimoContatto;

    this.addCliente(this.nuovoCliente);
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      ragioneSociale: ['', Validators.required],
      partitaIva: ['', Validators.required],
      tipoCliente: ['SRL', Validators.required],
      email: ['', Validators.required],
      pec: ['', Validators.required],
      telefono: ['', Validators.required],
      nomeContatto: ['', Validators.required],
      cognomeContatto: ['', Validators.required],
      telContatto: ['', Validators.required],
      emailContatto: ['', Validators.required],

      viaSedeOper: ['', Validators.required],
      viaSedeLeg: ['', Validators.required],

      civicoSedeOper: ['', Validators.required],
      civicoSedeLeg: ['', Validators.required],

      capSedeOper: ['', Validators.required],
      capSedeLeg: ['', Validators.required],

      localitaSedeOper: ['', Validators.required],
      localitaSedeLeg: ['', Validators.required],

      nomeComuneSedeOper: ['', Validators.required],
      nomeComuneSedeLegale: ['', Validators.required],

      nomeProvinciaSedeOper: ['', Validators.required],
      provinciaNomeSedeLegale: ['', Validators.required],

      siglaProvinciaSedeOper: ['', Validators.required],
      provinciaSiglaSedeLegale: ['', Validators.required],
    });
  }

  addCliente(nuovoCliente: any) {
    this.clienteSrv.createCliente(nuovoCliente).subscribe((res) => {
      this.router.navigate(['/clienti']);
    });
  }
}
