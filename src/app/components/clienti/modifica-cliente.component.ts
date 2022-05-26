import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClientiService } from 'src/app/service/clienti.service';

class ClienteMod {
  id = 0;
  ragioneSociale = '';
  partitaIva = '';
  tipoCliente = '';
  email = '';
  pec = '';
  telefono = '';
  nomeContatto = '';
  cognomeContatto = '';
  telefonoContatto = '';
  emailContatto = '';
  indirizzoSedeOperativa = {
    id: 0,
    via: '',
    civico: '',
    cap: '',
    localita: '',
    comune: {
      id: 0,
      nome: '',
      provincia: {
        id: 0,
        nome: '',
        sigla: '',
      },
    },
  };
  indirizzoSedeLegale = {
    id: 0,
    via: '',
    civico: '',
    cap: '',
    localita: '',
    comune: {
      id: 0,
      nome: '',
      provincia: {
        id: 0,
        nome: '',
        sigla: '',
      },
    },
  };
  dataInserimento = '';
  dataUltimoContatto = '';
  fatturatoAnnuale = 0;
}

@Component({
  selector: 'app-modifica-cliente',
  template: `
    <div class="container detailsContainer text-start">
      <div>
        <p class="float-left mb-1" [routerLink]="['/clienti']">
          <i class="bi bi-arrow-left-circle"></i> Torna alla Listra Clienti
        </p>
      </div>
      <form [formGroup]="validateForm">
        <h1>Modifica Scheda Cliente</h1>
        <hr />
        <div class="form-row">
          <div class="form-group col">
            <label>Nome</label>
            <input
              type="text"
              name="nomeContatto"
              class="form-control"
              formControlName="nomeContatto"
            />
          </div>
          <div class="form-group col">
            <label>Cognome</label>
            <input
              type="text"
              name="cognomeContatto"
              class="form-control"
              formControlName="cognomeContatto"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label>Ragione Sociale</label>
            <input
              type="text"
              name="ragioneSociale"
              class="form-control"
              formControlName="ragioneSociale"
            />
          </div>
          <div class="form-group col">
            <label>Partita IVA</label>
            <input
              type="number"
              name="partitaIva"
              class="form-control"
              formControlName="partitaIva"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              class="form-control"
              formControlName="email"
            />
          </div>
          <div class="form-group col">
            <label>PEC</label>
            <input
              type="email"
              name="pec"
              class="form-control"
              formControlName="pec"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label>Telefono Contatto</label>
            <input
              type="text"
              class="form-control"
              name="telefonoContatto"
              id="telefonoContatto"
              formControlName="telefonoContatto"
            />
          </div>
          <div class="form-group col">
            <label>Email Contatto</label>
            <input
              type="email"
              class="form-control"
              name="emailContatto"
              id="emailContattoInput"
              formControlName="emailContatto"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label>Telefono</label>
            <input
              type="phone"
              name="telefono"
              class="form-control"
              formControlName="telefono"
            />
          </div>
          <div class="form-group col">
            <label>Tipo Cliente</label>
            <select
              class="form-control"
              name="ragioneSociale"
              formControlName="ragioneSociale"
            >
              <option>SRL</option>
              <option>SPA</option>
              <option>SAS</option>
              <option>PA</option>
            </select>
          </div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-success mt-2 border-dark"
            (click)="modificaDati(validateForm.value, cliente.id)"
          >
            Modifica Cliente
          </button>
        </div>
      </form>
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
export class ModificaClienteComponent implements OnInit {
  cliente: Cliente = new ClienteMod();
  idCliente!: number;
  validateForm!: FormGroup;

  constructor(
    private clientSrv: ClientiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.params['id'];
    this.formAggiornato();
    this.clientSrv.getById(this.idCliente).subscribe((res) => {
      this.cliente = res;
      this.updateValue(res);
    });
  }

  formAggiornato() {
    this.validateForm = this.formBuilder.group({
      ragioneSociale: this.formBuilder.control(null, [Validators.required]),
      partitaIva: this.formBuilder.control(null, [Validators.required]),
      tipoCliente: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required]),
      pec: this.formBuilder.control(null, [Validators.required]),
      telefono: this.formBuilder.control(null, [Validators.required]),
      nomeContatto: this.formBuilder.control(null, [Validators.required]),
      cognomeContatto: this.formBuilder.control(null, [Validators.required]),
      telefonoContatto: this.formBuilder.control(null, [Validators.required]),
      emailContatto: this.formBuilder.control(null, [Validators.required]),
    });
  }

  updateValue(cliente: Cliente) {
    this.validateForm.patchValue({
      ragioneSociale: cliente.ragioneSociale,
      partitaIva: cliente.partitaIva,
      tipoCliente: cliente.tipoCliente,
      email: cliente.email,
      pec: cliente.pec,
      telefono: cliente.telefono,
      nomeContatto: cliente.nomeContatto,
      cognomeContatto: cliente.cognomeContatto,
      telefonoContatto: cliente.telefonoContatto,
      emailContatto: cliente.emailContatto,
    });
  }

  modificaDati(cliente: Cliente, id: number) {
    this.clientSrv.modificaClienti(cliente, id).subscribe((res) => {
      this.router.navigate(['/clienti']);
    });
  }
}
