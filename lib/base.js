import { debounce, is, pointerEventToXY } from './function';
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as THREE from 'three';

export class Canvas2DFxBase {
  constructor(
    ele, config, defaultConfig
  ) {
    config = is.obj(config) ? config : {};
    defaultConfig = is.obj(defaultConfig) ? defaultConfig : {};
    this.config = Object.assign(defaultConfig, config);
    this.ele = ele;
    this.frameCount = 0;
    this.mouse = {
      x: 0,
      y: 0
    };
    this.ctx = null;
    this.frameIsPaused = false;
    this.isClick = false;
    this.canvasSizefixed = false;
    this.previousFrameTime = new Date().getTime();
    this.initBase();
  }
  initBase() {
    if (this.ele.tagName !== 'CANVAS') {
      const cvs = document.createElement('canvas');
      this.ele.appendChild(cvs);
      this.cvs = this.ele.querySelectorAll('canvas')[0];
      this.canvasWidth = this.ele.getBoundingClientRect().width;
      this.canvasHeight = this.ele.getBoundingClientRect().height;
    }
    else {
      this.cvs = this.ele;
      this.canvasWidth = this.ele.parentElement.getBoundingClientRect().width;
      this.canvasHeight = this.ele.parentElement.getBoundingClientRect().height;
    }

    this.ctx = this.cvs.getContext('2d');
    this.triggerResizingMechanism();

    window.addEventListener('resize', debounce(() => {
      this.triggerResizingMechanism();
    }, 500));

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== "visible") {
        this.frameIsPaused = true;
      }
    });

    this.addEventHandler();

    this.refreshBaseFrameCounter();

  }
  refreshBaseFrameCounter() {
    let thisFrameTime = new Date().getTime();
    this.timeElapsed = (thisFrameTime - this.previousFrameTime) / 1000;
    if (this.frameIsPaused) {
      this.timeElapsed = 0;
      this.frameIsPaused = false;
    }
    this.frameCount += 1;
    this.previousFrameTime = thisFrameTime
    requestAnimationFrame(() => {
      this.refreshBaseFrameCounter();
    })
  }
  triggerResizingMechanism() {
    if (this.canvasSizefixed) return;
    if (this.ele.tagName !== 'CANVAS') {
      let canvasWidth = this.ele.getBoundingClientRect().width;
      let canvasHeight = this.ele.getBoundingClientRect().height;
      this.cvs.width = canvasWidth;
      this.cvs.height = canvasHeight;
    }
    else {
      let canvasWidth = this.cvs.parentElement.getBoundingClientRect().width;
      let canvasHeight = this.cvs.parentElement.getBoundingClientRect().height;
      this.cvs.width = canvasWidth;
      this.cvs.height = canvasHeight;
    }
  }


  setCanvasSize(width, height) {
    this.canvasSizefixed = true;
    this.cvs.width = width;
    this.cvs.height = height;
  }

  background(color) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.restore();
  }



  addEventHandler() {
    this.cvs.addEventListener('click', () => {
      this.isClick = true;
    })
    this.cvs.addEventListener('touchstart', () => {
      this.isClick = true;

    })

    this.cvs.addEventListener('mousemove', (e) => {
      let pos = pointerEventToXY(e);
      this.mouse = {
        x: pos.x,
        y: pos.y
      }
    })

    this.cvs.addEventListener('touchmove', (e) => {
      let pos = pointerEventToXY(e);
      this.mouse = {
        x: pos.x,
        y: pos.y
      }
    })
  }

}

export class Canvas3DFxBase {
  constructor(
    ele, config, defaultConfig
  ) {
    config = is.obj(config) ? config : {};
    defaultConfig = is.obj(defaultConfig) ? defaultConfig : {};
    this.config = Object.assign(defaultConfig, config);
    this.initBase();
  }

  initBase() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement);
  }


}

export function boot(ctor, defaultConfig, config) {
  let canvas = document.getElementById('canvas');
  canvas = canvas ? canvas : document.body;
  let bootPromise = new Promise((res, rej) => {
    document.addEventListener('DOMContentLoaded', () => {
      let instance = new ctor(canvas, config, defaultConfig);
      res(instance);
    });
  });

  return bootPromise;
}