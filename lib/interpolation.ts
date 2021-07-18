import { is, colorToRgba, getChannelValuesFromRgba } from './function';

/**
 * 線性內插函數
 *
 * @export
 * @param {*} x
 * @param {*} min
 * @param {*} max
 * @param {*} virtualMin
 * @param {*} virtualMax
 * @returns
 */
export function lerp(x: number, x0: number, x1: number, v0: number, v1: number) {
  return ((x - x0) / (x1 - x0)) * (v1 - v0) + v0;
}


export function colorInterpolation(x: number, x0: number, x1: number, fromColor: string, toColor: string) {
  // 先驗證收到的color 是正式規範的色彩格式 (hex/rgb/rgba/hsl)
  let valueIsValidated = is.col(fromColor) && is.col(toColor);
  if (!valueIsValidated) return new TypeError("colorInterpolation: 色彩參數非規制");

  let rgba0 = getChannelValuesFromRgba(colorToRgba(fromColor)),
    rgba1 = getChannelValuesFromRgba(colorToRgba(toColor));
  let rgba = [];
  for (let i = 0; i < 4; i++) {
    rgba[i] = lerp(x, x0, x1, rgba0[i], rgba1[i])
  }

  return `rgba(${rgba})`;
}


