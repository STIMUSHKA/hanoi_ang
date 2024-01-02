import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'hanoi';
  public result: any
  public inputData: number = 0;
  public time: number = 0;
  private moves: string[] = [];


  public start() {
    this.moves = []
    const t1 = performance.now();
  
    this.h(this.inputData, 1, 3);
    this.result = this.moves.length;
    const t2 = performance.now();
    this.time = (t2 - t1) / 1000
  }

  private move(s: number, e: number) {
      this.moves.push( s +  '->' +  e);
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
