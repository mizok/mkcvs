const MersenneTwister = require('mersenne-twister');
const MT = new MersenneTwister();
import { Point } from './interface'

/**
 *
 * debounce function
 * @export
 * @param {Function} func
 * @param {number} delay
 * @returns
 */
export function debounce(func: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  const $this = this;
  return function () {
    const context = $this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const is = {
  und: (a: any): boolean => typeof a === 'undefined',
  nil: (a: any): boolean => is.und(a) || a === null,
  hex: (a: any): boolean => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
  rgba: (a: any): boolean => /^rgba/.test(a),
  rgb: (a: any): boolean => /^rgb/.test(a),
  hsl: (a: any): boolean => /^hsl/.test(a),
  col: (a: any): boolean => (is.hex(a) || is.rgb(a) || is.hsl(a))
}
/**
 * 產生指定範圍內的隨機值
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @param {number} [seed]
 * @returns
 */
export function randomWithinRange(min: number, max: number, seed?: number) {
  return MT.random(seed) * (max - min) + min;
}
/**
 * 取得點對點的距離絕對值
 *
 * @export
 * @param {Point} point1
 * @param {point} point2
 * @returns
 */
export function getDistance(point1: Point, point2: Point) {
  let dist = (point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.y) * (point2.y - point1.y) + (point2?.z - point1?.z) * (point2?.z - point1?.z);
  return Math.sqrt(dist);
}
/**
 *
 * 度度量轉徑度量
 * 
 * @export
 * @param {Number} degree
 * @returns
 */
export function degreeToRadian(degree: number) {
  return (degree / 180) * Math.PI;
}

/**
 * 統一 touchEvent/mouseEvent 的事件觸發座標取得方式
 * @export
 * @param {object}  傳入的event 物件
 * @returns {Object} 一個物件, 內含事件觸發座標的X/Y 座標值
 */
export function pointerEventToXY(e: any) {
  var out = { x: 0, y: 0 };
  if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    out.x = touch.pageX;
    out.y = touch.pageY;
  } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
    out.x = e.pageX;
    out.y = e.pageY;
  }
  return out;
}

/**
 * rgb 值轉成rgba值
 *
 * @param {String} rgbValue
 * @returns {String} rgbavalue
 */
function rgbToRgba(rgbValue: string): string {
  const rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? `rgba(${rgb[1]},1)` : rgbValue;
}
/**
 * hex值轉rgba值
 *
 * @param {String} hexValue
 * @returns {String} rgbavalue
 */
function hexToRgba(hexValue: string): string {
  const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = hexValue.replace(rgx, (m, r, g, b) => r + r + g + g + b + b);
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  return `rgba(${r},${g},${b},1)`;
}
/**
 * hsl值轉rgba值
 *
 * @param {String} hslValue
 * @returns {String} rgbavalue
 */
function hslToRgba(hslValue: string): string {
  const hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  const h = parseInt(hsl[1], 10) / 360;
  const s = parseInt(hsl[2], 10) / 100;
  const l = parseInt(hsl[3], 10) / 100;
  const a = hsl[4] || 1;
  function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  let r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return `rgba(${r * 255},${g * 255},${b * 255},${a})`;
}

/**
 *
 *
 * @export
 * @param {string} val
 * @returns {String} rgbavalue
 */
export function colorToRgba(val: string): string {
  if (is.rgb(val)) return rgbToRgba(val);
  if (is.hex(val)) return hexToRgba(val);
  if (is.hsl(val)) return hslToRgba(val);
}
/**
 *
 *
 * @export
 * @param {String} rgba
 * @returns 
 */
export function getChannelValuesFromRgba(rgba: string): Array<number> {
  return rgba.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').map(x => parseInt(x));
}

/**
 * 產生隨機id
 *
 * @export
 * @param {number} digits id碼位數
 * @returns
 */
export function randomID(digits: number) {
  const codeStr = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVXYZ23456789';
  let str = '';
  for (let i = 0; i < digits; i++) {
    str += codeStr[Math.floor(randomWithinRange(0, codeStr.length))]
  }
  return str;
}

/**
 * 遍歷陣列
 *
 * @export
 * @param {*} array
 * @param {*} callback
 */
export function forEach(array: Array<any>, callback: Function) {
  let counter = array.length;
  while (counter--) {
    callback(array.length - (counter + 1), array[array.length - (counter + 1)]);
  }
}


