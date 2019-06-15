import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TetradsComponent } from './tetrads/tetrads.component';
import { TestComponent } from './test/test.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CiteUsComponent } from './citeUs/citeUs.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { QuadruplexesComponent } from './quadruplexes/quadruplexes.component';
import { StructuresComponent } from './structures/structures.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TetradsComponent,
    TestComponent,
    AboutComponent,
    CiteUsComponent,
    ContactComponent,
    HelpComponent,
    QuadruplexesComponent,
    StructuresComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,

    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'tetrads', component: TetradsComponent },
      { path: 'test', component: TestComponent },
      { path: 'about', component: AboutComponent },
      { path: 'citeUs', component: CiteUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'help', component: HelpComponent },
      { path: 'quadruplexes', component: QuadruplexesComponent },
      { path: 'structures', component: StructuresComponent }
    ]),
    MDBBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
