import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="container">
      <div class="row mt-3 ">
        <h1>Il nuovo sistema di Intesa SanPoalo</h1>
        <h4>
          Scopri ed inizia ad utilizzare il nostro nuovo CRM (Customer
          Rekationship Management)
        </h4>
      </div>
      <div class="container">
        <img
          class="imageCRM"
          src="https://thumbs.dreamstime.com/b/crm-customer-relationship-management-automation-system-software-business-technology-concept-153368195.jpg"
          alt="foto del crm"
          style="width: 65%"
        />
      </div>
      <div class="row greenContainer">
        <h2>Vuoi accedere alla nostra piattaforma?</h2>
        <div class="d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-primary mb-3 me-3 w-50 border-dark fs-5"
            [routerLink]="['/signup']"
          >
            Registrati <i class="bi bi-person-plus-fill"></i>
          </button>
          <button
            type="button"
            class="btn btn-success mb-3 w-50 border-dark fs-5"
            [routerLink]="['/login']"
          >
            Accedi <i class="bi bi-box-arrow-in-right"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .imageCRM {
        margin: 2rem 0 3rem;
        border-radius: 20px;
        box-shadow: 0 0 20px 10px #000;
      }
      button:hover {
        tranform: scale(1.2);
      }
    `,
  ],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
