import { drawCircle } from './shape';

export class Particle {
  constructor(positionX, positionY, radius, massFactor, color, alpha = 1) {
    this.position = { x: positionX, y: positionY };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.radius = radius;
    this.mass = this.radius * massFactor;
    this.color = color;
    this.alpha = alpha;
  }
  updateVelocity() {
    this.velocity.x = this.velocity.x + this.acceleration.x;
    this.velocity.y = this.velocity.y + this.acceleration.y;
  }
  updatePosition() {
    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;
  }
  draw(ctx) {
    drawCircle(ctx, this.pos.x, this.pos.y, this.radius * 2, this.color, this.alpha);
  }
}