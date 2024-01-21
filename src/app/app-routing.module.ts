import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HanoiCalcComponent } from './hanoi-calc/hanoi-calc.component';

const routes: Routes = [
  { path: 'hanoi', component: HanoiCalcComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
