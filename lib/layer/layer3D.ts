import { Layer, syncData } from '../interface';

export class Layer3D implements Layer {
  public ctx: WebGLRenderingContext;
  public cvs: HTMLCanvasElement;
  public frameIsPaused: boolean = false;
  private canvasSizefixed: boolean = false;
  private ele: HTMLElement;
  public syncData: syncData;
  constructor(
    ele: HTMLElement, syncData: syncData
  ) {
    this.ele = ele;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('webgl');
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
}