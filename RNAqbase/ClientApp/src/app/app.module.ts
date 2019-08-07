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
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TetradTabelComponent } from './tetrad-tabel/tetrad-tabel.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { QuadruplexTableComponent } from './quadruplex-table/quadruplex-table.component';
import { StructureTableComponent } from './structure-table/structure-table.component';
import { VisualizationDialogComponent } from './visualization-dialog/visualization-dialog.component';

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
    StructureTableComponent,
    TetradTabelComponent,
    QuadruplexTableComponent,
    VisualizationDialogComponent
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
      { path: 'quadruplexes', component: QuadruplexTableComponent },
      { path: 'structures', component: StructureTableComponent },
      { path: 'tetrads', component: TetradTabelComponent }
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [VisualizationDialogComponent]
})
export class AppModule { }
