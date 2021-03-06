import { debounce, pointerEventToXY, forEach } from './function';
import { Layer, syncData } from './interface';
import { Layer2D, LayerNormal, LayerWebgl, LayerDom } from './layer';
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
  public onResize: Function = () => { };
  private cvs: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(ele: HTMLElement) {
    this.ele = ele;
    this.setBlockPreventingMechanism();
    this.addEventHandler();
    this.genBaseCanvas();
    this.refreshBaseFrameCounter();
  }
  newLayer(type: string | void): Layer {
    if (!type) type = 'normal';
    let layer;
    switch (type) {
      case '2d':
        layer = new Layer2D(this.ele, this.syncData);
        break;
      case 'normal':
        layer = new LayerNormal(this.ele, this.syncData);
        break;
      case 'webgl':
        layer = new LayerWebgl(this.ele, this.syncData);
        break;
      case 'dom':
        layer = new LayerDom(this.ele, this.syncData);
        break;
    }
    this.stack.unshift(layer);
    return layer;
  }

  private triggerResizingMechanism() {
    let canvasWidth = this.ele.getBoundingClientRect().width;
    let canvasHeight = this.ele.getBoundingClientRect().height;
    this.cvs.width = canvasWidth;
    this.cvs.height = canvasHeight;
    this.setPosition();
  }

  private genBaseCanvas() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.triggerResizingMechanism();
    this.ele.append(this.cvs);
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
      this.triggerResizingMechanism();
      setTimeout(() => {
        this.onResize();
      })
      forEach(this.stack, (i: number, o: any) => {
        if (o.layerType === 'dom') return;
        o.triggerResizingMechanism();
      })
    }, 200))
  }

  setPosition() {
    this.ele.style.position = '';
    const position = window.getComputedStyle(this.ele).getPropertyValue('position');
    if (position == "static") {
      this.ele.style.position = 'relative'
    }
    else {
      this.ele.style.position = 'relative'
    }
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

  renderAllStack(): void {
    const stackLength = this.stack.length;
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    forEach(this.stack, (i: number, o: Layer) => {
      this.ctx.drawImage(this.stack[stackLength - 1 - i].cvs, 0, 0, this.cvs.width, this.cvs.height);
    })
  }

  private refreshBaseFrameCounter(): void {
    const fps = 60;
    const thisFrameTime = performance.now();
    this.syncData.timeElapsed = thisFrameTime - this.syncData.previousFrameTime;
    this.syncData.frameCount += 1;
    this.syncData.previousFrameTime = thisFrameTime;
    forEach(this.stack, (i: number, o: Layer) => {
      o.onFrame();
    })
    this.renderAllStack();

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