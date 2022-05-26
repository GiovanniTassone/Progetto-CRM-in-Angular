import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ClientiComponent } from './components/clienti/clienti.component';
import { CreaClienteComponent } from './components/clienti/crea-cliente.component';
import { UserComponent } from './components/user/user.component';
import { ModificaClienteComponent } from './components/clienti/modifica-cliente.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { DettagliFattureComponent } from './components/fatture/dettagli-fatture.component';
import { DettagliClienteComponent } from './components/clienti/dettagli-cliente.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { CreaFatturaComponent } from './components/fatture/crea-fattura.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    ClientiComponent,
    CreaClienteComponent,
    UserComponent,
    ModificaClienteComponent,
    FattureComponent,
    DettagliFattureComponent,
    DettagliClienteComponent,
    CreaFatturaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
