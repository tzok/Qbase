import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { CiteUsComponent } from './citeUs/citeUs.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { QuadruplexesComponent } from './quadruplexes/quadruplexes.component';
import { StructuresComponent } from './structures/structures.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TetradTabelComponent } from './tetrad-tabel/tetrad-tabel.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TestComponent,
    AboutComponent,
    CiteUsComponent,
    ContactComponent,
    HelpComponent,
    QuadruplexesComponent,
    StructuresComponent,
    TetradTabelComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,

    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'test', component: TestComponent },
      { path: 'about', component: AboutComponent },
      { path: 'citeUs', component: CiteUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'help', component: HelpComponent },
      { path: 'quadruplexes', component: QuadruplexesComponent },
      { path: 'structures', component: StructuresComponent },
      { path: 'tetrads', component: TetradTabelComponent }
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
