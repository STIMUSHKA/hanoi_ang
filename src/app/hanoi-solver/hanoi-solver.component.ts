import { Component, Input } from '@angular/core';

// disk.component.ts

@Component({
  selector: 'app-disk',
  template: '<div [style.width]="width" class="disk"></div>',
  styles: [
    '.disk { height: 20px; background-color: #4caf50; margin: 2px; }'
  ]
})
export class DiskComponent {
  @Input() width: string = '50px';
}

// tower.component.ts

@Component({
  selector: 'app-tower',
  template: '<div><ng-content></ng-content></div>',
  styles: [
    'div { border-bottom: 1px solid; display: inline-block; margin: 5px; padding: 5px; display: flex; flex-direction: column-reverse; align-items: center;}'
  ]
})
export class TowerComponent {}



