import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { DettagliClienteComponent } from './components/clienti/dettagli-cliente.component';
import { DettagliFattureComponent } from './components/fatture/dettagli-fatture.component';
import { ModificaClienteComponent } from './components/clienti/modifica-cliente.component';
import { CreaFatturaComponent } from './components/fatture/crea-fattura.component';
import { UserComponent } from './components/user/user.component';
import { CreaClienteComponent } from './components/clienti/crea-cliente.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'fatture',
    canActivate: [AuthGuard],
    component: FattureComponent,
  },
  {
    path: 'creafatture/:id',
    canActivate: [AuthGuard],
    component: CreaFatturaComponent,
  },
  {
    path: 'clienti',
    canActivate: [AuthGuard],
    component: ClientiComponent,
  },
  {
    path: 'dettaglicliente/:id',
    canActivate: [AuthGuard],
    component: DettagliClienteComponent,
    children: [
      {
        path: 'fatture/:id',
        component: FattureComponent,
      },
    ],
  },
  {
    path: 'modificacliente/:id',
    canActivate: [AuthGuard],
    component: ModificaClienteComponent,
  },
  {
    path: 'fatture',
    canActivate: [AuthGuard],
    component: FattureComponent,
  },
  {
    path: 'fatture/:id',
    canActivate: [AuthGuard],
    component: DettagliFattureComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UserComponent,
  },
  {
    path: 'creacliente',
    canActivate: [AuthGuard],
    component: CreaClienteComponent,
  },
  {
    path: '**',
    redirectTo: 'clienti',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
