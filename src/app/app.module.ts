import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HanoiCalcComponent } from './hanoi-calc/hanoi-calc.component';
import { FormsModule } from '@angular/forms';
import { HanoiVizualComponent } from './hanoi-vizual/hanoi-vizual.component';
import { DiskComponent, TowerComponent } from './hanoi-solver/hanoi-solver.component';

@NgModule({
  declarations: [
    AppComponent,
    HanoiCalcComponent,
    HanoiVizualComponent,
    DiskComponent,
    TowerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
