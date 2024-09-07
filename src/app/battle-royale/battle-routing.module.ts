import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './battle.component';

const routes: Routes = [
  { path: 'battle', component: BattleComponent },
  // Добавьте другие маршруты по мере необходимости
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleRoutingModule { }