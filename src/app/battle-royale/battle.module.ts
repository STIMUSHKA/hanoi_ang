import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import { BattleRoutingModule } from './battle-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BattleComponent
  ],
  imports: [
    CommonModule,
    BattleRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [BattleComponent]
})
export class BattleModule { }
