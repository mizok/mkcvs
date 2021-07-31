import { Point, Layer, syncData } from '../interface';

export class Layer2D implements Layer {
  public ctx: CanvasRenderingContext2D;
  public cvs: HTMLCanvasElement;
  public layerType: string = '2d';
  public syncData: syncData;
  public onFrame: Function = () => { };
  public onResize: Function = () => { };
  private canvasSizefixed: boolean = false;
  private ele: HTMLElement;
  constructor(
    ele: HTMLElement, syncData: syncData
  ) {
    this.ele = ele;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.syncData = syncData;
    this.init();
  }

  private init() {
    this.triggerResizingMechanism();

  }

  triggerResizingMechanism() {
    if (this.canvasSizefixed) return;
    const canvasWidth = this.ele.getBoundingClientRect().width;
    const canvasHeight = this.ele.getBoundingClientRect().height;
    this.cvs.width = canvasWidth;
    this.cvs.height = canvasHeight;
  }

  setSize(width: number, height: number) {
    this.canvasSizefixed = true;
    this.cvs.width = width;
    this.cvs.height = height;
  }

  drawRectPath(x: number, y: number, width: number, height: number) {
    this.ctx.moveTo(x - width / 2, y - height / 2);
    this.ctx.lineTo(x + width / 2, y - height / 2);
    this.ctx.lineTo(x + width / 2, y + height / 2);
    this.ctx.lineTo(x - width / 2, y + height / 2);
  }
  drawCirclePath(x: number, y: number, radius: number) {
    this.ctx.moveTo(x + radius, y);
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  }
  drawLinePath(point1: Point, point2: Point) {
    this.ctx.moveTo(point1.x, point1.y);
    this.ctx.lineTo(point2.x, point2.y);
  }
  background(color: string) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.restore();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
  }
}
