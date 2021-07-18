import { Point, Layer, syncData } from '../interface';

export class Layer2D implements Layer {
  public ctx: CanvasRenderingContext2D;
  public cvs: HTMLCanvasElement;
  public frameIsPaused: boolean = false;
  private canvasSizefixed: boolean = false;
  public syncData: syncData;
  private ele: HTMLElement;
  constructor(
    ele: HTMLElement, syncData: syncData
  ) {
    this.ele = ele;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.syncData = syncData
  }

  triggerResizingMechanism() {
    if (this.canvasSizefixed) return;
    let canvasWidth = this.ele.getBoundingClientRect().width;
    let canvasHeight = this.ele.getBoundingClientRect().height;
    this.cvs.width = canvasWidth;
    this.cvs.height = canvasHeight;
  }

  setSize(width: number, height: number) {
    this.canvasSizefixed = true;
    this.cvs.width = width;
    this.cvs.height = height;
  }

  drawSquare(x: number, y: number, width: number, color: string, alpha: number) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = alpha;
    this.ctx.fillRect(x - width / 2, y - width / 2, width, width);
    this.ctx.restore();
  }
  drawCircle(x: number, y: number, width: number, color: string, alpha: number) {
    this.ctx.save()
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = alpha;
    this.ctx.beginPath();
    this.ctx.arc(x, y, width / 2, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }
  drawLine(point1: Point, point2: Point, strokeColor: string, strokeWidth: number) {
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = strokeWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(point1.x, point1.y);
    this.ctx.lineTo(point2.x, point2.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
