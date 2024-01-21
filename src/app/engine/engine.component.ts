import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrl: './engine.component.scss'
})
export class EngineComponent {
  @ViewChild('ballCanvas', { static: true }) ballCanvas!: ElementRef<HTMLCanvasElement>;
  public ballCount: number = 10;
  public ballSize: number = 10;
  public ballSpeed: number = 10;
  public fps!: number;

  private ctx: CanvasRenderingContext2D | null = null;
  private balls: { x: number; y: number; dx: number; dy: number; radius: number; color: string; }[] = []
  private actualBallSize: number = Math.pow(10, this.ballSize / 10);;
  private actualBallSpeed: number = Math.pow(10, this.ballSpeed / 10);
  private lastFrameTime!: number;
  
  constructor() {}

  ngOnInit(): void {
    this.ctx = this.ballCanvas.nativeElement.getContext('2d');
    this.setup();
    this.animate();
  }

  setup(): void {
    this.actualBallSize = Math.pow(10, this.ballSize / 10);
    this.actualBallSpeed = Math.pow(10, this.ballSpeed / 10);
    this.createBalls();
  }

  createBalls(): void {
    this.balls = [];
    for (let i = 0; i < this.ballCount; i++) {
      const radius = Math.random() * this.actualBallSize * 2 + 10; // Размер шара
      const ball = this.generateRandomBall(radius, this.balls);
  
      this.balls.push(ball);
    }
  }

  generateRandomBall(radius: number, existingBalls: any[]): any {
    const newBall = {
      x: Math.random() * (this.ballCanvas.nativeElement.width - radius * 2) + radius,
      y: Math.random() * (this.ballCanvas.nativeElement.height - radius * 2) + radius,
      dx: (Math.random() - 0.5) * 0.2 * this.actualBallSpeed,
      dy: (Math.random() - 0.5) * 0.2 * this.actualBallSpeed,
      radius,
      color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    };
  
    // Проверка и коррекция столкновений с другими шариками
    if (this.checkBallCollisionsOnGeneration(newBall, existingBalls)) {
      return this.generateRandomBall(radius, existingBalls);
    }
  
    return newBall;
  }

  checkBallCollisionsOnGeneration(newBall: any, existingBalls: any[]): boolean {
    for (const existingBall of existingBalls) {
      const distance = Math.sqrt((newBall.x - existingBall.x) ** 2 + (newBall.y - existingBall.y) ** 2);
  
      // Если есть пересечение, возвращаем true
      if (distance < newBall.radius + existingBall.radius) {
        return true;
      }
    }
  
    // Если не обнаружено пересечений, возвращаем false
    return false;
  }

  animate(): void {

    const currentTime = performance.now();

    // Рассчитываем прошедшее время с предыдущего кадра
    const deltaTime = currentTime - (this.lastFrameTime || currentTime);

    // Вычисляем FPS
    this.fps = 1000 / deltaTime;

    // Обновляем переменную lastFrameTime
    this.lastFrameTime = currentTime;

  
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.ballCanvas.nativeElement.width, this.ballCanvas.nativeElement.height);
  
      for (const ball of this.balls) {
        this.drawBall(ball);
        this.updateBall(ball);
      }
  
      requestAnimationFrame(() => this.animate());
    }

    console.log('FPS:', this.fps);

  }

  drawBall(ball: any): void {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  updateBall(ball: any): void {
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // Проверка столкновений со стенами
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > this.ballCanvas.nativeElement.width) {
      ball.dx = -ball.dx;
    }
  
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > this.ballCanvas.nativeElement.height) {
      ball.dy = -ball.dy;
    }
  
    // Проверка столкновений с другими шариками
    this.checkBallCollisions(ball);
  }

  checkBallCollisions(ball: any): void {
    for (const otherBall of this.balls) {
      if (otherBall !== ball) {
        const distance = Math.sqrt((ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2);
  
        // Если расстояние между центрами шариков меньше суммы их радиусов, то произошло столкновение
        if (distance < ball.radius + otherBall.radius) {
          // Обработка столкновения (например, обмен скоростями)
          this.handleCollision(ball, otherBall);
        }
      }
    }
  }
  
  handleCollision(ballA: any, ballB: any): void {
    // Обмен скоростями (просто для примера, реализация может быть более сложной)
    const tempDx = ballA.dx;
    const tempDy = ballA.dy;
    ballA.dx = ballB.dx;
    ballA.dy = ballB.dy;
    ballB.dx = tempDx;
    ballB.dy = tempDy;
  
    // Перемещение шаров, чтобы они не слипались друг с другом
    const overlap = ballA.radius + ballB.radius - Math.sqrt((ballA.x - ballB.x) ** 2 + (ballA.y - ballB.y) ** 2);
    const angle = Math.atan2(ballB.y - ballA.y, ballB.x - ballA.x);
    const moveX = overlap * Math.cos(angle) / 2;
    const moveY = overlap * Math.sin(angle) / 2;
  
    ballA.x -= moveX;
    ballA.y -= moveY;
    ballB.x += moveX;
    ballB.y += moveY;
  
    // Проверка и коррекция, чтобы шары оставались в пределах экрана
    this.checkBoundaryCollision(ballA);
    this.checkBoundaryCollision(ballB);
  }
  
  checkBoundaryCollision(ball: any): void {
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.dx = Math.abs(ball.dx); // Отражение от левой границы
    }
  
    if (ball.x + ball.radius > this.ballCanvas.nativeElement.width) {
      ball.x = this.ballCanvas.nativeElement.width - ball.radius;
      ball.dx = -Math.abs(ball.dx); // Отражение от правой границы
    }
  
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.dy = Math.abs(ball.dy); // Отражение от верхней границы
    }
  
    if (ball.y + ball.radius > this.ballCanvas.nativeElement.height) {
      ball.y = this.ballCanvas.nativeElement.height - ball.radius;
      ball.dy = -Math.abs(ball.dy); // Отражение от нижней границы
    }
  }
  
  onMouseMove(event: MouseEvent): void {
    // Обработка движения мыши
  }
}
