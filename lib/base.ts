import { debounce, pointerEventToXY, forEach } from './function';
import { Point, Layer, syncData } from './interface';
import { Layer2D, Layer3D, LayerWebgl, LayerDom } from './layer';
export class Composition {
  public stack: Layer[] = [];
  public ele: HTMLElement;
  public syncData: syncData = {
    mouse: { x: 0, y: 0 },
    isClick: false,
    frameCount: 0,
    timeElapsed: 0,
    previousFrameTime: performance.now()
  }
  constructor(ele: HTMLElement) {
    this.ele = ele;
    this.setBlockPreventingMechanism();
    this.addEventHandler();
    this.refreshBaseFrameCounter();
  }
  addLayer(type: string) {
    let layer;
    switch (type) {
      case '2d':
        layer = new Layer2D(this.ele, this.syncData);
        break;
      case '3d':
        layer = new Layer3D(this.ele, this.syncData);
        break;
      case 'webgl':
        layer = new LayerWebgl(this.ele, this.syncData);
        break;
      case 'dom':
        layer = new LayerDom(this.ele, this.syncData);
        break;
    }
    this.stack.unshift(layer);
  }

  private addEventHandler() {
    this.ele.addEventListener('mousedown', () => {
      this.syncData.isClick = true;
    })
    this.ele.addEventListener('mouseup', () => {
      this.syncData.isClick = false;
    })
    this.ele.addEventListener('touchstart', () => {
      this.syncData.isClick = true;
    })
    this.ele.addEventListener('touchend', () => {
      this.syncData.isClick = false;
    })

    this.ele.addEventListener('mousemove', (e) => {
      let pos = pointerEventToXY(e);
      this.syncData.mouse = pos;
    })
    this.ele.addEventListener('touchmove', (e) => {
      let pos = pointerEventToXY(e);
      this.syncData.mouse = pos;
    })
    window.addEventListener('resize', debounce(() => {
      forEach(this.stack, (i: number, o: any) => {
        o.triggerResizingMechanism();
      })
    }, 200))
  }

  private setBlockPreventingMechanism() {
    const newHandler = () => { console.error('MKCVS:Alert/Confirm Is Forbidden In This FrameWork'); return false };
    if (window.alert) {
      window.alert = newHandler;
    }
    if (window.confirm) {
      window.confirm = newHandler;
    }
  }

  private refreshBaseFrameCounter(): void {
    const fps = 60;
    const thisFrameTime = performance.now();
    this.syncData.timeElapsed = thisFrameTime - this.syncData.previousFrameTime;
    this.syncData.frameCount += 1;
    this.syncData.previousFrameTime = thisFrameTime;

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