import { Component } from '@angular/core';

@Component({
  selector: 'app-hanoi-calc',
  templateUrl: './hanoi-calc.component.html',
  styleUrl: './hanoi-calc.component.scss'
})
export class HanoiCalcComponent {

  public title = 'hanoi';
  public result: any
  public inputData: number = 3;
  public time: number = 0;
  public moves: any[] = [];

  public start() {
    this.moves = []
    const t1 = performance.now();
  
    this.h(this.inputData, 1, 3);
    this.result = this.moves.length;
    const t2 = performance.now();
    this.time = (t2 - t1) / 1000
  }

  private move(s: number, e: number) {
      this.moves.push( [s, e]);
  }

  private h(n: number, start: number, end: number) {
      if (n === 1) {
        this.move(start, end);
      } else {
          const other = 6 - (start + end);
          this.h(n - 1, start, other);
          this.move(start, end);
          this.h(n - 1, other, end);
      }
  }
}