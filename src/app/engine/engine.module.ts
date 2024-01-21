import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineComponent } from './engine.component';
import { EngineRoutingModule } from './engine-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EngineComponent
  ],
  imports: [
    CommonModule,
    EngineRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [EngineComponent]
})
export class EngineModule { }
