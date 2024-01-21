import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineComponent } from './engine.component';

const routes: Routes = [
  { path: 'engine', component: EngineComponent },
  // Добавьте другие маршруты по мере необходимости
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineRoutingModule { }