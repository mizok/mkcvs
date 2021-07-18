import { debounce, pointerEventToXY, forEach } from './function';
import { Point, Layer } from './interface'


export class Layer2D implements Layer {
  public ctx: CanvasRenderingContext2D;
  public cvs: HTMLCanvasElement;
  public frameIsPaused: boolean = false;
  private canvasSizefixed: boolean = false;
  private ele: HTMLElement;
  constructor(
    ele: HTMLElement
  ) {
    this.ele = ele;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
  }

  private triggerResizingMechanism() {
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

export class Layer3D implements Layer {
  public ctx: WebGLRenderingContext;
  public cvs: HTMLCanvasElement;
  public frameIsPaused: boolean = false;
  private canvasSizefixed: boolean = false;
  private ele: HTMLElement;
  constructor(
    ele: HTMLElement
  ) {
    this.ele = ele;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('webgl');
  }

  private triggerResizingMechanism() {
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
}

export class LayerWebgl implements Layer {
  public ctx: WebGLRenderingContext;
  public cvs: HTMLCanvasElement;
  public frameIsPaused: boolean = false;
  private canvasSizefixed: boolean = false;
  private ele: HTMLElement;
  constructor(
    ele: HTMLElement
  ) {
    this.ele = ele;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('webgl');
  }

  private triggerResizingMechanism() {
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
}

export class LayerDom implements Layer {
  public frameIsPaused: boolean = false;
  private canvasSizefixed: boolean = false;
  private ele: HTMLElement;
  constructor(
    ele: HTMLElement
  ) {
    this.ele = ele;
  }

  private triggerResizingMechanism() {
    if (this.canvasSizefixed) return;
  }

  setSize(width: number, height: number) {
    this.canvasSizefixed = true;
  }
}


export class Composition {
  public stack: Layer[] = [];
  public ele: HTMLElement;
  private isClick: boolean = false;
  private mouse: Point;
  private frameCount: number = 0;
  private timeElapsed: number = 0;
  private previousFrameTime: number = performance.now();
  constructor(ele: HTMLElement) {
    this.ele = ele;
    this.setBlockPreventingMechanism();

  }
  addLayer(type: string) {
    let layer;
    switch (type) {
      case '2d':
        layer = new Layer2D(this.ele);
        break;
      case '3d':
        layer = new Layer3D(this.ele);
        break;
      case 'webgl':
        layer = new LayerWebgl(this.ele);
        break;
      case 'dom':
        layer = new LayerDom(this.ele);
        break;
    }
    this.stack.unshift(layer);
  }

  addEventHandler() {
    this.ele.addEventListener('mousedown', () => {
      this.isClick = true;
      forEach(this.stack, (i: number, o: any) => {
        o.isClick = true;
      })
    })
    this.ele.addEventListener('mouseup', () => {
      this.isClick = false;
      forEach(this.stack, (i: number, o: any) => {
        o.isClick = false;
      })
    })
    this.ele.addEventListener('touchstart', () => {
      this.isClick = true;
      forEach(this.stack, (i: number, o: any) => {
        o.isClick = true;
      })
    })
    this.ele.addEventListener('touchend', () => {
      this.isClick = false;
      forEach(this.stack, (i: number, o: any) => {
        o.isClick = false;
      })
    })

    this.ele.addEventListener('mousemove', (e) => {
      let pos = pointerEventToXY(e);
      this.mouse = pos;
      forEach(this.stack, (i: number, o: any) => {
        o.mouse = pos;
      })
    })
    this.ele.addEventListener('touchmove', (e) => {
      let pos = pointerEventToXY(e);
      this.mouse = pos;
      forEach(this.stack, (i: number, o: any) => {
        o.mouse = pos;
      })
    })
    window.addEventListener('resize', debounce(() => {
      forEach(this.stack, (i: number, o: any) => {
        o.triggerResizingMechanism();
      })
    }, 200))
  }

  setBlockPreventingMechanism() {
    const newHandler = () => { console.error('MKCVS:Alert/Confirm Is Forbidden In This FrameWork'); return false };
    if (window.alert) {
      window.alert = newHandler;
    }
    if (window.confirm) {
      window.confirm = newHandler;
    }
  }

  setFrameCount(number: number) {
    this.frameCount = number;
    forEach(this.stack, (i: number, o: any) => {
      o.frameCount = number
    })
  }

  setTimeElapsed(number: number) {
    this.timeElapsed = number;
    forEach(this.stack, (i: number, o: any) => {
      o.timeElapsed = number;
    })
  }

  refreshBaseFrameCounter(): void {
    const fps = 60;
    const thisFrameTime = performance.now();
    this.setTimeElapsed(thisFrameTime - this.previousFrameTime);
    this.setFrameCount(this.frameCount + 1);
    this.previousFrameTime = thisFrameTime;

    if (document.visibilityState === 'visible') {
      requestAnimationFrame(() => {
        this.refreshBaseFrameCounter();
      })
    }
    else {
      setTimeout(() => {
        this.refreshBaseFrameCounter();
      }, 1000 / fps)
    }
  }
}