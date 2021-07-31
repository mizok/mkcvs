import { Layer, syncData } from '../interface';

export class LayerNormal implements Layer {
  public ctx: WebGLRenderingContext;
  public cvs: HTMLCanvasElement;
  public frameIsPaused: boolean = false;
  public layerType: string = 'normal';
  public onFrame: Function = () => { };
  public onResize: Function = () => { };
  public syncData: syncData;
  private canvasSizefixed: boolean = false;
  private ele: HTMLElement;
  constructor(
    ele: HTMLElement, syncData: syncData
  ) {
    this.ele = ele;
    this.cvs = document.createElement('canvas');
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
}